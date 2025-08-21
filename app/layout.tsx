import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import TrackingScripts from '../components/Analytics'
import StructuredData from '../components/StructuredData'
import './globals.css'

export const metadata: Metadata = {
  title: 'Korean Coffee Trends Weekly | Get Seoul Trends 6 Months Early',
  description: 'Get 4 profitable Korean coffee trends every Tuesday. Free newsletter for coffee shops with recipes, suppliers, and success stories. Black Pepper Latte making shops $8K monthly.',
  keywords: 'korean coffee trends, coffee shop trends 2025, profitable coffee drinks, seoul coffee trends, black pepper latte, dutch einspanner, coffee shop ideas',
  authors: [{ name: 'Coffee Trends Weekly' }],
  creator: 'Coffee Trends Weekly',
  publisher: 'Coffee Trends Weekly',
  openGraph: {
    title: 'Korean Coffee Trends Weekly | Get Seoul Trends 6 Months Early',
    description: 'Get 4 profitable Korean coffee trends every Tuesday. Free newsletter for coffee shops with recipes, suppliers, and success stories.',
    url: 'https://coffeetrendsweekly.com',
    siteName: 'Coffee Trends Weekly',
    images: [
      {
        url: 'https://coffeetrendsweekly.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Korean Coffee Trends Weekly Newsletter',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Korean Coffee Trends Weekly | Get Seoul Trends 6 Months Early',
    description: 'Get 4 profitable Korean coffee trends every Tuesday. Free newsletter for coffee shops.',
    images: ['https://coffeetrendsweekly.com/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <Analytics />
        <TrackingScripts />
        <StructuredData />
      </body>
    </html>
  )
}