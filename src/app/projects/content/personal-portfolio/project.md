---
title: "Personal Portfolio Site"
description: "A complete rebuild of my personal portfolio using the latest Next.js and React versions. Features a dark iridescent glassmorphism design with animated elements, markdown-powered content management, and a hybrid JSON/markdown system for optimal performance on Vercel's free tier."
contentTitle: ""
achievementTitle: ""
technologies: 
  - "React"
  - "Nextjs"
  - "Typescript" 
  - "Web Design"
category: "Template"
status: "Prod"
featured: false
publishDate: "2025-09-08"
links:
  github: "https://github.com/topwebworks/nextjs-brettsnyder"
  live: "/"
keyAchievements:
  - type: "impact"
    icon: "🚀"
    title: "Next.js 15 & React 19 Migration"
    description: "Successfully built with bleeding-edge frameworks released just weeks prior. Overcame service worker, cache, and Edge browser compatibility issues while maintaining modern development practices and performance standards."
    metrics:
      - "Next.js 15 and React 19 implementation within weeks of release"
      - "Custom utility classes replacing Tailwind due to compatibility issues"
      - "Glassmorphism design system with animated orb elements"
      - "Mobile-first responsive design with fluid scaling"
  - type: "technical"
    icon: "⚡"
    title: "Hybrid Content Management System"
    description: "Engineered a dual markdown/JSON content system that provides markdown editing convenience with JSON performance. Auto-generates content manifests locally while maintaining Vercel free tier compatibility."
    metrics:
      - "Automated script generates base project files and updates JSON from markdown"
      - "Content redundancy ensures backup and flexibility"
      - "Local manifest generation reduces API calls on Vercel"
      - "Rich HTML conversion from markdown in JSON for enhanced formatting"
media:
  items:


---


## Old Portfolio Site

