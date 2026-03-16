import { defineQuery } from 'next-sanity'
import { sanityFetch, previewClient } from './client'
import type { Plan } from '@/lib/products'
import type { OrderTexts, SiteSettings, FaqItem, ArticleSummary } from '@/types/sanity'

const PLAN_FIELDS = `
  variantId,
  "name": name,
  "slug": slug.current,
  price,
  gaItemId,
  highlightsHeader,
  "highlights": highlights[],
  "group": group,
  dataPrice,
  membershipPrice,
`

// ── Plans ─────────────────────────────────────────────────────────────────────

const individualPlansQuery = defineQuery(
  `*[_type == "plan" && group == "individual" && active == true] | order(order asc) { ${PLAN_FIELDS} }`
)

const familyPlansQuery = defineQuery(
  `*[_type == "plan" && group == "family" && active == true] | order(order asc) { ${PLAN_FIELDS} }`
)

const planBySlugQuery = defineQuery(
  `*[_type == "plan" && slug.current == $slug && active == true][0] { ${PLAN_FIELDS} }`
)

export async function getIndividualPlans(): Promise<Plan[]> {
  const { data } = await sanityFetch({ query: individualPlansQuery })
  return (data as Plan[]) ?? []
}

export async function getFamilyPlans(): Promise<Plan[]> {
  const { data } = await sanityFetch({ query: familyPlansQuery })
  return (data as Plan[]) ?? []
}

export async function getPlanBySlug(slug: string): Promise<Plan | null> {
  const { data } = await sanityFetch({ query: planBySlugQuery, params: { slug } })
  return (data as Plan | null) ?? null
}

/** No-CDN — used in generateStaticParams so new slugs resolve immediately on deploy */
export async function getAllPlanSlugs(group: 'individual' | 'family'): Promise<{ slug: string }[]> {
  return previewClient.fetch(
    defineQuery(`*[_type == "plan" && group == $group && active == true]{ "slug": slug.current }`),
    { group },
  )
}

// ── Order texts ───────────────────────────────────────────────────────────────

const orderTextsQuery = defineQuery(`*[_type == "orderTexts" && _id == "orderTexts"][0]`)

export async function getOrderTexts(): Promise<OrderTexts> {
  const { data } = await sanityFetch({ query: orderTextsQuery })
  return (data as OrderTexts) ?? {}
}

// ── Site settings ─────────────────────────────────────────────────────────────

const siteSettingsQuery = defineQuery(`*[_type == "siteSettings" && _id == "siteSettings"][0]`)

export async function getSiteSettings(): Promise<SiteSettings> {
  const { data } = await sanityFetch({ query: siteSettingsQuery })
  return (data as SiteSettings) ?? {}
}

// ── FAQ ───────────────────────────────────────────────────────────────────────

const faqItemsQuery = defineQuery(
  `*[_type == "faqItem" && active == true] | order(order asc) { _id, _key, question, answer, category }`
)

export async function getFaqItems(): Promise<FaqItem[]> {
  const { data } = await sanityFetch({ query: faqItemsQuery })
  return (data as FaqItem[]) ?? []
}

// ── Articles ──────────────────────────────────────────────────────────────────

const articlesQuery = defineQuery(
  `*[_type == "article" && active == true] | order(publishedAt desc) {
    _id, title, "slug": slug.current, publishedAt, excerpt,
    heroImage { asset->{ url, metadata { lqip, dimensions } }, alt }
  }`
)

const articleBySlugQuery = defineQuery(
  `*[_type == "article" && slug.current == $slug && active == true][0] {
    _id, title, "slug": slug.current, publishedAt, excerpt,
    heroImage { asset->{ url, metadata { lqip, dimensions } }, alt },
    body, tags
  }`
)

export async function getArticles(): Promise<ArticleSummary[]> {
  const { data } = await sanityFetch({ query: articlesQuery })
  return (data as ArticleSummary[]) ?? []
}

export async function getArticleBySlug(slug: string) {
  const { data } = await sanityFetch({ query: articleBySlugQuery, params: { slug } })
  return data
}

// ── Pages ─────────────────────────────────────────────────────────────────────

const pageBySlugQuery = defineQuery(
  `*[_type == "page" && slug.current == $slug][0]{
    ...,
    "sections": sections[]{ ..., "_key": _key, items[]-> }
  }`
)

export async function getPageBySlug(slug: string) {
  const { data } = await sanityFetch({ query: pageBySlugQuery, params: { slug } })
  return data
}
