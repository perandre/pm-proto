# Architecture

## Phase 1 — Demo

Interactive frontend only. No API calls, no CMS, no backend communication.
Simulates the full buying flow with hardcoded data and fake submission.

### Phase 1 stack — nothing beyond these three

| Layer | Choice |
|-------|--------|
| Framework | Next.js (App Router) + TypeScript |
| Styling | Tailwind CSS |
| State | React `useState` — no form library needed |

No React Hook Form. No Zod. No Sanity. No proxy routes. No serialization.
Family member list managed with plain `useState<Member[]>`.
"Submit" fakes a 1.5s loading state then shows a hardcoded receipt screen.

### Phase 1 project structure

```
plussmobil/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                              # Redirect → default plan
│   ├── bestill-mobilabonnement/
│   │   └── [slug]/
│   │       └── page.tsx                     # Single order page
│   └── bestill-mobilabonnement-familie/
│       └── page.tsx                          # Family order page
├── components/
│   ├── Header.tsx
│   ├── TabToggle.tsx
│   ├── PlanCard.tsx
│   ├── PlanSelector.tsx
│   ├── OwnerForm.tsx
│   ├── SubscriberSection.tsx
│   ├── FamilyMemberSection.tsx
│   ├── OrderSummary.tsx
│   ├── DiscountCode.tsx
│   ├── TermsCheckbox.tsx
│   ├── Receipt.tsx                           # Hardcoded confirmation screen
│   └── ui/
│       ├── TextInput.tsx
│       ├── InlineRadio.tsx
│       ├── BorderedRadioCard.tsx
│       ├── HelpTooltip.tsx
│       └── InfoBox.tsx
└── lib/
    ├── products.ts                           # Hardcoded plan data
    └── dates.ts                              # Date offset + unavailable dates
```

### Phase 1 form state

Plain `useState` objects — no library.

```typescript
// Single order — all in one useState
const [form, setForm] = useState<SingleOrderForm>({
  planVariantId: initialPlan.variantId,
  owner: { name: '', phone: '', email: '', personalId: '', termsAccepted: false },
  subscription: {
    subscriberIsOwner: true,
    portExistingNumber: true,
    directoryListing: true,
    simType: 'esim',
    portDate: defaultPortDate('esim'),
  }
})
```

Field updates via a simple helper to avoid repetition:
```typescript
const setSubscription = (patch: Partial<SubscriptionState>) =>
  setForm(f => ({ ...f, subscription: { ...f.subscription, ...patch } }))
```

Family members:
```typescript
const [members, setMembers] = useState<Member[]>([emptyMember(), emptyMember()])
const addMember = () => setMembers(m => [...m, emptyMember()])
const removeMember = (i: number) => setMembers(m => m.filter((_, idx) => idx !== i))
```

### Phase 1 UI states

```typescript
type UIState = 'form' | 'loading' | 'receipt'
const [uiState, setUIState] = useState<UIState>('form')

// On submit:
setUIState('loading')
setTimeout(() => setUIState('receipt'), 1500)
```

### Phase 1 implementation order

1. Scaffold — `npx create-next-app@latest` with TypeScript + Tailwind
2. `lib/products.ts` — hardcode all plans
3. `lib/dates.ts` — date offset logic, unavailable dates
4. `types/order.ts` — form state types
5. UI primitives — TextInput, InlineRadio, BorderedRadioCard, HelpTooltip, InfoBox
6. Header + TabToggle
7. PlanCard + PlanSelector — plan display and switching, `router.replace` on change
8. OwnerForm — owner fields, 2-col grid
9. SubscriberSection — copy-owner toggle, porting, directory listing, SIM type, date
10. Reactive rules — eSIM disabled for new number, date range switching on SIM change
11. OrderSummary — derived from state, no API
12. DiscountCode — collapsible, apply button does nothing in Phase 1 (or shows fake success)
13. TermsCheckbox + submit button
14. Loading + Receipt screens
15. Single order page — wire all sections
16. Family order page — member array, add/remove
17. Responsive pass — verify against design screenshots

