import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Bestill PlussMobil abonnement',
  description: 'Bestill PlussMobil abonnement enkelt og raskt',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="no">
      <body className="min-h-screen bg-page">{children}</body>
    </html>
  )
}
