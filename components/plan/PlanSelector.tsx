import type { Plan } from '@/lib/products'

interface PlanSelectorProps {
  plans: Plan[]
  selectedVariantId: string
  onSelect: (plan: Plan) => void
  onClose: () => void
}

export default function PlanSelector({ plans, selectedVariantId, onSelect, onClose }: PlanSelectorProps) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-gray-900">Velg abonnement</h2>
        <button
          type="button"
          onClick={onClose}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Lukk
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {plans.map((plan) => {
          const selected = plan.variantId === selectedVariantId
          return (
            <button
              key={plan.variantId}
              type="button"
              onClick={() => onSelect(plan)}
              className={`flex items-center justify-between rounded-xl border-2 px-4 py-3 text-left transition ${
                selected ? 'border-navy bg-navy/5' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <span className="font-medium text-gray-900 text-sm">{plan.name}</span>
              <span className="font-bold text-navy text-sm">{plan.price},- /mnd</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
