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
  ],
  preview: {
    select: { title: 'siteName' },
  },
})
