import assert from 'node:assert/strict';
import puppeteer from 'puppeteer';

const base = process.argv[2] || 'http://localhost:3001';
const browser = await puppeteer.launch({ headless: true });
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
const results = [];

try {
  for (const theme of ['dark', 'light']) {
    for (const width of [1200, 390, 320]) {
      const page = await browser.newPage();
      await page.setCacheEnabled(false);
      const errors = [];
      let galleryRequests = 0;
      page.on('pageerror', error => errors.push(error.message));
      page.on('request', request => {
        if (new URL(request.url()).pathname === '/demo/shopify-custom-sections.jpg') galleryRequests++;
      });
      await page.setViewport({ width, height: 900 });
      await page.evaluateOnNewDocument(value => localStorage.setItem('theme', value), theme);
      assert.equal((await page.goto(`${base}/projects/shopify-migrations`, { waitUntil: 'domcontentloaded' })).status(), 200);
      await pause(1000);
      await page.evaluate(() => [...document.querySelectorAll('button')].find(b => b.textContent.trim() === 'Decline')?.click());
      await page.evaluate(() => document.querySelectorAll('#article-body img').forEach(i => { i.loading = 'eager'; }));
      await page.waitForFunction(() => {
        const images = [...document.querySelectorAll('#article-body img')];
        return images.length === 8 && images.every(i => i.complete && i.naturalWidth > 0);
      });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth), 0);
      assert.equal(await page.evaluate(() => document.documentElement.dataset.theme), theme);
      assert.equal(galleryRequests, 0, 'The full capture must load only when requested');

      const preview = await page.$('button[aria-label="Play Shopify Plus Migrations demo video"]');
      assert(preview);
      const heroBounds = await preview.boundingBox();
      assert(Math.abs(heroBounds.width / heroBounds.height - 16 / 9) < .01);
      assert.equal(await page.$$eval('button[data-type="image"]', images => images.length), 5);
      if (theme === 'dark' && width === 1200) {
        await page.click('button[data-type="image"]');
        await page.waitForFunction(() => document.querySelector('img[alt="Shopify Plus Migrations hero image"]')?.src.includes('design-tokens'));
        await page.click('button[data-type="video"]');
        await page.focus('button[aria-label="Play Shopify Plus Migrations demo video"]');
        await page.keyboard.press('Enter');
        await page.waitForSelector('iframe[title="Shopify Plus Migrations demo video"]');
        assert(await page.$eval('iframe[title="Shopify Plus Migrations demo video"]', f => f.src.includes('GvHgPfRyoe4') && f.src.includes('autoplay=1')));
      }

      const embedded = await page.$('iframe.project-component-demo');
      await embedded.evaluate(f => f.scrollIntoView({ block: 'center', behavior: 'instant' }));
      await page.waitForFunction(() => document.querySelector('iframe.project-component-demo')?.contentDocument?.querySelector('[role="tab"]'));
      const prototype = await embedded.contentFrame();
      await prototype.waitForSelector('[role="tab"]');
      await prototype.select('#layout', 'vertical');
      await prototype.click('#icons');
      await prototype.click('#tab-math');
      const vertical = await prototype.evaluate(() => innerWidth > 640);
      await page.keyboard.press(vertical ? 'ArrowDown' : 'ArrowRight');
      assert.equal(await prototype.$eval('[role="tab"][aria-selected="true"]', t => t.dataset.subject), 'science');
      assert.equal(await prototype.$$eval('[role="tabpanel"]:not([hidden])', p => p.length), 1);
      assert((await prototype.$eval('#state', e => e.textContent)).includes('Icon tabs'));
      assert.equal(await prototype.evaluate(() => document.documentElement.scrollWidth - innerWidth), 0);
      await page.waitForFunction(() => {
        const f = document.querySelector('iframe.project-component-demo');
        return Math.abs(f.height - f.contentDocument.querySelector('main').getBoundingClientRect().height) < 4;
      });

      const trigger = await page.$('a[data-section-gallery]');
      assert(trigger);
      assert.equal(await trigger.evaluate(a => new URL(a.href).pathname), '/demo/shopify-custom-sections.jpg');
      await trigger.focus();
      await page.keyboard.press('Enter');
      await page.waitForSelector('dialog[data-section-gallery-dialog][open]');
      await page.waitForFunction(() => document.querySelector('dialog[data-section-gallery-dialog] img')?.naturalWidth === 1438);
      const opened = await page.$eval('dialog[data-section-gallery-dialog]', d => {
        const scroll = d.querySelector('[role="region"]');
        return {
          modal: d.matches(':modal'),
          named: document.getElementById(d.getAttribute('aria-labelledby'))?.textContent,
          focusInside: d.contains(document.activeElement),
          locked: getComputedStyle(document.body).overflow === 'hidden',
          verticalScroll: scroll.scrollHeight > scroll.clientHeight * 5,
          phonePan: scroll.scrollWidth > scroll.clientWidth,
          imageHeight: d.querySelector('img').naturalHeight,
        };
      });
      assert(opened.modal && opened.named && opened.focusInside && opened.locked && opened.verticalScroll);
      assert.equal(opened.imageHeight, 13804);
      assert.equal(await page.$eval('dialog[data-section-gallery-dialog] [role="region"]', e => e.scrollTop), 0);
      if (width < 960) assert(opened.phonePan);
      if (theme === 'dark' && width === 1200) {
        await page.setViewport({ width: 1800, height: 900 });
        const area = await page.$('dialog[data-section-gallery-dialog] [role="region"]');
        const bounds = await area.boundingBox();
        await page.mouse.move(bounds.x + 30, bounds.y + 30);
        await pause(700);
        const image = await page.$eval('dialog[data-section-gallery-dialog] img', i => ({
          width: i.getBoundingClientRect().width,
          transform: getComputedStyle(i).transform,
          hovered: i.matches(':hover'),
        }));
        assert(image.hovered);
        assert.equal(image.transform, 'none', 'The gallery must stay static on hover');
        assert(image.width <= 1438, 'The capture must never upscale beyond its native width');
        await page.setViewport({ width, height: 900 });
      }
      for (let i = 0; i < 4; i++) {
        await page.keyboard.press('Tab');
        // Native dialogs allow the browser chrome in the Tab cycle, but keep page controls inert.
        assert(await page.$eval('dialog[data-section-gallery-dialog]', d => d.contains(document.activeElement) || document.activeElement === document.body));
      }
      await trigger.focus();
      assert(await page.$eval('dialog[data-section-gallery-dialog]', d => d.contains(document.activeElement)));
      await page.$eval('dialog[data-section-gallery-dialog] [role="region"]', e => { e.scrollTop = e.scrollHeight; });
      assert(await page.$eval('dialog[data-section-gallery-dialog] [role="region"]', e => e.scrollTop > 1000));
      await page.keyboard.press('Escape');
      await page.waitForFunction(() => !document.querySelector('dialog[data-section-gallery-dialog]'));
      assert(await page.evaluate(() => document.activeElement?.matches('a[data-section-gallery]')));
      assert.notEqual(await page.evaluate(() => getComputedStyle(document.body).overflow), 'hidden');
      await trigger.click();
      await page.waitForSelector('dialog[data-section-gallery-dialog][open]');
      assert.equal(await page.$eval('dialog[data-section-gallery-dialog] [role="region"]', e => e.scrollTop), 0);
      await page.click('button[aria-label="Close section gallery"]');
      await page.waitForFunction(() => !document.querySelector('dialog[data-section-gallery-dialog]'));
      await trigger.click();
      await page.waitForSelector('dialog[data-section-gallery-dialog][open]');
      await page.mouse.click(2, 2);
      await page.waitForFunction(() => !document.querySelector('dialog[data-section-gallery-dialog]'));
      assert.deepEqual(errors, []);
      results.push({ theme, width, images: 8, gallery: 'keyboard, focus, scroll, close and reopen passed', prototype: 'layout, icons, keyboard, panels and responsive fit passed' });
      await page.close();
    }
  }
  const page = await browser.newPage();
  await page.setCacheEnabled(false);
  await page.setJavaScriptEnabled(false);
  await page.goto(`${base}/projects/shopify-migrations`, { waitUntil: 'domcontentloaded' });
  const fallback = await page.$eval('a[data-section-gallery]', a => a.href);
  const response = await page.goto(fallback);
  assert.equal(response.status(), 200);
  assert(response.headers()['content-type'].startsWith('image/jpeg'));
  await page.close();
  console.log(JSON.stringify({ layouts: results, noJavaScriptFallback: 'passed' }));
} finally {
  await browser.close();
}
