# PlussMobil — Claude context

## Stack
Next.js 16 (App Router, Turbopack), TypeScript, Tailwind CSS v4, Sanity.io

## Deployment
Vercel. Build env vars must be set in Vercel project settings:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=rynfsue0
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=<editor token>
SANITY_API_READ_TOKEN=<viewer token — used by defineLive>
```
Builds will fail with "Configuration must contain projectId" if these are missing.

## Sanity
- Project ID: `rynfsue0`, dataset: `production`
- Studio at `/studio`
- Schemas: `plan`, `faqItem`, `article`, `orderTexts`, `page`, `siteSettings`
- Plans seeded via `npx tsx scripts/seed-plans.ts`

## Agent skills (reference docs)
When working with Sanity, content modeling, or SEO, consult these:
- `.agents/skills/sanity-best-practices/` — Sanity patterns, schemas, GROQ, Next.js integration, studio structure
- `.agents/skills/content-modeling-best-practices/` — content reuse, references, taxonomy
- `.agents/skills/content-experimentation-best-practices/` — A/B testing, experiment design
- `.agents/skills/seo-aeo-best-practices/` — structured data, technical SEO, E-E-A-T

## Key conventions
- Tailwind custom colors via `@theme` in `app/globals.css` (no tailwind.config.ts)
- `bg-navy`, `text-navy`, `bg-gold` etc. from `--color-navy: #1a2b4a`, `--color-gold: #f5c518`
- All Sanity queries in `lib/sanity/queries.ts`, 1h revalidate
- Form components accept optional `texts?: OrderTexts` prop with hardcoded Norwegian fallbacks
- `lib/products.ts` = TypeScript types only — plan data lives in Sanity
