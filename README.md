# PlussMobil — Order Flow (Prototype)

Next.js rebuild of the PlussMobil order flow (`bestilling.plussmobil.no`). Currently Phase 1: an interactive frontend demo with hardcoded data and no backend calls.

## Stack

- Next.js 16 (App Router, TypeScript)
- Tailwind CSS v4 (configured via `@theme` in `globals.css`)
- No form libraries, no external state management

## Routes

| Path | Description |
|------|-------------|
| `/bestill-mobilabonnement/[slug]/` | Individual plan order form |
| `/bestill-mobilabonnement-familie/` | Family plan order form |
| `/` | Redirects to default individual plan |

## Getting started

```bash
npm install
npm run dev
```

## Project structure

```
app/                        Pages (App Router)
components/
  ui/                       Primitives: TextInput, InlineRadio, BorderedRadioCard, …
  form/                     Form sections: OwnerForm, SubscriberSection, SimSection, …
  plan/                     PlanCard, PlanSelector
  Header.tsx
  TabToggle.tsx
  OrderForm.tsx             Single plan orchestrator
  FamilyOrderForm.tsx       Family plan orchestrator
lib/
  products.ts               All plan definitions (individual + family)
  dates.ts                  Port date business-day logic + Norwegian holiday blocking
  validation.ts             Client-side field validation
types/
  order.ts                  TypeScript interfaces for form state
docs/                       Planning docs (architecture, API, design, products, …)
```

## Phase roadmap

**Phase 1 (current):** Frontend demo — hardcoded plans, simulated submit, no API calls, no CMS.

**Phase 2 (planned):** Real backend integration via Next.js API proxy routes, Sanity.io CMS for editable plans and texts, Google Tag Manager / GA4 events.
