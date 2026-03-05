import { defineField, defineType, defineArrayMember } from 'sanity'

// ── Section block types ──────────────────────────────────────────────────────

const heroSection = defineArrayMember({
  name: 'heroSection',
  title: 'Hero',
  type: 'object',
  fields: [
    defineField({ name: 'headline', title: 'Overskrift', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'highlightText', title: 'Fremhevet tekst (gull)', type: 'string' }),
    defineField({ name: 'subtext', title: 'Undertekst', type: 'text', rows: 2 }),
    defineField({ name: 'ctaLabel', title: 'CTA-knapp tekst', type: 'string' }),
    defineField({ name: 'ctaHref', title: 'CTA-lenke', type: 'string' }),
    defineField({ name: 'secondaryCtaLabel', title: 'Sekundær CTA tekst', type: 'string' }),
    defineField({ name: 'secondaryCtaHref', title: 'Sekundær CTA lenke', type: 'string' }),
    defineField({ name: 'badges', title: 'Badges', type: 'array', of: [{ type: 'string' }] }),
  ],
  preview: { select: { title: 'headline' }, prepare: ({ title }) => ({ title: `Hero: ${title}` }) },
})

const plansSection = defineArrayMember({
  name: 'plansSection',
  title: 'Abonnementsoversikt',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Overskrift', type: 'string' }),
    defineField({ name: 'subheading', title: 'Underoverskrift', type: 'string' }),
    defineField({ name: 'showViewAll', title: 'Vis "Se alle" lenke', type: 'boolean', initialValue: false }),
  ],
  preview: { select: { title: 'heading' }, prepare: ({ title }) => ({ title: `Abonnementer: ${title ?? ''}` }) },
})

const benefitsSection = defineArrayMember({
  name: 'benefitsSection',
  title: 'Fordeler',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', title: 'Øyenbryn', type: 'string' }),
    defineField({ name: 'heading', title: 'Overskrift', type: 'string' }),
    defineField({ name: 'subheading', title: 'Underoverskrift', type: 'string' }),
    defineField({ name: 'items', title: 'Fordeler', type: 'array', of: [{
      type: 'object',
      fields: [
        defineField({ name: 'icon', title: 'Ikon (emoji eller navn)', type: 'string' }),
        defineField({ name: 'title', title: 'Tittel', type: 'string' }),
        defineField({ name: 'description', title: 'Beskrivelse', type: 'string' }),
        defineField({ name: 'color', title: 'Fargeklasse', type: 'string' }),
      ],
      preview: { select: { title: 'title', subtitle: 'description' } },
    }]}),
  ],
  preview: { select: { title: 'heading' }, prepare: ({ title }) => ({ title: `Fordeler: ${title ?? ''}` }) },
})

const trustSection = defineArrayMember({
  name: 'trustSection',
  title: 'Tillit & statistikk',
  type: 'object',
  fields: [
    defineField({ name: 'stats', title: 'Statistikk', type: 'array', of: [{
      type: 'object',
      fields: [
        defineField({ name: 'value', title: 'Verdi', type: 'string' }),
        defineField({ name: 'label', title: 'Etikett', type: 'string' }),
        defineField({ name: 'sub', title: 'Undertekst', type: 'string' }),
      ],
      preview: { select: { title: 'value', subtitle: 'label' } },
    }]}),
    defineField({ name: 'quote', title: 'Sitat', type: 'text', rows: 2 }),
    defineField({ name: 'quoteAuthor', title: 'Sitatforfatter', type: 'string' }),
    defineField({ name: 'badge', title: 'Badge-tekst', type: 'string' }),
  ],
  preview: { prepare: () => ({ title: 'Tillit & statistikk' }) },
})

const stepsSection = defineArrayMember({
  name: 'stepsSection',
  title: 'Steg / Slik gjør du det',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Overskrift', type: 'string' }),
    defineField({ name: 'subheading', title: 'Underoverskrift', type: 'string' }),
    defineField({ name: 'steps', title: 'Steg', type: 'array', of: [{
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Tittel', type: 'string' }),
        defineField({ name: 'description', title: 'Beskrivelse', type: 'string' }),
        defineField({ name: 'icon', title: 'Ikon', type: 'string' }),
      ],
      preview: { select: { title: 'title' } },
    }]}),
    defineField({ name: 'ctaLabel', title: 'CTA-knapp tekst', type: 'string' }),
    defineField({ name: 'ctaHref', title: 'CTA-lenke', type: 'string' }),
  ],
  preview: { select: { title: 'heading' }, prepare: ({ title }) => ({ title: `Steg: ${title ?? ''}` }) },
})

