interface Option<T extends string> {
  value: T
  label: string
}

interface InlineRadioProps<T extends string> {
  name: string
  options: Option<T>[]
  value: T
  onChange: (value: T) => void
}

export default function InlineRadio<T extends string>({
  name,
  options,
  value,
  onChange,
}: InlineRadioProps<T>) {
  return (
    <div className="flex gap-2">
      {options.map((opt) => {
        const selected = opt.value === value
        return (
          <label
            key={opt.value}
            className={`flex cursor-pointer items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium transition select-none ${
              selected
                ? 'border-navy bg-navy text-white'
                : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
            }`}
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={selected}
              onChange={() => onChange(opt.value)}
              className="sr-only"
            />
            {selected && (
              <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 14 14" fill="none">
                <path d="M2.5 7L5.5 10L11.5 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
            {opt.label}
          </label>
        )
      })}
    </div>
  )
}
