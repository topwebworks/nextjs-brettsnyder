# Media and Markdown Reference

This document covers the content and media behavior currently implemented by the portfolio. Project and Blog content use standard Markdown plus YAML frontmatter. The content generator converts the source files into JSON, rich HTML, static image imports, and TypeScript manifests used by the site.

## Content Locations

```text
src/app/projects/content/<project-slug>/project.md
src/app/blog/content/<post-slug>/blog.md
```

Keep related images in the same folder as the Markdown file.

## Generate Content

Run the generator after editing a project, Blog post, or related image:

```bash
npm run generate-project-data
```

Generated JSON and files under `src/lib/generated/` should not be edited directly.

## Supported Frontmatter

The generator currently reads these shared fields:

- `title`
- `description`
- `contentTitle`
- `achievementTitle`
- `technologies` or `tags`
- `category`
- `status`
- `featured`
- `publishDate`
- `links`
- `keyAchievements`
- `media.items`

Blog content can also use:

- `readTime`
- `author`
- `excerpt`

Project links currently rendered by the detail page are:

- `live`
- `demo`
- `github`

## Markdown Body

The Markdown body supports GitHub-flavored Markdown through `marked`, including:

- Headings
- Paragraphs and line breaks
- Ordered and unordered lists
- Links
- Blockquotes
- Inline code and fenced code blocks
- Standard Markdown images

External links open in a new browser tab. Generated headings receive IDs and the project's existing typography classes.

## Inline Images

Use standard Markdown image syntax:

```markdown
![Descriptive alternative text](dashboard-overview.jpg)
```

For local images, place the referenced file in the same project or Blog folder. Supported discovered image extensions are `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`, and `.svg`.

The alternative text is used by the rendered image and should describe the image's useful content. Do not use filenames or keyword lists as alternative text.

Resolved local article images link to their original full-size asset in a new tab, so detailed boards can be inspected without changing the Markdown syntax.

## Automatic Image Roles

The generator scans images in each content folder and assigns roles using the current filename rules:

1. A filename containing `hero` or `main` becomes the primary image.
2. If no explicit primary image exists, the first discovered image becomes the primary image.
3. A remaining filename containing `demo` or `gif` becomes the demo image.
4. Other discovered images become gallery screenshots.

Use clear filenames such as:

```text
hero.jpg
demo.gif
dashboard-overview.jpg
mobile-estimate-form.jpg
```

## Media Gallery

Add gallery entries through `media.items` in frontmatter.

### Image

```yaml
media:
  items:
    - type: "image"
      src: "dashboard-overview.jpg"
      title: "Dashboard overview"
```

### YouTube Video

```yaml
media:
  items:
    - type: "video"
      src: "https://www.youtube.com/watch?v=VIDEO_ID"
      title: "Feature walkthrough"
```

The gallery recognizes standard YouTube, `youtu.be`, embed, and Shorts URLs. The current video renderer expects a YouTube URL. Local video-file shortcodes are not implemented.

## Inline Recordings and Component Demos

The Markdown converter preserves ordinary HTML in the body. Native video and iframe elements survive generation into `content.overviewHtml` and render in article order.

Put recordings and posters under `public/demo/<project>/` and reference their public URLs:

```html
<video controls playsinline preload="none" poster="/demo/portfolio/button-motion-poster.webp" width="1200" height="700">
  <source src="/demo/portfolio/button-motion.mp4" type="video/mp4">
  <a href="/demo/portfolio/button-motion.mp4">Watch the interaction recording.</a>
</video>
```

For live components, create a same-site demo route that reuses the actual React components, then embed it:

```html
<iframe class="project-component-demo" src="/demo/portfolio/components" title="Portfolio button component playground" loading="lazy" height="700"></iframe>
```

The shared article styles make video responsive. Same-origin iframes with the `project-component-demo` class automatically follow their embedded `<main>` element's height, including size and viewport changes. Other frames retain their authored height. Include an ordinary link to open the demo separately. Native video controls retain user control over playback.

Place exported board images beside the source Markdown and use normal image syntax. Curate the top gallery with explicit `media.items` when those boards should appear only in the article. React behavior runs inside the demo route; JSX in the Markdown body is not mounted as React.

## Minimal Project Example

```markdown
---
title: "Project Name"
description: "A short, accurate description for project cards and metadata."
technologies:
  - "Next.js"
  - "TypeScript"
category: "Web Application"
status: "Production"
featured: true
publishDate: "2026-09-14"
links:
  live: "https://project.example"
keyAchievements:
  - type: "technical"
    title: "Clear achievement"
    description: "What was built and why it mattered."
    metrics:
      - "A supported result with enough context to explain it"
media:
  items:
    - type: "image"
      src: "dashboard-overview.jpg"
      title: "Dashboard overview"
---

## Overview

Explain the problem, your role, the solution, and the result.

![Dashboard showing the completed workflow](dashboard-overview.jpg)
```

## Create a Content Folder

The generator can create a starter Markdown file when a new project or Blog folder contains an image but no source file. A project can also be created from the command line:

```bash
npm run create-project -- project-name
```

Review generated starter content before publishing. Replace all example titles, links, technologies, and metrics with accurate project information.

## Not Implemented

The current content system does not provide custom Markdown shortcodes for:

- Embedded React components
- Charts or live analytics
- Live GitHub or deployment statistics
- Custom grid, card, timeline, or carousel layouts
- Animation and hover directives
- Copy, share, toggle, or expand actions
- Special insight, result, premium, or status blocks
- Custom local-video shortcodes (use native HTML video instead)

Use standard Markdown and the existing frontmatter fields unless the content engine is explicitly extended and tested in a future approved phase.
