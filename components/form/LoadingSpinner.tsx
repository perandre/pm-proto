export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-navy" />
      <p className="text-sm text-gray-600">Sender bestilling…</p>
    </div>
  )
}
