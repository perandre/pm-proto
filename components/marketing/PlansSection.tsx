'use client'

import { useState } from 'react'
import Link from 'next/link'
import AnimateOnScroll from './AnimateOnScroll'

interface FeaturedPlan {
  name: string
  data: string
  speed?: string
  price: number
  unit: string
  slug: string
  features: string[]
  popular?: boolean
  badge?: string
}

const TABS = [
  { id: 'mobil', label: 'Mobil' },
  { id: 'familie', label: 'Familie' },
  { id: 'bredband', label: 'Bredbånd' },
] as const

const PLANS: Record<string, FeaturedPlan[]> = {
  mobil: [
    {
      name: 'Standard',
      data: '1GB',
      price: 119,
      unit: '/mnd',
      slug: 'plussmobil-1gb-standard',
      features: ['Telenor 5G', 'Fri tale/SMS', 'EU inkludert'],
      badge: 'Billigst',
    },
    {
      name: 'Standard',
      data: '10GB',
      price: 198,
      unit: '/mnd',
      slug: 'plussmobil-10gb-standard',
      features: ['Telenor 5G', 'Fri tale/SMS', 'EU inkludert', '150 Mbit/s'],
      popular: true,
    },
    {
      name: 'Fri Data',
      data: 'Ubegrenset',
      speed: '150 Mbit/s',
      price: 398,
      unit: '/mnd',
      slug: 'plussmobil-fri-data-standard',
      features: ['Telenor 5G', 'Fri tale/SMS', '50GB EU/EØS', 'Ubegrenset data'],
    },
    {
      name: 'Fri Data Maks',
      data: 'Ubegrenset',
      speed: '1000 Mbit/s',
      price: 499,
      unit: '/mnd',
      slug: 'plussmobil-fri-data-maks',
      features: ['Telenor 5G', 'Fri tale/SMS', '62GB EU/EØS', 'Full hastighet'],
      badge: 'Maks',
    },
  ],
  familie: [
    {
      name: 'Familiepakke',
      data: '2GB',
      price: 218,
      unit: '/mnd',
      slug: '',
      features: ['2 medlemmer ink.', 'Del data', 'Data Rollover', 'Fri tale/SMS'],
    },
    {
      name: 'Familiepakke',
      data: '10GB',
      price: 418,
      unit: '/mnd',
      slug: '',
      features: ['2 medlemmer ink.', 'Del data', 'Data Rollover', 'Fri tale/SMS'],
      popular: true,
    },
    {
      name: 'Familiepakke',
      data: '50GB',
      price: 668,
      unit: '/mnd',
      slug: '',
      features: ['2 medlemmer ink.', 'Del data', 'Data Rollover', 'Fri tale/SMS'],
    },
    {
      name: 'Familiepakke',
      data: '80GB',
      price: 768,
      unit: '/mnd',
      slug: '',
      features: ['2 medlemmer ink.', 'Del data', 'Data Rollover', 'Fri tale/SMS'],
      badge: 'Mest data',
    },
  ],
  bredband: [
    {
      name: 'Mobilt bredbånd',
      data: '20GB',
      price: 299,
      unit: '/mnd',
      slug: '',
      features: ['Telenor-dekning', 'Ingen binding', 'Data Rollover'],
      badge: 'Billigst',
    },
    {
      name: 'Mobilt bredbånd',
      data: '50GB',
      price: 199,
      unit: '/mnd',
      slug: '',
      features: ['Telenor-dekning', 'Ingen binding', 'Data Rollover', 'Kampanje!'],
      popular: true,
      badge: 'Halv pris',
    },
    {
      name: 'Mobilt bredbånd',
      data: '100GB',
      price: 249,
      unit: '/mnd',
      slug: '',
      features: ['Telenor-dekning', 'Ingen binding', 'Data Rollover', 'Kampanje!'],
    },
    {
      name: 'Mobilt bredbånd',
      data: '200GB',
      price: 699,
      unit: '/mnd',
      slug: '',
      features: ['Telenor-dekning', 'Ingen binding', 'Data Rollover'],
    },
  ],
}

function PlanCard({ plan, index }: { plan: FeaturedPlan; index: number }) {
  const orderHref =
    plan.slug
      ? `/bestill-mobilabonnement/${plan.slug}/`
      : '/kontaktmeg'

  return (
    <AnimateOnScroll delay={index * 100}>
      <div
        className={`relative h-full bg-white rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
          plan.popular
            ? 'border-gold shadow-[0_8px_40px_rgba(245,197,24,0.12)] ring-2 ring-gold/20'
            : 'border-border shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]'
        }`}
      >
        {/* Badge */}
        {(plan.popular || plan.badge) && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <span
              className={`inline-block text-xs font-bold tracking-wide uppercase px-4 py-1 rounded-full ${
                plan.popular
                  ? 'bg-gold text-navy'
                  : 'bg-navy text-white'
              }`}
            >
              {plan.popular ? 'Mest populær' : plan.badge}
            </span>
          </div>
        )}

        <div className="p-6 sm:p-7 flex flex-col h-full">
          {/* Plan name */}
          <p className="text-text-muted text-sm font-medium">{plan.name}</p>

          {/* Data amount */}
          <div className="mt-2">
            <span className="text-3xl sm:text-4xl font-bold text-navy tracking-tight">
              {plan.data}
            </span>
            {plan.speed && (
              <span className="ml-2 text-sm text-text-muted">{plan.speed}</span>
            )}
          </div>

          {/* Price */}
          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-2xl font-bold text-text">{plan.price},-</span>
            <span className="text-text-muted text-sm">{plan.unit}</span>
          </div>

          {/* Divider */}
          <div className="my-5 h-px bg-border" />

          {/* Features */}
          <ul className="flex-1 space-y-2.5">
            {plan.features.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm text-text/80">
                <svg
                  className="w-4 h-4 text-gold shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {f}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <Link
            href={orderHref}
            className={`mt-6 flex items-center justify-center gap-2 font-semibold text-sm py-3.5 rounded-xl transition-all duration-200 ${
              plan.popular
                ? 'bg-navy text-white hover:bg-navy-600'
                : 'bg-cream text-navy hover:bg-cream-dark'
            }`}
          >
            Bestill
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </AnimateOnScroll>
  )
}

export default function PlansSection() {
  const [activeTab, setActiveTab] = useState<string>('mobil')
  const plans = PLANS[activeTab]

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <AnimateOnScroll className="text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy tracking-tight">
            Finn ditt abonnement
          </h2>
          <p className="mt-4 text-text-muted text-lg max-w-lg mx-auto">
            Velg det som passer deg best. Ingen binding, alltid noe ekstra.
          </p>
        </AnimateOnScroll>

        {/* Tabs */}
        <AnimateOnScroll delay={100} className="mt-10 flex justify-center">
          <div className="inline-flex bg-cream-dark rounded-full p-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 sm:px-8 py-2.5 text-sm font-semibold rounded-full transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-navy text-white shadow-sm'
                    : 'text-text-muted hover:text-navy'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </AnimateOnScroll>

        {/* Plan cards grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {plans.map((plan, i) => (
            <PlanCard key={`${activeTab}-${i}`} plan={plan} index={i} />
          ))}
        </div>

        {/* View all */}
        <AnimateOnScroll delay={500} className="mt-10 text-center">
          <Link
            href={activeTab === 'mobil' ? '/mobilabonnement' : activeTab === 'familie' ? '/familie' : '/mobilt-bredband'}
            className="inline-flex items-center gap-2 text-navy font-semibold hover:text-navy-600 transition-colors group"
          >
            Se alle abonnement
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
