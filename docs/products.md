# Products

All subscription plans are hardcoded in the HTML (not fetched from an API).
They must be hardcoded identically in `lib/products.ts`.

---

## Individual Plans (For én)

URL: `/bestill-mobilabonnement/[plan-slug]/`

| Name | Price | Variant ID | Slug |
|------|-------|-----------|------|
| PlussMobil 0GB Fri Tale | 99 kr/mnd | 202504250939078501 | plussmobil-0gb-fri-tale |
| PlussMobil 1GB Standard | 119 kr/mnd | 202106101521451301 | plussmobil-1gb-standard |
| PlussMobil 10GB Standard | 198 kr/mnd | 202106101521451305 | plussmobil-10gb-standard |
| PlussMobil 15GB Standard | 248 kr/mnd | 202106101521451304 | plussmobil-15gb-standard |
| PlussMobil 30GB Standard | 298 kr/mnd | 202108051409115987 | plussmobil-30gb-standard |
| PlussMobil Fri Data Start | 298 kr/mnd | 202502111055144903 | plussmobil-fri-data-start |
| PlussMobil Fri Data Smart | 348 kr/mnd | 202502111055205720 | plussmobil-fri-data-smart |
| PlussMobil Fri Data Standard | 398 kr/mnd | 202108041536494096 | plussmobil-fri-data-standard |
| PlussMobil Fri Data Maks | 499 kr/mnd | 202111091314000395 | plussmobil-fri-data-maks |

### Feature Highlights per Plan

**1GB, 10GB, 15GB, 30GB Standard:**
- Header: "Enkelt og billig!"
- Features: Telenor-dekning · Ingen binding · Fri tale/SMS/MMS · Bruk i EU ink. · Uten Rollover · Datakontroll

**Fri Data Standard** (398 kr):
- Header: "Du får 150 Mbit/s hastighet opptil 100GB."
- Features: Telenor-dekning · Ingen binding · Fri tale/SMS/MMS · 50 GB i EU/EØS · Uten Rollover · Datakontroll

**Fri Data Maks** (499 kr):
- Header: "Fri Data med full hastighet 1000Mbit/s, opptil 100GB."
- Features: Telenor-dekning · Ubegrenset data · Fri fart · 62 GB i EU/EØS · Ingen binding · WiFi tale

**Fri Data Start** (298 kr):
- Header: "Fri Data med hastighet 10Mbit/s opp til 100GB."
- Features: Telenor-dekning · Ubegrenset data · Fri tale/SMS/MMS · 40 GB i EU/EØS · Ingen binding · WiFi tale

**Fri Data Smart** (348 kr):
- Header: "Fri Data med hastighet 20Mbit/s opp til 100GB."
- Features: Telenor-dekning · Ubegrenset data · Fri tale/SMS/MMS · 45 GB i EU/EØS · Ingen binding · WiFi tale

**0GB Fri Tale** (99 kr):
- Header: "Enkelt og billig!"
- Features: Telenor-dekning · Ingen binding · Betal for bruk · 0,99 per MB · Fri tale

### GA4 Item IDs (for dataLayer events)
```
PLUSSMOBIL_0GB_VOICE
PLUSSMOBIL_1GB_STD
PLUSSMOBIL_10GB_STD
PLUSSMOBIL_15GB_STD
PLUSSMOBIL_30GB_STD
PLUSSMOBIL_FRI_START
PLUSSMOBIL_FRI_SMART
PLUSSMOBIL_FRI_STD
PLUSSMOBIL_100GB       ← Fri Data Maks (note: item_id is 100GB not MAKS)
```

---

## Family Plans (For familie)

URL: `/bestill-mobilabonnement-familie/`

The family plan uses a separate field name: `data[FamilyPackage][rate_plan_variant_id]`
(not `data[OrderSubscription][N][rate_plan_variant_id]`)

| Name | Price | Variant ID | data-price | data-membership-price |
|------|-------|-----------|------------|----------------------|
| Familiepakke 2GB | 218 kr/mnd | 202404260819320338 | 0 | 109 |
| Familiepakke 5GB | 318 kr/mnd | 202404260819350714 | 100 | 109 |
| Familiepakke 10GB | 418 kr/mnd | 202404260819381058 | 200 | 109 |
| Familiepakke 25GB | 518 kr/mnd | 202404260819411234 | 300 | 109 |
| Familiepakke 50GB | 668 kr/mnd | 202404260819441643 | 450 | 109 |
| Familiepakke 80GB | 768 kr/mnd | 202404260820482239 | 550 | 109 |

The default selected plan is **Familiepakke 5GB** (checked in original HTML).

### Family Feature Highlights (all plans identical)
- Header: "Enkelt og billig!"
- Features: Telenor-dekning · Ingen binding · Fri tale/SMS/MMS · Bruk i EU ink. · Data Rollover · Del data

### GA4 Item IDs
```
FAMILY_PGK_2GB
FAMILY_PGK_5GB
FAMILY_PGK_10GB
FAMILY_PGK_25GB
FAMILY_PGK_50GB
FAMILY_PGK_80GB
```

---

## Plan Selector Behavior

- The currently active plan is shown in the card header (name + price + highlights).
- A hidden list of all plans is toggled visible when user clicks "Endre abonnement?".
- Selecting a different plan collapses the list and updates the header.
- The form action URL changes to match the selected plan slug (relevant for proxying).
- The Order Summary box at the bottom updates instantly when the plan changes.
