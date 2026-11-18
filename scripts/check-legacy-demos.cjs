const assert = require('node:assert/strict');
const puppeteer = require('puppeteer');

// Run against an existing site server: node scripts/check-legacy-demos.cjs [origin]
const origin = process.argv[2] || 'http://localhost:3001';

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const errors = [], posts = [];
  try {
    const page = await browser.newPage();
    page.on('pageerror', error => errors.push(error.message));
    await page.setRequestInterception(true);
    page.on('request', request => {
      if (request.method() === 'POST') {
        if (new URL(request.url()).origin === new URL(origin).origin) posts.push(request.url());
        request.abort();
      } else request.continue();
    });
    const paths = [
      '/demo/master-blocks/aop-master-lp-blocks.html',
      '/demo/master-blocks/example-aop-lp.html',
      '/demo/emails/master-email/index.html',
      '/demo/emails/sample1/index.html',
      '/demo/emails/sample2/index.html',
    ];
    for (const path of paths) {
      for (const width of [1200, 390, 320]) {
        await page.setViewport({ width, height: 900 });
        await page.goto(origin + path, { waitUntil: 'load' });
        await page.waitForFunction(() => [...document.images].every(i => i.complete && i.naturalWidth > 0));
        const state = await page.evaluate(() => ({
          standards: document.compatMode === 'CSS1Compat',
          overflow: document.documentElement.scrollWidth - innerWidth,
          duplicateIds: [...document.querySelectorAll('[id]')].filter((e, i, all) => all.findIndex(x => x.id === e.id) !== i).length,
          missingAlt: document.querySelectorAll('img:not([alt])').length,
        }));
        assert.equal(state.standards, true, path);
        assert.equal(state.overflow, 0, path + ' at ' + width);
        assert.equal(state.duplicateIds, 0, path);
        assert.equal(state.missingAlt, 0, path);
      }
      if (!path.includes('master-blocks')) {
        assert.equal(await page.$$eval('table:not([role="presentation"])', nodes => nodes.length), 0, path);
        continue;
      }
      await page.focus('#tab1');
      await page.keyboard.press('ArrowRight');
      assert(await page.$eval('#tab2', e => e.checked));
      assert.equal(await page.$$eval('.tab-content:not([inert])', nodes => nodes.length), 1);
      assert(await page.$eval('#subject-label-2 span', e => getComputedStyle(e).display !== 'none'));
      await page.click('#modalBtn');
      assert(await page.$eval('#myModal', e => e.open));
      await page.keyboard.press('Escape');
      await page.waitForFunction(() => !document.querySelector('#myModal').open && !document.querySelector('#myModal iframe').hasAttribute('src'));
      assert.equal(await page.evaluate(() => document.activeElement.id), 'modalBtn');
      for (const [id, value] of Object.entries({ fname: 'Archive', lname: 'Check', email: 'archive@example.invalid', phone: '0000000000' })) {
        await page.$eval('#' + id, (e, value) => { e.value = value; }, value);
      }
      await page.$eval('form', e => e.requestSubmit());
      assert.match(await page.$eval('.archive-form-note', e => e.textContent), /No information was sent/);
      await page.$eval('#btn1', e => window.scrollTo(0, scrollY + e.getBoundingClientRect().bottom + 100));
      await page.waitForFunction(() => !document.querySelector('#btn2').hidden);
    }
    await page.setJavaScriptEnabled(false);
    await page.goto(origin + paths[0], { waitUntil: 'load' });
    assert(await page.$eval('button[type=submit]', e => e.disabled));
    assert.deepEqual(posts, []);
    assert.deepEqual(errors, []);
    console.log('Passed: 15 layouts, images, semantics, keyboard selection, dialog focus, local-only form and no-script guard.');
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
