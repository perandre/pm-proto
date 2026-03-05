'use client'

import dynamic from 'next/dynamic'

// Sanity Studio must be loaded only in the browser — Turbopack can't evaluate it server-side.
const Studio = dynamic(
  async () => {
    const [{ NextStudio }, { default: config }] = await Promise.all([
      import('next-sanity/studio'),
      import('@/sanity.config'),
    ])
    return function StudioInner() {
      return <NextStudio config={config} />
    }
  },
  { ssr: false },
)

export default function StudioPage() {
  return <Studio />
}
