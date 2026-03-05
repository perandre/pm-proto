import type { OwnerState, SubscriptionState } from '@/types/order'

export type OwnerErrors = Partial<Record<keyof OwnerState, string>>
export type SubscriptionErrors = Partial<Record<keyof SubscriptionState, string>>

function isNorwegianMobile(v: string): boolean {
  return /^[49]\d{7}$/.test(v.replace(/\s/g, ''))
}

function isPersonalId(v: string): boolean {
  return /^\d{11}$/.test(v)
}

export function validateOwner(state: OwnerState): OwnerErrors {
  const errors: OwnerErrors = {}
  if (!state.name.trim()) errors.name = 'Navn er påkrevd'
  if (!isNorwegianMobile(state.phone)) errors.phone = 'Ugyldig norsk mobilnummer'
  if (!state.email.includes('@')) errors.email = 'Ugyldig e-postadresse'
  if (!isPersonalId(state.personalId)) errors.personalId = 'Fødselsnummer må være 11 siffer'
  if (!state.termsAccepted) errors.termsAccepted = 'Du må godta vilkårene'
  return errors
}

export function validateSubscription(state: SubscriptionState): SubscriptionErrors {
  const errors: SubscriptionErrors = {}
  if (!state.subscriberIsOwner) {
    if (!state.subscriberName.trim()) errors.subscriberName = 'Navn er påkrevd'
    if (!state.subscriberBirthdate.trim()) errors.subscriberBirthdate = 'Fødselsdato er påkrevd'
  }
  if (state.portExistingNumber && !isNorwegianMobile(state.existingNumber)) {
    errors.existingNumber = 'Ugyldig norsk mobilnummer'
  }
  if (!state.portDate.trim()) errors.portDate = 'Dato er påkrevd'
  return errors
}

export function hasErrors(errors: Record<string, string | undefined>): boolean {
  return Object.values(errors).some(Boolean)
}
