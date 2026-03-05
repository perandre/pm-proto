import { client } from './client'
import type { Plan } from '@/lib/products'
import type { OrderTexts, SiteSettings, FaqItem, ArticleSummary } from '@/types/sanity'

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

// ── Plans ─────────────────────────────────────────────────────────────────────

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

// ── Order texts ───────────────────────────────────────────────────────────────

export async function getOrderTexts(): Promise<OrderTexts> {
  return client.fetch(`*[_type == "orderTexts" && _id == "orderTexts"][0]`, {}, revalidate) ?? {}
}

// ── Site settings ─────────────────────────────────────────────────────────────

export async function getSiteSettings(): Promise<SiteSettings> {
  return client.fetch(`*[_type == "siteSettings" && _id == "siteSettings"][0]`, {}, revalidate) ?? {}
}

// ── FAQ ───────────────────────────────────────────────────────────────────────

export async function getFaqItems(): Promise<FaqItem[]> {
  return client.fetch(
    `*[_type == "faqItem" && active == true] | order(order asc) { _id, question, answer, category }`,
    {},
    revalidate,
  )
}

// ── Articles ──────────────────────────────────────────────────────────────────

export async function getArticles(): Promise<ArticleSummary[]> {
  return client.fetch(
    `*[_type == "article" && active == true] | order(publishedAt desc) {
      _id, title, "slug": slug.current, publishedAt, excerpt, heroImage
    }`,
    {},
    revalidate,
  )
}

export async function getArticleBySlug(slug: string) {
  return client.fetch(
    `*[_type == "article" && slug.current == $slug && active == true][0]`,
    { slug },
    revalidate,
  )
}

// ── Pages ─────────────────────────────────────────────────────────────────────

export async function getPageBySlug(slug: string) {
  return client.fetch(
    `*[_type == "page" && slug.current == $slug][0]{ ..., sections[]{ ..., items[]-> } }`,
    { slug },
    revalidate,
  )
}
