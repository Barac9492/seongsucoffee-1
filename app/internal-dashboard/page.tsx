'use client'

import { useState } from 'react'
import Navigation from '../../components/Navigation'

export default function InternalDashboard() {
  const [accessGranted, setAccessGranted] = useState(false)
  const [password, setPassword] = useState('')

  const handleAccess = () => {
    if (password === 'board2024') {
      setAccessGranted(true)
    }
  }

  if (!accessGranted) {
    return (
      <div className="min-h-screen bg-coffee-foam flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-medium max-w-md w-full">
          <h1 className="text-2xl font-craft text-coffee-primary mb-4">Board Access Required</h1>
          <p className="text-coffee-earth mb-6">This page is for internal board members only.</p>
          <input
            type="password"
            placeholder="Enter board password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAccess()}
            className="w-full p-3 border border-coffee-neutral-200 rounded-lg mb-4"
          />
          <button
            onClick={handleAccess}
            className="w-full btn-coffee-primary"
          >
            Access Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-coffee-foam">
      <Navigation currentPage="home" />
      
      {/* Internal Header */}
      <section className="pt-32 pb-8 px-8 bg-red-50 border-b-4 border-red-500">
        <div className="max-w-6xl mx-auto text-center">
          <div className="bg-red-500 text-white px-4 py-2 rounded-lg inline-block mb-4 font-craft">
            🔒 INTERNAL BOARD DASHBOARD - NOT FOR PUBLIC
          </div>
          <h1 className="text-4xl font-craft text-coffee-primary mb-4">
            Coffee Trends Weekly - Launch Strategy
          </h1>
          <p className="text-coffee-earth">
            Board members: Howard, Jony, Sam, Jeff, Mark, Peter, Pieter, Seth
          </p>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-8 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-medium">
              <div className="text-sm text-coffee-earth mb-2">Domain Status</div>
              <div className="text-2xl font-craft text-green-600">✅ Secured</div>
              <div className="text-xs text-coffee-neutral-400">CoffeeTrendsWeekly.com</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-medium">
              <div className="text-sm text-coffee-earth mb-2">Platform Status</div>
              <div className="text-2xl font-craft text-green-600">✅ Live</div>
              <div className="text-xs text-coffee-neutral-400">25 pages deployed</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-medium">
              <div className="text-sm text-coffee-earth mb-2">Payment Status</div>
              <div className="text-2xl font-craft text-yellow-600">⏳ Pending</div>
              <div className="text-xs text-coffee-neutral-400">Stripe integration needed</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-medium">
              <div className="text-sm text-coffee-earth mb-2">Launch Status</div>
              <div className="text-2xl font-craft text-blue-600">🚀 Ready</div>
              <div className="text-xs text-coffee-neutral-400">Awaiting board approval</div>
            </div>
          </div>

          {/* Pieter's 24-Hour Launch Plan */}
          <div className="bg-white rounded-lg p-8 shadow-medium mb-8">
            <h2 className="text-2xl font-craft text-coffee-primary mb-6">
              Pieter&apos;s 24-Hour Launch Timeline
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">✓</div>
                <div className="flex-1">
                  <h3 className="font-craft text-coffee-primary mb-1">Hour 0-2: Domain & Infrastructure</h3>
                  <ul className="text-sm text-coffee-earth space-y-1">
                    <li>✓ Domain purchased ($12/year)</li>
                    <li>✓ Platform deployed on Vercel</li>
                    <li>✓ Landing page with clear value prop</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                <div className="flex-1">
                  <h3 className="font-craft text-coffee-primary mb-1">Hour 2-6: Payment & Content</h3>
                  <ul className="text-sm text-coffee-earth space-y-1">
                    <li>⏳ Stripe integration for subscriptions</li>
                    <li>⏳ 7-day free trial flow</li>
                    <li>⏳ First 3 Korean trend reports</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-300 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                <div className="flex-1">
                  <h3 className="font-craft text-coffee-primary mb-1">Hour 6-12: Social Proof</h3>
                  <ul className="text-sm text-coffee-earth space-y-1">
                    <li>○ Customer testimonials</li>
                    <li>○ Social media accounts</li>
                    <li>○ Test payment flow</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-300 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                <div className="flex-1">
                  <h3 className="font-craft text-coffee-primary mb-1">Hour 12-24: Launch</h3>
                  <ul className="text-sm text-coffee-earth space-y-1">
                    <li>○ Post on Twitter, Reddit, IndieHackers</li>
                    <li>○ Email coffee industry contacts</li>
                    <li>○ Monitor first signups</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Board Member Responsibilities */}
          <div className="bg-white rounded-lg p-8 shadow-medium mb-8">
            <h2 className="text-2xl font-craft text-coffee-primary mb-6">Board Responsibilities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-craft text-coffee-accent mb-3">Product & Design</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-coffee-earth">Howard Schultz</span>
                    <span className="text-coffee-neutral-400">Coffee expertise</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-coffee-earth">Jony Ive</span>
                    <span className="text-coffee-neutral-400">Design coherence</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-coffee-earth">Sam Altman</span>
                    <span className="text-coffee-neutral-400">AI integration</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-craft text-coffee-accent mb-3">Growth & Strategy</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-coffee-earth">Jeff Bezos</span>
                    <span className="text-coffee-neutral-400">Value proposition</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-coffee-earth">Mark Zuckerberg</span>
                    <span className="text-coffee-neutral-400">Network effects</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-coffee-earth">Peter Thiel</span>
                    <span className="text-coffee-neutral-400">Business strategy</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-coffee-earth">Pieter Levels</span>
                    <span className="text-coffee-neutral-400">Rapid shipping</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-coffee-earth">Seth Godin</span>
                    <span className="text-coffee-neutral-400">Tribal marketing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Success Metrics */}
          <div className="bg-white rounded-lg p-8 shadow-medium">
            <h2 className="text-2xl font-craft text-coffee-primary mb-6">Week 1 Success Metrics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-craft text-coffee-accent mb-2">100</div>
                <div className="text-sm text-coffee-earth">Target Signups</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-craft text-coffee-accent mb-2">25</div>
                <div className="text-sm text-coffee-earth">Target Trials</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-craft text-coffee-accent mb-2">5</div>
                <div className="text-sm text-coffee-earth">Paid Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-craft text-coffee-accent mb-2">$235</div>
                <div className="text-sm text-coffee-earth">Target Revenue</div>
              </div>
            </div>
            <div className="mt-6 p-4 bg-coffee-cream rounded-lg">
              <p className="text-sm text-coffee-earth text-center">
                If we hit these numbers, we have product-market fit. If not, pivot or kill within 30 days.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}