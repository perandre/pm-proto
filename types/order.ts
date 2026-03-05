import type { SimType } from '@/lib/products'

export interface OwnerState {
  name: string
  phone: string
  email: string
  personalId: string
  termsAccepted: boolean
  discountCode: string
}

export interface SubscriptionState {
  subscriberIsOwner: boolean
  subscriberName: string
  subscriberBirthdate: string
  portExistingNumber: boolean
  existingNumber: string
  directoryListing: boolean
  simType: SimType
  portDate: string
}

export interface SingleFormState {
  planVariantId: string
  owner: OwnerState
  subscription: SubscriptionState
}

export interface FamilyMember {
  subscriberName: string
  subscriberBirthdate: string
  portExistingNumber: boolean
  existingNumber: string
  directoryListing: boolean
  simType: SimType
  portDate: string
}

export interface FamilyFormState {
  planVariantId: string
  owner: OwnerState
  members: FamilyMember[]
}

export type UIState = 'form' | 'loading' | 'receipt'
