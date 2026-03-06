import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { ScrollReveal } from '@/components/ScrollReveal'
import BlurRevealText from '@/components/BlurRevealText'
import { client, urlFor } from '@/lib/sanity'
import { POSTS_QUERY } from '@/lib/queries'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Blog | Azzura Villas Lefkada',
  description:
    'Travel tips, local guides, and stories from Lefkada. Explore Vasiliki, the Ionian coast, and everything around Azzura Villas.',
  alternates: {
    canonical: 'https://azzuravillas.gr/blog',
  },
  openGraph: {
    title: 'Blog | Azzura Villas Lefkada',
    description:
      'Travel tips, local guides, and stories from Lefkada. Explore Vasiliki, the Ionian coast, and everything around Azzura Villas.',
    url: 'https://azzuravillas.gr/blog',
    siteName: 'Azzura Villas',
    images: [{ url: '/media/web/brand/og-image.jpg', width: 1200, height: 630 }],
    locale: 'en_GR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Azzura Villas Lefkada',
    description:
      'Travel tips, local guides, and stories from Lefkada. Explore Vasiliki, the Ionian coast, and everything around Azzura Villas.',
    images: ['/media/web/brand/og-image.jpg'],
  },
}

interface SanityPost {
  _id: string
  title: string
  slug: string
  excerpt: string
  publishedAt: string
  heroImage?: {
    asset?: { _id: string; url: string; metadata?: { lqip?: string; dimensions?: { width: number; height: number } } }
    alt?: string
  }
  categories?: { _id: string; title: string; slug: string }[]
  authors?: { _id: string; name: string }[]
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export default async function BlogPage() {
  const posts: SanityPost[] = await client.fetch(POSTS_QUERY)

  return (
    <>
      <Nav />
      <ScrollReveal />

      {/* Hero */}
      <div className="blog-hero">
        <div className="blog-hero__inner reveal">
          <p className="section-label" style={{ color: 'var(--taupe)' }}>Journal</p>
          <BlurRevealText
            text="Stories from Lefkada"
            accentWord="Lefkada"
            as="h1"
            className="blog-hero__heading"
          />
          <p className="blog-hero__sub">
            Travel guides, local tips, and everything you need to know
            before your stay at Azzura Villas.
          </p>
        </div>
      </div>

      {/* Posts grid */}
      <main className="blog-main">
        {posts.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--dark)', padding: '60px 20px', fontSize: '1rem' }}>
            No posts yet. Check back soon.
          </p>
        ) : (
          <div className="blog-grid">
            {posts.map((post, i) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug}`}
                className={`blog-card reveal reveal-d${Math.min(i + 1, 4)}`}
              >
                <div className="blog-card__image">
                  {post.heroImage?.asset ? (
                    <Image
                      src={urlFor(post.heroImage).width(1200).height(750).url()}
                      alt={post.heroImage.alt || post.title}
                      fill
                      sizes="(max-width: 809px) 100vw, 50vw"
                      placeholder={post.heroImage.asset.metadata?.lqip ? 'blur' : 'empty'}
                      blurDataURL={post.heroImage.asset.metadata?.lqip}
                    />
                  ) : (
                    <div style={{ width: '100%', height: '100%', background: 'var(--bg)' }} />
                  )}
                </div>
                <div className="blog-card__body">
                  <div className="blog-card__meta">
                    {post.categories?.[0] && (
                      <span className="blog-card__category">{post.categories[0].title}</span>
                    )}
                    <span className="blog-card__date">{formatDate(post.publishedAt)}</span>
                  </div>
                  <h2 className="blog-card__title">{post.title}</h2>
                  {post.excerpt && <p className="blog-card__excerpt">{post.excerpt}</p>}
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </>
  )
}
