import { notFound } from 'next/navigation'
import { getIndividualPlans, getPlanBySlug, getOrderTexts } from '@/lib/sanity/queries'
import { DEFAULT_INDIVIDUAL_SLUG } from '@/lib/products'
import Header from '@/components/Header'
import TabToggle from '@/components/TabToggle'
import OrderForm from '@/components/OrderForm'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function SinglePlanPage({ params }: Props) {
  const { slug } = await params
  const [plans, plan, fallback, texts] = await Promise.all([
    getIndividualPlans(),
    getPlanBySlug(slug),
    getPlanBySlug(DEFAULT_INDIVIDUAL_SLUG),
    getOrderTexts(),
  ])

  const activePlan = plan ?? fallback
  if (!activePlan) notFound()

  return (
    <>
      <Header />
      <TabToggle />
      <main className="mx-auto max-w-2xl px-4 pb-16">
        <OrderForm plan={activePlan} plans={plans} texts={texts} />
      </main>
    </>
  )
}

export async function generateStaticParams() {
  const plans = await getIndividualPlans()
  return plans.map((p) => ({ slug: p.slug }))
}
