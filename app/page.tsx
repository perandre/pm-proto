import { redirect } from 'next/navigation'
import { DEFAULT_INDIVIDUAL_SLUG } from '@/lib/products'

export default function Home() {
  redirect(`/bestill-mobilabonnement/${DEFAULT_INDIVIDUAL_SLUG}/`)
}
