import type { Plan } from '@/lib/products'

interface PlanCardProps {
  plan: Plan
  onChangePlan: () => void
}

export default function PlanCard({ plan, onChangePlan }: PlanCardProps) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">{plan.name}</h2>
          <p className="text-xl font-bold text-navy sm:hidden">{plan.price},- /mnd</p>
        </div>
        <div className="flex items-center gap-3">
          <p className="hidden text-xl font-bold text-navy sm:block">{plan.price},- /mnd</p>
          <button
            type="button"
            onClick={onChangePlan}
            className="rounded-full bg-gold px-4 py-1.5 text-sm font-semibold text-gray-900 hover:brightness-95 transition"
          >
            Endre abonnement?
          </button>
        </div>
      </div>

      <p className="mt-3 text-sm font-semibold text-gray-700">{plan.highlightsHeader}</p>

      <ul className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 sm:grid-cols-3">
        {plan.highlights.map((h) => (
          <li key={h} className="flex items-center gap-2 text-sm text-gray-700">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100">
              <svg className="h-3 w-3 text-blue-600" viewBox="0 0 12 12" fill="none">
                <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            {h}
          </li>
        ))}
      </ul>
    </div>
  )
}
