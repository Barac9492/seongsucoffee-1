'use client'

import { useEffect, useState } from 'react'
import Navigation from '../../components/Navigation'

export default function PricingPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPage="pricing" />

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center space-y-12 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <div className="max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-light leading-tight tracking-tight mb-8">
                Choose your competitive advantage
              </h1>
              <p className="text-xl text-gray-600 font-light mb-12">
                Three ways to launch profitable Korean coffee trends before your competition
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tiered Pricing Strategy */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Starter Plan */}
            <div className="border border-gray-200 rounded-lg p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-light mb-2">Starter</h3>
                <p className="text-gray-600 mb-6">Single location coffee shops</p>
                <div className="text-4xl font-light mb-2">$47</div>
                <div className="text-sm text-gray-500">per month</div>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <span className="text-green-600 mr-3">✓</span>
                  <span className="text-sm">2 trending drinks per month</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-3">✓</span>
                  <span className="text-sm">Complete recipes & measurements</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-3">✓</span>
                  <span className="text-sm">Basic supplier contacts</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-3">✓</span>
                  <span className="text-sm">Email support</span>
                </li>
              </ul>
              
              <a href="/coffee-trends" className="block w-full py-3 bg-gray-100 text-center rounded-lg hover:bg-gray-200 transition-colors">
                Start Starter Plan
              </a>
            </div>
            
            {/* Professional Plan - Featured */}
            <div className="border-2 border-black rounded-lg p-8 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-black text-white px-4 py-1 text-xs rounded-full">MOST POPULAR</span>
              </div>
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-light mb-2">Professional</h3>
                <p className="text-gray-600 mb-6">Growing coffee businesses</p>
                <div className="text-4xl font-light mb-2">$97</div>
                <div className="text-sm text-gray-500">per month</div>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <span className="text-green-600 mr-3">✓</span>
                  <span className="text-sm">4 trending drinks per month</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-3">✓</span>
                  <span className="text-sm">Complete business packages</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-3">✓</span>
                  <span className="text-sm">Verified supplier network</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-3">✓</span>
                  <span className="text-sm">Staff training materials</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-3">✓</span>
                  <span className="text-sm">Pricing strategy guide</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-3">✓</span>
                  <span className="text-sm">Priority support</span>
                </li>
              </ul>
              
              <a href="/coffee-trends" className="block w-full py-3 bg-black text-white text-center rounded-lg hover:scale-105 transition-transform">
                Start Professional Plan
              </a>
            </div>
            
            {/* Enterprise Plan */}
            <div className="border border-gray-200 rounded-lg p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-light mb-2">Enterprise</h3>
                <p className="text-gray-600 mb-6">Multi-location chains</p>
                <div className="text-4xl font-light mb-2">$297</div>
                <div className="text-sm text-gray-500">per month</div>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <span className="text-green-600 mr-3">✓</span>
                  <span className="text-sm">Everything in Professional</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-3">✓</span>
                  <span className="text-sm">Custom market analysis</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-3">✓</span>
                  <span className="text-sm">Regional trend forecasting</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-3">✓</span>
                  <span className="text-sm">Dedicated account manager</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-3">✓</span>
                  <span className="text-sm">Bulk supplier negotiations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-3">✓</span>
                  <span className="text-sm">Monthly strategy calls</span>
                </li>
              </ul>
              
              <a href="/coffee-trends" className="block w-full py-3 bg-gray-900 text-white text-center rounded-lg hover:bg-black transition-colors">
                Contact Sales
              </a>
            </div>
            
          </div>
          
          {/* ROI Comparison */}
          <div className="mt-16 bg-gray-50 p-8 rounded-lg">
            <h3 className="text-2xl font-light text-center mb-8">Average ROI by Plan</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-light mb-2">$8K</div>
                <div className="text-sm text-gray-600">Starter avg. first month</div>
                <div className="text-xs text-gray-500">170x ROI</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-light mb-2 text-green-600">$18K</div>
                <div className="text-sm text-gray-600">Professional avg. first month</div>
                <div className="text-xs text-gray-500">185x ROI</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-light mb-2">$45K</div>
                <div className="text-sm text-gray-600">Enterprise avg. first month</div>
                <div className="text-xs text-gray-500">151x ROI</div>
              </div>
            </div>
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

      {/* Risk Reversal + CTA */}
      <section className="py-24 px-8 bg-black text-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl font-light leading-tight">
              Zero-risk guarantee
            </h2>
            <p className="text-xl text-gray-400 font-light">
              Launch one drink. If you don&apos;t make $97+ profit in the first 30 days,<br/>
              we&apos;ll refund your entire month. No questions asked.
            </p>
            
            <div className="bg-gray-900 p-8 rounded-lg my-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                <div>
                  <h3 className="text-lg font-medium mb-4 text-white">What you get immediately:</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>✓ 4 complete drink packages</li>
                    <li>✓ Supplier contact list</li>
                    <li>✓ Training materials</li>
                    <li>✓ Pricing strategies</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-4 text-white">Our promise to you:</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>✓ 30-day money-back guarantee</li>
                    <li>✓ Cancel anytime</li>
                    <li>✓ No setup fees</li>
                    <li>✓ Launch support included</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="pt-8">
              <a 
                href="/coffee-trends" 
                className="inline-block bg-white text-black px-12 py-4 rounded-full text-lg hover:scale-105 transition-transform"
              >
                Start your advantage today
              </a>
            </div>
            <p className="text-sm text-gray-500">Join 240+ coffee professionals launching first</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-8 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <div className="text-xs text-gray-400">© 2024 First Launch</div>
            <div className="flex gap-8">
              <a href="/admin" className="text-xs text-gray-400 hover:text-gray-600">Admin</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}