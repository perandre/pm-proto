import Link from 'next/link'

function PlusDecor({
  className,
  size = 24,
  stroke = 1.5,
}: {
  className?: string
  size?: number
  stroke?: number
}) {
  const half = size / 2
  const arm = size * 0.35
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <line
        x1={half}
        y1={half - arm}
        x2={half}
        y2={half + arm}
        stroke="currentColor"
        strokeWidth={stroke}
        strokeLinecap="round"
      />
      <line
        x1={half - arm}
        y1={half}
        x2={half + arm}
        y2={half}
        stroke="currentColor"
        strokeWidth={stroke}
        strokeLinecap="round"
      />
    </svg>
  )
}

export default function HeroSection() {
  return (
    <section className="relative bg-navy overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 plus-pattern opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy/95 to-navy" />

      {/* Floating decorative plus signs */}
      <PlusDecor
        className="absolute top-24 left-[8%] text-gold/20 animate-float"
        size={32}
        stroke={2}
      />
      <PlusDecor
        className="absolute top-40 right-[12%] text-white/10 animate-float-slow"
        size={48}
        stroke={1.5}
      />
      <PlusDecor
        className="absolute bottom-32 left-[15%] text-white/8 animate-float-slow delay-3"
        size={40}
        stroke={1}
      />
      <PlusDecor
        className="absolute bottom-48 right-[20%] text-gold/15 animate-float delay-5"
        size={24}
        stroke={2}
      />
      <PlusDecor
        className="absolute top-1/2 left-[4%] text-white/6 animate-float delay-7"
        size={56}
        stroke={1}
      />

      {/* Radial glow behind headline */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gold/[0.04] rounded-full blur-[120px]" />

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 pt-32 sm:pt-40 pb-20 sm:pb-28">
        <div className="max-w-3xl mx-auto text-center">
          {/* Eyebrow */}
          <div className="animate-fade-up inline-flex items-center gap-2 bg-white/[0.07] backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 mb-8">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-white/70 text-sm font-medium">
              5G Telenor-dekning over hele Norge
            </span>
          </div>

          {/* Headline */}
          <h1 className="animate-fade-up delay-1 text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-bold leading-[1.08] tracking-tight">
            <span className="text-white">Mobilabonnement med</span>
            <br />
            <span className="text-gold">alltid noe ekstra</span>
          </h1>

          {/* Subtext */}
          <p className="animate-fade-up delay-2 mt-6 sm:mt-8 text-lg sm:text-xl text-white/60 leading-relaxed max-w-xl mx-auto">
            Enkelt og rimelig. Ingen binding. Fri tale, SMS og MMS.
            PlussFordeler og Pling inkludert.
          </p>

          {/* CTAs */}
          <div className="animate-fade-up delay-3 mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/mobilabonnement"
              className="group inline-flex items-center gap-2.5 bg-gold text-navy font-bold text-[0.95rem] px-8 py-4 rounded-full hover:bg-gold-dark transition-all duration-200 shadow-[0_4px_24px_rgba(245,197,24,0.25)] hover:shadow-[0_4px_32px_rgba(245,197,24,0.35)]"
            >
              Se abonnement
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/kontaktmeg"
              className="inline-flex items-center gap-2 text-white/70 font-medium text-[0.95rem] px-6 py-4 rounded-full border border-white/15 hover:bg-white/[0.06] hover:border-white/25 transition-all duration-200"
            >
              Trenger du hjelp?
            </Link>
          </div>

          {/* Price anchor */}
          <p className="animate-fade-up delay-4 mt-8 text-white/40 text-sm">
            Fra <span className="text-gold/80 font-semibold">99,-</span> /mnd
          </p>
        </div>

        {/* Trust badges */}
        <div className="animate-fade-up delay-5 mt-16 sm:mt-20 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {[
            'Ingen binding',
            'Data Rollover',
            'Fri tale/SMS/MMS',
            'eSIM-støtte',
            'PlussFordeler',
          ].map((badge) => (
            <span
              key={badge}
              className="inline-flex items-center gap-1.5 bg-white/[0.06] border border-white/8 rounded-full px-4 py-2 text-sm text-white/50"
            >
              <svg className="w-3.5 h-3.5 text-gold/70 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {badge}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom curve */}
      <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-24">
        <svg
          viewBox="0 0 1440 96"
          fill="none"
          preserveAspectRatio="none"
          className="absolute bottom-0 w-full h-full"
        >
          <path d="M0 96h1440V32C1200 80 960 96 720 96S240 80 0 32v64z" fill="#faf7f2" />
        </svg>
      </div>
    </section>
  )
}
