import { DEFAULT_FAMILY_PLAN } from '@/lib/products'
import Header from '@/components/Header'
import TabToggle from '@/components/TabToggle'
import FamilyOrderForm from '@/components/FamilyOrderForm'

export default function FamilyPlanPage() {
  return (
    <>
      <Header />
      <TabToggle />
      <main className="mx-auto max-w-2xl px-4 pb-16">
        <FamilyOrderForm plan={DEFAULT_FAMILY_PLAN} />
      </main>
    </>
  )
}
