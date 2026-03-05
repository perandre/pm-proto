export type SimType = 'physical' | 'esim'

export interface Plan {
  variantId: string
  name: string
  slug: string
  price: number
  gaItemId: string
  highlightsHeader: string
  highlights: string[]
  group: 'individual' | 'family'
  // Family only
  dataPrice?: number
  membershipPrice?: number
}

export const INDIVIDUAL_PLANS: Plan[] = [
  {
    variantId: '202504250939078501',
    name: 'PlussMobil 0GB Fri Tale',
    slug: 'plussmobil-0gb-fri-tale',
    price: 99,
    gaItemId: 'PLUSSMOBIL_0GB_VOICE',
    highlightsHeader: 'Enkelt og billig!',
    highlights: ['Telenor-dekning', 'Ingen binding', 'Betal for bruk', '0,99 per MB', 'Fri tale'],
    group: 'individual',
  },
  {
    variantId: '202106101521451301',
    name: 'PlussMobil 1GB Standard',
    slug: 'plussmobil-1gb-standard',
    price: 119,
    gaItemId: 'PLUSSMOBIL_1GB_STD',
    highlightsHeader: 'Enkelt og billig!',
    highlights: ['Telenor-dekning', 'Ingen binding', 'Fri tale/SMS/MMS', 'Bruk i EU ink.', 'Uten Rollover', 'Datakontroll'],
    group: 'individual',
  },
  {
    variantId: '202106101521451305',
    name: 'PlussMobil 10GB Standard',
    slug: 'plussmobil-10gb-standard',
    price: 198,
    gaItemId: 'PLUSSMOBIL_10GB_STD',
    highlightsHeader: 'Enkelt og billig!',
    highlights: ['Telenor-dekning', 'Ingen binding', 'Fri tale/SMS/MMS', 'Bruk i EU ink.', 'Uten Rollover', 'Datakontroll'],
    group: 'individual',
  },
  {
    variantId: '202106101521451304',
    name: 'PlussMobil 15GB Standard',
    slug: 'plussmobil-15gb-standard',
    price: 248,
    gaItemId: 'PLUSSMOBIL_15GB_STD',
    highlightsHeader: 'Enkelt og billig!',
    highlights: ['Telenor-dekning', 'Ingen binding', 'Fri tale/SMS/MMS', 'Bruk i EU ink.', 'Uten Rollover', 'Datakontroll'],
    group: 'individual',
  },
  {
    variantId: '202108051409115987',
    name: 'PlussMobil 30GB Standard',
    slug: 'plussmobil-30gb-standard',
    price: 298,
    gaItemId: 'PLUSSMOBIL_30GB_STD',
    highlightsHeader: 'Enkelt og billig!',
    highlights: ['Telenor-dekning', 'Ingen binding', 'Fri tale/SMS/MMS', 'Bruk i EU ink.', 'Uten Rollover', 'Datakontroll'],
    group: 'individual',
  },
  {
    variantId: '202502111055144903',
    name: 'PlussMobil Fri Data Start',
    slug: 'plussmobil-fri-data-start',
    price: 298,
    gaItemId: 'PLUSSMOBIL_FRI_START',
    highlightsHeader: 'Fri Data med hastighet 10 Mbit/s opp til 100GB.',
    highlights: ['Telenor-dekning', 'Ubegrenset data', 'Fri tale/SMS/MMS', '40 GB i EU/EØS', 'Ingen binding', 'WiFi tale'],
    group: 'individual',
  },
  {
    variantId: '202502111055205720',
    name: 'PlussMobil Fri Data Smart',
    slug: 'plussmobil-fri-data-smart',
    price: 348,
    gaItemId: 'PLUSSMOBIL_FRI_SMART',
    highlightsHeader: 'Fri Data med hastighet 20 Mbit/s opp til 100GB.',
    highlights: ['Telenor-dekning', 'Ubegrenset data', 'Fri tale/SMS/MMS', '45 GB i EU/EØS', 'Ingen binding', 'WiFi tale'],
    group: 'individual',
  },
  {
    variantId: '202108041536494096',
    name: 'PlussMobil Fri Data Standard',
    slug: 'plussmobil-fri-data-standard',
    price: 398,
    gaItemId: 'PLUSSMOBIL_FRI_STD',
    highlightsHeader: 'Du får 150 Mbit/s hastighet opptil 100GB.',
    highlights: ['Telenor-dekning', 'Ingen binding', 'Fri tale/SMS/MMS', '50 GB i EU/EØS', 'Uten Rollover', 'Datakontroll'],
    group: 'individual',
  },
  {
    variantId: '202111091314000395',
    name: 'PlussMobil Fri Data Maks',
    slug: 'plussmobil-fri-data-maks',
    price: 499,
    gaItemId: 'PLUSSMOBIL_100GB',
    highlightsHeader: 'Fri Data med full hastighet 1000 Mbit/s, opptil 100GB.',
    highlights: ['Telenor-dekning', 'Ubegrenset data', 'Fri fart', '62 GB i EU/EØS', 'Ingen binding', 'WiFi tale'],
    group: 'individual',
  },
]

