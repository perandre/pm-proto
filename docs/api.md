# API

## What the current backend actually is

The existing site is a **server-rendered PHP application**, not a REST API.
The initial page load is fully rendered server-side. Form submissions go to PHP
controller endpoints on the same server via jQuery AJAX. Those endpoints process
the request and return a JSON envelope — but the payload is mostly **blobs of
server-rendered HTML** that the old frontend splats directly into the DOM:

```json
{
  "page_content": "<div id='signup-container' data-step='2'>...entire page HTML...</div>",
  "page_script": "MobileSignupSinglePageUI",
  "scroll": true,
  "ga_event": { ... }
}
```

A few endpoints (discount code, QR code) return proper structured data.
The core order submission does not — it returns HTML.

## Ideal future state

What we actually want is a proper external REST API:

```
POST https://api.plussmobil.no/orders
Content-Type: application/json

{ "planVariantId": "...", "owner": { ... }, "subscription": { ... } }
→ { "orderId": "...", "status": "created", "esimQrUrl": "..." }
```

This would eliminate the proxy layer, `lib/serialize.ts`, and the fragile
success-detection logic entirely. If the backend team can expose a JSON API,
this is strongly preferred. The Next.js app is structured to make that migration
easy — only the proxy routes and serialization layer would change.

## Current workaround

Until a REST API exists, we proxy form submissions to the existing backend but
**ignore `page_content`** — we don't need server-rendered HTML because React
manages the UI. We only read the structured fields (`validation`, `ga_event`)
to determine success or failure.

This means we are reverse-engineering a non-API rather than consuming a designed
one. The risk: if the backend changes response structure, we may break silently.

The backend field format uses a `data[Model][field]` naming convention. The
framework behind it is unknown — inferred from field names, not confirmed.
This naming only appears in `lib/serialize.ts` and the proxy routes.

---

## Endpoints

### 1. Form Submit
```
POST /api/submit          (Next.js proxy)
Content-Type: application/json
```

React sends clean JSON. The proxy serializes to `application/x-www-form-urlencoded`
and POSTs to:
- Single: `https://bestilling.plussmobil.no/bestill-mobilabonnement/[plan-slug]/`
- Family: `https://bestilling.plussmobil.no/bestill-mobilabonnement-familie/`

**Success** — `page_content` is present but ignored. We detect success by the
*absence* of a `validation.valid = false` field and transition to the receipt state.
We do extract `ga_event` for analytics:
```json
{ "page_content": "...", "ga_event": { "event": "...", "ecommerce": { ... } } }
```

**Validation error** — show error to user:
```json
{
  "validation": {
    "valid": false,
    "title": "Valideringsfeil",
    "msg": "..."
  }
}
```

---

### 2. Apply Discount Code
```
POST /signup_single/apply_discount_code/    (single)
POST /signup_family/apply_discount_code/    (family — to be confirmed against live site)
Content-Type: application/x-www-form-urlencoded
```

Sends the full serialized form + `data[Request][base_url]`.

**Success response:**
```json
{
  "discountCode": "CODE123",
  "selectedVariantPrice": "149,- /mnd",
  "variants": [
    {
      "id": "202106101521451301",
      "codeValid": 1,
      "recurringPrice": "149,- /mnd"
    },
    ...
  ]
}
```

**Failure response:**
HTTP 4xx with body:
```json
{ "msg": "Ugyldig rabattkode" }
```

On success, store discounted prices in React state (no DOM attribute manipulation).
Update the plan selector display and order summary from that state.

---

### 3. ~~Order Summary~~ — not used
The original `/signup_single/mobile_summary/` endpoint returned server-rendered HTML
for the summary box. In our rebuild the summary is derived from React state, so
this endpoint is not called.

---

### 4. eSIM QR Code
```
POST /signup_single/mobile_qr_code/
Content-Type: application/x-www-form-urlencoded
```

Called when user clicks the QR code button on the receipt page (Step 5).

Request body:
```
data[Request][id] = <subscription id from data-id attribute>
```

Response contains the QR code data, rendered in a modal on the receipt screen.

---

## Next.js Proxy Routes

```
app/api/
├── submit/route.ts     → POST /bestill-mobilabonnement/[slug]/ (single)
│                         POST /bestill-mobilabonnement-familie/ (family)
├── discount/route.ts   → POST /signup_single/apply_discount_code/ (single)
│                         POST /signup_family/apply_discount_code/ (family, TBC)
└── qr-code/route.ts    → POST /signup_single/mobile_qr_code/
```

`summary` and `signup` (polling) routes are not needed.

**Note:** The family endpoints (`/signup_family/...`) need to be confirmed against the
live site. The single endpoints use `/signup_single/...` — the family flow may use
`/signup_family/...` or reuse the same endpoints. Verify before Phase 2 implementation.

### Proxy contract
- React client sends JSON
- Proxy serializes to `application/x-www-form-urlencoded` (backend field names live only here)
- Forward `Cookie` header for session continuity
- Return JSON response as-is
- Base URL: `https://bestilling.plussmobil.no`

```typescript
// lib/proxy.ts — shared helper
export async function proxyToBackend(path: string, data: URLSearchParams, req: Request) {
  return fetch(`https://bestilling.plussmobil.no${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cookie': req.headers.get('cookie') ?? '',
    },
    body: data.toString(),
  })
}
```
