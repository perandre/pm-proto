# Content Models — Sanity

Five model types cover everything in the app: subscription plans, marketing page, FAQ, site settings, and order form texts.

---

## 1. `plan` — Subscription plan (document, multiple)

The core business data. One document per plan.

| Field | Type | Notes |
|-------|------|-------|
| `name` | string | Display name, e.g. "PlussMobil 10GB Standard" |
| `slug` | slug | URL path segment — must match backend routing |
| `variantId` | string | **Backend ID** — never change without coordinating with backend |
| `gaItemId` | string | GA4 item ID for purchase events |
| `group` | `'individual' \| 'family'` | Controls which order form and tab the plan appears in |
| `price` | number | Monthly price in NOK |
| `highlightsHeader` | string | Bold tagline above feature list |
| `highlights` | string[] | Feature bullet points |
| `order` | number | Display order within group |
| `active` | boolean | Show/hide without deleting |
| `dataPrice` | number | Family only — shared data pool add-on price |
| `membershipPrice` | number | Family only — per-member fee |

**GROQ:**
```groq
*[_type == "plan" && group == "individual" && active == true] | order(order asc)
*[_type == "plan" && group == "family" && active == true] | order(order asc)
*[_type == "plan" && slug.current == $slug][0]
```

---

## 2. `faqItem` — FAQ entry (document, multiple)

Used in `FAQSection` on the marketing page.

| Field | Type | Notes |
|-------|------|-------|
| `question` | string | The question |
| `answer` | block (Portable Text) | Rich text answer — allows bold, links |
| `category` | string | Optional grouping, e.g. "Abonnement", "eSIM", "Familie" |
| `order` | number | Display order |
| `active` | boolean | Show/hide |

**GROQ:**
```groq
*[_type == "faqItem" && active == true] | order(order asc)
```

---

## 3. `siteSettings` — Global site settings (singleton)

One document, shared across marketing site and order flow.

| Field | Type | Notes |
|-------|------|-------|
| `siteName` | string | "PlussMobil" |
| `logo` | image | SVG or PNG logo |
| `contactPhone` | string | Shown in nav/footer |
| `contactEmail` | string | Support email |
| `termsUrl` | url | Link target in order form terms checkbox |
| `privacyUrl` | url | Link target in order form |
| `nav.links` | array of `{ label, href }` | Main navigation items |
| `footer.columns` | array of `{ heading, links[] }` | Footer link groups |
| `footer.legalText` | string | "© 2025 PlussMobil AS" etc. |
| `footer.socialLinks` | array of `{ platform, url }` | Facebook, Instagram, etc. |

**GROQ:**
```groq
*[_type == "siteSettings"][0]
```

---

## 4. `marketingPage` — Marketing landing page content (singleton)

Covers all editable content on `app/page.tsx`. Sections map 1:1 to components.

### 4a. Hero (`HeroSection`)
| Field | Type |
|-------|------|
| `hero.headline` | string |
| `hero.subheadline` | string |
| `hero.ctaLabel` | string |
| `hero.ctaHref` | string |
| `hero.image` | image (optional) |

### 4b. Benefits (`BenefitsSection`)
| Field | Type |
|-------|------|
| `benefits.heading` | string |
| `benefits.items` | array of `{ icon: string, title: string, description: string }` |

### 4c. Trust (`TrustSection`)
| Field | Type |
|-------|------|
| `trust.heading` | string |
| `trust.logos` | array of `{ name: string, image: image }` |
| `trust.stats` | array of `{ value: string, label: string }` |

### 4d. Switch / How it works (`SwitchSection`)
| Field | Type |
|-------|------|
| `switch.heading` | string |
| `switch.steps` | array of `{ number: number, title: string, description: string }` |
| `switch.ctaLabel` | string |
| `switch.ctaHref` | string |

**GROQ:**
```groq
*[_type == "marketingPage"][0]
```

---

## 5. `orderTexts` — Order form UI strings (singleton)

Keeps all user-facing form copy editable without a deploy.

| Field | Type | Used in |
|-------|------|---------|
| `ownerSectionHeader` | string | OwnerForm heading |
| `subscriberSectionHeader` | string | SubscriberSection heading |
| `portKeepLabel` | string | "Flytt eksisterende nummer" |
| `portKeepFee` | string | "Etablering kr 0,-" |
| `portNewLabel` | string | "Nytt nummer" |
| `portNewFee` | string | "Etablering kr 149,-" |
| `simPhysicalLabel` | string | "Vanlig SIM i posten" |
| `simEsimLabel` | string | "eSIM" |
| `esimTooltip` | string | eSIM help tooltip text |
| `esimDisabledNote` | string | Note shown when eSIM is disabled |
| `directoryListingLabel` | string | "Oppføring i opplysningstjenester (kr 0,-)" |
| `directoryListingInfo` | string | InfoBox explanation text |
| `termsPrefix` | string | "Jeg godtar" |
| `termsLinkLabel` | string | "vilkår" |
| `privacyLinkLabel` | string | "personvernerklæring" |
| `submitLabel` | string | "Send bestilling →" |
| `discountToggleLabel` | string | "Har du en rabattkode?" |
| `loadingText` | string | "Sender bestilling…" |
| `receiptHeading` | string | "Bestilling mottatt!" |
| `receiptBody` | string | Confirmation message template |
| `esimQrHeading` | string | "Din eSIM QR-kode" |
| `esimQrInstruction` | string | QR code scan instruction |

**GROQ:**
```groq
*[_type == "orderTexts"][0]
```

---

## Summary

| Model | Type | Managed by |
|-------|------|-----------|
| `plan` | Document (many) | Marketing / product team |
| `faqItem` | Document (many) | Marketing team |
| `siteSettings` | Singleton | Dev / marketing |
| `marketingPage` | Singleton | Marketing team |
| `orderTexts` | Singleton | Marketing / dev |

## What stays in code (not Sanity)

- Form field names and backend `variantId` serialization logic
- Validation rules (`lib/validation.ts`)
- Port date offset and holiday logic (`lib/dates.ts`)
- Routing and URL structure
- Component layout and design
