/**
 * Seed Sanity with all plans from lib/products.ts
 * Run once: npx tsx scripts/seed-plans.ts
 */

import { config } from 'dotenv'
config({ path: '.env.local' })
import { createClient } from '@sanity/client'
import { INDIVIDUAL_PLANS, FAMILY_PLANS } from '../lib/products'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const allPlans = [
  ...INDIVIDUAL_PLANS.map((p, i) => ({ ...p, order: i + 1 })),
  ...FAMILY_PLANS.map((p, i) => ({ ...p, order: i + 1 })),
]

async function seed() {
  console.log(`Seeding ${allPlans.length} plans…`)

  for (const plan of allPlans) {
    const doc = {
      _type: 'plan',
      _id: `plan-${plan.variantId}`,
      name: plan.name,
      slug: { _type: 'slug', current: plan.slug },
      variantId: plan.variantId,
      gaItemId: plan.gaItemId,
      group: plan.group,
      price: plan.price,
      highlightsHeader: plan.highlightsHeader,
      highlights: plan.highlights,
      order: plan.order,
      active: true,
      ...(plan.dataPrice != null && { dataPrice: plan.dataPrice }),
      ...(plan.membershipPrice != null && { membershipPrice: plan.membershipPrice }),
    }

    await client.createOrReplace(doc)
    console.log(`  ✓ ${plan.name}`)
  }

  console.log('Done.')
}

seed().catch((err) => { console.error(err); process.exit(1) })