export const FAMILY_PLANS: Plan[] = [
  {
    variantId: '202404260819320338',
    name: 'Familiepakke 2GB',
    slug: 'familiepakke-2gb',
    price: 218,
    gaItemId: 'FAMILY_PGK_2GB',
    highlightsHeader: 'Enkelt og billig!',
    highlights: ['Telenor-dekning', 'Ingen binding', 'Fri tale/SMS/MMS', 'Bruk i EU ink.', 'Data Rollover', 'Del data'],
    group: 'family',
    dataPrice: 0,
    membershipPrice: 109,
  },
  {
    variantId: '202404260819350714',
    name: 'Familiepakke 5GB',
    slug: 'familiepakke-5gb',
    price: 318,
    gaItemId: 'FAMILY_PGK_5GB',
    highlightsHeader: 'Enkelt og billig!',
    highlights: ['Telenor-dekning', 'Ingen binding', 'Fri tale/SMS/MMS', 'Bruk i EU ink.', 'Data Rollover', 'Del data'],
    group: 'family',
    dataPrice: 100,
    membershipPrice: 109,
  },
  {
    variantId: '202404260819381058',
    name: 'Familiepakke 10GB',
    slug: 'familiepakke-10gb',
    price: 418,
    gaItemId: 'FAMILY_PGK_10GB',
    highlightsHeader: 'Enkelt og billig!',
    highlights: ['Telenor-dekning', 'Ingen binding', 'Fri tale/SMS/MMS', 'Bruk i EU ink.', 'Data Rollover', 'Del data'],
    group: 'family',
    dataPrice: 200,
    membershipPrice: 109,
  },
  {
    variantId: '202404260819411234',
    name: 'Familiepakke 25GB',
    slug: 'familiepakke-25gb',
    price: 518,
    gaItemId: 'FAMILY_PGK_25GB',
    highlightsHeader: 'Enkelt og billig!',
    highlights: ['Telenor-dekning', 'Ingen binding', 'Fri tale/SMS/MMS', 'Bruk i EU ink.', 'Data Rollover', 'Del data'],
    group: 'family',
    dataPrice: 300,
    membershipPrice: 109,
  },
  {
    variantId: '202404260819441643',
    name: 'Familiepakke 50GB',
    slug: 'familiepakke-50gb',
    price: 668,
    gaItemId: 'FAMILY_PGK_50GB',
    highlightsHeader: 'Enkelt og billig!',
    highlights: ['Telenor-dekning', 'Ingen binding', 'Fri tale/SMS/MMS', 'Bruk i EU ink.', 'Data Rollover', 'Del data'],
    group: 'family',
    dataPrice: 450,
    membershipPrice: 109,
  },
  {
    variantId: '202404260820482239',
    name: 'Familiepakke 80GB',
    slug: 'familiepakke-80gb',
    price: 768,
    gaItemId: 'FAMILY_PGK_80GB',
    highlightsHeader: 'Enkelt og billig!',
    highlights: ['Telenor-dekning', 'Ingen binding', 'Fri tale/SMS/MMS', 'Bruk i EU ink.', 'Data Rollover', 'Del data'],
    group: 'family',
    dataPrice: 550,
    membershipPrice: 109,
  },
]

export const DEFAULT_INDIVIDUAL_SLUG = 'plussmobil-10gb-standard'
export const DEFAULT_FAMILY_PLAN = FAMILY_PLANS[1] // Familiepakke 5GB
