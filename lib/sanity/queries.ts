import { client } from './client'
import type { Plan } from '@/lib/products'

const PLAN_FIELDS = `
  variantId,
  "name": name,
  "slug": slug.current,
  price,
  gaItemId,
  highlightsHeader,
  highlights,
  "group": group,
  dataPrice,
  membershipPrice,
`

const revalidate = { next: { revalidate: 3600 } }

export async function getIndividualPlans(): Promise<Plan[]> {
  return client.fetch(
    `*[_type == "plan" && group == "individual" && active == true] | order(order asc) { ${PLAN_FIELDS} }`,
    {},
    revalidate,
  )
}

export async function getFamilyPlans(): Promise<Plan[]> {
  return client.fetch(
    `*[_type == "plan" && group == "family" && active == true] | order(order asc) { ${PLAN_FIELDS} }`,
    {},
    revalidate,
  )
}

export async function getPlanBySlug(slug: string): Promise<Plan | null> {
  return client.fetch(
    `*[_type == "plan" && slug.current == $slug && active == true][0] { ${PLAN_FIELDS} }`,
    { slug },
    revalidate,
  )
}
