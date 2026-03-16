import type { Metadata } from 'next'
import { Bricolage_Grotesque, Figtree } from 'next/font/google'
import './globals.css'

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  display: 'swap',
})

const figtree = Figtree({
  subsets: ['latin'],
  variable: '--font-figtree',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'PlussMobil - Billig mobilabonnement med Telenor-dekning',
  description:
    'Rimelig og enkelt mobilabonnement med 5G Telenor-dekning, ingen binding, og PlussFordeler inkludert. Fra 99,- /mnd.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="no" className={`${bricolage.variable} ${figtree.variable}`}>
      <body className="min-h-screen bg-page">{children}</body>
    </html>
  )
}
