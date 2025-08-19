'use client'

import { useState, useEffect } from 'react'

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

function daysAgo(date: string) {
  const now = new Date()
  const then = new Date(date)
  const diff = Math.floor((now.getTime() - then.getTime()) / (1000 * 60 * 60 * 24))
  return diff
}

export default function CoffeeTrendsPage() {
  const [trends, setTrends] = useState<CoffeeTrend[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTrend, setSelectedTrend] = useState<CoffeeTrend | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)

  useEffect(() => {
    async function fetchTrends() {
      try {
        const response = await fetch('/api/coffee-trends')
        const data = await response.json()
        setTrends(data.trends)
      } catch (error) {
        console.error('Failed to fetch trends:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchTrends()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Loading Korean trends...</p>
        </div>
      </div>
    )
  }

  const avgGrowth = trends.length > 0 ? Math.round(trends.reduce((acc, t) => acc + t.growth, 0) / trends.length) : 0

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Korean Trend Scout</h1>
              <p className="text-sm text-gray-600">Should I launch this? How do I launch this?</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">↑ {avgGrowth}%</div>
                <div className="text-xs text-gray-500">Avg. trend growth</div>
              </div>
              <nav className="flex items-center gap-4">
                <a href="/coffee-trends" className="text-blue-600 font-medium">Trends</a>
                <a href="/how-to" className="text-gray-600 hover:text-blue-600 font-medium">Guide</a>
                <a href="/pricing" className="text-gray-600 hover:text-blue-600 font-medium">Pricing</a>
                <a href="/" className="text-gray-600 hover:text-blue-600 font-medium">Home</a>
                <a href="/admin" className="text-gray-600 hover:text-blue-600 font-medium">Admin</a>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Korean Trend Intelligence */}
      <section className="max-w-6xl mx-auto px-4 py-8">        
        <div className="space-y-8">
          {trends.map((trend) => (
            <div key={trend.id} className="bg-white rounded-xl border border-gray-200 p-8">
              
              {/* Trend Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{trend.name}</h3>
                  <p className="text-gray-600">{trend.nameKr}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {trend.districts.join(', ')} • {daysAgo(trend.firstDetected)} days old
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-green-600">↑{trend.growth}%</div>
                  <div className="text-sm text-gray-500">{trend.cafesServing} cafes serving</div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* THE WHY */}
                <div className="bg-blue-50 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="text-2xl mr-3">🎯</div>
                    <h4 className="text-lg font-bold text-gray-900">THE WHY</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Should I launch this in my market?</p>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-700">Success Probability</span>
                      <span className="font-bold text-green-600">{trend.successProbability}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Market Readiness</span>
                      <span className="font-semibold">{trend.marketReadiness}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Competitor Risk</span>
                      <span className="font-semibold">{trend.competitorRisk}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Time to Global</span>
                      <span className="font-semibold">{trend.timeToGlobal}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-white rounded border">
                    <p className="text-xs font-semibold text-gray-700 mb-1">Historical Precedent:</p>
                    <p className="text-xs text-gray-600">{trend.historicalPrecedent}</p>
                  </div>
                </div>

                {/* THE HOW */}
                <div className="bg-green-50 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="text-2xl mr-3">⚡</div>
                    <h4 className="text-lg font-bold text-gray-900">THE HOW</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Exact business execution plan</p>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold text-sm text-gray-800 mb-2">Recipe & Prep</p>
                      <div className="text-xs text-gray-600 space-y-1">
                        <p>Difficulty: {trend.recipe.difficulty} • Prep: {trend.recipe.prepTime}</p>
                        <p>{trend.recipe.ingredients.length} ingredients • {trend.recipe.instructions.length} steps</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="font-semibold text-sm text-gray-800 mb-2">Pricing Strategy</p>
                      <div className="text-xs text-gray-600 space-y-1">
                        <p>Cost: {trend.pricing.costPerServing} • Retail: {trend.pricing.suggestedRetail}</p>
                        <p>Margin: {trend.pricing.margin}</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="font-semibold text-sm text-gray-800 mb-2">Key Suppliers</p>
                      <div className="text-xs text-gray-600">
                        {trend.suppliers.slice(0, 2).map((supplier, idx) => (
                          <p key={idx}>{supplier.ingredient}: {supplier.source}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => {
                      setSelectedTrend(trend)
                      setDetailsOpen(true)
                    }}
                    className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 transition-colors"
                  >
                    View Complete Recipe & Training Guide
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recipe Modal */}
      {selectedTrend && detailsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Complete Guide: {selectedTrend.name}</h2>
                <button 
                  onClick={() => setDetailsOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Recipe */}
                <div>
                  <h3 className="font-bold text-lg mb-4">📋 Complete Recipe</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Ingredients:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {selectedTrend.recipe.ingredients.map((ingredient, idx) => (
                          <li key={idx}>• {ingredient}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Instructions:</h4>
                      <ol className="text-sm text-gray-600 space-y-1">
                        {selectedTrend.recipe.instructions.map((step, idx) => (
                          <li key={idx}>{idx + 1}. {step}</li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
                
                {/* Business Details */}
                <div>
                  <h3 className="font-bold text-lg mb-4">💼 Business Execution</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Suppliers:</h4>
                      {selectedTrend.suppliers.map((supplier, idx) => (
                        <div key={idx} className="text-sm bg-gray-50 p-3 rounded mb-2">
                          <p className="font-medium">{supplier.ingredient}</p>
                          <p className="text-gray-600">Source: {supplier.source}</p>
                          <p className="text-gray-600">Cost: {supplier.cost}</p>
                          <p className="text-xs text-gray-500">{supplier.notes}</p>
                        </div>
                      ))}
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Training Notes:</h4>
                      <div className="text-sm text-gray-600 space-y-2">
                        <div>
                          <p className="font-medium">Key Techniques:</p>
                          <ul className="space-y-1">
                            {selectedTrend.training.keyTechniques.map((technique, idx) => (
                              <li key={idx}>• {technique}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="font-medium">Common Mistakes:</p>
                          <ul className="space-y-1">
                            {selectedTrend.training.commonMistakes.map((mistake, idx) => (
                              <li key={idx}>• {mistake}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="font-medium">Quality Control:</p>
                          <p>{selectedTrend.training.qualityControl}</p>
                        </div>
                      </div>
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