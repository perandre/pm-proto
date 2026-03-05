import type { SubscriptionState } from '@/types/order'
import type { SimType } from '@/lib/products'
import type { OrderTexts } from '@/types/sanity'
import BorderedRadioCard from '@/components/ui/BorderedRadioCard'
import HelpTooltip from '@/components/ui/HelpTooltip'
import TextInput from '@/components/ui/TextInput'
import { getPortDateRange, formatDate } from '@/lib/dates'

const DEFAULT_ESIM_HELP =
  'eSIM er et digitalt SIM-kort innebygd i telefonen. Støttede enheter: iPhone 11+, Samsung Galaxy S20+, Note20+, Z Flip+, Google Pixel 3A+'

interface SimSectionProps {
  state: SubscriptionState
  onChange: (patch: Partial<SubscriptionState>) => void
  errors: Partial<Record<keyof SubscriptionState, string>>
  texts?: OrderTexts
}

export default function SimSection({ state, onChange, errors, texts }: SimSectionProps) {
  const t = texts ?? {}
  const esimDisabled = !state.portExistingNumber

  const handleSimChange = (simType: SimType) => {
    const range = getPortDateRange(simType)
    onChange({ simType, portDate: formatDate(range.default) })
  }

  const range = getPortDateRange(state.simType)
  const minStr = formatDate(range.min)
  const maxStr = formatDate(range.max)

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100 flex flex-col gap-4">
      <p className="font-bold text-gray-900">SIM-kort</p>

      <div className="flex flex-col gap-2 sm:flex-row">
        <BorderedRadioCard
          name="sim_type"
          value="physical"
          checked={state.simType === 'physical'}
          onChange={() => handleSimChange('physical')}
          title={t.simPhysicalLabel ?? 'Vanlig SIM i posten'}
        />
        <BorderedRadioCard
          name="sim_type"
          value="esim"
          checked={state.simType === 'esim'}
          onChange={() => handleSimChange('esim')}
          disabled={esimDisabled}
          title={t.simEsimLabel ?? 'eSIM'}
          badge={<HelpTooltip text={t.esimTooltip ?? DEFAULT_ESIM_HELP} />}
        />
      </div>

      {esimDisabled && (
        <p className="text-xs text-gray-500">
          {t.esimDisabledNote ?? 'eSIM er kun tilgjengelig ved overføring av eksisterende nummer.'}
        </p>
      )}

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Dato for overføring
        </label>
        <div className="relative">
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </span>
          <input
            type="text"
            value={state.portDate}
            onChange={(e) => onChange({ portDate: e.target.value })}
            placeholder={minStr}
            className={`w-full rounded-lg border px-4 py-3 pl-10 text-sm text-gray-900 outline-none transition focus:border-navy focus:ring-2 focus:ring-navy/20 ${
              errors.portDate ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white'
            }`}
          />
        </div>
        <p className="mt-1 text-xs text-gray-500">
          Tidligst {minStr} – senest {maxStr} (dd.mm.åååå)
        </p>
        {errors.portDate && <p className="mt-1 text-xs text-red-500">{errors.portDate}</p>}
      </div>
    </div>
  )
}
