interface LoadingSpinnerProps { text?: string }

export default function LoadingSpinner({ text }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-navy" />
      <p className="text-sm text-gray-600">{text ?? 'Sender bestilling…'}</p>
    </div>
  )
}
