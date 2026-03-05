import type { SimType } from './products'

// Norwegian public holidays that block port dates (sourced from original site)
const UNAVAILABLE: Record<number, Record<number, number[]>> = {
  2026: {
    4: [1, 2, 3, 5, 6],
    5: [1, 14, 17, 24, 25],
    12: [24, 25, 26, 31],
  },
}

// Business day offsets per SIM type (derived from live site observation 2026-03-05)
const OFFSETS: Record<SimType, { min: number; max: number }> = {
  esim: { min: 2, max: 75 },
  physical: { min: 8, max: 75 },
}

export function addBusinessDays(date: Date, days: number): Date {
  const result = new Date(date)
  let added = 0
  while (added < days) {
    result.setDate(result.getDate() + 1)
    const dow = result.getDay()
    if (dow !== 0 && dow !== 6) added++
  }
  return result
}

export function isDateUnavailable(date: Date): boolean {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const dow = date.getDay()
  if (dow === 0 || dow === 6) return true
  return UNAVAILABLE[year]?.[month]?.includes(day) ?? false
}

export function getPortDateRange(simType: SimType): { min: Date; max: Date; default: Date } {
  const today = new Date()
  const { min: minOffset, max: maxOffset } = OFFSETS[simType]
  let minDate = addBusinessDays(today, minOffset)
  // Skip unavailable dates for the min
  while (isDateUnavailable(minDate)) {
    minDate.setDate(minDate.getDate() + 1)
  }
  const maxDate = addBusinessDays(today, maxOffset)
  return { min: minDate, max: maxDate, default: minDate }
}

export function formatDate(date: Date): string {
  const d = String(date.getDate()).padStart(2, '0')
  const m = String(date.getMonth() + 1).padStart(2, '0')
  return `${d}.${m}.${date.getFullYear()}`
}

export function defaultPortDate(simType: SimType): string {
  return formatDate(getPortDateRange(simType).default)
}
