// Run against a running site: node scripts/check-design-system.js [base-url]
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const puppeteer = require('puppeteer');

const baseUrl = process.argv[2] || 'http://127.0.0.1:3000';
const screenshots = path.join(os.tmpdir(), 'portfolio-design-system-check');
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  const generated = JSON.parse(fs.readFileSync('src/app/projects/content/personal-portfolio/project.json', 'utf8'));
  assert.match(generated.content.overviewHtml, /<iframe class="project-component-demo"/);
  assert.match(generated.content.overviewHtml, /<video controls playsinline/);
  assert.doesNotMatch([generated.description, ...generated.technologies, generated.content.overviewHtml].join(' '), /figcraft/i);
  assert.equal(generated.content.media.items.length, 1, 'System boards should remain inline, outside the top gallery.');
  assert.ok(fs.statSync('public/demo/portfolio/button-motion.mp4').size > 1000);
  assert.doesNotMatch(fs.readFileSync('public/demo/portfolio/portfolio-tokens.css', 'utf8'), /--motion-[\w-]+:\s*"/);
  fs.mkdirSync(screenshots, {recursive:true});

  const browser = await puppeteer.launch({headless:true});
  try {
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.setViewport({width:1200,height:760});
    await page.goto(`${baseUrl}/demo/portfolio/components`, {waitUntil:'load'});
    await page.locator('::-p-aria(Decline)').click();
    assert.equal(await page.$('select'), null, 'Preview controls should use the site\'s button-based pattern.');
    const button = 'main section button';
    await page.evaluate(() => document.fonts.ready);
    const fontSession = await page.createCDPSession();
    await fontSession.send('DOM.enable');
    await fontSession.send('CSS.enable');
    const { root } = await fontSession.send('DOM.getDocument');
    const { nodeId } = await fontSession.send('DOM.querySelector', { nodeId: root.nodeId, selector: `${button} span` });
    const { fonts } = await fontSession.send('CSS.getPlatformFontsForNode', { nodeId });
    assert.ok(fonts.some(font => font.isCustomFont && font.familyName.startsWith('Inter')), 'Button labels should use the loaded Inter font.');
    await fontSession.detach();
    const expectStat = (label, value) => page.waitForFunction((label, value) => {
      const term = [...document.querySelectorAll('dl dt')].find(node => node.textContent === label);
      return term?.nextElementSibling?.textContent === value;
    }, {}, label, value);
    await page.click(button);
    assert.match(await page.$eval('[role="status"]', node => node.textContent), /Primary button activated/);

    await page.focus('input[type="checkbox"]');
    await page.keyboard.press('Tab');
    assert.equal(await page.$eval(button, node => node === document.activeElement), true);
    await page.waitForFunction(() => getComputedStyle(document.querySelector('main section button')).outlineWidth === '2px');
    assert.equal(await page.$eval(button, node => getComputedStyle(node).outlineWidth), '2px');
    await page.keyboard.press('Enter');

    await page.click('input[type="checkbox"]');
    assert.equal(await page.$$eval(button, nodes => nodes.every(node => node.disabled)), true);
    await expectStat('Hover lift', '0 px');
    await page.click('input[type="checkbox"]');
    await expectStat('Hover lift', '2 px');
    for (const [size,height] of [['small',32],['medium',44],['large',56]]) {
      await page.click(`button[data-size-option="${size}"]`);
      await page.waitForFunction(value => document.querySelector('main section button').getBoundingClientRect().height === value, {}, height);
      assert.equal(await page.$eval(button, node => node.getBoundingClientRect().height), height);
      await expectStat('Height', `${height} px`);
      await expectStat('Corner radius', '50 px');
    }
    await page.click('button[data-size-option="medium"]');
    await page.hover(button);
    await pause(300);
    assert.equal(await page.$eval(button, node => getComputedStyle(node).transform), 'matrix(1, 0, 0, 1, 0, -2)');
    await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);
    assert.equal(await page.$eval(button, node => getComputedStyle(node).transform), 'none');
    assert.equal(await page.$eval(button, node => getComputedStyle(node).transitionDuration), '0s');
    await expectStat('Transition', '0 ms');
    await expectStat('Hover lift', '0 px');
    await page.emulateMediaFeatures([]);
    await expectStat('Transition', '250 ms');
    await expectStat('Hover lift', '2 px');
    await page.mouse.move(0,0);

    for (const width of [1200,390,320]) {
      await page.setViewport({width,height:1180});
      for (const theme of ['dark','light']) {
        await page.click(`button[data-theme-option="${theme}"]`);
        await page.waitForFunction(value => document.documentElement.dataset.theme === value, {}, theme);
        await pause(300);
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true);
        await page.addStyleTag({content:'nextjs-portal { display: none !important; }'});
        await page.screenshot({path:path.join(screenshots,`buttons-${theme}-${width}.png`),fullPage:true});
      }
    }

    for (const width of [1200,390,320]) {
      await page.setViewport({width,height:900});
      for (const theme of ['dark','light']) {
        await page.evaluate(value => localStorage.setItem('theme', value), theme);
        await page.goto(`${baseUrl}/projects/personal-portfolio`,{waitUntil:'load'});
        const iframe = await page.waitForSelector('iframe.project-component-demo');
        await iframe.evaluate(node => node.scrollIntoView({block:'center',behavior:'instant'}));
        const frame = await page.waitForFrame(frame => frame.url() === `${baseUrl}/demo/portfolio/components`);
        await frame.waitForSelector('main section button');
        await page.waitForFunction(() => {
          const frame=document.querySelector('iframe.project-component-demo');
          const main=frame.contentDocument?.querySelector('main');
          return main && frame.clientHeight >= Math.ceil(main.getBoundingClientRect().height);
        });
        await page.waitForFunction(() => document.querySelector('header[class*="headerScrolled"]'));
        await page.waitForFunction(() => !document.querySelector('header').getAnimations().some(animation => animation.playState === 'running'));
        const headerGlass = await page.$eval('header', node => {
          const css = getComputedStyle(node);
          return { background: css.backgroundColor, blur: css.backdropFilter };
        });
        assert.equal(headerGlass.background, 'rgba(0, 0, 0, 0)', 'Preserve the transparent glass header.');
        assert.match(headerGlass.blur, /blur\(25px\)/);
        assert.equal(await frame.$('[aria-label="Cookie consent"]'), null);
        const innerHeight = await frame.evaluate(() => document.documentElement.scrollHeight);
        const outerHeight = await iframe.evaluate(node => node.clientHeight);
        assert.ok(innerHeight <= outerHeight + 1, `Demo overflows its frame at ${width}px: ${innerHeight} > ${outerHeight}`);
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true);
        const images = await page.$$eval('#article-body img', nodes => nodes.map(node => node.getAttribute('src')));
        assert.equal(images.length, 5);
        assert.equal(await page.$$eval('#article-body a[aria-label^="Open full-size image"]', nodes => nodes.length), 5);
        assert.equal(await page.$('#key-summary'), null, 'The case study should not repeat its content in a closing summary card.');
        await page.$$eval('#article-body img', nodes => nodes.forEach(node => { node.loading = 'eager'; }));
        await page.waitForFunction(() => [...document.querySelectorAll('#article-body img')].every(image => image.complete && image.naturalWidth > 0));
        await page.addStyleTag({content:'nextjs-portal { display: none !important; }'});
        await page.screenshot({path:path.join(screenshots,`article-${theme}-${width}.png`),fullPage:true});
        for (const section of ['foundations','try-the-component','patterns-across-the-site','content-and-implementation']) {
          await page.$eval(`#${section}`, node => {
            node.scrollIntoView({block:'start',behavior:'instant'});
            window.scrollBy({top:-100,behavior:'instant'});
          });
          await page.screenshot({path:path.join(screenshots,`${section}-${theme}-${width}.png`)});
        }
      }
    }

    await page.$eval('video', async video => { video.muted=true; await video.play(); });
    await page.waitForFunction(() => document.querySelector('video').currentTime > 0.1);
    assert.ok(await page.$eval('video', video => video.duration > 1 && video.videoWidth === 1200));
    await page.$eval('video', video => video.pause());
    for (const name of ['portfolio-tokens.json','portfolio-tokens.css','button-states.svg','portfolio-system-overview.pdf']) {
      const response = await page.goto(`${baseUrl}/demo/portfolio/${name}`);
      assert.equal(response.status(), 200, `${name} should be available.`);
    }

    await page.setViewport({width:390,height:900});
    await page.goto(`${baseUrl}/`,{waitUntil:'load'});
    await page.locator('button[aria-label="Toggle mobile menu"]').click();
    assert.equal(await page.$eval('button[aria-label="Toggle mobile menu"]', node => node.getAttribute('aria-expanded')), 'true');
    await page.locator('button[aria-label="Close menu"]').click();
    assert.equal(await page.$eval('button[aria-label="Toggle mobile menu"]', node => node.getAttribute('aria-expanded')), 'false');
    await page.goto(`${baseUrl}/tools`,{waitUntil:'load'});
    const categories='[aria-label="Tool categories"]';
    assert.equal(await page.$eval(categories, node => node.scrollWidth > node.clientWidth), true);
    await page.locator('button[aria-label="Scroll tool categories right"]').click();
    await page.waitForFunction(() => document.querySelector('[aria-label="Tool categories"]').scrollLeft > 0);
    await page.locator('::-p-aria(Productivity)').click();
    assert.equal(await page.$eval(`${categories} button[aria-pressed="true"]`, node => node.textContent.trim()), 'Productivity');
    await page.goto(`${baseUrl}/about`,{waitUntil:'load'});
    await page.locator('details summary').click();
    assert.equal(await page.$eval('details', node => node.open), true);
    await page.locator('details summary').click();
    assert.equal(await page.$eval('details', node => node.open), false);
    assert.deepEqual(errors, []);
    console.log(`PASS: generation, button controls, keyboard focus, disabled states, sizes, reduced motion, both themes, responsive embeds, video, downloads, mobile drawer, scrolling tabs, and FAQ. Screenshots: ${screenshots}`);
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode=1; });
