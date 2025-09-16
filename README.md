# RockitCode Portfolio Website

A modern, high-performance RockitCode portfolio built with Next.js 15, featuring a complete blog system, project showcase, and optimized for professional deployment with enhanced build reliability.

## 🛠️ Tech Stack

- **Framework**: Next.js 15.4.6 (App Router)
- **Language**: TypeScript 5
- **Styling**: CSS Modules + Custom CSS
- **Content**: Markdown with gray-matter
- **Icons**: Lucide React
- **Deployment**: Vercel (optimized)
- **Build Tools**: Node.js scripts for content generation

## 📁 Project Structure

```
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
└── styles/                 # Global CSS files
```

## 🚀 Quick Start

### Development Setup
```bash
# Install dependencies
npm install

# Generate content data (run after adding projects/blogs)
npm run generate-project-data

# Start development server
npm run dev

# Open http://localhost:3000
```

## 🔧 Resume Toggle (Free vs Pro Tier)

### For Vercel Free Tier (Hide Resume) - DEFAULT
Add to `.env.local`:
```bash
NEXT_PUBLIC_SHOW_RESUME=false
```

### For Vercel Pro Tier (Show Resume)
When ready to go commercial:
1. **Upgrade Vercel** to Pro tier
2. **Set environment variable**: `NEXT_PUBLIC_SHOW_RESUME=true`
3. **Resume links will automatically appear** in header, footer, and pages
4. **Change site messaging** to show you are open for business!
4. **Redeploy** your site

This toggle controls resume download buttons across the entire site while maintaining all functionality.

### Emergency Cache Clear
If you see old content that shouldn't exist:
1. **Press F12** to open browser dev tools
2. **Type:** `clearAllCacheNow()` in console
3. **Press Enter** - page will auto-refresh with fresh content

*This clears all browser caches, storage, and forces a clean reload.*

### Adding Content

#### New Project
1. Create folder: `src/app/projects/content/your-project/`
2. Add project web optimized images in root folder level
3. Run `npm run generate-project-data`
4. A `project.md` and `project.json` file will be created. Edit only md file.
5. After markdown file is edited, run `npm run generate-project-data`

#### New Blog Post
1. Create folder: `src/app/blog/content/your-blog-post/`
2. Add blog images to the blog folder
3. Run `npm run generate-project-data`
4. A `blog.md` and `blog.json` file will be created. Edit only md file.
5. After markdown file is edited, run `npm run generate-project-data`


## 🌐 Deployment

### Initial Setup (One Time)
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Add environment variables from your `.env.local`
5. Deploy

### Regular Updates
**Option 1 - VS Code:**
- Use Source Control panel (Ctrl+Shift+G)
- Stage changes → Commit → Push

**Option 2 - Terminal:**
```bash
git add .
git commit -m "Your message"
git push origin main
```

Vercel automatically builds and deploys on every push to main branch.

## 📈 Performance Features

### Build Optimizations
- **Pre-generation**: Content manifests created at build time
- **Static Images**: All images processed and optimized
- **Tree Shaking**: Unused code eliminated
- **Compression**: Gzip enabled
- **Vercel Edge Caching**: Optimized HTTP headers with stale-while-revalidate

### Runtime Optimizations
- **Image Optimization**: Next.js Image component with WebP/AVIF
- **Font Optimization**: Inter font with font-display: swap
- **Code Splitting**: Automatic chunk splitting by Next.js
- **Prefetching**: Link prefetching for faster navigation

## 🔧 Development Tools

### Cache Architecture
**Optimized Vercel Edge Caching**
- **Browser → Vercel CDN (126 POPs) → Origin** (Single optimized layer)
- **HTTP Cache-Control headers** with intelligent stale-while-revalidate
- **Image caching**: 1 hour cache + 24 hour stale
- **Static assets**: 1 hour cache optimized for Vercel Edge
- **Page content**: 5 minute cache + 1 hour stale for fresh content

### Cache Management (When seeing old/stale content)
```javascript
// Browser Console (F12) - DEVELOPMENT ONLY: 
clearAllCacheNow()  // Auto-clears and refreshes (local development only)
```

**Note:** This function is only available during local development (`npm run dev`). In production, Vercel Edge handles caching automatically.

### Development Commands
```bash
npm run generate-project-data  # After adding projects/blogs
npm run dev                    # Start development  
npm run build                  # Test build locally (optional)
```

## � Content Management

### Adding New Content
```bash
# 1. Create folder: src/app/projects/content/your-project/
# 2. Add images to project folder
# 3. Run: npm run generate-project-data
# 4. Edit the generated project.md file
# 5. Run: npm run generate-project-data again
```

Content is automatically discovered and deployed when you push to GitHub.

## 🎨 Customization

- **Colors**: Edit `src/styles/variables.css`
- **Content**: Edit page files in `src/app/`
- **Navigation**: Edit `src/components/layout/Navigation.tsx`

---

MIT License - Built for RockitCode portfolios and professional showcase.
