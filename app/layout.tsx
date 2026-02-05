import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains' })

export const metadata: Metadata = {
  title: 'Between Coaching Sessions Support — Advisora',
  description: 'AI coaching companion providing voice-based reflection and thought leader guidance between coaching sessions. Maintain momentum with on-demand advisor conversations.',
  keywords: 'between coaching sessions support, AI coaching companion, voice-based reflection app, coaching accountability, multi-advisor consultation AI, coaching momentum maintenance',
  viewport: 'width=device-width, initial-scale=1',
  openGraph: {
    title: 'Between Coaching Sessions Support — Advisora',
    description: 'AI coaching companion providing voice-based reflection and thought leader guidance between coaching sessions. Maintain momentum with on-demand advisor conversations.',
    type: 'website',
    url: 'https://advisora.com',
    siteName: 'Advisora',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Between Coaching Sessions Support — Advisora',
    description: 'AI coaching companion providing voice-based reflection and thought leader guidance between coaching sessions. Maintain momentum with on-demand advisor conversations.',
  },
  alternates: {
    canonical: 'https://advisora.com'
  },
  robots: {
    index: true,
    follow: true,
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-body antialiased bg-background text-textPrimary">
        {children}
      </body>
    </html>
  )
}