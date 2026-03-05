import type { Plan } from '@/lib/products'
import type { OrderTexts } from '@/types/sanity'

interface ReceiptProps {
  plan: Plan
  ownerName: string
  ownerEmail: string
  isEsim: boolean
  texts?: OrderTexts
}

export default function Receipt({ plan, ownerName, ownerEmail, isEsim, texts }: ReceiptProps) {
  const t = texts ?? {}
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 flex flex-col items-center gap-5 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
        <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-900">{t.receiptHeading ?? 'Bestilling mottatt!'}</h2>
        <p className="mt-1 text-sm text-gray-600">
          Takk, {ownerName}. {t.receiptBody ?? 'Vi har sendt en bekreftelse til'}{' '}
          <strong>{ownerEmail}</strong>.
        </p>
      </div>

      <div className="w-full rounded-xl border border-dashed border-gray-300 p-4 text-left text-sm">
        <p className="font-bold text-navy mb-1">{plan.name}</p>
        <p className="text-gray-600">{plan.price},- /mnd</p>
      </div>

      {isEsim && (
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm font-semibold text-gray-900">{t.esimQrHeading ?? 'Din eSIM QR-kode'}</p>
          {/* In Phase 2 this will show the real QR code from the API */}
          <div className="flex h-40 w-40 items-center justify-center rounded-xl bg-gray-100 text-xs text-gray-400">
            QR-kode vises her
          </div>
          <p className="text-xs text-gray-500 max-w-xs">
            {t.esimQrInstruction ?? 'Skann koden med telefonen din for å aktivere eSIM-kortet.'}
          </p>
        </div>
      )}

      <a
        href="https://www.plussmobil.no/"
        className="rounded-full bg-navy px-8 py-3 text-sm font-semibold text-white hover:opacity-90 transition"
      >
        Tilbake til plussmobil.no
      </a>
    </div>
  )
}
