# Form Logic

The order is a single page. All fields are shown at once and submitted in one POST.
UI state (loading, receipt) is managed in React — no server-driven step machine.

## UI States

| State | Description |
|-------|-------------|
| `form` | The order form — all fields visible |
| `loading` | Spinner while POST is in flight |
| `receipt` | Confirmation screen, eSIM QR button if applicable |

These replace the old 5-step server-side flow. There is no polling loop.

---

## Form Fields

The backend field format (`data[Model][field]`) only appears in the serialization layer
(`lib/serialize.ts`). The rest of the app uses clean TypeScript types.

### Account Owner (shared across all order types)

| Field name | Type | Validation | Notes |
|-----------|------|-----------|-------|
| `data[Order][customer_name]` | text | required, max 120 | "Fullt navn" |
| `data[Order][customer_phone]` | tel | required, mobile_phone | Placeholder: "For kontakt og varsling" |
| `data[Order][customer_email]` | text | required, email | |
| `data[Order][customer_number]` | tel | required, personal_id | 11-digit Norwegian ID, format ddmmååxxxxx, autocomplete off |
| `data[Order][discount_code]` | text | optional | Collapsed by default, revealed via "Har du en rabattkode?" link |
| `data[Order][terms_agreement]` | checkbox | required (terms) | Must be checked to submit |
| `data[Order][order_step]` | hidden | — | Always "1" on initial submit |

### Per Subscription (N = 0 for single, 0..N for family)

| Field name | Type | Validation | Condition |
|-----------|------|-----------|-----------|
| `data[OrderSubscription][N][rate_plan_variant_id]` | radio | required | Always |
| `data[OrderSubscription][N][id]` | hidden | — | Always empty on new order |
| `data[OrderSubscription][N][copy_owner_data]` | radio | — | Single only (N=0): is subscriber = owner? |
| `data[OrderSubscription][N][owner_birthdate]` | tel | required;date | If copy_owner_data=0, or family N>0 |
| `data[OrderSubscription][N][owner_name]` | text | required | If copy_owner_data=0, or family N>0 |
| `data[OrderSubscription][N][porting]` | radio | — | 1=port existing, 0=new number |
| `data[OrderSubscription][N][phone_number]` | tel | required;mobile_phone | Only if porting=1 (visible) |
| `data[ProductOption][N][200603201022420137]` | radio | — | Directory listing: value=200603201022420137 (yes) or "" (no) |
| `data[OrderSubscription][N][sim_card_type]` | radio | — | 1=physical SIM, 2=eSIM |
| `data[OrderSubscription][N][port_date]` | tel | required;date | Transfer date (dd.mm.åååå) |

### Family-specific Fields

| Field name | Type | Notes |
|-----------|------|-------|
| `data[FamilyPackage][rate_plan_variant_id]` | radio | Family plan selection |
| `data[FamilyPackage][members_amount]` | hidden | Starts at 2, increments as members added |

Family members do NOT have `copy_owner_data`. Each member (N=0, 1, 2...) always shows
`owner_birthdate` and `owner_name` fields. N=0 is the account owner's subscription.

---

## Validation Rules

| Validator | Rule |
|-----------|------|
| `required` | Non-empty |
| `mobile_phone` | Norwegian mobile: starts with 4 or 9, 8 digits total |
| `personal_id` | Exactly 11 digits (format ddmmååxxxxx) |
| `date` | Format dd.mm.åååå |
| `email` | Standard email format |
| `terms` | Checkbox must be checked |

---

## Business Logic / Reactive Rules

### eSIM Availability
- eSIM is **enabled** when `porting = 1` (port existing number)
- eSIM is **disabled** when `porting = 0` (new number) — UNLESS `data-new-number-esim-limit > 0`
- When eSIM is disabled, force `sim_card_type = 1` (physical) if eSIM was selected

### SIM-dependent Transfer Date
When SIM type changes, update the date input's min/max/default accordingly.
Dates are computed client-side from `new Date()` using business-day offsets:

| SIM Type | Offset from today | Max |
|----------|--------------------|-----|
| Physical (1) | +8 business days | +75 business days |
| eSIM (2) | +2 business days | +75 business days |

The offsets are derived from the original site's rendered dates (observed 2026-03-05):
physical min = 17.03.2026 (+8 business days), eSIM min = 09.03.2026 (+2 business days).
Business days = skip weekends (Sat/Sun). Treat these as approximate —
confirm against live site when building. Implement in `lib/dates.ts` as a pure function
that takes `new Date()` and returns `{ min, max, default }` per SIM type.

### Transfer Date — Unavailable Dates (holidays)
```json
{
  "2026": {
    "4":  [1, 2, 3, 5, 6],
    "5":  [1, 14, 17, 24, 25],
    "12": [24, 25, 26, 31]
  }
}
```
Month keys are 1-indexed. These dates must be blocked in the date picker.

### Number Portability
- `porting = 1` → show "Mobilnummer som skal overføres" text input
- `porting = 0` → hide that input, no phone_number field submitted
- Setup fee display: 0 kr (port) vs 149 kr (new number) shown in the radio card label

### Subscriber ≠ Owner (single plan only)
- `copy_owner_data = 1` (default) → hide subscriber fields, submit nothing extra
- `copy_owner_data = 0` → show `owner_birthdate` + `owner_name` for the actual subscriber

### Directory Listing
- Shown for every subscription, default = "Ja" (opted in)
- Option ID: `200603201022420137`
- "Ja" value: `200603201022420137`; "Nei" value: `""`

### Discount Code
- Collapsed by default behind a "Har du en rabattkode?" toggle link
- On click "Bruk rabattkode" → POST to `/signup_single/apply_discount_code/` via proxy
- On success: store discounted prices in React state, update plan selector and summary
- On failure: show inline error below the input

### Order Summary Box
Derived entirely from React form state — no API call needed.
Updates live when any of the following change:
- Selected subscription plan (and discounted price if code applied)
- Subscriber name (owner_name or customer_name if copy_owner_data=1)
- Phone number to port
- Transfer date
- SIM card type

### Family Member Count
- Minimum 2 members at all times
- Members can be added (append new `[N]` subscription section)
- Members can be removed down to minimum 2
- `data[FamilyPackage][members_amount]` tracks the count
