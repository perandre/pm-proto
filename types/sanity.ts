export interface OrderTexts {
  ownerSectionHeader?: string
  subscriberSectionHeader?: string
  portKeepLabel?: string
  portKeepFee?: string
  portNewLabel?: string
  portNewFee?: string
  simPhysicalLabel?: string
  simEsimLabel?: string
  esimTooltip?: string
  esimDisabledNote?: string
  directoryListingLabel?: string
  directoryListingInfo?: string
  discountToggleLabel?: string
  termsPrefix?: string
  termsLinkLabel?: string
  privacyLinkLabel?: string
  submitLabel?: string
  loadingText?: string
  receiptHeading?: string
  receiptBody?: string
  esimQrHeading?: string
  esimQrInstruction?: string
}

export interface SiteSettings {
  siteName?: string
  contactPhone?: string
  contactEmail?: string
  termsUrl?: string
  privacyUrl?: string
  nav?: { links?: { label: string; href: string }[] }
  footer?: {
    columns?: { heading: string; links: { label: string; href: string }[] }[]
    legalText?: string
    socialLinks?: { platform: string; url: string }[]
  }
}

export interface FaqItem {
  _id: string
  question: string
  answer: unknown[] // Portable Text
  category?: string
}

export interface ArticleSummary {
  _id: string
  title: string
  slug: string
  publishedAt: string
  excerpt?: string
  heroImage?: unknown
}
