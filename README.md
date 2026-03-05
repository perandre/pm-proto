# PlussMobil

Next.js app covering both the marketing site (`plussmobil.no`) and the order flow (`bestilling.plussmobil.no`). Currently in active development.

## Stack

- **Next.js 16** — App Router, TypeScript, Turbopack
- **Tailwind CSS v4** — custom theme via `@theme` in `globals.css`
- **Sanity.io** — CMS for plans, pages, articles, FAQ, and form texts
- No form libraries, no external state management

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

Requires a `.env.local` with:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=
```

## Routes

| Path | Description |
|------|-------------|
| `/` | Marketing homepage |
| `/bestill-mobilabonnement/[slug]/` | Individual plan order form |
| `/bestill-mobilabonnement-familie/` | Family plan order form |
| `/studio/` | Sanity Studio (embedded) |

## Project structure

```
app/                          Pages (App Router)
components/
  marketing/                  Homepage sections: Navigation, Hero, Plans, Benefits, …
  form/                       Order form sections: OwnerForm, SubscriberSection, SimSection, …
  plan/                       PlanCard, PlanSelector
  ui/                         Primitives: TextInput, InlineRadio, BorderedRadioCard, …
  Header.tsx / TabToggle.tsx
  OrderForm.tsx               Single plan orchestrator
  FamilyOrderForm.tsx         Family plan orchestrator
lib/
  products.ts                 Plan TypeScript types + constants (data lives in Sanity)
  dates.ts                    Port date business-day logic + Norwegian holiday blocking
  validation.ts               Client-side field validation
  sanity/
    client.ts                 Sanity read + write clients
    queries.ts                All GROQ queries
sanity/
  schemas/                    plan, faqItem, article, orderTexts, page, siteSettings
  schema.ts
sanity.config.ts              Studio config with structured navigation
types/
  order.ts                    Form state interfaces
  sanity.ts                   Sanity document types (OrderTexts, SiteSettings, …)
scripts/
  seed-plans.ts               One-off script to seed all plans from lib/products.ts
docs/                         Planning docs (architecture, API, design, form logic, models)
```

## Sanity content models

| Schema | Type | Purpose |
|--------|------|---------|
| `plan` | Document | Subscription plans — individual and family |
| `page` | Document | Marketing pages with composable section blocks |
| `article` | Document | Blog posts (PlussMagasinet) |
| `faqItem` | Document | FAQ entries |
| `siteSettings` | Singleton | Nav, footer, contact info, legal URLs |
| `orderTexts` | Singleton | All user-facing strings in the order form |

## Phases

**Phase 1 — current**
Marketing site + interactive order flow. Plans and form texts served from Sanity. Order submission is simulated (loading → receipt, no real API call).

**Phase 2 — planned**
Real backend integration via API proxy routes. GA4 / GTM events. On-demand Sanity revalidation via webhook.
