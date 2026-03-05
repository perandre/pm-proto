'use client'

import { useState } from 'react'

interface HelpTooltipProps {
  text: string
}

export default function HelpTooltip({ text }: HelpTooltipProps) {
  const [open, setOpen] = useState(false)

  return (
    <span className="relative inline-flex">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setOpen(false)}
        className="flex h-5 w-5 items-center justify-center rounded-full border border-gray-300 bg-white text-xs font-semibold text-gray-500 hover:border-gray-400 hover:text-gray-700"
        aria-label="Hjelp"
      >
        ?
      </button>
      {open && (
        <span className="absolute bottom-full left-1/2 z-10 mb-2 w-64 -translate-x-1/2 rounded-lg bg-gray-900 px-3 py-2 text-xs text-white shadow-lg">
          {text}
          <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
        </span>
      )}
    </span>
  )
}
