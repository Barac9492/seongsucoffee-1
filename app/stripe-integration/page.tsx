'use client'

import { useState } from 'react'
import Navigation from '../../components/Navigation'

export default function StripeIntegrationPage() {
  const [paymentSetup, setPaymentSetup] = useState(false)

  const handleStripeSetup = () => {
    setPaymentSetup(true)
  }

  return (
    <div className="min-h-screen bg-coffee-warm">
      <Navigation currentPage="home" />
      
      {/* Pieter's Payment Strategy */}
      <section className="pt-32 pb-16 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-light leading-tight tracking-tight mb-6 text-coffee-primary">
              Payment Integration<br/>
              <span className="text-coffee-accent">Stripe + Revenue Reality</span>
            </h1>
            <p className="text-xl text-coffee-secondary font-light max-w-3xl mx-auto">
              Pieter&apos;s approach: Accept payments before building features. Revenue validates everything.
            </p>
          </div>

          {/* Stripe Setup Strategy */}
          <div className="bg-white rounded-lg p-8 shadow-medium border border-coffee mb-8">
            <h2 className="text-2xl font-craft text-coffee-primary mb-6">Stripe Integration Roadmap</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Payment Flow */}
              <div>
                <h3 className="font-craft text-coffee-primary mb-4">Payment Flow Design</h3>
                <div className="space-y-4">
                  <div className="bg-gradient-earth p-4 rounded-lg">
                    <div className="font-craft text-coffee-primary mb-2">1. Landing Page Visit</div>
                    <div className="text-coffee-earth text-sm">CoffeeTrendsWeekly.com → Clear value prop</div>
                  </div>
                  <div className="bg-gradient-earth p-4 rounded-lg">
                    <div className="font-craft text-coffee-primary mb-2">2. Email Capture</div>
                    <div className="text-coffee-earth text-sm">7-day free trial signup (no card required)</div>
                  </div>
                  <div className="bg-gradient-earth p-4 rounded-lg">
                    <div className="font-craft text-coffee-primary mb-2">3. Value Delivery</div>
                    <div className="text-coffee-earth text-sm">Immediate access to 3 Korean trend reports</div>
                  </div>
                  <div className="bg-gradient-earth p-4 rounded-lg">
                    <div className="font-craft text-coffee-primary mb-2">4. Payment Conversion</div>
                    <div className="text-coffee-earth text-sm">Day 5 email: &quot;Continue getting trends for $47/month&quot;</div>
                  </div>
                </div>
              </div>

              {/* Stripe Configuration */}
              <div>
                <h3 className="font-craft text-coffee-primary mb-4">Stripe Product Setup</h3>
                <div className="space-y-4">
                  <div className="border border-coffee rounded-lg p-4">
                    <div className="font-craft text-coffee-primary mb-2">Coffee Trends Weekly</div>
                    <div className="text-coffee-earth text-sm mb-2">Recurring subscription</div>
                    <div className="flex justify-between items-center">
                      <span className="text-coffee-accent font-craft">$47.00 USD</span>
                      <span className="text-xs bg-coffee-accent text-coffee-foam px-2 py-1 rounded">Monthly</span>
                    </div>
                  </div>
                  <div className="border border-coffee rounded-lg p-4">
                    <div className="font-craft text-coffee-primary mb-2">Free Trial Period</div>
                    <div className="text-coffee-earth text-sm mb-2">No upfront payment</div>
                    <div className="flex justify-between items-center">
                      <span className="text-coffee-accent font-craft">7 days free</span>
                      <span className="text-xs bg-green-500 text-white px-2 py-1 rounded">Trial</span>
                    </div>
                  </div>
                  <div className="border border-coffee rounded-lg p-4">
                    <div className="font-craft text-coffee-primary mb-2">Payment Methods</div>
                    <div className="text-coffee-earth text-sm mb-2">Card, Apple Pay, Google Pay</div>
                    <div className="flex gap-2">
                      <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded">Visa</span>
                      <span className="text-xs bg-red-500 text-white px-2 py-1 rounded">MC</span>
                      <span className="text-xs bg-gray-800 text-white px-2 py-1 rounded">Amex</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pieter's Payment Philosophy */}
          <div className="bg-coffee-primary text-coffee-foam p-8 rounded-lg mb-8">
            <h3 className="text-2xl font-craft mb-6">Pieter&apos;s Payment Philosophy</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-craft mb-3">💳 Charge Early & Often</h4>
                <p className="text-coffee-foam opacity-90 text-sm">
                  &ldquo;Free users give you fake validation. Paying customers give you real problems to solve. 
                  I&apos;d rather have 10 paying customers than 1,000 free users.&rdquo;
                </p>
              </div>
              <div>
                <h4 className="font-craft mb-3">🚀 No Credit Card for Trials</h4>
                <p className="text-coffee-foam opacity-90 text-sm">
                  &ldquo;Requiring cards upfront reduces signups by 60%. Better to get them hooked on value first, 
                  then convert when they&apos;re already seeing results.&rdquo;
                </p>
              </div>
              <div>
                <h4 className="font-craft mb-3">📊 Simple Pricing</h4>
                <p className="text-coffee-foam opacity-90 text-sm">
                  &ldquo;One price, one plan, one value prop. Complexity kills conversions. 
                  $47/month for Korean coffee trend intelligence. Done.&rdquo;
                </p>
              </div>
              <div>
                <h4 className="font-craft mb-3">⚡ Fast Checkout</h4>
                <p className="text-coffee-foam opacity-90 text-sm">
                  &ldquo;Every extra click costs you 20% of conversions. Stripe Checkout in one click. 
                  Apple Pay for mobile. Make paying easier than thinking about it.&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Revenue Projections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-medium border border-coffee">
              <h3 className="font-craft text-coffee-primary mb-4">Month 1 Projections</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-coffee-earth">Landing Page Visitors</span>
                  <span className="font-craft text-coffee-accent">1,000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-coffee-earth">Trial Signups (5%)</span>
                  <span className="font-craft text-coffee-accent">50</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-coffee-earth">Trial → Paid (20%)</span>
                  <span className="font-craft text-coffee-accent">10</span>
                </div>
                <div className="border-t border-coffee-cream pt-3">
                  <div className="flex justify-between items-center">
                    <span className="font-craft text-coffee-primary">Monthly Revenue</span>
                    <span className="font-craft text-coffee-accent text-xl">$470</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-medium border border-coffee">
              <h3 className="font-craft text-coffee-primary mb-4">Growth Trajectory</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-coffee-earth">Month 1</span>
                  <span className="font-craft text-coffee-accent">$470</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-coffee-earth">Month 3</span>
                  <span className="font-craft text-coffee-accent">$2,350</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-coffee-earth">Month 6</span>
                  <span className="font-craft text-coffee-accent">$7,050</span>
                </div>
                <div className="border-t border-coffee-cream pt-3">
                  <div className="flex justify-between items-center">
                    <span className="font-craft text-coffee-primary">Break-even Point</span>
                    <span className="font-craft text-coffee-accent">Month 2</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Implementation Steps */}
          <div className="bg-white rounded-lg p-8 shadow-medium border border-coffee">
            <h3 className="text-2xl font-craft text-coffee-primary mb-6">Implementation Checklist</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-craft text-coffee-primary mb-4">Stripe Setup (30 minutes)</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-coffee-earth">Create Stripe account</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-coffee-earth">Add business details</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-coffee-earth">Create $47/month subscription product</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-coffee-earth">Configure 7-day trial</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-coffee-earth">Test payment flow</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-craft text-coffee-primary mb-4">Integration (60 minutes)</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-coffee-earth">Install Stripe SDK</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-coffee-earth">Add checkout button to landing page</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-coffee-earth">Set up webhook handling</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-coffee-earth">Create customer portal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-coffee-earth">Test end-to-end flow</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <button 
                onClick={handleStripeSetup}
                className="px-8 py-4 bg-coffee-accent text-coffee-foam rounded-lg hover:scale-105 transition-transform font-craft font-medium"
              >
                🚀 Set Up Stripe Integration
              </button>
              
              {paymentSetup && (
                <div className="mt-4 bg-green-500 text-white p-4 rounded-lg inline-block">
                  <div className="font-craft mb-1">✅ Payments Ready!</div>
                  <div className="text-sm">CoffeeTrendsWeekly.com can now accept $47/month subscriptions</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}