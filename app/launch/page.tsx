'use client'

import { useState } from 'react'
import Navigation from '../../components/Navigation'

export default function LaunchPage() {
  const [email, setEmail] = useState('')
  const [launched, setLaunched] = useState(false)

  return (
    <div className="min-h-screen bg-coffee-warm">
      <Navigation currentPage="home" />
      
      {/* Levels' Launch Strategy */}
      <section className="pt-32 pb-16 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="bg-green-500 text-white px-4 py-2 rounded-lg inline-block mb-4 font-craft">
              ✅ DOMAIN SECURED: CoffeeTrendsWeekly.com
            </div>
            <h1 className="text-5xl md:text-6xl font-light leading-tight tracking-tight mb-6 text-coffee-primary">
              Launch Strategy<br/>
              <span className="text-coffee-accent">Pieter Levels Playbook</span>
            </h1>
            <p className="text-xl text-coffee-secondary font-light max-w-3xl mx-auto">
              From domain purchase to first paying customer in 24 hours. The indie founder&apos;s guide to rapid validation.
            </p>
          </div>

          {/* Launch Timeline */}
          <div className="bg-white rounded-lg p-8 shadow-medium border border-coffee mb-8">
            <h2 className="text-2xl font-craft text-coffee-primary mb-6">24-Hour Launch Timeline</h2>
            <div className="space-y-6">
              
              {/* Hour 0-2 */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center font-craft font-medium">
                  ✓
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-craft text-coffee-primary">Hour 0-2: Domain & Infrastructure</h3>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">DONE</span>
                  </div>
                  <ul className="text-coffee-earth text-sm space-y-1">
                    <li>• Buy CoffeeTrendsWeekly.com ($12/year)</li>
                    <li>• Set up DNS pointing to platform</li>
                    <li>• Create landing page with clear value prop</li>
                    <li>• Set up basic analytics (Plausible/Google)</li>
                  </ul>
                </div>
              </div>

              {/* Hour 2-6 */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-coffee-accent text-white rounded-full flex items-center justify-center font-craft font-medium">
                  2-6
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-craft text-coffee-primary">Hour 2-6: Payment & Content</h3>
                    <span className="bg-coffee-accent text-white px-2 py-1 rounded text-xs">IN PROGRESS</span>
                  </div>
                  <ul className="text-coffee-earth text-sm space-y-1">
                    <li>• Integrate Stripe for $47/month subscriptions</li>
                    <li>• Create 7-day free trial flow</li>
                    <li>• Write first 3 Korean trend reports</li>
                    <li>• Set up email automation (ConvertKit)</li>
                  </ul>
                </div>
              </div>

              {/* Hour 6-12 */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-coffee-cream text-coffee-primary rounded-full flex items-center justify-center font-craft font-medium border border-coffee">
                  6-12
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-craft text-coffee-primary">Hour 6-12: Social Proof & Testing</h3>
                    <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded text-xs">PENDING</span>
                  </div>
                  <ul className="text-coffee-earth text-sm space-y-1">
                    <li>• Add customer testimonials (even from beta users)</li>
                    <li>• Create social media accounts</li>
                    <li>• Test payment flow end-to-end</li>
                    <li>• Set up customer support (email)</li>
                  </ul>
                </div>
              </div>

              {/* Hour 12-24 */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-coffee-cream text-coffee-primary rounded-full flex items-center justify-center font-craft font-medium border border-coffee">
                  12-24
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-craft text-coffee-primary">Hour 12-24: Launch & Acquire</h3>
                    <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded text-xs">PENDING</span>
                  </div>
                  <ul className="text-coffee-earth text-sm space-y-1">
                    <li>• Post on Twitter, IndieHackers, Reddit</li>
                    <li>• Email coffee industry contacts</li>
                    <li>• Launch on Product Hunt (optional)</li>
                    <li>• Monitor first user signups</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Pieter's Philosophy */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-medium border border-coffee">
              <h3 className="font-craft text-coffee-primary mb-4">🚀 Pieter&apos;s Launch Rules</h3>
              <div className="space-y-3 text-coffee-earth text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-coffee-accent">1.</span>
                  <span>Ship when it&apos;s 70% ready, not 100%</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-coffee-accent">2.</span>
                  <span>One feature done well beats 10 features done poorly</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-coffee-accent">3.</span>
                  <span>Revenue validates faster than user feedback</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-coffee-accent">4.</span>
                  <span>Launch publicly to create accountability</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-coffee-accent">5.</span>
                  <span>Iterate weekly based on paying customer requests</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-medium border border-coffee">
              <h3 className="font-craft text-coffee-primary mb-4">📊 Success Metrics (Week 1)</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-coffee-earth">Target Signups</span>
                  <span className="font-craft text-coffee-accent">100</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-coffee-earth">Target Trials</span>
                  <span className="font-craft text-coffee-accent">25</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-coffee-earth">Target Paid Customers</span>
                  <span className="font-craft text-coffee-accent">5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-coffee-earth">Target Revenue</span>
                  <span className="font-craft text-coffee-accent">$235</span>
                </div>
                <div className="pt-4 border-t border-coffee-cream">
                  <div className="text-xs text-coffee-earth">
                    If we hit these numbers, we have product-market fit signals.
                    If not, we pivot or kill within 30 days.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Live Launch Button */}
          <div className="text-center">
            <div className="bg-gradient-earth p-8 rounded-lg max-w-2xl mx-auto">
              <h3 className="text-2xl font-craft text-coffee-primary mb-4">Ready to Launch?</h3>
              <p className="text-coffee-earth mb-6">
                Domain secured. MVP built. Payment ready. Time to see if coffee shop owners will pay $47/month for Korean trend intelligence.
              </p>
              
              <button 
                onClick={() => setLaunched(true)}
                className="w-full py-4 bg-coffee-accent text-white rounded-lg hover:scale-105 transition-transform font-craft font-medium text-lg mb-4"
              >
                🚀 LAUNCH CoffeeTrendsWeekly.com
              </button>
              
              {launched && (
                <div className="bg-green-500 text-white p-4 rounded-lg">
                  <div className="font-craft mb-2">🎉 LIVE!</div>
                  <div className="text-sm">
                    CoffeeTrendsWeekly.com is now accepting customers.<br/>
                    Time to validate with real revenue.
                  </div>
                </div>
              )}
              
              <div className="text-xs text-coffee-earth mt-4">
                &ldquo;Launch and iterate is better than perfect and never ship.&rdquo; — Pieter Levels
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Board Alignment */}
      <section className="py-16 px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-light mb-8 text-coffee-primary">Board Consensus: Ship Fast, Learn Faster</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="font-craft text-coffee-primary mb-2">Speed Over Perfection</h3>
              <p className="text-coffee-earth text-sm">
                Pieter&apos;s philosophy wins. Market validation beats internal perfectionism.
              </p>
            </div>
            <div className="p-6">
              <div className="text-4xl mb-3">💰</div>
              <h3 className="font-craft text-coffee-primary mb-2">Revenue as Truth</h3>
              <p className="text-coffee-earth text-sm">
                Paying customers provide clearer feedback than free users or focus groups.
              </p>
            </div>
            <div className="p-6">
              <div className="text-4xl mb-3">🔄</div>
              <h3 className="font-craft text-coffee-primary mb-2">Weekly Iteration</h3>
              <p className="text-coffee-earth text-sm">
                Build what paying customers request, not what we think they need.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}