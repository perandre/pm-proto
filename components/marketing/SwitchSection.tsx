import AnimateOnScroll from './AnimateOnScroll'

const STEPS = [
  {
    number: '1',
    title: 'Velg abonnement',
    description: 'Finn pakken som passer deg. Ingen binding - bytt når du vil.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
      </svg>
    ),
  },
  {
    number: '2',
    title: 'Bestill enkelt',
    description: 'Fyll ut skjemaet med ditt nummer. Vi ordner overføringen for deg.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
    ),
  },
  {
    number: '3',
    title: 'Klar til bruk',
    description: 'Aktiver eSIM umiddelbart eller motta SIM i posten. Velkommen!',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
  },
]

export default function SwitchSection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <AnimateOnScroll className="text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy tracking-tight">
            Bytt til PlussMobil på 1-2-3
          </h2>
          <p className="mt-4 text-text-muted text-lg max-w-lg mx-auto">
            Vi gjør byttet enkelt. Du beholder nummeret ditt, og vi sier opp det gamle abonnementet for deg.
          </p>
        </AnimateOnScroll>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
          {STEPS.map((step, i) => (
            <AnimateOnScroll key={step.number} delay={i * 150}>
              <div className="relative text-center">
                {/* Connecting line (desktop only) */}
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-14 left-[60%] w-[80%] h-px border-t-2 border-dashed border-border" />
                )}

                {/* Step number circle */}
                <div className="relative inline-flex items-center justify-center w-28 h-28 rounded-3xl bg-cream-dark border border-border/60 mb-6">
                  <div className="text-navy/80">{step.icon}</div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gold flex items-center justify-center">
                    <span className="text-navy font-bold text-sm">{step.number}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-navy">{step.title}</h3>
                <p className="mt-2 text-text-muted text-sm leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
