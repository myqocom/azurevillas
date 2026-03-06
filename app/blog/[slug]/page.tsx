import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PortableText, type PortableTextReactComponents } from '@portabletext/react'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { ScrollReveal } from '@/components/ScrollReveal'
import { client, urlFor } from '@/lib/sanity'
import { POST_BY_SLUG_QUERY, POST_SLUGS_QUERY } from '@/lib/queries'

export const revalidate = 60

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function estimateReadTime(body: any[]): number {
  if (!body) return 0
  const text = body
    .filter((b: any) => b._type === 'block')
    .map((b: any) => b.children?.map((c: any) => c.text).join('') || '')
    .join(' ')
  return Math.max(1, Math.ceil(text.split(/\s+/).length / 230))
}

export async function generateStaticParams() {
  const slugs: { slug: string }[] = await client.fetch(POST_SLUGS_QUERY)
  return slugs.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await client.fetch(POST_BY_SLUG_QUERY, { slug })
  if (!post) return { title: 'Post Not Found' }

  const title = post.meta?.title || post.title
  const description = post.meta?.description || post.excerpt || ''
  const imageUrl = post.heroImage?.asset
    ? urlFor(post.heroImage).width(1200).height(630).url()
    : '/media/web/brand/og-image.jpg'

  return {
    title: `${title} | Azzura Villas Blog`,
    description,
    alternates: { canonical: `https://azzuravillas.gr/blog/${slug}` },
    openGraph: {
      title,
      description,
      url: `https://azzuravillas.gr/blog/${slug}`,
      siteName: 'Azzura Villas',
      images: [{ url: imageUrl, width: 1200, height: 630 }],
      locale: 'en_GR',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  }
}

const portableTextComponents: Partial<PortableTextReactComponents> = {
  marks: {
    link: ({ value, children }: { value?: any; children?: React.ReactNode }) => {
      const href = value?.href || ''
      if (href.startsWith('/')) {
        return <Link href={href}>{children}</Link>
      }
      return <a href={href} target="_blank" rel="noopener">{children}</a>
    },
  },
  types: {
    image: ({ value }: { value: any }) => {
      if (!value?.asset) return null
      return (
        <figure className="post-content__figure">
          <Image
            src={urlFor(value).width(1400).url()}
            alt={value.alt || ''}
            width={1400}
            height={840}
            style={{ width: '100%', height: 'auto', borderRadius: '12px' }}
          />
          {value.caption && (
            <figcaption className="post-content__caption">{value.caption}</figcaption>
          )}
        </figure>
      )
    },
  },
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await client.fetch(POST_BY_SLUG_QUERY, { slug })
  if (!post) notFound()

  const related = post.related || []
  const readTime = estimateReadTime(post.body)

  return (
    <>
      <Nav />
      <ScrollReveal />

      {/* Hero */}
      <div className="post-hero">
        <div className="post-hero__inner reveal">
          <div className="post-hero__meta">
            {post.categories?.map((cat: any) => (
              <span key={cat._id} className="post-hero__category">{cat.title}</span>
            ))}
            <span className="post-hero__date">{formatDate(post.publishedAt)}</span>
            {readTime > 0 && (
              <span className="post-hero__read-time">{readTime} min read</span>
            )}
          </div>
          <h1 className="post-hero__title">{post.title}</h1>
          {post.excerpt && <p className="post-hero__excerpt">{post.excerpt}</p>}
        </div>
        {post.heroImage?.asset && (
          <div className="post-hero__image reveal">
            <Image
              src={urlFor(post.heroImage).width(1920).height(1080).url()}
              alt={post.heroImage.alt || post.title}
              fill
              sizes="(max-width: 809px) 100vw, 1000px"
              priority
              placeholder={post.heroImage.asset.metadata?.lqip ? 'blur' : 'empty'}
              blurDataURL={post.heroImage.asset.metadata?.lqip}
            />
          </div>
        )}
      </div>

      {/* Article body */}
      <main className="post-body">
        <article className="post-content">
          {post.body && <PortableText value={post.body} components={portableTextComponents} />}
        </article>
      </main>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="post-related">
          <h2 className="post-related__heading">Keep reading</h2>
          <div className="post-related__grid">
            {related.map((r: any) => (
              <Link key={r._id} href={`/blog/${r.slug}`} className="blog-card">
                <div className="blog-card__image">
                  {r.heroImage?.asset ? (
                    <Image
                      src={urlFor(r.heroImage).width(800).height(500).url()}
                      alt={r.heroImage.alt || r.title}
                      fill
                      sizes="(max-width: 809px) 100vw, 33vw"
                      placeholder={r.heroImage.asset.metadata?.lqip ? 'blur' : 'empty'}
                      blurDataURL={r.heroImage.asset.metadata?.lqip}
                    />
                  ) : (
                    <div style={{ width: '100%', height: '100%', background: 'var(--bg)' }} />
                  )}
                </div>
                <div className="blog-card__body">
                  <div className="blog-card__meta">
                    {r.categories?.[0] && (
                      <span className="blog-card__category">{r.categories[0].title}</span>
                    )}
                    <span className="blog-card__date">{formatDate(r.publishedAt)}</span>
                  </div>
                  <h3 className="blog-card__title">{r.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <Footer />
    </>
  )
}
