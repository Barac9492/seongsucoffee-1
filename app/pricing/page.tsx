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
                Launch 4 profitable drinks<br/>
                <span className="text-gray-400">for $97/month</span>
              </h1>
              <p className="text-xl text-gray-600 font-light mb-8">
                Complete business packages. 2-6 month market advantage.<br/>
                Average customer generates $18K additional revenue in first month.
              </p>
              
              <div className="inline-flex items-center gap-8 p-6 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <div className="text-3xl font-light">$97</div>
                  <div className="text-sm text-gray-500">monthly cost</div>
                </div>
                <div className="text-gray-300">→</div>
                <div className="text-center">
                  <div className="text-3xl font-light text-green-600">$18K</div>
                  <div className="text-sm text-gray-500">avg. first month revenue</div>
                </div>
                <div className="text-gray-300">=</div>
                <div className="text-center">
                  <div className="text-3xl font-light">185x</div>
                  <div className="text-sm text-gray-500">return on investment</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Breakdown */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light tracking-tight mb-6">Everything included</h2>
            <p className="text-xl text-gray-600 font-light">Complete launch packages for 4 trending drinks</p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-8">
            {[
              { 
                item: 'Complete recipes with exact measurements',
                value: 'Worth $500',
                detail: 'Tested formulations with precise ingredient ratios and preparation methods'
              },
              { 
                item: 'Verified supplier contacts and pricing',
                value: 'Worth $300', 
                detail: 'Pre-negotiated supplier relationships with quality specifications'
              },
              { 
                item: 'Staff training scripts and quality control',
                value: 'Worth $400',
                detail: 'Complete training materials and consistency protocols'
              },
              { 
                item: 'Competitive pricing strategy and positioning',
                value: 'Worth $200',
                detail: 'Market analysis and optimal pricing for maximum profit margins'
              },
              { 
                item: 'Monthly trend updates and new launches',
                value: 'Worth $300',
                detail: 'Continuous intelligence on emerging trends before they hit mainstream'
              }
            ].map((item, i) => (
              <div key={i} className="flex items-start justify-between p-6 border border-gray-100 rounded-lg">
                <div className="flex-1">
                  <h3 className="text-lg font-medium mb-2">{item.item}</h3>
                  <p className="text-gray-600 text-sm">{item.detail}</p>
                </div>
                <div className="text-right ml-8">
                  <div className="text-gray-400 line-through text-sm">{item.value}</div>
                  <div className="text-green-600 font-medium">Included</div>
                </div>
              </div>
            ))}
            
            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-center justify-between text-xl">
                <div className="font-medium">Total value: <span className="line-through text-gray-400">$1,700/month</span></div>
                <div className="font-light">You pay: $97/month</div>
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