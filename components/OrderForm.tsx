'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import type { Plan } from '@/lib/products'
import type { OrderTexts } from '@/types/sanity'
import { defaultPortDate } from '@/lib/dates'
import type { SingleFormState, UIState } from '@/types/order'
import { validateOwner, validateSubscription, hasErrors } from '@/lib/validation'

import PlanCard from '@/components/plan/PlanCard'
import PlanSelector from '@/components/plan/PlanSelector'
import OwnerForm from '@/components/form/OwnerForm'
import SubscriberSection from '@/components/form/SubscriberSection'
import SimSection from '@/components/form/SimSection'
import OrderSummary from '@/components/form/OrderSummary'
import TermsCheckbox from '@/components/form/TermsCheckbox'
import LoadingSpinner from '@/components/form/LoadingSpinner'
import Receipt from '@/components/form/Receipt'

function initialState(plan: Plan): SingleFormState {
  return {
    planVariantId: plan.variantId,
    owner: {
      name: '',
      phone: '',
      email: '',
      personalId: '',
      termsAccepted: false,
      discountCode: '',
    },
    subscription: {
      subscriberIsOwner: true,
      subscriberName: '',
      subscriberBirthdate: '',
      portExistingNumber: true,
      existingNumber: '',
      directoryListing: false,
      simType: 'esim',
      portDate: defaultPortDate('esim'),
    },
  }
}

interface OrderFormProps {
  plan: Plan
  plans: Plan[]
  texts?: OrderTexts
}

export default function OrderForm({ plan: initialPlan, plans, texts }: OrderFormProps) {
  const router = useRouter()
  const [plan, setPlan] = useState(initialPlan)
  const [showSelector, setShowSelector] = useState(false)
  const [state, setState] = useState<SingleFormState>(() => initialState(initialPlan))
  const [uiState, setUiState] = useState<UIState>('form')
  const [ownerErrors, setOwnerErrors] = useState({})
  const [subErrors, setSubErrors] = useState({})
  const [termsError, setTermsError] = useState('')

  const patchOwner = useCallback((patch: Partial<typeof state.owner>) => {
    setState((s) => ({ ...s, owner: { ...s.owner, ...patch } }))
  }, [])

  const patchSubscription = useCallback((patch: Partial<typeof state.subscription>) => {
    setState((s) => ({ ...s, subscription: { ...s.subscription, ...patch } }))
  }, [])

  const handlePlanSelect = (newPlan: Plan) => {
    setPlan(newPlan)
    setState((s) => ({ ...s, planVariantId: newPlan.variantId }))
    setShowSelector(false)
    router.replace(`/bestill-mobilabonnement/${newPlan.slug}/`)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const oErr = validateOwner(state.owner)
    const sErr = validateSubscription(state.subscription)
    setOwnerErrors(oErr)
    setSubErrors(sErr)
    const tErr = state.owner.termsAccepted ? '' : 'Du må godta vilkårene'
    setTermsError(tErr)

    if (hasErrors(oErr) || hasErrors(sErr) || tErr) return

    // Phase 1: simulate loading then receipt
    setUiState('loading')
    setTimeout(() => setUiState('receipt'), 1500)
  }

  if (uiState === 'loading') return <LoadingSpinner text={texts?.loadingText} />
  if (uiState === 'receipt') {
    return (
      <Receipt
        plan={plan}
        ownerName={state.owner.name}
        ownerEmail={state.owner.email}
        isEsim={state.subscription.simType === 'esim'}
        texts={texts}
      />
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      {showSelector ? (
        <PlanSelector
          plans={plans}
          selectedVariantId={plan.variantId}
          onSelect={handlePlanSelect}
          onClose={() => setShowSelector(false)}
        />
      ) : (
        <PlanCard plan={plan} onChangePlan={() => setShowSelector(true)} />
      )}

      <OwnerForm state={state.owner} onChange={patchOwner} errors={ownerErrors} texts={texts} />

      <SubscriberSection
        state={state.subscription}
        onChange={patchSubscription}
        errors={subErrors}
        texts={texts}
      />

      <SimSection
        state={state.subscription}
        onChange={patchSubscription}
        errors={subErrors}
        texts={texts}
      />

      <OrderSummary
        plan={plan}
        subscription={state.subscription}
        ownerName={state.owner.name}
      />

      <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100 flex flex-col gap-4">
        <TermsCheckbox
          checked={state.owner.termsAccepted}
          onChange={(v) => patchOwner({ termsAccepted: v })}
          error={termsError}
        />

        <button
          type="submit"
          className="w-full rounded-full bg-navy py-3.5 text-sm font-semibold text-white transition hover:opacity-90 sm:w-auto sm:px-10"
        >
          {texts?.submitLabel ?? 'Send bestilling →'}
        </button>
      </div>
    </form>
  )
}