---

## Phase 2 — Production

Adds backend integration, real validation, and Sanity CMS.

### Additional stack

| Layer | Choice | Reason |
|-------|--------|--------|
| Forms | React Hook Form | Cleaner validation integration, `useFieldArray` for family |
| Validation | Zod + `@hookform/resolvers` | Schema-based, Norwegian-specific rules |
| CMS | Sanity.io | Editable plans and texts (see [cms.md](./cms.md)) |

---

### Phase 2 project structure

Extends Phase 1 with:

```
├── app/
│   └── api/
│       ├── submit/route.ts           # Proxy → backend order endpoint
│       ├── discount/route.ts         # Proxy → discount code validation
│       └── qr-code/route.ts          # Proxy → eSIM QR code
├── lib/
│   ├── sanity/
│   │   ├── client.ts
│   │   ├── queries.ts
│   │   └── types.ts
│   ├── validation.ts                 # Zod schemas
│   ├── serialize.ts                  # Form state → backend field format
│   └── proxy.ts
└── sanity/
    ├── sanity.config.ts
    └── schemas/
        ├── plan.ts
        └── texts.ts
```

`lib/products.ts` is replaced by Sanity queries. Everything else carries over from Phase 1.

---

## Page Routes

| URL | Page | Notes |
|-----|------|-------|
| `/` | Redirect | → `/bestill-mobilabonnement/plussmobil-10gb-standard/` |
| `/bestill-mobilabonnement/[slug]/` | Single order | Slug pre-selects the plan |
| `/bestill-mobilabonnement-familie/` | Family order | Always starts with 2 members |

Paths match the original site exactly so external deep-links continue to work.
The slug is read once on mount to set the initial `planVariantId` in form state.
Navigating between plans (via "Endre abonnement?") updates the URL with
`router.replace` so the address bar stays accurate without a full page reload.

```
app/
├── bestill-mobilabonnement/
│   └── [slug]/
│       └── page.tsx     # reads params.slug → finds matching plan → passes as defaultValues
└── bestill-mobilabonnement-familie/
    └── page.tsx
```

Unknown slugs fall back to the default plan (1GB Standard) rather than 404.

---

### Phase 2 form state

React Hook Form replaces `useState`. Same types, better DX for validation and dirty state.

### Types (shared across both phases)
```typescript
type SingleOrderForm = {
  planVariantId: string
  owner: {
    name: string
    phone: string
    email: string
    personalId: string
    discountCode?: string
    termsAccepted: boolean
  }
  subscription: {
    subscriberIsOwner: boolean
    subscriberBirthdate?: string
    subscriberName?: string
    portExistingNumber: boolean
    existingNumber?: string
    directoryListing: boolean
    simType: 'physical' | 'esim'
    portDate: string            // dd.mm.åååå
  }
}
```

### Phase 2 family order
```typescript
type FamilyOrderForm = {
  planVariantId: string
  owner: {
    name: string
    phone: string
    email: string
    personalId: string
    discountCode?: string
    termsAccepted: boolean
  }
  members: Array<{             // useFieldArray, min length 2
    subscriberName: string
    subscriberBirthdate: string
    portExistingNumber: boolean
    existingNumber?: string
    directoryListing: boolean
    simType: 'physical' | 'esim'
    portDate: string
  }>
}
```

---

### Phase 2 serialization layer

`lib/serialize.ts` is the only place backend field names appear. It maps clean
form state to the `data[Model][field]` format the backend expects.

