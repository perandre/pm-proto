'use client'

import { useState, useCallback } from 'react'
import type { Plan } from '@/lib/products'
import { FAMILY_PLANS } from '@/lib/products'
import { defaultPortDate } from '@/lib/dates'
import type { FamilyFormState, FamilyMember, UIState } from '@/types/order'
import { validateOwner, validateSubscription, hasErrors } from '@/lib/validation'

import PlanCard from '@/components/plan/PlanCard'
import PlanSelector from '@/components/plan/PlanSelector'
import OwnerForm from '@/components/form/OwnerForm'
import SubscriberSection from '@/components/form/SubscriberSection'
import SimSection from '@/components/form/SimSection'
import TermsCheckbox from '@/components/form/TermsCheckbox'
import LoadingSpinner from '@/components/form/LoadingSpinner'
import Receipt from '@/components/form/Receipt'

function newMember(): FamilyMember {
  return {
    subscriberName: '',
    subscriberBirthdate: '',
    portExistingNumber: true,
    existingNumber: '',
    directoryListing: false,
    simType: 'esim',
    portDate: defaultPortDate('esim'),
  }
}

function initialState(plan: Plan): FamilyFormState {
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
    members: [newMember(), newMember()],
  }
}

interface FamilyOrderFormProps {
  plan: Plan
}

export default function FamilyOrderForm({ plan: initialPlan }: FamilyOrderFormProps) {
  const [plan, setPlan] = useState(initialPlan)
  const [showSelector, setShowSelector] = useState(false)
  const [state, setState] = useState<FamilyFormState>(() => initialState(initialPlan))
  const [uiState, setUiState] = useState<UIState>('form')
  const [ownerErrors, setOwnerErrors] = useState({})
  const [memberErrors, setMemberErrors] = useState<Record<string, string>[]>([{}, {}])
  const [termsError, setTermsError] = useState('')

  const patchOwner = useCallback((patch: Partial<typeof state.owner>) => {
    setState((s) => ({ ...s, owner: { ...s.owner, ...patch } }))
  }, [])

  const patchMember = useCallback((index: number, patch: Partial<FamilyMember>) => {
    setState((s) => {
      const members = [...s.members]
      members[index] = { ...members[index], ...patch }
      return { ...s, members }
    })
  }, [])

  const addMember = () => {
    setState((s) => ({ ...s, members: [...s.members, newMember()] }))
    setMemberErrors((e) => [...e, {}])
  }

  const removeMember = (index: number) => {
    if (state.members.length <= 2) return
    setState((s) => ({
      ...s,
      members: s.members.filter((_, i) => i !== index),
    }))
    setMemberErrors((e) => e.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const oErr = validateOwner(state.owner)
    const mErrs = state.members.map((m) =>
      validateSubscription({
        subscriberIsOwner: false,
        subscriberName: m.subscriberName,
        subscriberBirthdate: m.subscriberBirthdate,
        portExistingNumber: m.portExistingNumber,
        existingNumber: m.existingNumber,
        directoryListing: m.directoryListing,
        simType: m.simType,
        portDate: m.portDate,
      })
    )
    setOwnerErrors(oErr)
    setMemberErrors(mErrs)
    const tErr = state.owner.termsAccepted ? '' : 'Du må godta vilkårene'
    setTermsError(tErr)

    if (hasErrors(oErr) || mErrs.some(hasErrors) || tErr) return

    setUiState('loading')
    setTimeout(() => setUiState('receipt'), 1500)
  }

  if (uiState === 'loading') return <LoadingSpinner />
  if (uiState === 'receipt') {
    return (
      <Receipt
        plan={plan}
        ownerName={state.owner.name}
        ownerEmail={state.owner.email}
        isEsim={state.members.some((m) => m.simType === 'esim')}
      />
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      {showSelector ? (
        <PlanSelector
          plans={FAMILY_PLANS}
          selectedVariantId={plan.variantId}
          onSelect={(p) => { setPlan(p); setState((s) => ({ ...s, planVariantId: p.variantId })); setShowSelector(false) }}
          onClose={() => setShowSelector(false)}
        />
      ) : (
        <PlanCard plan={plan} onChangePlan={() => setShowSelector(true)} />
      )}

      <OwnerForm state={state.owner} onChange={patchOwner} errors={ownerErrors} />

      {state.members.map((member, i) => (
        <div key={i} className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <p className="font-bold text-gray-900">Bruker {i + 1}</p>
            {state.members.length > 2 && (
              <button
                type="button"
                onClick={() => removeMember(i)}
                className="text-sm text-red-500 hover:underline"
              >
                Fjern
              </button>
            )}
          </div>
          <SubscriberSection
            state={{
              subscriberIsOwner: false,
              subscriberName: member.subscriberName,
              subscriberBirthdate: member.subscriberBirthdate,
              portExistingNumber: member.portExistingNumber,
              existingNumber: member.existingNumber,
              directoryListing: member.directoryListing,
              simType: member.simType,
              portDate: member.portDate,
            }}
            onChange={(patch) => patchMember(i, patch as Partial<FamilyMember>)}
            errors={memberErrors[i] ?? {}}
            hideOwnerToggle
          />
          <SimSection
            state={{
              subscriberIsOwner: false,
              subscriberName: member.subscriberName,
              subscriberBirthdate: member.subscriberBirthdate,
              portExistingNumber: member.portExistingNumber,
              existingNumber: member.existingNumber,
              directoryListing: member.directoryListing,
              simType: member.simType,
              portDate: member.portDate,
            }}
            onChange={(patch) => patchMember(i, patch as Partial<FamilyMember>)}
            errors={memberErrors[i] ?? {}}
          />
        </div>
      ))}

      <button
        type="button"
        onClick={addMember}
        className="rounded-2xl border-2 border-dashed border-gray-300 py-4 text-sm font-semibold text-gray-600 hover:border-gray-400 hover:text-gray-800 transition"
      >
        + Legg til bruker
      </button>

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
          Send bestilling →
        </button>
      </div>
    </form>
  )
}
