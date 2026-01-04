# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Package Manager

This project uses **pnpm** exclusively. A preinstall hook enforces this via `npx only-allow pnpm`.

## Development Commands

```bash
pnpm dev      # Start Next.js dev server at localhost:3000
pnpm build    # Build production bundle
pnpm start    # Start production server
pnpm lint     # Run ESLint
```

## Architecture Overview

### Blog Content System

This is a Next.js blog built with MDX for content. Blog posts are:

- Written as `.mdx` files in `/pages` directory (e.g., `pages/intro.mdx`, `pages/momentum-1.mdx`)
- Configured via metadata in `/data/Meta.ts` which maps URL slugs to post metadata (title, date, tags, series, etc.)
- Wrapped with the `Layout` component from `components/Layout.tsx` which provides:
  - Navigation
  - Front matter (title, date, author, reading time)
  - Clap interaction system
  - Bibliography references
  - Next/Previous post navigation

When adding a new blog post, you must:

1. Create the `.mdx` file in `/pages`
2. Add corresponding metadata entry in `/data/Meta.ts`
3. Include any images in `/public` directory

### Styling Architecture

The project uses **Stitches** (CSS-in-JS) configured in `Stitches.ts`:

- Theme tokens: colors, spacing (1-8), fontSizes (1-8), fonts (mono, bodySerif, headingSerif)
- Responsive breakpoints: `bp1` (640px), `bp2` (768px), `bp3` (1024px)
- Usage: `styled()` function to create components, `css()` for inline styles
- Design system colors: yellow (`rgb(241, 200, 146)`), salmon (`#ff8f8f`), background (`rgb(14, 24, 65)`)

Additionally uses `@emotion/css` for some component-specific styling (see `components/Layout.tsx`).

### Interactive Features

**Clap System** (`components/Clap.tsx` + `pages/api/claps.ts`):

- Post appreciation mechanism using Vercel KV store
- Animated clap button with fill animation based on clap count (max 10)
- Damage numbers float up on each clap with sound effects
- API endpoint at `/api/claps?postId=<id>` (GET to retrieve, POST to increment)

**Sound Effects** (`lib/Sounds.ts`):

- Uses `zzfx` library for procedural audio generation
- Sound atlas includes: powerup, blip effects
- Integrated with Clap component for tactile feedback

### State Management

- **Jotai** for atomic state (see `hooks/tags.ts`)
- **Zustand** available but not heavily used
- Tag filtering system for posts uses Jotai atoms

### 3D Graphics

Components in `components/` use React Three Fiber for 3D visualizations:

- `3D.tsx`, `AtomFlower.tsx`, `Atoms.tsx` - Three.js/R3F components
- Uses `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`
- `StarBackground.tsx` provides animated background

### Client-Only Rendering

Use `components/ClientOnly.tsx` wrapper for components that should only render on client (e.g., Clap component, 3D graphics) to avoid SSR hydration issues.

### Page Structure

- `pages/_app.tsx` - Global app wrapper with Framer Motion AnimatePresence
- `pages/_document.tsx` - Custom document for SSR
- `pages/index.tsx` - Homepage with latest posts and hero
- `pages/posts.tsx` - Archive page with tag filtering
- `pages/*.mdx` - Individual blog posts

### Hooks

- `hooks/tags.ts` - Tag filtering for posts (useFilteredPostsByTags, useLatestPosts, useTag)
- `hooks/useClap.ts` - Clap state management with SWR

### Configuration

- MDX enabled via `@next/mdx` in `next.config.js`
- TypeScript strict mode
- Page extensions: `.js`, `.jsx`, `.ts`, `.tsx`, `.md`, `.mdx`
