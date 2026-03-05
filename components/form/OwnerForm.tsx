'use client'

import { useState } from 'react'
import type { OwnerState } from '@/types/order'
import TextInput from '@/components/ui/TextInput'

interface OwnerFormProps {
  state: OwnerState
  onChange: (patch: Partial<OwnerState>) => void
  errors: Partial<Record<keyof OwnerState, string>>
}

export default function OwnerForm({ state, onChange, errors }: OwnerFormProps) {
  const [showDiscount, setShowDiscount] = useState(!!state.discountCode)

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
      <h3 className="mb-4 font-bold text-gray-900">Hvem skal være eier av abonnementet?</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextInput
          label="Navn"
          name="owner_name"
          value={state.name}
          onChange={(v) => onChange({ name: v })}
          placeholder="Ola Nordmann"
          required
          error={errors.name}
        />
        <TextInput
          label="Mobilnummer"
          name="owner_phone"
          type="tel"
          value={state.phone}
          onChange={(v) => onChange({ phone: v })}
          placeholder="41234567"
          required
          error={errors.phone}
        />
        <TextInput
          label="E-post"
          name="owner_email"
          type="email"
          value={state.email}
          onChange={(v) => onChange({ email: v })}
          placeholder="ola@example.com"
          required
          error={errors.email}
        />
        <TextInput
          label="Fødselsnummer (11 siffer)"
          name="owner_personal_id"
          value={state.personalId}
          onChange={(v) => onChange({ personalId: v })}
          placeholder="ddmmåå12345"
          required
          error={errors.personalId}
        />
      </div>

      <div className="mt-4">
        {!showDiscount ? (
          <button
            type="button"
            onClick={() => setShowDiscount(true)}
            className="text-sm text-[#e05a2b] hover:underline"
          >
            Har du en rabattkode?
          </button>
        ) : (
          <TextInput
            label="Rabattkode"
            name="discount_code"
            value={state.discountCode}
            onChange={(v) => onChange({ discountCode: v })}
            placeholder="Skriv inn kode"
          />
        )}
      </div>
    </div>
  )
}
