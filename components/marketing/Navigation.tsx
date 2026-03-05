'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const NAV_LINKS = [
  { href: '/mobilabonnement', label: 'Mobilabonnement' },
  { href: '/familie', label: 'Familie' },
  { href: '/mobilt-bredband', label: 'Mobilt bredbånd' },
  { href: '/bedrift', label: 'Bedrift' },
  { href: '/kundeservice', label: 'Kundeservice' },
  { href: '/plussfordeler', label: 'PlussFordeler' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.06)]'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 flex items-center justify-between h-16 lg:h-[72px]">
          {/* Logo */}
          <Link href="/" className="relative z-10 shrink-0">
            <Image
              src="/logo.svg"
              alt="PlussMobil"
              width={148}
              height={21}
              priority
              className={`transition-all duration-300 ${
                scrolled ? '[filter:brightness(0)_saturate(100%)_invert(8%)_sepia(30%)_saturate(1200%)_hue-rotate(185deg)]' : ''
              }`}
            />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-2 text-[0.9rem] font-medium rounded-lg transition-colors duration-200 ${
                  scrolled
                    ? 'text-navy-600 hover:text-navy hover:bg-cream'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <Link
              href="https://minside-plussmobil.no/"
              className={`hidden xl:inline-flex text-sm font-medium transition-colors ${
                scrolled ? 'text-navy-500 hover:text-navy' : 'text-white/70 hover:text-white'
              }`}
            >
              Min Side
            </Link>
            <Link
              href="/bestill-mobilabonnement/plussmobil-10gb-standard/"
              className="hidden sm:inline-flex items-center gap-2 bg-gold text-navy font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-gold-dark transition-colors duration-200 shadow-[0_2px_8px_rgba(245,197,24,0.3)]"
            >
              Bestill nå
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden relative z-10 p-2 -mr-2"
              aria-label={menuOpen ? 'Lukk meny' : 'Åpne meny'}
            >
              <div className="w-6 h-[18px] flex flex-col justify-between">
                <span
                  className={`block h-[2px] w-full rounded-full transition-all duration-300 origin-center ${
                    menuOpen
                      ? 'rotate-45 translate-y-2 bg-navy'
                      : scrolled
                        ? 'bg-navy'
                        : 'bg-white'
                  }`}
                />
                <span
                  className={`block h-[2px] w-full rounded-full transition-all duration-300 ${
                    menuOpen ? 'opacity-0 scale-x-0' : scrolled ? 'bg-navy' : 'bg-white'
                  }`}
                />
                <span
                  className={`block h-[2px] w-full rounded-full transition-all duration-300 origin-center ${
                    menuOpen
                      ? '-rotate-45 -translate-y-2 bg-navy'
                      : scrolled
                        ? 'bg-navy'
                        : 'bg-white'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          menuOpen ? 'visible' : 'invisible pointer-events-none'
        }`}
      >
        <div
          className={`absolute inset-0 bg-navy/40 backdrop-blur-sm transition-opacity duration-300 ${
            menuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 h-full w-[300px] max-w-[85vw] bg-white shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="pt-24 pb-8 px-6 h-full overflow-y-auto flex flex-col">
            <div className="flex flex-col gap-0.5">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-3.5 text-navy text-[1.05rem] font-medium rounded-xl hover:bg-cream transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-border flex flex-col gap-3">
              <Link
                href="/bestill-mobilabonnement/plussmobil-10gb-standard/"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center bg-gold text-navy font-bold text-[0.95rem] px-6 py-3.5 rounded-full hover:bg-gold-dark transition-colors"
              >
                Bestill nå
              </Link>
              <Link
                href="https://minside-plussmobil.no/"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center text-navy-600 font-medium text-[0.95rem] px-6 py-3.5 rounded-full border border-border hover:bg-cream transition-colors"
              >
                Min Side
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
