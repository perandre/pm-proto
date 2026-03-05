'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const TABS = [
  { label: 'For én', href: '/bestill-mobilabonnement/plussmobil-10gb-standard/' },
  { label: 'For familie', href: '/bestill-mobilabonnement-familie/' },
]

export default function TabToggle() {
  const pathname = usePathname()
  const isFamily = pathname.startsWith('/bestill-mobilabonnement-familie')

  return (
    <div className="flex justify-center py-6">
      <div className="flex rounded-full border border-gray-200 bg-white p-1 shadow-sm">
        {TABS.map((tab, i) => {
          const active = i === 0 ? !isFamily : isFamily
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`rounded-full px-6 py-2 text-sm font-semibold transition ${
                active
                  ? 'bg-navy text-white shadow'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
