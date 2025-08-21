'use client'

import { useState, useEffect } from 'react'
import Navigation from '../../components/Navigation'

interface CoffeeTrend {
  id: string
  name: string
  nameKr: string
  successProbability: number
  marketReadiness: string
  competitorRisk: string
  historicalPrecedent: string
  timeToGlobal: string
  recipe: {
    ingredients: string[]
    instructions: string[]
    difficulty: string
    prepTime: string
    shelfLife: string
  }
  suppliers: {
    ingredient: string
    source: string
    cost: string
    notes: string
  }[]
  pricing: {
    costPerServing: string
    suggestedRetail: string
    margin: string
    premiumPosition: string
  }
  training: {
    keyTechniques: string[]
    commonMistakes: string[]
    qualityControl: string
  }
  growth: number
  stage: string
  cafesServing: number
  firstDetected: string
  lastUpdated: string
  districts: string[]
  videoProof: any[]
  signals?: any[]
}

export default function CoffeeTrendsPage() {
  const [trends, setTrends] = useState<CoffeeTrend[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTrend, setSelectedTrend] = useState<CoffeeTrend | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)

  useEffect(() => {
    fetchTrends()
  }, [])

  const fetchTrends = async () => {
    try {
      const response = await fetch('/api/coffee-trends')
      const data = await response.json()
      setTrends(data.trends || [])
    } catch (error) {
      console.error('Failed to fetch trends:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-coffee-foam flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-coffee-accent"></div>
          <p className="mt-2 text-coffee-earth">Loading Korean trends...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-coffee-foam">
      <Navigation currentPage="trends" />

      {/* Mobile-Optimized Header */}
      <section className="pt-20 md:pt-32 pb-8 md:pb-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-light leading-tight tracking-tight mb-4 md:mb-6 text-coffee-primary">
              Verified Korean Coffee Trends<br/>
              <span className="text-coffee-accent">Dashboard</span>
            </h1>
            <p className="text-lg md:text-xl text-coffee-earth font-light max-w-3xl mx-auto px-4">
              Preview of this Tuesday&apos;s newsletter • Get all trends free via email
            </p>
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full mt-4">
              <span className="text-sm font-medium">✓ Subscribe below to get weekly trends</span>
            </div>
          </div>

          {/* Mobile-Optimized Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-8 md:mb-12">
            <div className="text-center bg-white p-4 md:p-6 rounded-lg shadow-soft">
              <div className="text-2xl md:text-4xl font-light mb-1 md:mb-2 text-coffee-accent">{trends.length}</div>
              <div className="text-xs md:text-sm text-coffee-earth">Verified Trends</div>
            </div>
            <div className="text-center bg-white p-4 md:p-6 rounded-lg shadow-soft">
              <div className="text-2xl md:text-4xl font-light mb-1 md:mb-2 text-green-600">89%</div>
              <div className="text-xs md:text-sm text-coffee-earth">Success Rate</div>
            </div>
            <div className="text-center bg-white p-4 md:p-6 rounded-lg shadow-soft">
              <div className="text-2xl md:text-4xl font-light mb-1 md:mb-2 text-coffee-primary">$2.94M</div>
              <div className="text-xs md:text-sm text-coffee-earth">Revenue Generated</div>
            </div>
            <div className="text-center bg-white p-4 md:p-6 rounded-lg shadow-soft">
              <div className="text-2xl md:text-4xl font-light mb-1 md:mb-2 text-coffee-accent">231</div>
              <div className="text-xs md:text-sm text-coffee-earth">Coffee Shops</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile-Optimized Trends Grid */}
      <section className="py-8 md:py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-8">
            {trends.map((trend) => (
              <div key={trend.id} className="border border-coffee-neutral-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-white">
                <div className="p-4 md:p-8">
                  <div className="flex items-start justify-between mb-4 md:mb-6">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg md:text-2xl font-semibold mb-1 md:mb-2 text-gray-900 truncate">{trend.name}</h3>
                      <p className="text-gray-600 text-xs md:text-sm font-medium">{trend.nameKr}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs bg-green-100 text-green-900 px-2 py-1 rounded font-medium">✓ Seoul Verified</span>
                        <span className="text-xs text-gray-700 font-medium">$8K-12K monthly</span>
                      </div>
                    </div>
                    <div className="text-right ml-4 flex-shrink-0">
                      <div className="text-xl md:text-3xl font-bold text-green-700 mb-1">{trend.successProbability}%</div>
                      <div className="text-xs text-gray-600 font-medium">Success</div>
                    </div>
                  </div>

                  {/* Mobile-Optimized Key Metrics */}
                  <div className="grid grid-cols-3 gap-2 md:gap-4 mb-4 md:mb-6">
                    <div className="text-center bg-blue-50 p-2 md:p-3 rounded">
                      <div className="text-sm md:text-2xl font-semibold text-blue-900 mb-1">+{trend.growth}%</div>
                      <div className="text-xs text-gray-700 font-medium">Growth</div>
                    </div>
                    <div className="text-center bg-coffee-cream p-2 md:p-3 rounded">
                      <div className="text-sm md:text-2xl font-semibold mb-1 text-coffee-primary">{trend.cafesServing}</div>
                      <div className="text-xs text-gray-700 font-medium">Cafes</div>
                    </div>
                    <div className="text-center bg-orange-50 p-2 md:p-3 rounded">
                      <div className="text-sm md:text-2xl font-semibold text-orange-900 mb-1">{trend.competitorRisk}</div>
                      <div className="text-xs text-gray-700 font-medium">Risk</div>
                    </div>
                  </div>

                  {/* Mobile-Optimized Market Info */}
                  <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                    <div className="flex justify-between text-xs md:text-sm">
                      <span className="text-gray-600 font-medium">Market:</span>
                      <span className="font-semibold text-gray-900">{trend.marketReadiness}</span>
                    </div>
                    <div className="flex justify-between text-xs md:text-sm">
                      <span className="text-gray-600 font-medium">Global:</span>
                      <span className="font-semibold text-gray-900">{trend.timeToGlobal}</span>
                    </div>
                    <div className="flex justify-between text-xs md:text-sm">
                      <span className="text-gray-600 font-medium">Stage:</span>
                      <span className="font-semibold capitalize text-gray-900">{trend.stage}</span>
                    </div>
                  </div>

                  {/* Mobile-Optimized Action Button */}
                  <button 
                    onClick={() => {
                      setSelectedTrend(trend)
                      setDetailsOpen(true)
                    }}
                    className="w-full py-2 md:py-3 bg-coffee-primary text-white rounded-lg hover:bg-coffee-roast transition-colors text-sm md:text-base font-medium relative"
                  >
                    <span>📊 View Details</span>
                    <span className="absolute -top-2 -right-2 bg-coffee-accent text-white text-xs px-2 py-1 rounded-full">Pro</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 px-4 md:px-8 bg-coffee-primary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light text-coffee-foam mb-4">Get These Trends in Your Inbox</h2>
          <p className="text-coffee-cream mb-8">Free weekly newsletter every Tuesday. Korean coffee trends before your competition.</p>
          
          <div className="bg-white p-6 rounded-xl max-w-md mx-auto">
            <div className="space-y-4">
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full p-3 border border-coffee-neutral-200 rounded-lg focus:border-coffee-accent"
              />
              <input
                type="text"
                placeholder="Coffee shop name (optional)"
                className="w-full p-3 border border-coffee-neutral-200 rounded-lg focus:border-coffee-accent"
              />
              <button className="w-full bg-coffee-accent text-white py-3 rounded-lg font-medium hover:scale-105 transition-transform">
                🚀 Subscribe Free
              </button>
            </div>
            <p className="text-xs text-coffee-earth mt-3">231 coffee shops subscribed • Next issue Tuesday 9 AM PST</p>
          </div>
        </div>
      </section>

      {/* Recipe Modal */}
      {selectedTrend && detailsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black bg-opacity-30 backdrop-blur-sm">
          <div className="bg-white max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-large rounded-lg">
            <div className="p-6 md:p-12">
              <div className="flex items-center justify-between mb-8 md:mb-12">
                <div>
                  <h2 className="text-2xl md:text-4xl font-light tracking-tight text-coffee-primary">{selectedTrend.name}</h2>
                  <p className="text-coffee-earth text-sm md:text-base mt-1">{selectedTrend.nameKr}</p>
                </div>
                <button 
                  onClick={() => setDetailsOpen(false)}
                  className="text-coffee-earth hover:text-coffee-primary text-2xl"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
                {/* Recipe */}
                <div>
                  <h3 className="text-xl md:text-2xl font-light mb-6 md:mb-8 text-coffee-primary">Recipe</h3>
                  <div className="space-y-6 md:space-y-8">
                    <div>
                      <h4 className="font-medium mb-3 md:mb-4 text-coffee-primary">Ingredients</h4>
                      <ul className="text-coffee-earth space-y-2">
                        {selectedTrend.recipe.ingredients.map((ingredient, idx) => (
                          <li key={idx} className="flex items-start text-sm md:text-base">
                            <span className="text-coffee-accent mr-3">•</span>
                            <span>{ingredient}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-3 md:mb-4 text-coffee-primary">Instructions</h4>
                      <ol className="text-coffee-earth space-y-3">
                        {selectedTrend.recipe.instructions.map((step, idx) => (
                          <li key={idx} className="flex items-start text-sm md:text-base">
                            <span className="text-coffee-accent mr-3 font-mono text-sm">{idx + 1}.</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 p-4 bg-coffee-cream rounded-lg">
                      <div className="text-center">
                        <div className="text-sm text-coffee-earth">Difficulty</div>
                        <div className="font-medium text-coffee-primary">{selectedTrend.recipe.difficulty}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-coffee-earth">Prep Time</div>
                        <div className="font-medium text-coffee-primary">{selectedTrend.recipe.prepTime}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-coffee-earth">Success Rate</div>
                        <div className="font-medium text-green-600">{selectedTrend.successProbability}%</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Business Details */}
                <div>
                  <h3 className="text-xl md:text-2xl font-light mb-6 md:mb-8 text-coffee-primary">Business Intel</h3>
                  <div className="space-y-6 md:space-y-8">
                    <div>
                      <h4 className="font-medium mb-3 md:mb-4 text-coffee-primary">Market Analysis</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-coffee-earth">Market Readiness:</span>
                          <span className="font-medium text-coffee-primary">{selectedTrend.marketReadiness}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-coffee-earth">Competitor Risk:</span>
                          <span className="font-medium text-coffee-primary">{selectedTrend.competitorRisk}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-coffee-earth">Time to Global:</span>
                          <span className="font-medium text-coffee-primary">{selectedTrend.timeToGlobal}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-coffee-earth">Current Stage:</span>
                          <span className="font-medium capitalize text-coffee-primary">{selectedTrend.stage}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3 md:mb-4 text-coffee-primary">
                        Pricing Strategy
                        <span className="ml-2 bg-coffee-accent text-white text-xs px-2 py-1 rounded-full">Pro</span>
                      </h4>
                      <div className="space-y-3 relative">
                        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center rounded-lg">
                          <div className="text-center">
                            <p className="text-coffee-primary font-medium mb-2">🔒 Pro Members Only</p>
                            <a href="/pricing" className="text-coffee-accent hover:underline text-sm">
                              Unlock Full Details →
                            </a>
                          </div>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-coffee-earth">Cost per Serving:</span>
                          <span className="font-medium text-coffee-primary blur-sm">$X.XX</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-coffee-earth">Suggested Retail:</span>
                          <span className="font-medium text-coffee-primary blur-sm">$X.XX</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-coffee-earth">Profit Margin:</span>
                          <span className="font-medium text-green-600 blur-sm">XX%</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3 md:mb-4 text-coffee-primary">Key Training Points</h4>
                      <div className="space-y-4">
                        <div>
                          <p className="font-medium text-coffee-primary mb-2 text-sm">Critical Techniques:</p>
                          <ul className="text-coffee-earth space-y-1">
                            {selectedTrend.training.keyTechniques.map((technique, idx) => (
                              <li key={idx} className="flex items-start text-sm">
                                <span className="text-green-500 mr-2">✓</span>
                                <span>{technique}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="font-medium text-coffee-primary mb-2 text-sm">Avoid These Mistakes:</p>
                          <ul className="text-coffee-earth space-y-1">
                            {selectedTrend.training.commonMistakes.map((mistake, idx) => (
                              <li key={idx} className="flex items-start text-sm">
                                <span className="text-red-500 mr-2">✗</span>
                                <span>{mistake}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-coffee-accent text-white p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Want More Trends Like This?</h4>
                      <p className="text-sm text-coffee-cream mb-3">
                        Get 2-3 new Korean trends every Tuesday in your inbox
                      </p>
                      <button 
                        onClick={() => setDetailsOpen(false)}
                        className="inline-block bg-white text-coffee-accent px-4 py-2 rounded text-sm font-medium hover:scale-105 transition-transform"
                      >
                        Subscribe to Newsletter
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}