import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Seongsu Coffee Intelligence',
  description: 'Real-time trend analysis for Seoul Seongsu coffee district',
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