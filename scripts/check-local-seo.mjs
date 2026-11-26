import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

// Run explicitly against a local production preview. Never attach this to build or CI.
const base = new URL(process.argv.find(arg => /^https?:/.test(arg)) ?? 'http://127.0.0.1:3200');
assert(['localhost', '127.0.0.1', '[::1]'].includes(base.hostname), 'Development checks are local only');
const baseline = JSON.parse(await readFile(new URL('../docs/seo-baseline-2026-11-25.json', import.meta.url), 'utf8'));
const cities = ['queen-creek', 'gilbert', 'chandler', 'tempe', 'san-tan-valley', 'mesa', 'apache-junction'];
const decode = s => s.replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16))).replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n))).replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&lt;', '<').replaceAll('&gt;', '>');
const textOf = s => decode(s.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, '').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
const normalize = s => new URL(s).pathname.replace(/\/$/, '') || '/';
const routes = [...new Set([...baseline.pages.map(p => normalize(p.url)), ...cities.map(city => '/' + city)])];
const localLinks = new Set();
const cityDescriptions = new Set();
const cityQuestions = new Map();

for (const route of routes) {
  const response = await fetch(new URL(route, base));
  assert.equal(response.status, 200, `${route}: HTTP status`);
  const html = await response.text();
  const title = decode(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? '');
  const canonical = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/i)?.[1];
  assert(title && canonical, `${route}: title/canonical`);
  assert.equal(new URL(canonical).origin, baseline.origin, `${route}: canonical host`);
  assert.equal(normalize(canonical), route, `${route}: canonical path`);
  assert(!/noindex|nosnippet|max-snippet:\s*0\b/i.test(response.headers.get('x-robots-tag') ?? ''), `${route}: header crawl/snippet access`);
  const robots = html.match(/<meta[^>]*name="robots"[^>]*content="([^"]+)"/i)?.[1] ?? '';
  assert(!/noindex|nosnippet|max-snippet:\s*0\b/i.test(robots), `${route}: indexing/snippet eligibility`);
  assert.equal((html.match(/<h1[\s>]/gi) ?? []).length, 1, `${route}: main heading`);
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? '';
  const visible = textOf(main);
  const before = baseline.pages.find(page => normalize(page.url) === route);
  if (before) {
    assert.equal(title, before.title, `${route}: preserve existing title`);
    if (!['/', '/about'].includes(route))
      assert.equal(createHash('sha256').update(visible).digest('hex'), before.mainHash, `${route}: preserve existing project/blog/page content`);
  }
  const nodes = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)]
    .flatMap(match => { const schema = JSON.parse(match[1]); return schema['@graph'] ?? [schema]; });
  for (const faq of nodes.filter(node => node['@type'] === 'FAQPage')) {
    for (const question of faq.mainEntity) {
      assert(visible.includes(question.name), `${route}: visible FAQ question`);
      assert(visible.includes(textOf(question.acceptedAnswer.text)), `${route}: visible FAQ answer`);
    }
  }
  for (const city of cities) assert(html.includes(`href="/${city}"`), `${route}: footer discovery of ${city}`);
  if (cities.includes(route.slice(1))) {
    assert(title.includes('Web Design & Shopify'), `${route}: web design and Shopify intent in title`);
    const description = decode(html.match(/<meta[^>]*name="description"[^>]*content="([^"]+)"/i)?.[1] ?? '');
    assert(description && !cityDescriptions.has(description), `${route}: distinct buyer description`);
    cityDescriptions.add(description);
    assert(/small.business/i.test(visible), `${route}: small-business website offering`);
    const quote = main.match(/<blockquote\b[^>]*>([\s\S]*?)<\/blockquote>/i)?.[1] ?? '';
    const attribution = main.match(/<figcaption\b[^>]*>([\s\S]*?)<\/figcaption>/i)?.[1] ?? '';
    assert(textOf(quote).length > 20 && attribution.includes('href="https://www.linkedin.com/in/topwebworks"') && /\b20\d{2}\b/.test(textOf(attribution)), `${route}: visible sourced recommendation and date`);
    assert(/<h1[^>]*>[\s\S]*?, AZ<\/h1>/i.test(main), `${route}: state in main heading`);
    const questions = nodes.find(node => node['@type'] === 'FAQPage').mainEntity.map(question =>
      cities.reduce((text, city) => text.replaceAll(new RegExp(city.replaceAll('-', ' '), 'gi'), '[city]'), question.name));
    cityQuestions.set(route, questions);
    for (const phrase of ['Next.js', 'React', 'Shopify', 'SEO', 'AEO', 'GEO', '22 LinkedIn recommendations'])
      assert(visible.includes(phrase), `${route}: ${phrase}`);
    assert(!visible.includes('21 LinkedIn') && !/\$(997|197)/.test(visible), `${route}: portfolio positioning`);
    assert(html.includes('mailto:'), `${route}: direct contact`);
    const person = nodes.find(node => node['@type'] === 'Person');
    const service = nodes.find(node => node['@type'] === 'Service');
    assert.equal(nodes.find(node => node['@type'] === 'WebPage').name, title, `${route}: page/schema title agreement`);
    assert.equal(person.homeLocation.address.addressLocality, 'Queen Creek', `${route}: real base`);
    assert.equal(service.provider['@id'], person['@id'], `${route}: consistent person identity`);
    assert.equal(service.areaServed.name.toLowerCase().replaceAll(' ', '-'), route.slice(1), `${route}: served city`);
    assert(!service.address && !person.aggregateRating, `${route}: no fictional office or conflated ratings`);
    for (const link of main.matchAll(/href="(\/(?:projects|blog)\/[^"#?]+)"/g)) localLinks.add(link[1]);
  }
}
for (const [route, questions] of cityQuestions) {
  const otherQuestions = new Set([...cityQuestions].filter(([other]) => other !== route).flatMap(([, values]) => values));
  assert(questions.filter(question => !otherQuestions.has(question)).length >= 3, `${route}: useful distinct buyer questions`);
}
for (const route of localLinks) assert.equal((await fetch(new URL(route, base))).status, 200, `${route}: proof destination`);
const sitemap = await (await fetch(new URL('/sitemap.xml', base))).text();
for (const route of routes) assert(sitemap.includes(`${baseline.origin}${route === '/' ? '' : route}</loc>`) || (route === '/' && sitemap.includes(`${baseline.origin}/</loc>`)), `${route}: sitemap`);
const llms = await (await fetch(new URL('/llms.txt', base))).text();
assert(llms.includes('22 LinkedIn recommendations') && !llms.includes('21 LinkedIn'), 'LLM trust consistency');
for (const city of cities) assert(llms.includes(`${baseline.origin}/${city}`), `${city}: LLM discovery`);
const robots = await (await fetch(new URL('/robots.txt', base))).text();
assert(/User-Agent:\s*\*/i.test(robots) && /Allow:\s*\/\s*$/im.test(robots) && !/^Disallow:\s*\/\s*$/im.test(robots), 'Search and AI crawler access');
// Preserve the PDFs in Brett's Test build commit (8e2b6d3); retain the launch snapshot.
const approvedPdfs = {
  ...baseline.pdfs,
  'resume-brett-snyder.pdf': '0567c9bfdef33ec7152dc0992f19d3f724f6ef5b0dfe91e136eb5381be1f75ee',
  'cover-letter-brett-snyder.pdf': '018900327018b33f9a77ad950b924026ef8bf24a2eaa055f4b01858eb52e8de8',
};
for (const [file, expected] of Object.entries(approvedPdfs))
  assert.equal(createHash('sha256').update(await readFile(new URL(`../public/${file}`, import.meta.url))).digest('hex'), expected, `${file}: preserve approved PDF bytes`);
assert.equal((await fetch(new URL('/not-a-supported-city', base))).status, 404, 'Unsupported city route');
console.log(`SEO/AEO/GEO checks passed: ${routes.length} pages, original content/titles, seven cities, FAQs, proof, schema, sitemap, robots, llms.txt, and PDF preservation.`);

const footerOnly = process.argv.includes('--footer-only');
if (process.argv.includes('--browser') || footerOnly) {
  const { default: puppeteer } = await import('puppeteer');
  const browser = await puppeteer.launch({ headless: true });
  try {
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(new URL('/about', base).href, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('[aria-label="Cookie consent"]');
    await page.click('[aria-label="Cookie consent"] button');
    const output = path.join(process.env.TEMP ?? '/tmp', 'brett-seo-browser');
    await mkdir(output, { recursive: true });
    let checks = 0;
    if (!footerOnly) {
    for (const theme of ['dark', 'light']) {
      await page.evaluate(value => localStorage.setItem('theme', value), theme);
      for (const width of [1200, 390, 320]) {
        await page.setViewport({ width, height: 900, deviceScaleFactor: 1 });
        for (const city of cities) {
          await page.goto(new URL('/' + city, base).href, { waitUntil: 'domcontentloaded' });
          await page.evaluate(() => document.fonts.ready);
          await page.evaluate(async () => {
            await Promise.all([...document.querySelectorAll('main img')].map(image => {
              image.loading = 'eager';
              return image.decode().catch(() => {});
            }));
          });
          await new Promise(resolve => setTimeout(resolve, 1100));
          const metrics = await page.evaluate(() => ({
            theme: document.documentElement.dataset.theme,
            width: document.documentElement.scrollWidth,
            headingVisible: document.querySelector('h1').getBoundingClientRect().top < innerHeight,
            image: [...document.querySelectorAll('main img')].every(image => image.complete && image.naturalWidth > 0),
            cityLinks: document.querySelectorAll('nav[aria-label="East Valley web design and development"] a').length,
          }));
          assert.equal(metrics.theme, theme, `${city}/${width}: theme`);
          assert(metrics.width <= width + 1 && metrics.image && metrics.cityLinks === 7 && metrics.headingVisible, `${city}/${theme}/${width}: heading/layout/image/footer`);
          if (city === 'queen-creek' || city === 'apache-junction')
            await page.screenshot({ path: path.join(output, `${city}-${theme}-${width}.png`) });
          if (city === 'queen-creek' && width !== 320) {
            const proof = await page.$('#selected-work');
            assert(proof, 'Selected work section');
            await proof.screenshot({ path: path.join(output, `selected-work-${theme}-${width}.png`) });
          }
          checks++;
        }
      }
    }
    const question = await page.$('main details summary');
    await question.evaluate(element => element.scrollIntoView({ block: 'center', behavior: 'instant' }));
    await question.click();
    assert(await page.$eval('main details', element => element.open), 'FAQ interaction');
    await page.setViewport({ width: 390, height: 900, deviceScaleFactor: 1 });
    await page.goto(new URL('/queen-creek', base).href, { waitUntil: 'domcontentloaded' });
    await new Promise(resolve => setTimeout(resolve, 1300));
    const resume = (await page.evaluateHandle(() => [...document.querySelectorAll('main button')].find(button => button.textContent.includes('Download Resume')))).asElement();
    assert(resume, 'Resume action');
    await resume.evaluate(element => element.scrollIntoView({ block: 'center', behavior: 'instant' }));
    await resume.click();
    await page.waitForSelector('iframe[title="Resume"]');
    const frame = await (await page.$('iframe[title="Resume"]')).contentFrame();
    await frame.waitForSelector('h1');
    assert((await frame.$eval('h1', heading => heading.textContent)).toLowerCase().includes('brett'), 'Resume preview content');
    await page.screenshot({ path: path.join(output, 'resume-preview-mobile.png') });
    await page.click('button[aria-label="Close"]');
    await page.waitForSelector('iframe[title="Resume"]', { hidden: true });
    }
    const footer = await page.$('footer');
    await footer.screenshot({ path: path.join(output, 'city-footer-mobile.png') });
    for (const theme of ['dark', 'light']) {
      await page.evaluate(value => localStorage.setItem('theme', value), theme);
      await page.reload({ waitUntil: 'domcontentloaded' });
      await page.evaluate(() => document.fonts.ready);
      await new Promise(resolve => setTimeout(resolve, 1100));
      await page.$eval('footer', footer => footer.scrollIntoView({ block: 'end', behavior: 'instant' }));
      await new Promise(resolve => setTimeout(resolve, 2700));
      for (const width of [1574, 1200, 1024, 768, 390, 320]) {
        await page.setViewport({ width, height: 900, deviceScaleFactor: 1 });
        // Footer icons and tags transition their size for 300ms at responsive breakpoints.
        await new Promise(resolve => setTimeout(resolve, 350));
        const layout = await page.$eval('footer', footer => {
          const copyright = footer.querySelector('[class*="copyright"]').getBoundingClientRect();
          const icons = footer.querySelector('[class*="iconsContainer"]').getBoundingClientRect();
          const cityNav = footer.querySelector('nav[aria-label="East Valley web design and development"]');
          const builtWith = footer.querySelector('[class*="builtWith"]');
          const builtRect = builtWith.getBoundingClientRect();
          const bar = footer.querySelector('[class*="areaBar"]');
          const barRect = bar.getBoundingClientRect();
          const footerRect = footer.getBoundingClientRect();
          const mainRect = footer.querySelector('[class*="footerMain"]').getBoundingClientRect();
          return {
            width: document.documentElement.scrollWidth,
            bottomRow: copyright.right <= builtRect.left + 1 && Math.abs(copyright.top - builtRect.top) < 8 && builtRect.top >= icons.bottom,
            fullWidthBar: Math.abs(barRect.left - footerRect.left) < 1 && Math.abs(barRect.right - footerRect.right) < 1 && barRect.bottom <= mainRect.top + 1,
            citiesInBar: bar.contains(cityNav) && cityNav.textContent.includes('Local service areas') && !bar.contains(builtWith),
          };
        });
        assert(layout.width <= width + 1, `Footer/${theme}/${width}: no horizontal overflow`);
        assert(layout.fullWidthBar && layout.citiesInBar, `Footer/${theme}/${width}: labeled city links in full-width top bar`);
        if (width >= 1200) assert(layout.bottomRow, `Footer/${theme}/${width}: copyright bottom left, technologies bottom right`);
        await (await page.$('footer')).screenshot({ path: path.join(output, `footer-${theme}-${width}.png`) });
      }
    }
    if (!footerOnly) {
    for (const theme of ['dark', 'light']) {
      await page.evaluate(value => localStorage.setItem('theme', value), theme);
      for (const width of [1200, 320]) {
        await page.setViewport({ width, height: 900, deviceScaleFactor: 1 });
        await page.goto(new URL('/about', base).href, { waitUntil: 'domcontentloaded' });
        await page.evaluate(() => document.fonts.ready);
        await new Promise(resolve => setTimeout(resolve, 1100));
        const localFaq = await page.evaluateHandle(() => [...document.querySelectorAll('main details')]
          .find(details => details.querySelector('summary').textContent.includes('local website design')));
        assert(localFaq.asElement(), 'About local services question');
        await localFaq.evaluate(details => { details.open = true; });
        await new Promise(resolve => setTimeout(resolve, 350));
        await localFaq.evaluate(details => { details.scrollIntoView({ block: 'start', behavior: 'instant' }); scrollBy({ top: -100, behavior: 'instant' }); });
        assert(await localFaq.evaluate(details => {
          const top = details.querySelector('summary').getBoundingClientRect().top;
          return top >= 60 && top < innerHeight;
        }), 'About local question visible below header');
        assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `About/${theme}/${width}: local links fit`);
        assert.equal(await localFaq.evaluate(details => details.querySelectorAll('a[href^="/"]').length), 7, 'About contextual city links');
        await page.screenshot({ path: path.join(output, `about-local-${theme}-${width}.png`) });
      }
    }
    }
    assert.equal(errors.length, 0, `Browser errors: ${errors.join('; ')}`);
    console.log(footerOnly ? `Browser checks passed: 12 footer layouts. Screenshots: ${output}` : `Browser checks passed: ${checks} city/theme/viewport combinations; 12 footer layouts; About local links; FAQ and resume interaction. Screenshots: ${output}`);
  } finally { await browser.close(); }
}
