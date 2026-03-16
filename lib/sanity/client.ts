import { createClient } from 'next-sanity'
import { defineLive } from 'next-sanity/live'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'
export const apiVersion = '2025-05-01'

/** CDN client — fast reads, used for most fetches */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  stega: { enabled: false, studioUrl: '/studio' },
})

/** No-CDN client — used in generateStaticParams and seed script */
export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: 'published',
  stega: { enabled: false, studioUrl: '/studio' },
})

/** Write client — server-only, used in seed script */
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

/** Live content API — real-time updates + Visual Editing */
export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({
    token: process.env.SANITY_API_READ_TOKEN,
  }),
})
