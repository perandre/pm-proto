import { notFound } from 'next/navigation'
import { getFamilyPlans, getOrderTexts } from '@/lib/sanity/queries'
import Header from '@/components/Header'
import TabToggle from '@/components/TabToggle'
import FamilyOrderForm from '@/components/FamilyOrderForm'

export default async function FamilyPlanPage() {
  const [plans, texts] = await Promise.all([getFamilyPlans(), getOrderTexts()])
  const defaultPlan = plans[1] ?? plans[0]
  if (!defaultPlan) notFound()

  return (
    <>
      <Header />
      <TabToggle />
      <main className="mx-auto max-w-2xl px-4 pb-16">
        <FamilyOrderForm plan={defaultPlan} plans={plans} texts={texts} />
      </main>
    </>
  )
}