```typescript
// lib/serialize.ts
export function serializeSingleOrder(data: SingleOrderForm, planSlug: string): URLSearchParams {
  const p = new URLSearchParams()
  p.set('data[OrderSubscription][0][rate_plan_variant_id]', data.planVariantId)
  p.set('data[Order][customer_name]', data.owner.name)
  p.set('data[Order][customer_phone]', data.owner.phone)
  p.set('data[Order][customer_email]', data.owner.email)
  p.set('data[Order][customer_number]', data.owner.personalId)
  p.set('data[Order][terms_agreement]', '1')
  p.set('data[Order][order_step]', '1')
  p.set('data[OrderSubscription][0][copy_owner_data]', data.subscription.subscriberIsOwner ? '1' : '0')
  p.set('data[OrderSubscription][0][porting]', data.subscription.portExistingNumber ? '1' : '0')
  p.set('data[OrderSubscription][0][sim_card_type]', data.subscription.simType === 'esim' ? '2' : '1')
  p.set('data[OrderSubscription][0][port_date]', data.subscription.portDate)
  p.set('data[ProductOption][0][200603201022420137]', data.subscription.directoryListing ? '200603201022420137' : '')
  p.set('data[Request][base_url]', `/bestill-mobilabonnement/${planSlug}/`)
  // ... conditional fields
  return p
}
```

---

### Phase 2 validation (Zod)

```typescript
// lib/validation.ts
import { z } from 'zod'

export const mobilePhoneSchema = z
  .string()
  .regex(/^[49]\d{7}$/, 'Ugyldig mobilnummer')

export const personalIdSchema = z
  .string()
  .regex(/^\d{11}$/, 'Fødselsnummer må være 11 siffer')

export const dateSchema = z
  .string()
  .regex(/^\d{2}\.\d{2}\.\d{4}$/, 'Format: dd.mm.åååå')

export const emailSchema = z
  .string()
  .email('Ugyldig e-postadresse')
```

---

### Unavailable date logic (both phases)

```typescript
// lib/dates.ts
const UNAVAILABLE: Record<number, Record<number, number[]>> = {
  2026: {
    4:  [1, 2, 3, 5, 6],       // April (1-indexed month)
    5:  [1, 14, 17, 24, 25],   // May
    12: [24, 25, 26, 31],      // December
  }
}

export function isDateUnavailable(date: Date): boolean {
  const year = date.getFullYear()
  const month = date.getMonth() + 1  // convert to 1-indexed
  const day = date.getDate()
  return UNAVAILABLE[year]?.[month]?.includes(day) ?? false
}
```

Dates are computed purely client-side from `new Date()`. No server fetch needed.

---

### Phase 2 API proxy pattern

React sends JSON → proxy serializes → backend gets form-encoded data.

```typescript
// app/api/submit/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { serializeSingleOrder } from '@/lib/serialize'
import { proxyToBackend } from '@/lib/proxy'

export async function POST(req: NextRequest) {
  const { formData, planSlug } = await req.json()
  const params = serializeSingleOrder(formData, planSlug)

  const res = await proxyToBackend(`/bestill-mobilabonnement/${planSlug}/`, params, req)
  const json = await res.json()
  return NextResponse.json(json, { status: res.status })
}
```

---

### Phase 2 Google Tag Manager

GTM container ID: `GTM-KDNTLD2`

Push GA4 events to `window.dataLayer` after each successful step transition,
using the `ga_event` object returned by the backend:

```typescript
if (response.ga_event) {
  window.dataLayer?.push({ ecommerce: null })
  window.dataLayer?.push(response.ga_event)
}
```

---

### Phase 2 implementation order

Picks up after Phase 1 is validated:

1. Replace `lib/products.ts` with Sanity queries
2. Add `lib/validation.ts` (Zod) + swap `useState` forms for React Hook Form
3. Add `lib/serialize.ts` — map form state to backend field format
4. Add `lib/proxy.ts` + API proxy routes (`/api/submit`, `/api/discount`, `/api/qr-code`)
5. Wire real submit — loading → real receipt with order ID
6. Wire discount code — real API call, update prices in state
7. Wire eSIM QR code on receipt screen
8. Add Sanity Studio at `/studio`
9. GTM — push `ga_event` on successful order
