import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'K-Wave California Intelligence',
  description: 'Korean market intelligence and trend discovery platform. Professional Korean business analysis with 20+ years expertise.',
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
      </body>
    </html>
  )
}