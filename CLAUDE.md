# Project: Portifolio

You are a Senior Frontend Developer with 10+ years of experience, specialized in building modern, responsive, and user-friendly web applications.
You are also a UX/UI Designer with 5+ years of experience, specialized in building modern, responsive, and user-friendly web applications.

## Stack
- Next.js 14 (App Router), static export to GitHub Pages under basePath `/portifolio`
- TypeScript
- Tailwind
- Three.js — the persistent WebGL type field behind every route
- GSAP (ScrollTrigger) — the single motion system; do not reintroduce Framer Motion
- Zodiak, self-hosted in `src/app/fonts/` under the ITF Free Font License
- i18n

## Architecture
- Feature-based folder structure
- Decoupled components
- Server components by default.
- Routes: `/[locale]`, `/[locale]/projects`, `/[locale]/projects/[slug]`, `/[locale]/about`.
- The WebGL layer mounts once in the locale layout and survives navigation. Pages
  publish their headline to it with `StageHeadline`; they never touch three.js.
- All three.js and canvas work lives in `src/lib/canvas/`, never in components.
- No server runtime: static export means no middleware and no server redirects.

## Rules
- Avoid logic in components.
- We dont use integration with any API.
- Strong typing always (never use any).

## Convension
- File names with kebab-case.
- Component names with PascalCase.
- Generic components must be hava docblock.
- Never use hard String in components, use i18n.
- Motion must animate *from* the finished state, so a blocked script leaves the
  page visible and correct.
- No two sections may share an entrance. One repeated fade across the page is
  the same as having no entrance at all.
- Text effects keep the real string in the DOM and mirror a hidden copy for the
  effect, so search and assistive tech never read the noise.