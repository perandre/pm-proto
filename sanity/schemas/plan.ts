import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'plan',
  title: 'Abonnement',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Navn', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: (r) => r.required() }),
    defineField({ name: 'variantId', title: 'Backend Variant ID', type: 'string', validation: (r) => r.required(), description: 'Must match the backend exactly — do not change without coordinating with dev.' }),
    defineField({ name: 'gaItemId', title: 'GA4 Item ID', type: 'string' }),
    defineField({
      name: 'group',
      title: 'Gruppe',
      type: 'string',
      options: { list: [{ title: 'Individuell', value: 'individual' }, { title: 'Familie', value: 'family' }], layout: 'radio' },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'price', title: 'Pris (kr/mnd)', type: 'number', validation: (r) => r.required().min(0) }),
    defineField({ name: 'highlightsHeader', title: 'Highlights-overskrift', type: 'string' }),
    defineField({ name: 'highlights', title: 'Funksjoner', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'order', title: 'Rekkefølge', type: 'number', validation: (r) => r.required() }),
    defineField({ name: 'active', title: 'Aktiv', type: 'boolean', initialValue: true }),
    defineField({ name: 'dataPrice', title: 'Data-pris (kun familie)', type: 'number' }),
    defineField({ name: 'membershipPrice', title: 'Medlemspris (kun familie)', type: 'number' }),
  ],
  orderings: [
    { title: 'Rekkefølge', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'name', subtitle: 'price' },
    prepare({ title, subtitle }) {
      return { title, subtitle: subtitle != null ? `${subtitle},- /mnd` : '' }
    },
  },
})
