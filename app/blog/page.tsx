import Link from 'next/link'
import { getAllPosts } from '../../lib/content'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Coaching Support Blog — Tips & Guides | Advisora',
  description: 'Expert insights on maintaining momentum between coaching sessions, voice-based reflection techniques, and AI-powered coaching companion strategies.',
}

export default async function BlogPage() {
  const posts = await getAllPosts('blog-post')

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-heading font-semibold text-textPrimary mb-6">
            Coaching Companion Blog
          </h1>
          <p className="text-lg text-textSecondary leading-relaxed mb-4">
            Discover proven strategies for maintaining coaching momentum between sessions, voice-based reflection techniques, and insights on applying thought leader frameworks to accelerate your growth journey.
          </p>
          <p className="text-textSecondary leading-relaxed">
            Bridge the gap between coaching sessions with AI-powered companion strategies and structured accountability approaches.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <h2 className="text-2xl font-heading font-semibold text-textPrimary mb-4">
                Coming Soon
              </h2>
              <p className="text-textSecondary mb-8">
                We're preparing insightful articles on coaching momentum, voice-based reflection, and AI companion strategies. Check back soon for expert guidance on maintaining growth between sessions.
              </p>
              <Link 
                href="/"
                className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primaryLight text-white font-medium rounded-lg transition-colors duration-200"
              >
                Back to Home
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <article key={post.slug} className="border border-border bg-backgroundElevated rounded-lg p-8 hover:border-primary/50 transition-colors duration-200">
                <div className="mb-4">
                  {post.date && (
                    <time className="text-sm text-textMuted">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                  )}
                </div>
                <h2 className="text-2xl font-heading font-semibold text-textPrimary mb-4 hover:text-primary transition-colors">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>
                <p className="text-textSecondary leading-relaxed mb-6">
                  {post.description}
                </p>
                <Link 
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center text-primary hover:text-primaryLight font-medium transition-colors duration-200"
                >
                  Read Article
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </article>
            ))}
          </div>
        )}

        <div className="mt-16 pt-8 border-t border-border">
          <Link 
            href="/"
            className="inline-flex items-center text-textSecondary hover:text-primary transition-colors duration-200"
          >
            <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Advisora
          </Link>
        </div>
      </div>
    </div>
  )
}