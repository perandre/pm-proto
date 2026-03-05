# PlussMobil — Claude context

## Stack
Next.js 16 (App Router, Turbopack), TypeScript, Tailwind CSS v4, Sanity.io

## Deployment
Vercel. Build env vars must be set in Vercel project settings:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=rynfsue0
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=<editor token>
```
Builds will fail with "Configuration must contain projectId" if these are missing.

## Sanity
- Project ID: `rynfsue0`, dataset: `production`
- Studio at `/studio`
- Schemas: `plan`, `faqItem`, `article`, `orderTexts`, `page`, `siteSettings`
- Plans seeded via `npx tsx scripts/seed-plans.ts`

## Key conventions
- Tailwind custom colors via `@theme` in `app/globals.css` (no tailwind.config.ts)
- `bg-navy`, `text-navy`, `bg-gold` etc. from `--color-navy: #1a2b4a`, `--color-gold: #f5c518`
- All Sanity queries in `lib/sanity/queries.ts`, 1h revalidate
- Form components accept optional `texts?: OrderTexts` prop with hardcoded Norwegian fallbacks
- `lib/products.ts` = TypeScript types only — plan data lives in Sanity
