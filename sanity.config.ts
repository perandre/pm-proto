import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import type { StructureBuilder } from 'sanity/structure'
import { schemaTypes } from './sanity/schema'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'

function structure(S: StructureBuilder) {
  return S.list()
    .title('Innhold')
    .items([
      S.listItem()
        .title('Abonnementer')
        .child(S.documentTypeList('plan').title('Abonnementer')),

      S.listItem()
        .title('Sider')
        .child(S.documentTypeList('page').title('Sider')),

      S.listItem()
        .title('Artikler')
        .child(S.documentTypeList('article').title('Artikler')),

      S.listItem()
        .title('FAQ')
        .child(S.documentTypeList('faqItem').title('FAQ')),

      S.divider(),

      S.listItem()
        .title('Nettstedsinnstillinger')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Nettstedsinnstillinger')
        ),

      S.listItem()
        .title('Bestillingsskjema — tekster')
        .child(
          S.document()
            .schemaType('orderTexts')
            .documentId('orderTexts')
            .title('Bestillingsskjema — tekster')
        ),
    ])
}

export default defineConfig({
  name: 'plussmobil',
  title: 'PlussMobil',
  projectId,
  dataset,
  basePath: '/studio',
  plugins: [structureTool({ structure }), visionTool()],
  schema: { types: schemaTypes },
})
