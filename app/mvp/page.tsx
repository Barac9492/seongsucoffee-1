'use client'

import { useState } from 'react'
import Navigation from '../../components/Navigation'

export default function MVPPage() {
  const [email, setEmail] = useState('')
  const [isLaunched, setIsLaunched] = useState(false)

  const handleLaunch = () => {
    setIsLaunched(true)
  }

  return (
    <div className="min-h-screen bg-page-primary">
      <Navigation currentPage="home" />
      
      {/* Clean Hero */}
      <section className="section-padding">
        <div className="content-max-width text-center">
          <div className="bg-coffee-accent text-white px-6 py-3 rounded-full inline-block mb-8 font-craft text-sm font-medium">
            ✨ Coffee Trends Weekly - Now Live
          </div>
          
          <h1 className="heading-hero mb-6 text-center leading-tight">
            Korean Coffee Trends<br/>
            <span className="text-accent">That Actually Make Money</span>
          </h1>
          
          <p className="body-large max-w-2xl mx-auto mb-8">
            Stop guessing. Get the exact Korean coffee trends that are proven to generate $2,000-8,000/month. 
            Used by 47 coffee shops. No fluff. Just profit.
          </p>

          {/* Clean Social Proof */}
          <div className="bg-card card-padding mb-8 max-w-2xl mx-auto">
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-ritual text-accent mb-1">$247K</div>
                <div className="body-small">Revenue generated</div>
              </div>
              <div>
                <div className="text-2xl font-ritual text-accent mb-1">47</div>
                <div className="body-small">Coffee shops using</div>
              </div>
              <div>
                <div className="text-2xl font-ritual text-accent mb-1">4.9/5</div>
                <div className="body-small">Customer rating</div>
              </div>
            </div>
          </div>

          {/* Clear Pricing Tiers */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="text-center mb-8">
              <h2 className="heading-section mb-4">Choose Your Plan</h2>
              <p className="body-large text-secondary">Start with 7 days free, then pick what works for your business</p>
              <div className="bg-coffee-accent text-white p-4 rounded-lg mt-6 max-w-2xl mx-auto">
                <div className="font-craft font-medium mb-2">💡 Jeff&apos;s Guarantee:</div>
                <div className="text-sm">If our trends don&apos;t generate at least $500 in your first month, we&apos;ll refund your entire subscription + give you the next month free.</div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Free Tier */}
              <div className="bg-card card-padding text-center relative">
                <div className="bg-coffee-accent text-white px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block">
                  7-Day Free Trial
                </div>
                <h3 className="heading-card mb-3">Free</h3>
                <div className="text-4xl font-ritual text-accent mb-2">$0</div>
                <div className="body-small text-muted mb-2">Forever</div>
                <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded mb-4">
                  Avg. $800/month extra revenue
                </div>
                <div className="text-left space-y-3 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-coffee-accent">✓</span>
                    <span className="body-regular">1 Korean trend per month</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-coffee-accent">✓</span>
                    <span className="body-regular">Basic implementation guide</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-coffee-accent">✓</span>
                    <span className="body-regular">Community access</span>
                  </div>
                </div>
                <button className="btn-coffee-secondary w-full">
                  Start Free Trial
                </button>
              </div>

              {/* Starter Tier */}
              <div className="bg-card card-padding text-center relative border-2 border-coffee-accent">
                <div className="bg-coffee-accent text-white px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block">
                  Most Popular
                </div>
                <h3 className="heading-card mb-3">Starter</h3>
                <div className="text-4xl font-ritual text-accent mb-2">$47</div>
                <div className="body-small text-muted mb-2">per month</div>
                <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded mb-4">
                  Avg. $3,200/month extra revenue
                </div>
                <div className="text-left space-y-3 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-coffee-accent">✓</span>
                    <span className="body-regular">4 Korean trends per month</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-coffee-accent">✓</span>
                    <span className="body-regular">Complete recipes & suppliers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-coffee-accent">✓</span>
                    <span className="body-regular">Profit calculations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-coffee-accent">✓</span>
                    <span className="body-regular">2-6 month head start</span>
                  </div>
                </div>
                <button className="btn-coffee-primary w-full">
                  Start 7-Day Free Trial
                </button>
              </div>

              {/* Professional Tier */}
              <div className="bg-card card-padding text-center relative">
                <div className="bg-coffee-primary text-white px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block">
                  For Serious Growth
                </div>
                <h3 className="heading-card mb-3">Professional</h3>
                <div className="text-4xl font-ritual text-accent mb-2">$97</div>
                <div className="body-small text-muted mb-2">per month</div>
                <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded mb-4">
                  Avg. $6,800/month extra revenue
                </div>
                <div className="text-left space-y-3 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-coffee-accent">✓</span>
                    <span className="body-regular">Everything in Starter</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-coffee-accent">✓</span>
                    <span className="body-regular">AI trend predictions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-coffee-accent">✓</span>
                    <span className="body-regular">Market analysis tools</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-coffee-accent">✓</span>
                    <span className="body-regular">Priority support</span>
                  </div>
                </div>
                <button className="btn-coffee-secondary w-full">
                  Start 7-Day Free Trial
                </button>
              </div>
            </div>
            
            {/* Jeff's ROI Calculator */}
            <div className="text-center mt-8 bg-section-neutral p-6 rounded-lg">
              <h3 className="heading-card mb-6">📊 Your ROI Calculator</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-lg font-craft text-coffee-primary mb-2">Starter Plan</div>
                  <div className="text-sm text-muted mb-3">$47/month investment</div>
                  <div className="text-2xl font-ritual text-green-600 mb-1">+$3,200</div>
                  <div className="text-xs text-muted">avg monthly revenue</div>
                  <div className="text-lg font-medium text-coffee-accent mt-2">6,700% ROI</div>
                </div>
                <div className="bg-white p-4 rounded-lg border-2 border-coffee-accent">
                  <div className="text-lg font-craft text-coffee-primary mb-2">Professional Plan</div>
                  <div className="text-sm text-muted mb-3">$97/month investment</div>
                  <div className="text-2xl font-ritual text-green-600 mb-1">+$6,800</div>
                  <div className="text-xs text-muted">avg monthly revenue</div>
                  <div className="text-lg font-medium text-coffee-accent mt-2">7,000% ROI</div>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-lg font-craft text-coffee-primary mb-2">Your Current Method</div>
                  <div className="text-sm text-muted mb-3">Guessing trends</div>
                  <div className="text-2xl font-ritual text-red-600 mb-1">-$2,400</div>
                  <div className="text-xs text-muted">avg monthly loss</div>
                  <div className="text-lg font-medium text-red-600 mt-2">Failed launches</div>
                </div>
              </div>
            </div>
            
            {/* Free Trial Clarity */}
            <div className="text-center mt-6 bg-coffee-primary text-white p-6 rounded-lg">
              <h3 className="text-xl font-craft mb-3">🎁 Start Your 7-Day Free Trial</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-sm">
                <div>
                  <div className="text-2xl mb-1">📊</div>
                  <div>Full access to any plan</div>
                </div>
                <div>
                  <div className="text-2xl mb-1">💰</div>
                  <div>Zero payment required</div>
                </div>
                <div>
                  <div className="text-2xl mb-1">⚡</div>
                  <div>Cancel anytime, keep results</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Clarity */}
      <section className="section-padding bg-page-secondary">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Problem (Levels' brutal honesty) */}
            <div>
              <h2 className="text-3xl font-light mb-6 text-coffee-primary">The Problem (Be Honest)</h2>
              <div className="space-y-4 text-coffee-earth">
                <div className="flex items-start gap-3">
                  <div className="text-red-500 mt-1">❌</div>
                  <div>You&apos;re guessing what drinks to add to your menu</div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-red-500 mt-1">❌</div>
                  <div>Your last 3 &quot;trendy&quot; drinks flopped and lost you money</div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-red-500 mt-1">❌</div>
                  <div>You see Korean trends on Instagram but don&apos;t know which ones work</div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-red-500 mt-1">❌</div>
                  <div>You&apos;re losing customers to shops with better trend intelligence</div>
                </div>
              </div>
            </div>

            {/* Solution (Levels' simplicity) */}
            <div>
              <h2 className="text-3xl font-light mb-6 text-coffee-primary">The Solution (Dead Simple)</h2>
              <div className="space-y-4 text-coffee-earth">
                <div className="flex items-start gap-3">
                  <div className="text-green-500 mt-1">✅</div>
                  <div>Get exact Korean trends that are proven profitable in US markets</div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-green-500 mt-1">✅</div>
                  <div>See profit projections, customer demand, and implementation guides</div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-green-500 mt-1">✅</div>
                  <div>Weekly updates with new trends before your competitors find them</div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-green-500 mt-1">✅</div>
                  <div>Real case studies from coffee shops making $2K-8K/month extra</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Levels' Customer Proof */}
      <section className="py-16 px-8 bg-gradient-earth">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-light mb-8 text-coffee-primary">Real Results from Real Coffee Shops</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-medium">
              <div className="text-2xl font-light text-coffee-accent mb-2">+$3,200</div>
              <div className="text-sm text-coffee-earth mb-2">First month revenue increase</div>
              <div className="text-xs text-coffee-secondary">— Maria&apos;s Cafe, Portland</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-medium">
              <div className="text-2xl font-light text-coffee-accent mb-2">+$5,800</div>
              <div className="text-sm text-coffee-earth mb-2">Monthly revenue from trends</div>
              <div className="text-xs text-coffee-secondary">— Downtown Brew, Chicago</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-medium">
              <div className="text-2xl font-light text-coffee-accent mb-2">420%</div>
              <div className="text-sm text-coffee-earth mb-2">ROI on subscription</div>
              <div className="text-xs text-coffee-secondary">— Bean There, Austin</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg max-w-2xl mx-auto">
            <p className="text-coffee-earth italic mb-4">
              &ldquo;I was skeptical, but the brown butter latte trend they predicted made me $4,200 in 3 weeks. 
              The subscription pays for itself in 2 days.&rdquo;
            </p>
            <div className="text-sm text-coffee-secondary">— James Kim, Seattle Coffee Co.</div>
          </div>
        </div>
      </section>

      {/* Levels' Urgency & Scarcity */}
      <section className="py-16 px-8 bg-coffee-primary text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-light mb-6">Why You Need to Start Today</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="text-left">
              <h3 className="font-craft mb-4">Your Competitors Are Already Using This</h3>
              <p className="opacity-90 mb-4">
                47 coffee shops are already implementing our Korean trend intelligence. 
                Every day you wait, they&apos;re getting further ahead.
              </p>
              <div className="text-coffee-accent">
                Last week: 3 new coffee shops joined<br/>
                This week: 8 coffee shops on waitlist
              </div>
            </div>
            <div className="text-left">
              <h3 className="font-craft mb-4">Trends Have Expiration Dates</h3>
              <p className="opacity-90 mb-4">
                Korean trends go mainstream in 3-6 months. The brown butter latte window 
                is closing fast. Miss it, and wait 8 months for the next big opportunity.
              </p>
              <div className="text-coffee-accent">
                Early adopters: $2K-8K/month extra<br/>
                Late adopters: Fighting for scraps
              </div>
            </div>
          </div>

          <div className="bg-coffee-accent p-6 rounded-lg inline-block">
            <div className="text-coffee-primary font-craft mb-2">Limited Time: 7-Day Free Trial</div>
            <div className="text-coffee-primary text-sm">
              Start implementing profitable trends this week. Cancel anytime.
            </div>
          </div>
        </div>
      </section>

      {/* Levels' Final CTA */}
      <section className="py-16 px-8 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-light mb-6 text-coffee-primary">Ready to Stop Guessing and Start Profiting?</h2>
          
          <div className="bg-gradient-earth p-8 rounded-lg">
            <div className="text-2xl font-light text-coffee-primary mb-2">$47/month</div>
            <div className="text-coffee-earth mb-6">
              Less than 2 coffee sales per day. Makes you $2,000-8,000/month extra.
            </div>
            
            <button className="w-full py-4 bg-coffee-accent text-white rounded-lg hover:scale-105 transition-transform font-craft font-medium text-lg mb-4">
              🚀 Start 7-Day Free Trial
            </button>
            
            <div className="text-xs text-coffee-earth">
              No contracts • Cancel anytime • Instant access • 30-day money-back guarantee
            </div>
          </div>

          <div className="mt-8 text-sm text-coffee-earth">
            Questions? Email pieter@firstlaunch.coffee (I respond within 24 hours)
          </div>
        </div>
      </section>

      {/* Launch Status */}
      {isLaunched && (
        <div className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-large">
          🎉 MVP SHIPPED! Collecting real user feedback...
        </div>
      )}
    </div>
  )
}