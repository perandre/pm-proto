import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'faqItem',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({ name: 'question', title: 'Spørsmål', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'answer', title: 'Svar', type: 'array', of: [{ type: 'block' }], validation: (r) => r.required() }),
    defineField({ name: 'category', title: 'Kategori', type: 'string', options: { list: ['Abonnement', 'eSIM', 'Familie', 'Betaling', 'Generelt'] } }),
    defineField({ name: 'order', title: 'Rekkefølge', type: 'number' }),
    defineField({ name: 'active', title: 'Aktiv', type: 'boolean', initialValue: true }),
  ],
  orderings: [{ title: 'Rekkefølge', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'question', subtitle: 'category' },
  },
})
