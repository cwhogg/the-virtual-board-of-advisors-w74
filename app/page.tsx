'use client'

import { useState } from 'react'
import JsonLd from '../components/content/JsonLd'

const organizationSchema = {
  "@type": "Organization",
  "name": "Advisora",
  "url": "https://advisora.com",
  "description": "AI coaching companion providing voice-based reflection and thought leader guidance between coaching sessions",
  "sameAs": [
    "https://advisora.com"
  ]
}

const websiteSchema = {
  "@type": "WebSite",
  "name": "Advisora",
  "url": "https://advisora.com",
  "description": "AI coaching companion providing voice-based reflection and thought leader guidance between coaching sessions"
}

const faqSchema = {
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the 70 30 rule in coaching?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The 70-30 rule suggests that 70% of development comes from on-the-job experiences and challenges, while 30% comes from formal coaching and learning. Advisora bridges this gap by providing AI coaching support during that crucial 70% period between your formal sessions."
      }
    },
    {
      "@type": "Question",
      "name": "What are the 5 C's of coaching?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The 5 C's of coaching are Clarity, Commitment, Confidence, Competence, and Communication. Our AI coaching companion helps maintain these elements between sessions through structured voice-based reflection and multi-advisor insights."
      }
    },
    {
      "@type": "Question",
      "name": "Is there an app for voice journaling?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, Advisora offers voice-based reflection specifically designed for coaching clients. Unlike generic voice journaling apps, we provide structured coaching frameworks and multi-advisor perspectives to maintain momentum between your human coaching sessions."
      }
    },
    {
      "@type": "Question",
      "name": "What is the AI tool for self reflection?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Advisora is an AI coaching companion that facilitates deep self-reflection through voice-based interactions. It applies proven coaching frameworks and thought leader methodologies to help you process challenges and maintain growth momentum between coaching sessions."
      }
    }
  ]
}

