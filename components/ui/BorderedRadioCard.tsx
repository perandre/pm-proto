interface BorderedRadioCardProps {
  name: string
  value: string
  checked: boolean
  onChange: () => void
  title: string
  subtitle?: React.ReactNode
  badge?: React.ReactNode
  disabled?: boolean
}

export default function BorderedRadioCard({
  name,
  value,
  checked,
  onChange,
  title,
  subtitle,
  badge,
  disabled,
}: BorderedRadioCardProps) {
  return (
    <label
      className={`flex flex-1 cursor-pointer items-start gap-3 rounded-xl border-2 p-4 transition select-none ${
        disabled
          ? 'cursor-not-allowed border-gray-200 bg-gray-50 opacity-50'
          : checked
            ? 'border-navy bg-white'
            : 'border-gray-200 bg-white hover:border-gray-300'
      }`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="sr-only"
      />
      <span
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition ${
          checked ? 'border-navy bg-navy' : 'border-gray-300 bg-white'
        }`}
      >
        {checked && (
          <svg className="h-3 w-3 text-white" viewBox="0 0 12 12" fill="none">
            <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-900 text-sm">{title}</span>
          {badge}
        </div>
        {subtitle && <p className="mt-0.5 text-sm text-gray-500">{subtitle}</p>}
      </div>
    </label>
  )
}
