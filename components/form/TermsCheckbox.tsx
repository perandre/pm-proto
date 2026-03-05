interface TermsCheckboxProps {
  checked: boolean
  onChange: (checked: boolean) => void
  error?: string
}

export default function TermsCheckbox({ checked, onChange, error }: TermsCheckboxProps) {
  return (
    <div>
      <label className="flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-gray-300 accent-navy"
        />
        <span className="text-sm text-gray-700">
          Jeg godtar{' '}
          <a href="https://www.plussmobil.no/vilkar/" target="_blank" rel="noopener noreferrer" className="text-[#e05a2b] hover:underline">
            vilkår
          </a>{' '}
          og{' '}
          <a href="https://www.plussmobil.no/personvernerklaring/" target="_blank" rel="noopener noreferrer" className="text-[#e05a2b] hover:underline">
            personvernerklæring
          </a>
        </span>
      </label>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
}
