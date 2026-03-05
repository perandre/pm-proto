'use client'

import { useState } from 'react'
import AnimateOnScroll from './AnimateOnScroll'

const FAQS = [
  {
    q: 'Beholder jeg mitt nåværende telefonnummer?',
    a: 'Ja! Vi overfører nummeret ditt automatisk. Du trenger bare å oppgi nummeret under bestilling, så tar vi oss av resten. Ditt gamle abonnement sies opp den dagen du aktiverer SIM-kortet.',
  },
  {
    q: 'Hva er eSIM og hvordan fungerer det?',
    a: 'eSIM er et digitalt SIM-kort som er innebygd i telefonen din. Du trenger ikke et fysisk SIM-kort - bare skann QR-koden du mottar etter bestilling, og du er klar. Støttes av iPhone 11 og nyere, Samsung Galaxy S20 og nyere, og Google Pixel 3A og nyere.',
  },
  {
    q: 'Hva er PlussFordeler?',
    a: 'PlussFordeler er eksklusive fordeler du får som PlussMobil-kunde. Dette inkluderer gratis tilgang til Pling magasinapp (verdi 129 kr/mnd), rabatter på Samsung-produkter, BookBeat lydbøker, skylagring og mye mer.',
  },
  {
    q: 'Er det bindingstid på abonnementene?',
    a: 'Nei, alle våre abonnement er uten binding. Du kan bytte eller si opp når du vil, uten ekstra kostnader.',
  },
  {
    q: 'Hvilket nett bruker PlussMobil?',
    a: 'PlussMobil bruker Telenors nett, som er Norges beste mobilnett med over 8 750 basestasjoner og 5G-dekning over hele landet. Du får samme dekning og hastighet som Telenors egne kunder.',
  },
  {
    q: 'Hva er Data Rollover?',
    a: 'Med Data Rollover overføres ubrukt data til neste måned, slik at du ikke mister data du har betalt for. Tilgjengelig på utvalgte abonnement.',
  },
]

function FAQItem({ faq, isOpen, onToggle }: { faq: typeof FAQS[number]; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-border/80 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 py-5 sm:py-6 text-left group"
      >
        <span className="text-[1.05rem] font-semibold text-navy group-hover:text-navy-600 transition-colors pr-4">
          {faq.q}
        </span>
        <div
          className={`shrink-0 mt-1 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
            isOpen ? 'bg-navy rotate-0' : 'bg-cream-dark rotate-0'
          }`}
        >
          <svg
            className={`w-3.5 h-3.5 transition-all duration-300 ${
              isOpen ? 'text-white rotate-45' : 'text-navy'
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </div>
      </button>
      <div
        className={`grid transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="pb-6 text-text-muted leading-relaxed pr-12">{faq.a}</p>
        </div>
      </div>
    </div>
  )
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-20 sm:py-28 bg-cream-dark relative overflow-hidden">
      <div className="absolute inset-0 plus-pattern-light opacity-20" />

      <div className="relative mx-auto max-w-3xl px-5 sm:px-8">
        <AnimateOnScroll className="text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy tracking-tight">
            Ofte stilte spørsmål
          </h2>
          <p className="mt-4 text-text-muted text-lg">
            Alt du trenger å vite om PlussMobil.
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll delay={150}>
          <div className="mt-12 bg-white rounded-2xl border border-border/60 shadow-[0_2px_12px_rgba(0,0,0,0.03)] px-6 sm:px-8">
            {FAQS.map((faq, i) => (
              <FAQItem
                key={i}
                faq={faq}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={300} className="mt-10 text-center">
          <p className="text-text-muted text-sm">
            Finner du ikke svar?{' '}
            <a href="/kundeservice" className="text-navy font-semibold hover:underline">
              Besøk kundeservice
            </a>{' '}
            eller{' '}
            <a href="/kontaktmeg" className="text-navy font-semibold hover:underline">
              kontakt oss
            </a>
            .
          </p>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
