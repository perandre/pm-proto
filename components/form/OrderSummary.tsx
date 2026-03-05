import type { Plan } from '@/lib/products'
import type { SubscriptionState } from '@/types/order'

interface OrderSummaryProps {
  plan: Plan
  subscription: SubscriptionState
  ownerName: string
}

export default function OrderSummary({ plan, subscription, ownerName }: OrderSummaryProps) {
  const displayName = subscription.subscriberIsOwner
    ? ownerName || '–'
    : subscription.subscriberName || '–'

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
      <p className="font-bold text-gray-900 mb-3">Abonnement</p>
      <div className="rounded-xl border border-dashed border-gray-300 p-4 flex flex-col gap-1.5 text-sm">
        <p className="font-bold text-navy">
          {plan.name} &nbsp;{plan.price},- /mnd
        </p>
        <p className="text-gray-600">
          Navn: <span className="text-gray-900">{displayName}</span>
        </p>
        {subscription.portExistingNumber ? (
          <p className="text-gray-600">
            Nummer til overføring:{' '}
            <span className="text-gray-900">{subscription.existingNumber || '–'}</span>
          </p>
        ) : (
          <p className="text-gray-600">Nytt nummer</p>
        )}
        <p className="text-gray-600">
          Dato for overføring:{' '}
          <span className="text-gray-900">{subscription.portDate || '–'}</span>
        </p>
        <p className="text-gray-600">
          SIM-kort:{' '}
          <span className="text-gray-900">
            {subscription.simType === 'esim' ? 'eSIM' : 'Vanlig SIM i posten'}
          </span>
        </p>
      </div>
    </div>
  )
}
