# CMS — Sanity.io

All subscription plan data and editable UI texts are managed in Sanity Studio.
This lets the business update prices, add plans, or change copy without a code deploy.

Sanity Studio is embedded in the Next.js app at `/studio` via `next-sanity`.

---

## What lives in Sanity

### Plans
Everything currently hardcoded in `lib/products.ts`:
- Plan name, price, slug
- Backend variant ID (used for serialization — must match the backend exactly)
- GA4 item ID
- Feature highlights header and list
- Plan group (individual / family)
- Family-specific: `data-price`, `data-membership-price`
- Active / inactive flag (to show/hide a plan without deleting it)

### Texts
All user-facing strings that may need updating without a deploy:
- Section headers ("Hvem skal være eier av abonnementet?", etc.)
- Radio card labels and descriptions ("Behold nåværende nummer", "Etablering kr 0,-", etc.)
- Help tooltip content (eSIM device compatibility list)
- Directory listing description
- Terms checkbox text (including link URLs)
- Submit button label
- Error messages

### What does NOT live in Sanity
- Form field names / backend variant IDs as logic — these stay in code
- Validation rules — these stay in `lib/validation.ts`
- Date offset logic — stays in `lib/dates.ts`
- Layout and design — stays in components

---

## Schema design

### `plan` document
```typescript
// sanity/schemas/plan.ts
{
  name: 'plan',
  title: 'Subscription Plan',
  type: 'document',
  fields: [
    { name: 'name',            type: 'string',  title: 'Plan name' },
    { name: 'slug',            type: 'slug',    title: 'URL slug', options: { source: 'name' } },
    { name: 'variantId',       type: 'string',  title: 'Backend variant ID' },
    { name: 'gaItemId',        type: 'string',  title: 'GA4 item ID' },
    { name: 'price',           type: 'number',  title: 'Price (kr/mnd)' },
    { name: 'group',           type: 'string',  title: 'Group', options: { list: ['individual', 'family'] } },
    { name: 'highlightsHeader',type: 'string',  title: 'Highlights header' },
    { name: 'highlights',      type: 'array',   title: 'Feature list', of: [{ type: 'string' }] },
    { name: 'order',           type: 'number',  title: 'Display order' },
    { name: 'active',          type: 'boolean', title: 'Active', initialValue: true },
    // Family-only
    { name: 'dataPrice',       type: 'number',  title: 'data-price (family)' },
    { name: 'membershipPrice', type: 'number',  title: 'data-membership-price (family)' },
  ]
}
```

### `texts` singleton
```typescript
// sanity/schemas/texts.ts
{
  name: 'texts',
  title: 'UI Texts',
  type: 'document',
  __experimental_actions: ['update', 'publish'],  // singleton — no create/delete
  fields: [
    { name: 'ownerSectionHeader',       type: 'string' },
    { name: 'subscriberSectionHeader',  type: 'string' },
    { name: 'portingKeepLabel',         type: 'string' },
    { name: 'portingKeepDescription',   type: 'string' },
    { name: 'portingNewLabel',          type: 'string' },
    { name: 'portingNewDescription',    type: 'string' },
    { name: 'simPhysicalLabel',         type: 'string' },
    { name: 'simEsimLabel',             type: 'string' },
    { name: 'esimTooltip',             type: 'array', of: [{ type: 'block' }] },  // rich text
    { name: 'directoryListingHeader',   type: 'string' },
    { name: 'directoryListingInfo',     type: 'string' },
    { name: 'termsText',               type: 'array', of: [{ type: 'block' }] },  // rich text with links
    { name: 'submitButtonLabel',        type: 'string' },
    // ... extend as needed
  ]
}
```

---

## Data fetching

Plans and texts are fetched server-side in the Next.js page components using GROQ.
Since they rarely change, they are cached aggressively.

```typescript
// lib/sanity/queries.ts
import { client } from './client'

export const getIndividualPlans = () =>
  client.fetch(`*[_type == "plan" && group == "individual" && active == true] | order(order asc)`)

export const getFamilyPlans = () =>
  client.fetch(`*[_type == "plan" && group == "family" && active == true] | order(order asc)`)

export const getPlanBySlug = (slug: string) =>
  client.fetch(`*[_type == "plan" && slug.current == $slug][0]`, { slug })

export const getTexts = () =>
  client.fetch(`*[_type == "texts"][0]`)
```

```typescript
// app/bestill-mobilabonnement/[slug]/page.tsx (Server Component)
import { getIndividualPlans, getPlanBySlug, getTexts } from '@/lib/sanity/queries'

export default async function OrderPage({ params }: { params: { slug: string } }) {
  const [plans, activePlan, texts] = await Promise.all([
    getIndividualPlans(),
    getPlanBySlug(params.slug),
    getTexts(),
  ])

  return <OrderForm plans={plans} activePlan={activePlan ?? plans[0]} texts={texts} />
}
```

---

## Caching strategy

Plan data and texts are editorial content — they may change but not frequently.
Use Next.js `fetch` cache with revalidation:

```typescript
// lib/sanity/client.ts
import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})
```

Use `revalidate` in page segments or on-demand revalidation via a Sanity webhook
hitting `/api/revalidate` when content is published.

---

## Studio access

Sanity Studio is embedded at `/studio` (App Router route via `next-sanity`).
Access is restricted to authenticated Sanity users — no additional auth needed.

```
app/
└── studio/
    └── [[...tool]]/
        └── page.tsx    # <NextStudio config={config} />
```

---

## Environment variables

```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=              # server-only, for write access if needed
```
