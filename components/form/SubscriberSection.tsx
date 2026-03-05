import type { SubscriptionState } from '@/types/order'
import type { OrderTexts } from '@/types/sanity'
import InlineRadio from '@/components/ui/InlineRadio'
import BorderedRadioCard from '@/components/ui/BorderedRadioCard'
import TextInput from '@/components/ui/TextInput'
import InfoBox from '@/components/ui/InfoBox'

interface SubscriberSectionProps {
  state: SubscriptionState
  onChange: (patch: Partial<SubscriptionState>) => void
  errors: Partial<Record<keyof SubscriptionState, string>>
  hideOwnerToggle?: boolean
  label?: string
  texts?: OrderTexts
}

export default function SubscriberSection({
  state,
  onChange,
  errors,
  hideOwnerToggle = false,
  label,
  texts,
}: SubscriberSectionProps) {
  const t = texts ?? {}
  const sectionLabel = label ?? t.subscriberSectionHeader ?? 'Er det du som skal bruke abonnementet?'
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100 flex flex-col gap-4">
      {!hideOwnerToggle && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-bold text-gray-900 text-sm">{sectionLabel}</span>
          <InlineRadio
            name="subscriber_is_owner"
            options={[
              { value: 'yes', label: 'Ja' },
              { value: 'no', label: 'Nei' },
            ]}
            value={state.subscriberIsOwner ? 'yes' : 'no'}
            onChange={(v) => onChange({ subscriberIsOwner: v === 'yes' })}
          />
        </div>
      )}

      {(!state.subscriberIsOwner || hideOwnerToggle) && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextInput
            label="Navn på bruker"
            name="subscriber_name"
            value={state.subscriberName}
            onChange={(v) => onChange({ subscriberName: v })}
            placeholder="Ola Nordmann"
            required
            error={errors.subscriberName}
          />
          <TextInput
            label="Fødselsdato (ddmmåå)"
            name="subscriber_birthdate"
            value={state.subscriberBirthdate}
            onChange={(v) => onChange({ subscriberBirthdate: v })}
            placeholder="010190"
            required
            error={errors.subscriberBirthdate}
          />
        </div>
      )}

      <div>
        <p className="mb-2 text-sm font-semibold text-gray-900">Nummer</p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <BorderedRadioCard
            name="port_type"
            value="port"
            checked={state.portExistingNumber}
            onChange={() => onChange({ portExistingNumber: true })}
            title={t.portKeepLabel ?? 'Flytt eksisterende nummer'}
            subtitle={t.portKeepFee ?? 'Etablering kr 0,-'}
          />
          <BorderedRadioCard
            name="port_type"
            value="new"
            checked={!state.portExistingNumber}
            onChange={() => onChange({ portExistingNumber: false })}
            title={t.portNewLabel ?? 'Nytt nummer'}
            subtitle={t.portNewFee ?? 'Etablering kr 149,-'}
          />
        </div>
      </div>

      {state.portExistingNumber && (
        <TextInput
          label="Nummer som skal flyttes"
          name="existing_number"
          type="tel"
          value={state.existingNumber}
          onChange={(v) => onChange({ existingNumber: v })}
          placeholder="41234567"
          required
          error={errors.existingNumber}
        />
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-sm font-semibold text-gray-900">
          {t.directoryListingLabel ?? 'Oppføring i opplysningstjenester (kr 0,-)'}
        </span>
        <InlineRadio
          name="directory_listing"
          options={[
            { value: 'yes', label: 'Ja' },
            { value: 'no', label: 'Nei' },
          ]}
          value={state.directoryListing ? 'yes' : 'no'}
          onChange={(v) => onChange({ directoryListing: v === 'yes' })}
        />
      </div>

      <InfoBox>
        {t.directoryListingInfo ?? 'Vil du ha nummeret ditt i telefonkatalogen og 1881? Velg Ja for oppføring i opplysningstjenestene (gratis).'}
      </InfoBox>
    </div>
  )
}
