import AnimateOnScroll from './AnimateOnScroll'

const STATS = [
  { value: '8 750+', label: 'Basestasjoner', sub: 'Telenor-nettverket' },
  { value: '5G', label: 'Dekning', sub: 'Over hele Norge' },
  { value: '4.5/5', label: 'På Bytt.no', sub: 'Kundetilfredshet' },
]

export default function TrustSection() {
  return (
    <section className="py-20 sm:py-28 bg-navy relative overflow-hidden">
      <div className="absolute inset-0 plus-pattern opacity-30" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/[0.03] rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* Stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 lg:gap-12">
          {STATS.map((stat, i) => (
            <AnimateOnScroll key={stat.label} delay={i * 120} className="text-center">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gold tracking-tight">
                {stat.value}
              </div>
              <div className="mt-2 text-white text-lg font-semibold">{stat.label}</div>
              <div className="mt-1 text-white/40 text-sm">{stat.sub}</div>
            </AnimateOnScroll>
          ))}
        </div>

        {/* Divider */}
        <div className="my-16 sm:my-20 h-px bg-white/10" />

        {/* Testimonial */}
        <AnimateOnScroll className="max-w-3xl mx-auto text-center">
          <svg
            className="mx-auto w-10 h-10 text-gold/30 mb-6"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z" />
          </svg>
          <blockquote className="text-xl sm:text-2xl lg:text-[1.7rem] text-white/90 font-medium leading-relaxed">
            &ldquo;Endelig et mobilabonnement som er enkelt, rimelig, og som faktisk gir deg noe ekstra.
            Byttet fra Telia og angrer ikke.&rdquo;
          </blockquote>
          <div className="mt-6 flex items-center justify-center gap-3">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-4 h-4 text-gold"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-white/50 text-sm">
              &mdash; Kunde via Bytt.no
            </span>
          </div>
        </AnimateOnScroll>

        {/* Telenor badge */}
        <AnimateOnScroll delay={200} className="mt-14 flex justify-center">
          <div className="inline-flex items-center gap-3 bg-white/[0.06] border border-white/10 rounded-full px-6 py-3">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-white/60 text-sm font-medium">
              Full 5G dekning via Telenors nett &mdash; Norges beste mobilnett
            </span>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
