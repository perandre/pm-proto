import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Nettstedsinnstillinger',
  type: 'document',
  fields: [
    defineField({ name: 'siteName', title: 'Nettstedsnavn', type: 'string' }),
    defineField({ name: 'contactPhone', title: 'Telefonnummer', type: 'string' }),
    defineField({ name: 'contactEmail', title: 'E-post', type: 'string' }),
    defineField({ name: 'termsUrl', title: 'URL til vilkår', type: 'url' }),
    defineField({ name: 'privacyUrl', title: 'URL til personvernerklæring', type: 'url' }),
    defineField({ name: 'nav', title: 'Navigasjon', type: 'object', fields: [
      defineField({ name: 'links', title: 'Lenker', type: 'array', of: [{
        type: 'object',
        fields: [
          defineField({ name: 'label', title: 'Tekst', type: 'string' }),
          defineField({ name: 'href', title: 'URL', type: 'string' }),
        ],
        preview: { select: { title: 'label', subtitle: 'href' } },
      }]}),
    ]}),
    defineField({ name: 'footer', title: 'Footer', type: 'object', fields: [
      defineField({ name: 'columns', title: 'Kolonner', type: 'array', of: [{
        type: 'object',
        fields: [
          defineField({ name: 'heading', title: 'Overskrift', type: 'string' }),
          defineField({ name: 'links', title: 'Lenker', type: 'array', of: [{
            type: 'object',
            fields: [
              defineField({ name: 'label', title: 'Tekst', type: 'string' }),
              defineField({ name: 'href', title: 'URL', type: 'string' }),
            ],
            preview: { select: { title: 'label' } },
          }]}),
        ],
        preview: { select: { title: 'heading' } },
      }]}),
      defineField({ name: 'legalText', title: 'Juridisk tekst', type: 'string' }),
      defineField({ name: 'socialLinks', title: 'Sosiale medier', type: 'array', of: [{
        type: 'object',
        fields: [
          defineField({ name: 'platform', title: 'Platform', type: 'string', options: { list: ['Facebook', 'Instagram', 'Twitter', 'LinkedIn', 'YouTube'] } }),
          defineField({ name: 'url', title: 'URL', type: 'url' }),
        ],
        preview: { select: { title: 'platform', subtitle: 'url' } },
      }]}),
    ]}),
  ],
  preview: { prepare: () => ({ title: 'Nettstedsinnstillinger' }) },
})
