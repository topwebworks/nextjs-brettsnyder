import assert from 'node:assert/strict';
import puppeteer from 'puppeteer';

const origin = process.argv[2] || 'http://localhost:3001';
const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setCacheEnabled(false);
const errors = [];
page.on('pageerror', error => errors.push(error.message));

try {
  for (const name of ['fixed', 'adaptive', 'fluid', 'responsive', 'bradley']) {
    for (const width of [600, 390, 320]) {
      await page.setViewport({ width, height: 900 });
      const path = name === 'bradley' ? 'bradley/index.html' : `layouts/variants/${name}.html`;
      assert.equal((await page.goto(`${origin}/demo/emails/${path}`, { waitUntil: 'load' })).status(), 200);
      await page.waitForFunction(() => [...document.images].every(image => image.complete && image.naturalWidth));
      const state = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth - innerWidth,
        remoteImages: [...document.images].filter(image => new URL(image.src).origin !== location.origin).length,
        layoutTables: document.querySelectorAll('table:not([role="presentation"])').length,
      }));
      assert.equal(state.remoteImages, 0, `${name}: images must be local`);
      assert.equal(state.layoutTables, 0, `${name}: layout tables need presentation semantics`);
      const expectedOverflow = name === 'fixed' ? 600 - width : name === 'adaptive' && width === 390 ? 10 : 0;
      assert.equal(state.overflow, expectedOverflow, `${name} at ${width}px`);
    }
  }

  for (const width of [1200, 390, 320]) {
    await page.setViewport({ width, height: 900 });
    await page.goto(`${origin}/demo/emails/layouts/index.html`, { waitUntil: 'load' });
    await page.select('#width', 'phone');
    await page.waitForFunction(() => document.querySelector('#state').textContent.includes('390 px'));
    for (const name of ['fixed', 'adaptive', 'fluid', 'responsive']) {
      await page.select('#approach', name);
      await page.waitForFunction(name => {
        const frame = document.querySelector('#email');
        return frame.contentDocument?.readyState === 'complete'
          && frame.contentWindow.location.pathname.endsWith(`/${name}.html`);
      }, {}, name);
      const frame = await (await page.$('#email')).contentFrame();
      const overflow = await frame.evaluate(() => document.documentElement.scrollWidth - innerWidth);
      assert.equal(overflow, name === 'fixed' ? 210 : name === 'adaptive' ? 10 : 0, `${name} in the 390px preview`);
      assert(await page.$eval('#open', (link, name) => link.pathname.endsWith(`/${name}.html`), name));
    }
    await page.select('#width', 'desktop');
    await page.waitForFunction(() => document.querySelector('#state').textContent.includes('600 px'));
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth), 0);
    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
    await page.select('#width', 'fit');
    assert.equal(await page.$eval('.stage', stage => stage.dataset.width), 'fit');
  }
  assert.deepEqual(errors, []);
  console.log('15 original-email layouts and 3 comparison-viewer widths passed.');
} finally {
  await browser.close();
}
