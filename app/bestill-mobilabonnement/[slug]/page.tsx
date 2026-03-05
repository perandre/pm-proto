import { notFound } from 'next/navigation'
import { INDIVIDUAL_PLANS, DEFAULT_INDIVIDUAL_SLUG } from '@/lib/products'
import Header from '@/components/Header'
import TabToggle from '@/components/TabToggle'
import OrderForm from '@/components/OrderForm'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function SinglePlanPage({ params }: Props) {
  const { slug } = await params
  const plan =
    INDIVIDUAL_PLANS.find((p) => p.slug === slug) ??
    INDIVIDUAL_PLANS.find((p) => p.slug === DEFAULT_INDIVIDUAL_SLUG)

  if (!plan) notFound()

  return (
    <>
      <Header />
      <TabToggle />
      <main className="mx-auto max-w-2xl px-4 pb-16">
        <OrderForm plan={plan} />
      </main>
    </>
  )
}

export function generateStaticParams() {
  return INDIVIDUAL_PLANS.map((p) => ({ slug: p.slug }))
}
