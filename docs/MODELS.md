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

## 4. `page` — Marketing page (document, multiple)

Replaces the old singleton. Every marketing page is one document — homepage, `/mobilabonnement`, `/kundeservice`, `/om-oss`, etc. Body is a composable array of section blocks so editors can build pages freely.

| Field | Type | Notes |
|-------|------|-------|
| `title` | string | Page title (also used for `<title>` unless `seo.title` is set) |
| `slug` | slug | URL path — `"/"` for homepage, `"mobilabonnement"` etc. |
| `seo.title` | string | Optional override for `<title>` |
| `seo.description` | string | Meta description |
| `seo.image` | image | OG image |
| `sections` | array of section blocks | Page body — see block types below |

### Section block types

Each block is a typed object inside the `sections` array. The frontend renders a matching component per `_type`.

| `_type` | Fields | Used on |
|---------|--------|---------|
| `heroSection` | `headline`, `highlightText` (gold), `subtext`, `ctaLabel`, `ctaHref`, `secondaryCtaLabel`, `secondaryCtaHref`, `badges[]` | Homepage, landing pages |
| `plansSection` | `heading`, `subheading`, `tabs[]` of `{ id, label }`, `showViewAll` | Homepage, `/mobilabonnement`, `/familie`, `/mobilt-bredband` |
| `benefitsSection` | `eyebrow`, `heading`, `subheading`, `items[]` of `{ icon, title, description, color }` | Homepage, `/plussfordeler` |
| `trustSection` | `stats[]` of `{ value, label, sub }`, `quote`, `quoteAuthor`, `badge` | Homepage |
| `stepsSection` | `heading`, `subheading`, `steps[]` of `{ title, description, icon }` | Homepage, landing pages |
| `faqSection` | `heading`, `subheading`, `items` → reference to `faqItem` docs, or inline | Homepage, `/kundeservice` |
| `richTextSection` | `heading`, `body` (Portable Text) | `/om-oss`, `/vilkar`, `/priser`, static pages |
| `contactFormSection` | `heading`, `subheading`, `fields[]` config | `/kontaktmeg`, `/bedrift` |
| `productGridSection` | `heading`, `subheading`, `products[]` → reference to `plan` docs, `columns` | `/mobilt-bredband` (routers) |
| `supportCategoriesSection` | `heading`, `categories[]` of `{ title, icon, href, description }` | `/kundeservice` |

This keeps layouts in code (each block type = one React component) while content is fully editable.

**GROQ:**
```groq
// Fetch page by slug
*[_type == "page" && slug.current == $slug][0]{ ..., sections[]{ ... } }

// Homepage
*[_type == "page" && slug.current == "/"][0]{ ..., sections[]{ ... } }
```

---

## 5. `article` — News / magazine article (document, multiple)

Used for PlussMagasinet blog posts at `/nyheter/[slug]`.

| Field | Type | Notes |
|-------|------|-------|
| `title` | string | Article headline |
| `slug` | slug | URL path under `/nyheter/` |
| `publishedAt` | datetime | Publish date |
| `excerpt` | text | Short summary for listing cards and meta description |
| `heroImage` | image | Featured image with alt text |
| `body` | block (Portable Text) | Rich text — headings, bold, links, images, embedded CTAs |
| `tags` | array of string | Optional tags for filtering |
| `active` | boolean | Show/hide |

**GROQ:**
```groq
// Listing (PlussMagasinet index)
*[_type == "article" && active == true] | order(publishedAt desc) {
  title, slug, publishedAt, excerpt, heroImage
}

// Single article
*[_type == "article" && slug.current == $slug][0]
```

---

## 6. `orderTexts` — Order form UI strings (singleton)

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
| `page` | Document (many) | Marketing team |
| `article` | Document (many) | Marketing team |
| `orderTexts` | Singleton | Marketing / dev |

## What stays in code (not Sanity)

- Section block components (one React component per `_type` — layout lives in code, content in CMS)
- Form field names and backend `variantId` serialization logic
- Validation rules (`lib/validation.ts`)
- Port date offset and holiday logic (`lib/dates.ts`)
- Routing and URL structure
