import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-navy px-4 py-3">
      <div className="mx-auto max-w-2xl">
        <Link href="https://www.plussmobil.no/" className="inline-block">
          <Image
            src="/logo.svg"
            alt="PlussMobil"
            width={160}
            height={23}
            priority
          />
        </Link>
      </div>
    </header>
  )
}
