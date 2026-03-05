import AnimateOnScroll from './AnimateOnScroll'

const BENEFITS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
    title: 'Pling Magasinapp',
    description: '6000+ digitale magasiner og aviser. Verdi 129 kr/mnd - gratis for deg.',
    color: 'bg-rose-50 text-rose-600',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
      </svg>
    ),
    title: 'BookBeat Lydbøker',
    description: '60 dager gratis prøveperiode med 40 timer lytting inkludert.',
    color: 'bg-violet-50 text-violet-600',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
    ),
    title: 'Samsung-tilbud',
    description: 'Eksklusive månedlige rabatter på Samsung-produkter for våre kunder.',
    color: 'bg-sky-50 text-sky-600',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: 'PlussTrygg',
    description: 'DNS-filter i samarbeid med Cisco som blokkerer farlige nettsider automatisk.',
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
      </svg>
    ),
    title: 'Sky-lagring',
    description: 'Sikker skylagring med JottaCloud for bilder, filer og dokumenter.',
    color: 'bg-amber-50 text-amber-600',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Dagbladet Pluss m.fl.',
    description: '3 måneder gratis tilgang til KK Pluss, Se og Hør Pluss, og Dagbladet Pluss.',
    color: 'bg-orange-50 text-orange-600',
  },
]

export default function BenefitsSection() {
  return (
    <section className="py-20 sm:py-28 bg-cream-dark relative overflow-hidden">
      <div className="absolute inset-0 plus-pattern-light opacity-30" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <AnimateOnScroll className="text-center">
          <span className="inline-block text-gold-dark text-sm font-bold tracking-widest uppercase mb-4">
            PlussFordeler
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy tracking-tight">
            Alltid noe ekstra
          </h2>
          <p className="mt-4 text-text-muted text-lg max-w-lg mx-auto">
            Som PlussMobil-kunde får du eksklusive fordeler inkludert i abonnementet.
          </p>
        </AnimateOnScroll>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {BENEFITS.map((b, i) => (
            <AnimateOnScroll key={b.title} delay={i * 80}>
              <div className="h-full bg-white rounded-2xl p-6 sm:p-7 border border-border/60 shadow-[0_1px_4px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-0.5">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${b.color}`}>
                  {b.icon}
                </div>
                <h3 className="mt-4 text-lg font-bold text-navy">{b.title}</h3>
                <p className="mt-2 text-text-muted text-sm leading-relaxed">{b.description}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll delay={500} className="mt-10 text-center">
          <a
            href="/plussfordeler"
            className="inline-flex items-center gap-2 text-navy font-semibold hover:text-navy-600 transition-colors group"
          >
            Se alle fordeler
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
