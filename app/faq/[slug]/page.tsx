import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPostBySlug, getAllSlugs } from '../../../lib/content'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs('faq')
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug('faq', slug)
  
  if (!post) {
    return {
      title: 'FAQ Not Found | Advisora',
      description: 'The requested FAQ could not be found.'
    }
  }

  return {
    title: `${post.title} | Advisora`,
    description: post.description,
  }
}

function extractFAQs(content: string) {
  // Simple extraction of Q&A pairs from HTML content
  // This assumes H2/H3 tags are questions and following paragraphs are answers
  const qaPattern = /<h[23][^>]*>([^<]+)<\/h[23]>\s*<p>([^<]+)<\/p>/gi
  const matches = [...content.matchAll(qaPattern)]
  
  return matches.map(match => ({
    question: match[1].trim(),
    answer: match[2].trim()
  }))
}

function JsonLd({ post }: { post: any }) {
  const faqs = extractFAQs(post.content)
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export default async function FAQPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug('faq', slug)

  if (!post) {
    notFound()
  }

  return (
    <>
      <JsonLd post={post} />
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="mb-8">
            <Link 
              href="/"
              className="inline-flex items-center text-textSecondary hover:text-primary transition-colors duration-200 mb-6"
            >
              <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Advisora
            </Link>
            
            <h1 className="text-4xl font-heading font-semibold text-textPrimary mb-4">
              {post.title}
            </h1>
            
            <p className="text-xl text-textSecondary leading-relaxed">
              {post.description}
            </p>
          </div>

          <article className="prose max-w-none">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </article>

          <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <Link 
              href="/blog"
              className="inline-flex items-center text-textSecondary hover:text-primary transition-colors duration-200"
            >
              Read Our Blog
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            
            <Link 
              href="/"
              className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primaryLight text-white font-medium rounded-lg transition-colors duration-200"
            >
              Try Advisora
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}