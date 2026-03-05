import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'article',
  title: 'Artikkel',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Tittel', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({ name: 'publishedAt', title: 'Publisert', type: 'datetime', validation: (r) => r.required() }),
    defineField({ name: 'excerpt', title: 'Ingress', type: 'text', rows: 3 }),
    defineField({ name: 'heroImage', title: 'Forsidebilde', type: 'image', options: { hotspot: true }, fields: [
      defineField({ name: 'alt', type: 'string', title: 'Alt-tekst' }),
    ]}),
    defineField({ name: 'body', title: 'Innhold', type: 'array', of: [
      { type: 'block' },
      { type: 'image', options: { hotspot: true }, fields: [
        defineField({ name: 'alt', type: 'string', title: 'Alt-tekst' }),
        defineField({ name: 'caption', type: 'string', title: 'Bildetekst' }),
      ]},
    ]}),
    defineField({ name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' } }),
    defineField({ name: 'active', title: 'Publisert', type: 'boolean', initialValue: true }),
  ],
  orderings: [{ title: 'Nyeste først', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] }],
  preview: {
    select: { title: 'title', media: 'heroImage', subtitle: 'publishedAt' },
    prepare({ title, media, subtitle }) {
      return { title, media, subtitle: subtitle ? new Date(subtitle).toLocaleDateString('no') : '' }
    },
  },
})