const faqSection = defineArrayMember({
  name: 'faqSection',
  title: 'FAQ',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Overskrift', type: 'string' }),
    defineField({ name: 'subheading', title: 'Underoverskrift', type: 'string' }),
    defineField({ name: 'items', title: 'FAQ-elementer', type: 'array', of: [{ type: 'reference', to: [{ type: 'faqItem' }] }] }),
  ],
  preview: { select: { title: 'heading' }, prepare: ({ title }) => ({ title: `FAQ: ${title ?? ''}` }) },
})

const richTextSection = defineArrayMember({
  name: 'richTextSection',
  title: 'Rik tekst',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Overskrift', type: 'string' }),
    defineField({ name: 'body', title: 'Innhold', type: 'array', of: [{ type: 'block' }] }),
  ],
  preview: { select: { title: 'heading' }, prepare: ({ title }) => ({ title: `Tekst: ${title ?? ''}` }) },
})

const contactFormSection = defineArrayMember({
  name: 'contactFormSection',
  title: 'Kontaktskjema',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Overskrift', type: 'string' }),
    defineField({ name: 'subheading', title: 'Underoverskrift', type: 'string' }),
  ],
  preview: { select: { title: 'heading' }, prepare: ({ title }) => ({ title: `Kontakt: ${title ?? ''}` }) },
})

const productGridSection = defineArrayMember({
  name: 'productGridSection',
  title: 'Produktgrid',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Overskrift', type: 'string' }),
    defineField({ name: 'subheading', title: 'Underoverskrift', type: 'string' }),
    defineField({ name: 'products', title: 'Produkter', type: 'array', of: [{ type: 'reference', to: [{ type: 'plan' }] }] }),
    defineField({ name: 'columns', title: 'Kolonner', type: 'number', initialValue: 3 }),
  ],
  preview: { select: { title: 'heading' }, prepare: ({ title }) => ({ title: `Produktgrid: ${title ?? ''}` }) },
})

const supportCategoriesSection = defineArrayMember({
  name: 'supportCategoriesSection',
  title: 'Støttekategorier',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Overskrift', type: 'string' }),
    defineField({ name: 'categories', title: 'Kategorier', type: 'array', of: [{
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Tittel', type: 'string' }),
        defineField({ name: 'icon', title: 'Ikon', type: 'string' }),
        defineField({ name: 'href', title: 'Lenke', type: 'string' }),
        defineField({ name: 'description', title: 'Beskrivelse', type: 'string' }),
      ],
      preview: { select: { title: 'title' } },
    }]}),
  ],
  preview: { select: { title: 'heading' }, prepare: ({ title }) => ({ title: `Støtte: ${title ?? ''}` }) },
})

// ── Page document ─────────────────────────────────────────────────────────────

export default defineType({
  name: 'page',
  title: 'Side',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Sidetittel', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug (URL-bane)', type: 'slug', options: { source: 'title' }, validation: (r) => r.required(), description: 'Bruk "/" for forsiden' }),
    defineField({ name: 'seo', title: 'SEO', type: 'object', fields: [
      defineField({ name: 'title', title: 'SEO-tittel (overskriver sidetittel)', type: 'string' }),
      defineField({ name: 'description', title: 'Meta-beskrivelse', type: 'text', rows: 2 }),
      defineField({ name: 'image', title: 'OG-bilde', type: 'image' }),
    ]}),
    defineField({
      name: 'sections',
      title: 'Seksjoner',
      type: 'array',
      of: [
        heroSection,
        plansSection,
        benefitsSection,
        trustSection,
        stepsSection,
        faqSection,
        richTextSection,
        contactFormSection,
        productGridSection,
        supportCategoriesSection,
      ],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'slug.current' },
  },
})
