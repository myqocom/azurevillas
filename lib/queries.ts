import { ORGANIZATION_ID } from './sanity'

export const POSTS_QUERY = /* groq */ `
  *[_type == "post" && organization._ref == "${ORGANIZATION_ID}"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    heroImage {
      asset->{ _id, url, metadata { lqip, dimensions } },
      alt
    },
    categories[]->{ _id, title, "slug": slug.current },
    authors[]->{ _id, name }
  }
`

export const POST_BY_SLUG_QUERY = /* groq */ `
  *[_type == "post" && organization._ref == "${ORGANIZATION_ID}" && slug.current == $slug][0] {
    _id,
    title,
    subtitle,
    "slug": slug.current,
    excerpt,
    publishedAt,
    heroImage {
      asset->{ _id, url, metadata { lqip, dimensions } },
      alt
    },
    body[] {
      ...,
      _type == "image" => {
        asset->{ _id, url, metadata { lqip, dimensions } },
        alt,
        caption
      }
    },
    categories[]->{ _id, title, "slug": slug.current },
    authors[]->{ _id, name, image { asset->{ url } }, bio },
    meta,
    "related": *[
      _type == "post"
      && organization._ref == "${ORGANIZATION_ID}"
      && slug.current != $slug
    ] | order(publishedAt desc) [0...3] {
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      heroImage {
        asset->{ _id, url, metadata { lqip } },
        alt
      },
      categories[]->{ _id, title, "slug": slug.current }
    }
  }
`

export const POST_SLUGS_QUERY = /* groq */ `
  *[_type == "post" && organization._ref == "${ORGANIZATION_ID}" && defined(slug.current)] {
    "slug": slug.current
  }
`