export default function HomePage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      const data = await response.json()
      
      if (data.success) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
        setErrorMessage(data.error || 'Something went wrong')
      }
    } catch (error) {
      setStatus('error')
      setErrorMessage('Network error. Please try again.')
    }
  }

  return (
    <>
      <JsonLd data={organizationSchema} />
      <JsonLd data={websiteSchema} />
      <JsonLd data={faqSchema} />
      
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="font-heading font-bold text-xl text-textPrimary">
              Advisora
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="/blog" className="text-textSecondary hover:text-textPrimary transition-colors">
                Voice Coaching Blog
              </a>
              <a href="/compare" className="text-textSecondary hover:text-textPrimary transition-colors">
                AI Coaching Comparison
              </a>
              <a href="/faq" className="text-textSecondary hover:text-textPrimary transition-colors">
                Coaching Support FAQ
              </a>
            </div>
          </nav>
        </header>

        <main>
          {/* Hero Section */}
          <section className="relative py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-heading font-bold text-textPrimary mb-6 leading-tight">
                The AI coaching companion that bridges your sessions
              </h1>
              <p className="text-xl md:text-2xl text-textSecondary mb-8 max-w-3xl mx-auto leading-relaxed">
                Voice-based reflection and multi-advisor insights that maintain coaching momentum between sessions. Apply frameworks consistently and accelerate your growth journey.
              </p>
              
              <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-8">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 px-4 py-3 rounded-lg bg-backgroundElevated border border-border text-textPrimary placeholder-textMuted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    disabled={status === 'loading'}
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="px-8 py-3 bg-primary hover:bg-primaryLight text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50"
                  >
                    {status === 'loading' ? 'Joining...' : 'Join Early Access'}
                  </button>
                </div>
                
                {status === 'success' && (
                  <p className="mt-4 text-accent font-medium">Welcome to early access! We'll be in touch soon.</p>
                )}
                
                {status === 'error' && (
                  <p className="mt-4 text-red-400 font-medium">{errorMessage}</p>
                )}
              </form>
              
              <p className="text-textMuted text-sm">
                Between sessions, your growth doesn't pause—and neither should your guidance.
              </p>
            </div>
          </section>

          {/* Value Propositions */}
          <section className="py-20 px-4 sm:px-6 lg:px-8 bg-backgroundElevated" aria-label="Key Features">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-textPrimary text-center mb-16">
                Voice-Based Coaching Between Sessions
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <article className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <div className="w-8 h-8 bg-primary rounded-full"></div>
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-textPrimary mb-4">
                    Daily Voice Coaching Check-ins
                  </h3>
                  <p className="text-textSecondary leading-relaxed">
                    Start each day with structured reflection that builds on your coaching work. Voice-first interactions feel natural and create deeper insights than text-based tools.
                  </p>
                </article>
                
                <article className="text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <div className="w-8 h-8 bg-accent rounded-full"></div>
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-textPrimary mb-4">
                    Multi-Advisor Perspective Sessions
                  </h3>
                  <p className="text-textSecondary leading-relaxed">
                    Access calibrated thought leader personas who apply their actual frameworks to your challenges. Get Brené Brown's vulnerability insights alongside Clayton Christensen's innovation thinking.
                  </p>
                </article>
                
                <article className="text-center">
                  <div className="w-16 h-16 bg-primaryLight/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <div className="w-8 h-8 bg-primaryLight rounded-full"></div>
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-textPrimary mb-4">
                    Coaching Momentum Maintenance
                  </h3>
                  <p className="text-textSecondary leading-relaxed">
                    Bridge the gap between human coaching sessions with consistent accountability and framework application. Extend your coach's impact without replacing the human connection.
                  </p>
                </article>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="py-20 px-4 sm:px-6 lg:px-8" aria-label="Process">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-textPrimary mb-16">
                Framework Application Made Consistent
              </h2>
              
              <div className="space-y-12">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-heading font-semibold text-textPrimary mb-2">
                      Connect Your Coaching Goals
                    </h3>
                    <p className="text-textSecondary">
                      Share the frameworks and objectives from your human coaching sessions to create personalized AI guidance.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-heading font-semibold text-textPrimary mb-2">
                      Daily Voice Reflection
                    </h3>
                    <p className="text-textSecondary">
                      Engage in natural voice conversations that help you process challenges and apply coaching insights consistently.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-12 h-12 bg-primaryLight rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-heading font-semibold text-textPrimary mb-2">
                      Multi-Advisor Insights
                    </h3>
                    <p className="text-textSecondary">
                      Access diverse thought leader perspectives that complement your coaching work and accelerate breakthrough moments.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-20 px-4 sm:px-6 lg:px-8 bg-backgroundElevated" aria-label="Frequently Asked Questions">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-textPrimary text-center mb-16">
                Coaching Support Questions
              </h2>
              
              <div className="space-y-8">
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer list-none p-6 bg-background rounded-lg hover:bg-backgroundElevated transition-colors">
                    <h3 className="text-lg font-semibold text-textPrimary group-open:text-primary">
                      What is the 70 30 rule in coaching?
                    </h3>
                    <span className="text-textMuted group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="p-6 pt-2">
                    <p className="text-textSecondary leading-relaxed">
                      The 70-30 rule suggests that 70% of development comes from on-the-job experiences and challenges, while 30% comes from formal coaching and learning. Advisora bridges this gap by providing AI coaching support during that crucial 70% period between your formal sessions.
                    </p>
                  </div>
                </details>
                
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer list-none p-6 bg-background rounded-lg hover:bg-backgroundElevated transition-colors">
                    <h3 className="text-lg font-semibold text-textPrimary group-open:text-primary">
                      What are the 5 C's of coaching?
                    </h3>
                    <span className="text-textMuted group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="p-6 pt-2">
                    <p className="text-textSecondary leading-relaxed">
                      The 5 C's of coaching are Clarity, Commitment, Confidence, Competence, and Communication. Our AI coaching companion helps maintain these elements between sessions through structured voice-based reflection and multi-advisor insights.
                    </p>
                  </div>
                </details>
                
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer list-none p-6 bg-background rounded-lg hover:bg-backgroundElevated transition-colors">
                    <h3 className="text-lg font-semibold text-textPrimary group-open:text-primary">
                      Is there an app for voice journaling?
                    </h3>
                    <span className="text-textMuted group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="p-6 pt-2">
                    <p className="text-textSecondary leading-relaxed">
                      Yes, Advisora offers voice-based reflection specifically designed for coaching clients. Unlike generic voice journaling apps, we provide structured coaching frameworks and multi-advisor perspectives to maintain momentum between your human coaching sessions.
                    </p>
                  </div>
                </details>
                
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer list-none p-6 bg-background rounded-lg hover:bg-backgroundElevated transition-colors">
                    <h3 className="text-lg font-semibold text-textPrimary group-open:text-primary">
                      What is the AI tool for self reflection?
                    </h3>
                    <span className="text-textMuted group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="p-6 pt-2">
                    <p className="text-textSecondary leading-relaxed">
                      Advisora is an AI coaching companion that facilitates deep self-reflection through voice-based interactions. It applies proven coaching frameworks and thought leader methodologies to help you process challenges and maintain growth momentum between coaching sessions.
                    </p>
                  </div>
                </details>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-20 px-4 sm:px-6 lg:px-8 text-center" aria-label="Join Early Access">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-textPrimary mb-6">
                Transform Coaching Insights Into Daily Action
              </h2>
              <p className="text-xl text-textSecondary mb-8">
                Access the voices that shape your thinking, whenever clarity calls.
              </p>
              
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 px-4 py-3 rounded-lg bg-backgroundElevated border border-border text-textPrimary placeholder-textMuted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    disabled={status === 'loading'}
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="px-8 py-3 bg-primary hover:bg-primaryLight text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50"
                  >
                    {status === 'loading' ? 'Joining...' : 'Join Early Access'}
                  </button>
                </div>
                
                {status === 'success' && (
                  <p className="mt-4 text-accent font-medium">Welcome to early access! We'll be in touch soon.</p>
                )}
                
                {status === 'error' && (
                  <p className="mt-4 text-red-400 font-medium">{errorMessage}</p>
                )}
              </form>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t border-border py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
              <div className="font-heading font-bold text-xl text-textPrimary">
                Advisora
              </div>
              
              <div className="flex items-center space-x-8">
                <a href="/blog" className="text-textMuted hover:text-textPrimary transition-colors">
                  Voice Coaching Blog
                </a>
                <a href="/compare" className="text-textMuted hover:text-textPrimary transition-colors">
                  AI Coaching Comparison
                </a>
                <a href="/faq" className="text-textMuted hover:text-textPrimary transition-colors">
                  Coaching Support FAQ
                </a>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-border text-center">
              <p className="text-textMuted text-sm">
                Transform scattered thoughts into strategic direction through voice-first reflection.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}