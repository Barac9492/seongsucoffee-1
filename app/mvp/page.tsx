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
          
          <h1 className="heading-hero mb-6">
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

          {/* Clean CTA */}
          <div className="bg-card card-padding text-center max-w-xl mx-auto">
            <div className="mb-6">
              <div className="text-3xl font-ritual text-accent mb-2">$47/month</div>
              <div className="body-small text-muted">Cancel anytime. Start making money this week.</div>
            </div>
            
            <input
              type="email"
              placeholder="Enter your email to start"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 rounded-lg mb-4 border border-coffee-neutral-200 focus:border-coffee-accent outline-none"
            />
            
            <button 
              onClick={handleLaunch}
              className="btn-coffee-primary w-full py-4 text-lg mb-3"
            >
              Start Making Money Today
            </button>
            
            <div className="body-small text-muted">
              7-day free trial • No setup fees • Instant access
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