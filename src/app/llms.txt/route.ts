import { siteConfig } from '@/lib/config';
import { getAllProjects } from '@/lib/projectLoader';
import { getAllBlogs } from '@/lib/blogLoader';
import { siteDescription } from '@/lib/profile';

const siteUrl = siteConfig.url || 'https://www.brettsnyder.me';

// Built once at build time from the same content as the site, so it never drifts from the pages.
export const dynamic = 'force-static';

type Entry = { id: string; title: string; description: string; content?: { keyAchievements?: { metrics?: string[] }[] } };
// Each entry's summary-card metrics follow as nested bullets: the specific, quotable facts behind the page.
const links = (path: string, items: Entry[]) =>
  items
    .map((item) => {
      const facts = (item.content?.keyAchievements ?? []).flatMap((a) => a.metrics ?? []).map((m) => `\n  - ${m}`);
      return `- [${item.title}](${siteUrl}/${path}/${item.id}): ${item.description}${facts.join('')}`;
    })
    .join('\n');

// llms.txt (llmstxt.org): a plain Markdown map of the site for AI assistants and answer engines.
export async function GET() {
  const [projects, blogs] = await Promise.all([getAllProjects(), getAllBlogs()]);

  const about = [
    `- [About Brett Snyder](${siteUrl}/about): Background, career path, skills, and values.`,
    siteConfig.showResume &&
      `- [Resume (plain text)](${siteUrl}/resume-brett-snyder.txt): Roles, dates, and results from Brett's current resume.`,
    `- [Tools](${siteUrl}/tools): The software, hardware, and workflow tools Brett uses.`,
  ].filter(Boolean);

  // Each of these marks Brett with the same Person @id, so answer engines can tie them back here.
  const sites = [
    '- [Top Web Works](https://topwebworks.com): Website and marketing studio in Queen Creek, AZ, founded by Brett.',
    '- [CyWire](https://cywire.com): Master prompt marketplace and AI workflow platform, founded by Brett.',
    '- [PushPad](https://pushpad.com): Lesson pads and targeted practice for educators, founded by Brett.',
    '- [JesusChrist.art](https://www.jesuschrist.art): Free Christian artwork drawn and made by Brett.',
    '- [Inspiration Library](https://inspire.jesuschrist.art): Short Christian stories written and gathered by Brett.',
  ];

  const body = [
    '# Brett Snyder',
    `> ${siteDescription}`,
    `## About\n\n${about.join('\n')}`,
    `## Sites Brett runs\n\n${sites.join('\n')}`,
    `## Projects\n\n${links('projects', projects)}`,
    `## Blog\n\n${links('blog', blogs)}`,
  ].join('\n\n');

  return new Response(`${body}\n`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