[Old Portfolio Link](https://nextjs-brett-snyder.vercel.app/)

I ran this site for many years. Customized a Nextjs Tailwind UI template that has been solid. Minimal, dark mode, markdown content, and clean design. No complaints. It may have been all I needed. I was ready for a change.

## My Vision

Build from scratch, using the latest version of NextJs and React. Scary since they were just released, so bugs. Since I am the sole stakeholder on this project, lets push it. 

I thought about standalone icons or a standard icon set, but went with the clean Lucide set. I wanted a more fleshed out portfolio and a similar markdown blog as I had. Instead of the standard flat black and white modes, I wanted a glassmorphism look. Dark irradecent with some glass/transparent effects.

Overall, it needed more impact. The clean has a small avatar, but not enough impact for desktop. Yet I do not want to load into homepage with a large picture staring at me. My compromise is a hover load image. Homepage loads clean with some subtle animated orbs and clean text. 

Two large hero buttons and hide the rest of the main navigation into a side menu and footer. Portfolio and Contact. I also am going to run this on on Vercel's free Tier so I do not want any resume or commercial aspects showing. I will need to add a config to hide all commercial elements until ready for that upgrade.

Below, keep my old Latest blog and recent work timeline. Links to Github and Linkedin. I did like my old site flow, so will add an About and Tools page with more breakouts than before. Add a proper blog and projects listing page with thumbnails. And actually have Project case studies this time. My hope was to share the engine for blog and projects. 

Did not want to deal with form bots so for contact, is just be an email link as before.

## Look and Feel

For layout, I could have created a Figma, But I already knew I was building sections close to my old site, so jumped in with just the homepage, test out some concepts. I really like the dark iridescent look using my feathered orbs over the animated over the hero and some static in the background. That gave me the soft color shift I wanted. The hover portrait on desktop was a bit scary at first, but pushed opacity and a slower hover it was impactful.

The glass look was very intriguing to me, yet it could get busy real fast. I added a very slow floating background panel that accentuated the transparency. Overall the hover effects to soft and subtle. I initially went glassy buttons, but ended popping them a lot more. 

## The Build

1. **Homepage:** After my concept phase with working look and feel, I added nav and footer components to layout. Header is sticky glass. I liked the glass blur there but felt it too distracting over all the content panels, mainly used rgba. Added placeholder latest blog cards and fine-tuned the hover effects they will need to be pulled in dynamically later. Timeline added a splash of color, but mostly mapped static content. 

   Here I had to face my running latest version Next.js and React bugs. Service worker, cache, and Edge browser, and latest Tailwind had bugs galore. I almost gave in and went back to old stable. But I knew they will depreciate soon, so stuck with it, but had to remove Tailwind and created my own utilities classes. I admit, my framework versions were released a couple weeks ago, so was not surprised.

2. **About Page:** Since the homepage was done, I followed that approach, but did not want all the animated orbs on my background, so created a configurable background component depending on page it is used. Mostly went with one top left orb with motion, the rest static. Then replaced my Homepage background with that background component.

   I added a few stats and achievements. Better than the verbose About message I had before. Content more geared to conversions and takeaways. Added glass effects, maybe pushed too busy, but not as boring as before.

   This is also where I dialed in the light and dark mode styles. I tried to create several themes, but narrowed it down to two I liked best. I left some of the old test styles, in case I want to revisit. 

3. **Tools:** This was my Uses page. I did not want to limit it to just a long list, so I added a 4 tab tile approach. Pulled category icons from a massive array and gave myself plenty of room to grow. 

4. **Projects and Blogs:** This took trial and error to figure what worked with using the latest frameworks. The markdown approach used in my old site did not work here despite trying many different angles. Also sometimes we come up with something even better? My dilemma was I wanted the ease of adding markdown content for blogs and projects, yet missing that fast load I had in other json based sites like Shopify. How to combine that without killing my api resources for the free Vercel Tier?
  
   The solution ended being close to what I hoped for. Not everything, but close. For creating a project or blog add a specific folder like my-cool-project in the corresponding content folder. Then add some images in that specific folder. Run a script in npm to auto generate a base markdown file. See README file for more details. 

   After you run that generate script, you will have a based markdown folder and json file added to your new project folder. Then easily save content to the markdown file. Run the generate script again and the json file will be updated. I use this same generate script to generate any markdown files that have a timestamp later than the corresponding json file. Speedy data load from json and built in content backup in case Markdown file gets fubar.

   The concept was for all filepaths, latest blogs, and content be generated locally. The only bump in the road from perfection was Vercel needed all build files to fully static, and I use dynamic paths, etc. However, if I prebuild with timestamps, nothing is generated on Vercel, just checked. I did not like the results going full static so I let Vercel do the build. Doubled my build time. But still under free build limits. 

   Detail pages, use a semi-aware media gallery. Determines tall or wide format and adds no thumbnail bar if only one image. Inline image options that are external link aware. Feature tagged. Some title overrides if not empty.

   Also I used markdown to rich html in my json files. That gives my json files some html margins if I need them. Markdown can be a slow conversion, and json is too limiting for content. Plus with content redundancy, best of both worlds.

5. **Policy Pages:** Those are just no-frill content data pages. 

6. **Mobile:** Used the common small profile picture approach for mobile as text was too hard to read. Everything stacks, nothing new. Tried to use fluid responsive and clamp when I remembered. 

## Project Structure

```html
src/
├── app/                    # Next.js App Router pages
│   ├── about/              # About page
│   ├── blog/               # Blog listing & [slug] pages  
│   ├── projects/           # Project showcase & [slug] pages
│   └── tools/              # Tools/stack page
├── components/             # Reusable UI components
│   ├── layout/             # Header, Footer, Navigation
│   └── ui/                 # Button, LoadingSpinner, etc.
├── lib/                    # Core utilities
│   ├── generated/          # Auto-generated content manifests
│   ├── types/              # TypeScript definitions
│   ├── blogLoader.ts       # Blog content system
│   └── projectLoader.ts    # Project content system
└── styles/                 # CSS files
```

## New Project
1. Create folder: `src/app/projects/content/your-project/`
2. Add project web optimized images in root folder level
3. Run `npm run generate-project-data`
4. A `project.md` and `project.json` file will be created. Edit only md file.
5. After markdown file is edited, run `npm run generate-project-data`

## Results

The portfolio rebuild successfully achieved all technical and design objectives. The dark iridescent glassmorphism aesthetic creates visual impact while maintaining usability across devices. The hybrid content management system delivers the editing convenience of markdown with the performance benefits of JSON, making it sustainable on Vercel's free tier.

Key technical wins include successfully implementing Next.js 15 and React 19 within weeks of their release, creating a custom utility system when Tailwind compatibility failed, and developing an automated content generation workflow. The hover-activated portrait and animated orb system provides desktop impact without overwhelming mobile users.

The project demonstrates advanced React patterns, modern CSS techniques, and creative problem-solving for framework compatibility issues—establishing a scalable foundation for future portfolio expansion.


