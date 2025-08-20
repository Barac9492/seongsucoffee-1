'use client'

import { useState } from 'react'
import Navigation from '../../components/Navigation'

export default function PricingPage() {
  const [email, setEmail] = useState('')
  const [shopName, setShopName] = useState('')
  const [shopSize, setShopSize] = useState('')
  const [pricePoint, setPricePoint] = useState('')

  const handleEarlyAccess = async (e: React.FormEvent) => {
    e.preventDefault()
    // Track interest for monetization validation
    console.log('Early access signup:', { email, shopName, shopSize, pricePoint })
    // TODO: Send to analytics/database
    alert('Thanks! We\'ll notify you when Pro launches in January 2025')
  }

  return (
    <div className="min-h-screen bg-coffee-foam">
      <Navigation currentPage="home" />
      
      <section className="pt-32 pb-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-block bg-coffee-accent text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              Coming January 2025
            </span>
            <h1 className="text-4xl md:text-6xl font-light leading-tight tracking-tight mb-6 text-coffee-primary">
              Coffee Trends Pro<br/>
              <span className="text-coffee-accent">Full Access. Real ROI.</span>
            </h1>
            <p className="text-xl text-coffee-earth font-light max-w-3xl mx-auto">
              Get complete trend intelligence that generates $8K-12K monthly per trend.<br/>
              <span className="font-medium">First 100 members get 50% off forever.</span>
            </p>
          </div>

          {/* Pricing Tiers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            
            {/* Free Tier */}
            <div className="bg-white p-8 rounded-lg shadow-soft border border-coffee-neutral-200">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-craft text-coffee-primary mb-2">Preview Edition</h3>
                <div className="text-4xl font-light text-coffee-primary mb-2">Free</div>
                <p className="text-coffee-earth text-sm">Perfect for exploring</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span className="text-coffee-earth">1 trend per month</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span className="text-coffee-earth">Basic trend description</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span className="text-coffee-earth">Success probability score</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <span className="mr-2 mt-1">✗</span>
                  <span>Recipe & instructions</span>
                </li>
                <li className="flex items-start text-gray-400">
                  <span className="mr-2 mt-1">✗</span>
                  <span>Supplier contacts</span>
                </li>
              </ul>
              
              <button className="w-full py-3 border border-coffee-neutral-200 text-coffee-primary rounded-lg hover:bg-gray-50 transition-colors">
                Current Plan
              </button>
            </div>

            {/* Pro Tier - Highlighted */}
            <div className="bg-coffee-primary text-white p-8 rounded-lg shadow-large transform scale-105 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-coffee-accent text-white px-4 py-1 rounded-full text-sm">
                Most Popular
              </div>
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-craft text-coffee-foam mb-2">Pro</h3>
                <div className="text-4xl font-light text-coffee-foam mb-2">
                  $47<span className="text-xl">/month</span>
                </div>
                <p className="text-coffee-cream text-sm">Launch price: $29/month</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-coffee-accent mr-2 mt-1">✓</span>
                  <span className="text-coffee-foam">All 4 weekly trends</span>
                </li>
                <li className="flex items-start">
                  <span className="text-coffee-accent mr-2 mt-1">✓</span>
                  <span className="text-coffee-foam">Complete recipes & instructions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-coffee-accent mr-2 mt-1">✓</span>
                  <span className="text-coffee-foam">Supplier contacts & pricing</span>
                </li>
                <li className="flex items-start">
                  <span className="text-coffee-accent mr-2 mt-1">✓</span>
                  <span className="text-coffee-foam">Community Slack access</span>
                </li>
                <li className="flex items-start">
                  <span className="text-coffee-accent mr-2 mt-1">✓</span>
                  <span className="text-coffee-foam">ROI tracking dashboard</span>
                </li>
              </ul>
              
              <button className="w-full py-3 bg-coffee-accent text-white rounded-lg hover:scale-105 transition-transform font-medium">
                Get Early Access
              </button>
            </div>

            {/* Shop Tier */}
            <div className="bg-white p-8 rounded-lg shadow-soft border border-coffee-neutral-200">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-craft text-coffee-primary mb-2">Shop</h3>
                <div className="text-4xl font-light text-coffee-primary mb-2">
                  $97<span className="text-xl">/month</span>
                </div>
                <p className="text-coffee-earth text-sm">For serious operators</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span className="text-coffee-earth">Everything in Pro</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span className="text-coffee-earth">72-hour early access</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span className="text-coffee-earth">Monthly strategy calls</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span className="text-coffee-earth">Implementation support</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span className="text-coffee-earth">ROI guarantee</span>
                </li>
              </ul>
              
              <button className="w-full py-3 bg-coffee-primary text-white rounded-lg hover:bg-coffee-roast transition-colors">
                Get Early Access
              </button>
            </div>
          </div>

          {/* ROI Calculator */}
          <div className="bg-white p-8 rounded-lg shadow-soft mb-16">
            <h2 className="text-2xl font-craft text-coffee-primary mb-6 text-center">Your Potential ROI</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="text-3xl font-light text-coffee-accent mb-2">1 Trend</div>
                <div className="text-coffee-earth">Implemented monthly</div>
                <div className="text-2xl font-medium text-coffee-primary mt-2">$8,000</div>
                <div className="text-sm text-coffee-earth">Average revenue</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-light text-coffee-accent mb-2">- $47</div>
                <div className="text-coffee-earth">Pro subscription</div>
                <div className="text-2xl font-medium text-green-600 mt-2">$7,953</div>
                <div className="text-sm text-coffee-earth">Net profit</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-light text-coffee-accent mb-2">169x</div>
                <div className="text-coffee-earth">Return on investment</div>
                <div className="text-2xl font-medium text-coffee-primary mt-2">$95,436</div>
                <div className="text-sm text-coffee-earth">Annual profit</div>
              </div>
            </div>
            
            <p className="text-center text-coffee-earth text-sm">
              * Based on average performance of 231 coffee shops currently subscribed
            </p>
          </div>

          {/* Early Access Form */}
          <div className="bg-coffee-primary p-8 rounded-lg text-center">
            <h2 className="text-3xl font-light text-coffee-foam mb-4">Be First to Get Pro Access</h2>
            <p className="text-coffee-cream mb-6">
              First 100 members get 50% off forever. Launching January 2025.
            </p>
            
            <form onSubmit={handleEarlyAccess} className="bg-white p-6 rounded-lg max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 mb-3 border border-coffee-neutral-200 rounded-lg focus:border-coffee-accent"
                required
              />
              <input
                type="text"
                placeholder="Coffee shop name"
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
                className="w-full p-3 mb-3 border border-coffee-neutral-200 rounded-lg focus:border-coffee-accent"
                required
              />
              <select
                value={shopSize}
                onChange={(e) => setShopSize(e.target.value)}
                className="w-full p-3 mb-3 border border-coffee-neutral-200 rounded-lg focus:border-coffee-accent text-coffee-earth"
                required
              >
                <option value="">Daily customers served</option>
                <option value="<50">Less than 50</option>
                <option value="50-100">50-100</option>
                <option value="100-200">100-200</option>
                <option value="200-500">200-500</option>
                <option value="500+">500+</option>
              </select>
              <select
                value={pricePoint}
                onChange={(e) => setPricePoint(e.target.value)}
                className="w-full p-3 mb-3 border border-coffee-neutral-200 rounded-lg focus:border-coffee-accent text-coffee-earth"
                required
              >
                <option value="">Average drink price</option>
                <option value="<5">Under $5</option>
                <option value="5-7">$5-7</option>
                <option value="7-9">$7-9</option>
                <option value="9+">$9+</option>
              </select>
              <button 
                type="submit"
                className="w-full bg-coffee-accent text-white py-3 rounded-lg font-medium hover:scale-105 transition-transform"
              >
                Reserve My Spot (50% Off)
              </button>
              <p className="text-xs text-coffee-earth mt-3">No payment required. We&apos;ll email you when Pro launches.</p>
            </form>
          </div>

          {/* FAQ */}
          <div className="mt-16">
            <h2 className="text-2xl font-craft text-coffee-primary mb-8 text-center">Frequently Asked Questions</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-medium text-coffee-primary mb-2">When will Pro launch?</h3>
                <p className="text-coffee-earth text-sm">
                  January 2025. Early access members will be notified first and get lifetime 50% discount.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-coffee-primary mb-2">What&apos;s the ROI guarantee?</h3>
                <p className="text-coffee-earth text-sm">
                  If a trend doesn&apos;t generate 10x your subscription cost, your next month is free.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-coffee-primary mb-2">Can I change tiers anytime?</h3>
                <p className="text-coffee-earth text-sm">
                  Yes, upgrade or downgrade anytime. No contracts or cancellation fees.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-coffee-primary mb-2">Do I need Pro to succeed?</h3>
                <p className="text-coffee-earth text-sm">
                  Free tier gives you a taste, but Pro members get the complete implementation details needed for success.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}