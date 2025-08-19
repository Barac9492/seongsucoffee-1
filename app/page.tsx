'use client'

import { useEffect, useState } from 'react'

export default function SimpleLanding() {
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
              <a href="/coffee-trends" className="text-sm text-gray-600 hover:text-black">Trends</a>
              <a href="/pricing" className="text-sm text-gray-600 hover:text-black">Pricing</a>
              <a href="/coffee-trends" className="btn-primary text-white text-sm px-6 py-2 rounded-full">
                Get Started
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero - Extreme Minimalism */}
      <section className="pt-32 pb-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className={`space-y-12 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}>
            {/* Main Message */}
            <div className="max-w-4xl">
              <h1 className="text-7xl md:text-8xl font-light leading-[0.9] tracking-tight mb-8">
                Your next<br/>
                <span className="text-gray-400">$50K</span> drink<br/>
                is trending<br/>
                in Seoul.
              </h1>
              
              <p className="text-xl text-gray-600 font-light max-w-2xl">
                We monitor. You launch. They profit.
              </p>
            </div>

            {/* Single Proof Point */}
            <div className="pt-12">
              <div className="inline-block">
                <div className="flex items-baseline gap-4 mb-2">
                  <span className="text-5xl font-light">75%</span>
                  <span className="text-xl text-gray-500">margin</span>
                </div>
                <div className="text-sm text-gray-500">Cream Cheese Foam Coffee</div>
                <div className="text-sm text-gray-400">Available now</div>
              </div>
            </div>

            {/* Single CTA */}
            <div className="pt-8">
              <a 
                href="/coffee-trends" 
                className="inline-flex items-center gap-3 group"
              >
                <span className="text-lg">View all trends</span>
                <span className="text-gray-400 group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* The Product - Grid */}
      <section className="py-32 px-8 gradient-cool">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200">
            {[
              { label: 'Recipe', value: 'Complete' },
              { label: 'Suppliers', value: 'Verified' },
              { label: 'Margin', value: '70-80%' },
              { label: 'Launch', value: '48 hours' }
            ].map((item, i) => (
              <div key={i} className="bg-white p-12 hover-lift cursor-pointer">
                <div className="text-3xl font-light mb-2">{item.value}</div>
                <div className="text-sm text-gray-500 uppercase tracking-wider">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results - Minimal */}
      <section className="py-32 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { metric: '+$18K', context: 'First month', location: 'Portland' },
              { metric: '+$50K', context: 'Product line', location: 'Austin' },
              { metric: '+40%', context: 'Margin increase', location: '12 locations' }
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="text-5xl font-light mb-2">{item.metric}</div>
                <div className="text-sm text-gray-600">{item.context}</div>
                <div className="text-xs text-gray-400 mt-1">{item.location}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing - Simplified */}
      <section className="py-32 px-8 bg-black text-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="max-w-2xl mx-auto space-y-8">
            <h2 className="text-5xl font-light">$97/month</h2>
            <p className="text-lg text-gray-400 font-light">
              Four drinks. Complete plans. Updated monthly.
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

      {/* Footer - Minimal */}
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