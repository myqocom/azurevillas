import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

export const SANITY_PROJECT_ID = 'h3n6kn72'
export const SANITY_DATASET = 'production'
export const ORGANIZATION_ID = '16663100-c0a9-4425-8396-33d83e6ad3c8'

export const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: '2026-03-06',
  useCdn: true,
})

const builder = createImageUrlBuilder({ projectId: SANITY_PROJECT_ID, dataset: SANITY_DATASET })

export function urlFor(source: any) {
  return builder.image(source).auto('format').quality(90)
}
