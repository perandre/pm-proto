interface TextInputProps {
  label: string
  name: string
  type?: 'text' | 'email' | 'tel'
  value: string
  onChange: (value: string) => void
  placeholder?: string
  required?: boolean
  error?: string
}

export default function TextInput({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  required,
  error,
}: TextInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className={`w-full rounded-lg border px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-navy focus:ring-2 focus:ring-navy/20 ${
          error ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white'
        }`}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
