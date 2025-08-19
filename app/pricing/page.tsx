'use client'

import { useEffect, useState } from 'react'

export default function PricingPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Minimal Header */}
      <header className="fixed top-0 w-full z-50 glass">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="font-semibold text-sm tracking-wide">PROFIT</div>
            <nav className="flex items-center gap-8">
              <a href="/" className="text-sm text-gray-600 hover:text-black">Home</a>
              <a href="/coffee-trends" className="text-sm text-gray-600 hover:text-black">Trends</a>
              <span className="text-sm text-black font-medium">Pricing</span>
              <a href="/admin" className="text-sm text-gray-400 hover:text-gray-600">Admin</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center space-y-12 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <div className="max-w-3xl mx-auto">
              <h1 className="text-6xl md:text-7xl font-light leading-[0.9] tracking-tight mb-8">
                $97
              </h1>
              <p className="text-2xl text-gray-600 font-light">
                Four drinks. Complete plans. Monthly updates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-8 gradient-cool">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200">
            {[
              { feature: 'Recipes', detail: 'Exact measurements' },
              { feature: 'Suppliers', detail: 'Verified contacts' },
              { feature: 'Training', detail: 'Staff scripts' },
              { feature: 'Updates', detail: 'Monthly trends' },
              { feature: 'Support', detail: 'Launch guidance' },
              { feature: 'Guarantee', detail: 'ROI promise' }
            ].map((item, i) => (
              <div key={i} className="bg-white p-12 hover-lift cursor-pointer">
                <div className="text-xl font-light mb-2">{item.feature}</div>
                <div className="text-sm text-gray-500">{item.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-gray-500">Trusted by 240+ coffee professionals</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { metric: '$2.1M', context: 'Revenue generated' },
              { metric: '89%', context: 'Success rate' },
              { metric: '4 months', context: 'Average head start' }
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-light mb-2">{item.metric}</div>
                <div className="text-sm text-gray-600">{item.context}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-8 bg-black text-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="max-w-2xl mx-auto space-y-8">
            <p className="text-lg text-gray-400 font-light">
              Launch one drink. If you don&apos;t make $97 in profit on day one, we&apos;ll refund your month.
            </p>
            <div className="pt-8">
              <a 
                href="/coffee-trends" 
                className="inline-block bg-white text-black px-12 py-4 rounded-full hover:scale-105 transition-transform"
              >
                Start today
              </a>
            </div>
            <p className="text-xs text-gray-500">Cancel anytime. ROI guaranteed.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-8 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <div className="text-xs text-gray-400">© 2024 Profit</div>
            <div className="flex gap-8">
              <a href="/admin" className="text-xs text-gray-400 hover:text-gray-600">Admin</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}