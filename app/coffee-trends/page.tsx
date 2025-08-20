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
              Korean Coffee Trends<br/>
              <span className="text-coffee-accent">Dashboard</span>
            </h1>
            <p className="text-lg md:text-xl text-coffee-earth font-light max-w-3xl mx-auto px-4">
              Real-time profitable trends for your coffee shop
            </p>
          </div>

          {/* Mobile-Optimized Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-8 md:mb-12">
            <div className="text-center bg-white p-4 md:p-6 rounded-lg shadow-soft">
              <div className="text-2xl md:text-4xl font-light mb-1 md:mb-2 text-coffee-accent">{trends.length}</div>
              <div className="text-xs md:text-sm text-coffee-earth">Active Trends</div>
            </div>
            <div className="text-center bg-white p-4 md:p-6 rounded-lg shadow-soft">
              <div className="text-2xl md:text-4xl font-light mb-1 md:mb-2 text-green-600">89%</div>
              <div className="text-xs md:text-sm text-coffee-earth">Success Rate</div>
            </div>
            <div className="text-center bg-white p-4 md:p-6 rounded-lg shadow-soft">
              <div className="text-2xl md:text-4xl font-light mb-1 md:mb-2 text-coffee-primary">$2.1M</div>
              <div className="text-xs md:text-sm text-coffee-earth">Revenue Generated</div>
            </div>
            <div className="text-center bg-white p-4 md:p-6 rounded-lg shadow-soft">
              <div className="text-2xl md:text-4xl font-light mb-1 md:mb-2 text-coffee-accent">240</div>
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
                      <h3 className="text-lg md:text-2xl font-light mb-1 md:mb-2 text-coffee-primary truncate">{trend.name}</h3>
                      <p className="text-coffee-earth text-xs md:text-sm">{trend.nameKr}</p>
                    </div>
                    <div className="text-right ml-4 flex-shrink-0">
                      <div className="text-xl md:text-3xl font-light text-green-600 mb-1">{trend.successProbability}%</div>
                      <div className="text-xs text-coffee-earth">Success</div>
                    </div>
                  </div>

                  {/* Mobile-Optimized Key Metrics */}
                  <div className="grid grid-cols-3 gap-2 md:gap-4 mb-4 md:mb-6">
                    <div className="text-center bg-blue-50 p-2 md:p-3 rounded">
                      <div className="text-sm md:text-2xl font-light text-blue-600 mb-1">+{trend.growth}%</div>
                      <div className="text-xs text-coffee-earth">Growth</div>
                    </div>
                    <div className="text-center bg-coffee-cream p-2 md:p-3 rounded">
                      <div className="text-sm md:text-2xl font-light mb-1 text-coffee-primary">{trend.cafesServing}</div>
                      <div className="text-xs text-coffee-earth">Cafes</div>
                    </div>
                    <div className="text-center bg-orange-50 p-2 md:p-3 rounded">
                      <div className="text-sm md:text-2xl font-light text-orange-600 mb-1">{trend.competitorRisk}</div>
                      <div className="text-xs text-coffee-earth">Risk</div>
                    </div>
                  </div>

                  {/* Mobile-Optimized Market Info */}
                  <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                    <div className="flex justify-between text-xs md:text-sm">
                      <span className="text-coffee-earth">Market:</span>
                      <span className="font-medium text-coffee-primary">{trend.marketReadiness}</span>
                    </div>
                    <div className="flex justify-between text-xs md:text-sm">
                      <span className="text-coffee-earth">Global:</span>
                      <span className="font-medium text-coffee-primary">{trend.timeToGlobal}</span>
                    </div>
                    <div className="flex justify-between text-xs md:text-sm">
                      <span className="text-coffee-earth">Stage:</span>
                      <span className="font-medium capitalize text-coffee-primary">{trend.stage}</span>
                    </div>
                  </div>

                  {/* Mobile-Optimized Action Button */}
                  <button className="w-full py-2 md:py-3 bg-coffee-primary text-white rounded-lg hover:bg-coffee-roast transition-colors text-sm md:text-base font-medium">
                    📊 View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}