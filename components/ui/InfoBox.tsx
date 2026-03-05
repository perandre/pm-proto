export default function InfoBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-yellow-50 border border-yellow-200 px-4 py-3 text-sm text-gray-700">
      {children}
    </div>
  )
}
