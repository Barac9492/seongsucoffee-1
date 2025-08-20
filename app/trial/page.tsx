'use client'

import { useState } from 'react'
import Navigation from '../../components/Navigation'

export default function TrialPage() {
  const [email, setEmail] = useState('')
  const [selectedPlan, setSelectedPlan] = useState('starter')
  const [submitted, setSubmitted] = useState(false)

  const plans = {
    free: { name: 'Free', price: 0, trends: 1 },
    starter: { name: 'Starter', price: 47, trends: 4 },
    professional: { name: 'Professional', price: 97, trends: 8 }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setSubmitted(true)
    // In production, this would create the trial account
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-coffee-foam flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-medium max-w-md text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-2xl font-craft text-coffee-primary mb-4">Trial Started!</h1>
          <p className="text-coffee-earth mb-6">
            Check your email for your first Korean coffee trend. You have 7 days of full access.
          </p>
          <div className="bg-coffee-accent text-white p-4 rounded-lg mb-4">
            <div className="font-craft mb-2">What happens next:</div>
            <div className="text-sm space-y-1">
              <div>✓ Instant email with first trend</div>
              <div>✓ Recipe, suppliers, pricing included</div>
              <div>✓ 7 days to test with your customers</div>
            </div>
          </div>
          <a href="/coffee-trends" className="btn-coffee-primary w-full">
            View Your Trends
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-coffee-foam">
      <Navigation currentPage="home" />
      
      <section className="pt-32 pb-16 px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-medium p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-craft text-coffee-primary mb-4">
                Start Your 7-Day Free Trial
              </h1>
              <p className="text-coffee-earth">
                Get full access to Korean coffee trends that generate $2-8K/month extra revenue
              </p>
            </div>

            {/* Plan Selection */}
            <div className="mb-6">
              <h2 className="font-craft text-coffee-primary mb-4">Choose Your Plan:</h2>
              <div className="space-y-3">
                {Object.entries(plans).map(([key, plan]) => (
                  <label key={key} className="flex items-center p-4 border border-coffee-neutral-200 rounded-lg cursor-pointer hover:bg-coffee-cream">
                    <input
                      type="radio"
                      name="plan"
                      value={key}
                      checked={selectedPlan === key}
                      onChange={(e) => setSelectedPlan(e.target.value)}
                      className="mr-4"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-craft text-coffee-primary">{plan.name}</div>
                          <div className="text-sm text-coffee-earth">{plan.trends} trends per month</div>
                        </div>
                        <div className="text-right">
                          <div className="font-craft text-coffee-accent">
                            {plan.price === 0 ? 'Free' : `$${plan.price}/mo`}
                          </div>
                          <div className="text-xs text-coffee-earth">
                            {key === 'starter' && 'Most Popular'}
                            {key === 'professional' && 'Best Value'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Trial Form */}
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="email" className="block font-craft text-coffee-primary mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@coffeeshop.com"
                  required
                  className="w-full p-4 border border-coffee-neutral-200 rounded-lg focus:border-coffee-accent"
                />
              </div>

              <button
                type="submit"
                disabled={!email.trim()}
                className="w-full btn-coffee-primary text-lg py-4 disabled:opacity-50"
              >
                🚀 Start 7-Day Free Trial
              </button>
            </form>

            {/* Trust Signals */}
            <div className="mt-6 text-center">
              <div className="text-xs text-coffee-earth space-y-1">
                <div>✓ No credit card required</div>
                <div>✓ Cancel anytime during trial</div>
                <div>✓ Keep all trends even if you cancel</div>
                <div>✓ Jeff&apos;s $500 guarantee</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}