import type { SubscriptionState } from '@/types/order'
import InlineRadio from '@/components/ui/InlineRadio'
import BorderedRadioCard from '@/components/ui/BorderedRadioCard'
import TextInput from '@/components/ui/TextInput'
import InfoBox from '@/components/ui/InfoBox'

interface SubscriberSectionProps {
  state: SubscriptionState
  onChange: (patch: Partial<SubscriptionState>) => void
  errors: Partial<Record<keyof SubscriptionState, string>>
  /** For family members, owner info is never copied */
  hideOwnerToggle?: boolean
  label?: string
}

export default function SubscriberSection({
  state,
  onChange,
  errors,
  hideOwnerToggle = false,
  label = 'Er det du som skal bruke abonnementet?',
}: SubscriberSectionProps) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100 flex flex-col gap-4">
      {!hideOwnerToggle && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-bold text-gray-900 text-sm">{label}</span>
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
            title="Flytt eksisterende nummer"
            subtitle={<>Etablering kr <strong>0,-</strong></>}
          />
          <BorderedRadioCard
            name="port_type"
            value="new"
            checked={!state.portExistingNumber}
            onChange={() => onChange({ portExistingNumber: false })}
            title="Nytt nummer"
            subtitle={<>Etablering kr <strong>149,-</strong></>}
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
          Oppføring i opplysningstjenester (kr 0,-)
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
        Vil du ha nummeret ditt i telefonkatalogen og 1881? Velg <strong>Ja</strong> for oppføring i
        opplysningstjenestene (gratis).
      </InfoBox>
    </div>
  )
}
