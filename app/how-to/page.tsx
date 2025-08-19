'use client'

import { useState } from 'react'

export default function HowToPage() {
  const [activeCard, setActiveCard] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">Korean Trend Scout</h1>
            <div className="flex items-center gap-4">
              <a href="/coffee-trends" className="text-blue-600 font-medium">Trends</a>
              <a href="/how-to" className="text-blue-600 font-medium">Guide</a>
              <a href="/pricing" className="text-gray-600 font-medium">Pricing</a>
              <a href="/" className="text-gray-600 font-medium">Home</a>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            How Korean Trend Scout Works
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Professional Korean coffee intelligence for global coffee businesses
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-blue-800 mb-2">🎯 Two Questions. Complete Answers.</h2>
            <p className="text-blue-700">
              Every trend gives you decisive business intelligence: market viability and exact execution plan.
            </p>
          </div>
        </div>

        {/* Main Value Cards - Clickable */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">What You Get For Every Trend</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* THE WHY Card */}
            <div 
              className={`border-2 rounded-xl p-8 cursor-pointer transition-all ${
                activeCard === 'why' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-blue-300 hover:bg-blue-25'
              }`}
              onClick={() => setActiveCard(activeCard === 'why' ? null : 'why')}
            >
              <div className="text-center mb-6">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-bold text-gray-900">THE WHY</h3>
                <p className="text-gray-600 mt-2">Should I launch this in my market?</p>
              </div>
              
              {activeCard === 'why' && (
                <div className="space-y-4 mt-6 pt-6 border-t border-blue-200">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Success Probability</span>
                      <span className="font-bold text-green-600 bg-green-100 px-2 py-1 rounded">87%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Market Readiness</span>
                      <span className="font-semibold bg-blue-100 px-2 py-1 rounded">High</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Competitor Risk</span>
                      <span className="font-semibold bg-yellow-100 px-2 py-1 rounded">Low</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Time to Global</span>
                      <span className="font-semibold bg-purple-100 px-2 py-1 rounded">3-4 months</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-white rounded border">
                    <p className="text-xs font-semibold text-gray-700 mb-1">Historical Precedent:</p>
                    <p className="text-xs text-gray-600">&quot;Dalgona coffee (2020) - 340% global adoption within 6 months&quot;</p>
                  </div>
                  
                  <div className="mt-4 text-center">
                    <p className="text-sm font-medium text-blue-700">
                      ✅ Clear go/no-go decision with confidence score
                    </p>
                  </div>
                </div>
              )}
              
              {activeCard !== 'why' && (
                <div className="text-center">
                  <p className="text-sm text-gray-500">Click to see sample analysis →</p>
                </div>
              )}
            </div>

            {/* THE HOW Card */}
            <div 
              className={`border-2 rounded-xl p-8 cursor-pointer transition-all ${
                activeCard === 'how' 
                  ? 'border-green-500 bg-green-50' 
                  : 'border-gray-200 hover:border-green-300 hover:bg-green-25'
              }`}
              onClick={() => setActiveCard(activeCard === 'how' ? null : 'how')}
            >
              <div className="text-center mb-6">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-bold text-gray-900">THE HOW</h3>
                <p className="text-gray-600 mt-2">Exact recipe + business execution</p>
              </div>
              
              {activeCard === 'how' && (
                <div className="space-y-4 mt-6 pt-6 border-t border-green-200">
                  <div>
                    <h4 className="font-semibold text-sm text-gray-800 mb-2">📋 Complete Recipe</h4>
                    <div className="text-xs text-gray-600 bg-white p-3 rounded">
                      <p>• 200ml espresso, 60g cream cheese (room temp)</p>
                      <p>• 6-step process with exact measurements</p>
                      <p>• Prep time: 5 minutes, serves fresh</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-sm text-gray-800 mb-2">💰 Business Plan</h4>
                    <div className="text-xs text-gray-600 bg-white p-3 rounded space-y-1">
                      <p>Cost: $1.85 → Retail: $6.50-$7.50 (75% margin)</p>
                      <p>Suppliers: Restaurant Depot, H Mart</p>
                      <p>Staff training: 3 key techniques, common mistakes</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 text-center">
                    <p className="text-sm font-medium text-green-700">
                      ⚡ Ready to launch within days, not weeks
                    </p>
                  </div>
                </div>
              )}
              
              {activeCard !== 'how' && (
                <div className="text-center">
                  <p className="text-sm text-gray-500">Click to see execution details →</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Simple Process */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">How to Use</h2>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Browse Current Trends</h3>
                <p className="text-gray-600 text-sm">Visit Trends page to see emerging Korean coffee products with WHY and HOW analysis</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Evaluate Market Fit</h3>
                <p className="text-gray-600 text-sm">Review success probability, market readiness, and competitor risk for your location</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Get Complete Recipe & Business Plan</h3>
                <p className="text-gray-600 text-sm">Click &quot;View Complete Recipe & Training Guide&quot; for exact ingredients, suppliers, pricing, and staff training</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">4</div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Launch Before Competition</h3>
                <p className="text-gray-600 text-sm">Execute with 3-6 month head start over competitors who wait for trends to reach their market</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="bg-blue-600 text-white rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4">
              Ready to Lead Instead of Follow?
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Professional Korean coffee trend intelligence with actionable business plans.
            </p>
            <a 
              href="/coffee-trends" 
              className="inline-block px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              View Current Trends
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}