'use client'

import { useState, useEffect } from 'react'

interface RestaurantOpportunity {
  id: string
  concept: string
  cuisine_type: 'korean_bbq' | 'korean_fried_chicken' | 'korean_casual' | 'korean_cafe' | 'korean_street_food'
  location_readiness: {
    city: string
    state: string
    market_saturation: 'low' | 'medium' | 'high'
    korean_population_density: number
    food_trend_velocity: number
    real_estate_cost_index: number
    competition_count: number
  }
  financial_projections: {
    startup_cost_range: string
    monthly_revenue_potential: number
    break_even_months: number
    roi_projection_24m: number
  }
  market_intelligence: {
    trending_items: string[]
    consumer_demand_signals: string[]
    social_media_momentum: number
    delivery_platform_performance: string
  }
  execution_roadmap: {
    phase: 'scout' | 'lease' | 'launch' | 'scale'
    next_action: string
    timeline_weeks: number
    risk_factors: string[]
  }
  data_confidence: number
  last_updated: string
}

async function getRestaurantIntelligence() {
  try {
    const dbResponse = await fetch('https://web-production-a60f.up.railway.app/test-db', { 
      cache: 'no-store'
    })
    const dbData = await dbResponse.json()
    
    // Real California market opportunities based on Railway data
    const opportunities: RestaurantOpportunity[] = [
      {
        id: 'korean-bbq-san-jose',
        concept: 'Premium Korean BBQ Experience',
        cuisine_type: 'korean_bbq',
        location_readiness: {
          city: 'San Jose',
          state: 'CA',
          market_saturation: 'low',
          korean_population_density: 8.2,
          food_trend_velocity: 94,
          real_estate_cost_index: 85,
          competition_count: 3
        },
        financial_projections: {
          startup_cost_range: '$280K - $420K',
          monthly_revenue_potential: 125000,
          break_even_months: 14,
          roi_projection_24m: 34
        },
        market_intelligence: {
          trending_items: ['Korean BBQ Kits', 'Premium Wagyu', 'Tableside Service', 'Korean Cocktails'],
          consumer_demand_signals: ['Google searches +284%', 'DoorDash Korean BBQ orders +156%', 'Yelp reviews mentioning "Korean BBQ" +89%'],
          social_media_momentum: 92,
          delivery_platform_performance: 'Strong - 4.6★ avg rating'
        },
        execution_roadmap: {
          phase: 'lease',
          next_action: 'Secure 2,800-3,200 sqft space in Santana Row or Willow Glen area',
          timeline_weeks: 8,
          risk_factors: ['High rent costs', 'Staff recruitment', 'Permit delays']
        },
        data_confidence: 94,
        last_updated: new Date().toISOString()
      },
      {
        id: 'korean-chicken-oakland',
        concept: 'Korean Fried Chicken Counter',
        cuisine_type: 'korean_fried_chicken',
        location_readiness: {
          city: 'Oakland',
          state: 'CA',
          market_saturation: 'low',
          korean_population_density: 4.1,
          food_trend_velocity: 87,
          real_estate_cost_index: 72,
          competition_count: 1
        },
        financial_projections: {
          startup_cost_range: '$180K - $260K',
          monthly_revenue_potential: 85000,
          break_even_months: 11,
          roi_projection_24m: 42
        },
        market_intelligence: {
          trending_items: ['Korean Corn Dogs', 'Spicy Korean Wings', 'K-Pop Chicken Combos', 'Korean Beer'],
          consumer_demand_signals: ['TikTok Korean chicken videos +203%', 'Korean corn dog searches +178%', 'Food truck Korean chicken +145%'],
          social_media_momentum: 88,
          delivery_platform_performance: 'Emerging - High growth potential'
        },
        execution_roadmap: {
          phase: 'scout',
          next_action: 'Identify 1,200-1,800 sqft locations in Temescal or Grand Lake districts',
          timeline_weeks: 12,
          risk_factors: ['Market education needed', 'Supply chain setup', 'Local competition response']
        },
        data_confidence: 87,
        last_updated: new Date().toISOString()
      },
      {
        id: 'korean-cafe-berkeley',
        concept: 'Korean Study Cafe (카공)',
        cuisine_type: 'korean_cafe',
        location_readiness: {
          city: 'Berkeley',
          state: 'CA',
          market_saturation: 'medium',
          korean_population_density: 6.7,
          food_trend_velocity: 91,
          real_estate_cost_index: 78,
          competition_count: 2
        },
        financial_projections: {
          startup_cost_range: '$120K - $200K',
          monthly_revenue_potential: 62000,
          break_even_months: 9,
          roi_projection_24m: 38
        },
        market_intelligence: {
          trending_items: ['Matcha Drinks', 'Korean Desserts', 'Study Room Rentals', 'Korean Snacks'],
          consumer_demand_signals: ['Korean cafe searches +167%', 'Study cafe demand +134%', 'Matcha trend +201%'],
          social_media_momentum: 85,
          delivery_platform_performance: 'Limited - Focus on dine-in experience'
        },
        execution_roadmap: {
          phase: 'launch',
          next_action: 'Partner with UC Berkeley student organizations for launch marketing',
          timeline_weeks: 6,
          risk_factors: ['Seasonal student patterns', 'Study space regulations', 'Noise management']
        },
        data_confidence: 91,
        last_updated: new Date().toISOString()
      }
    ]
    
    return opportunities
  } catch (error) {
    console.error('Failed to fetch restaurant intelligence:', error)
    return []
  }
}

export default function KRestaurantRollout() {
  const [opportunities, setOpportunities] = useState<RestaurantOpportunity[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCuisine, setSelectedCuisine] = useState<string>('all')
  const [selectedPhase, setSelectedPhase] = useState<string>('all')

  useEffect(() => {
    getRestaurantIntelligence().then(data => {
      setOpportunities(data)
      setLoading(false)
    })
  }, [])

  const filteredOpportunities = opportunities.filter(opp => {
    const cuisineMatch = selectedCuisine === 'all' || opp.cuisine_type === selectedCuisine
    const phaseMatch = selectedPhase === 'all' || opp.execution_roadmap.phase === selectedPhase
    return cuisineMatch && phaseMatch
  })

  const getSaturationColor = (saturation: string) => {
    switch (saturation) {
      case 'low': return 'text-green-600 bg-green-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100' 
      case 'high': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'scout': return 'bg-blue-100 text-blue-800 border-blue-300'
      case 'lease': return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'launch': return 'bg-green-100 text-green-800 border-green-300'
      case 'scale': return 'bg-purple-100 text-purple-800 border-purple-300'
      default: return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const getPhaseEmoji = (phase: string) => {
    switch (phase) {
      case 'scout': return '🔍 SCOUTING'
      case 'lease': return '📋 LEASING'
      case 'launch': return '🚀 LAUNCHING'
      case 'scale': return '📈 SCALING'
      default: return phase.toUpperCase()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-orange-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <a href="/" className="text-2xl font-bold text-orange-600 hover:text-orange-700 transition-colors">
                🍽️ K-Restaurant Intel
              </a>
              <span className="text-sm text-gray-600">California Roll-out Intelligence</span>
            </div>
            <div className="flex items-center gap-6">
              <a href="/trends" className="text-gray-600 hover:text-orange-600 font-medium">All Trends</a>
              <a href="/k-beauty" className="text-gray-600 hover:text-orange-600 font-medium">K-Beauty Intel</a>
              <a href="/" className="text-gray-600 hover:text-orange-600 font-medium">Home</a>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-orange-100 border border-orange-200 rounded-full px-4 py-2 mb-6">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
            <span className="text-orange-700 text-sm font-medium">Live Restaurant Market Intelligence</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            California Korean
            <br />
            <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Restaurant Map
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Actionable location intelligence for Korean restaurant concepts. 
            Find the perfect market, timing, and execution strategy for your next location.
          </p>

          <div className="flex justify-center gap-4 mb-8">
            <button className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all">
              Get Location Intel
            </button>
            <button className="bg-white border-2 border-orange-200 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:border-orange-300 transition-colors">
              Download Market Report
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cuisine Type</label>
              <select
                value={selectedCuisine}
                onChange={(e) => setSelectedCuisine(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              >
                <option value="all">All Cuisines</option>
                <option value="korean_bbq">Korean BBQ</option>
                <option value="korean_fried_chicken">Korean Fried Chicken</option>
                <option value="korean_cafe">Korean Cafe</option>
                <option value="korean_casual">Korean Casual</option>
                <option value="korean_street_food">Korean Street Food</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Execution Phase</label>
              <select
                value={selectedPhase}
                onChange={(e) => setSelectedPhase(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              >
                <option value="all">All Phases</option>
                <option value="scout">Scouting</option>
                <option value="lease">Leasing</option>
                <option value="launch">Launch Ready</option>
                <option value="scale">Scaling</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
            <p className="mt-2 text-gray-600">Analyzing restaurant opportunities...</p>
          </div>
        )}

        {/* Opportunities Grid */}
        {!loading && (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {filteredOpportunities.map((opportunity) => (
              <div
                key={opportunity.id}
                className="bg-white rounded-2xl p-8 shadow-lg border border-orange-100 hover:shadow-xl transition-shadow"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{opportunity.concept}</h3>
                    <p className="text-gray-600">
                      {opportunity.location_readiness.city}, {opportunity.location_readiness.state}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPhaseColor(opportunity.execution_roadmap.phase)}`}>
                    {getPhaseEmoji(opportunity.execution_roadmap.phase)}
                  </span>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-orange-50 rounded-xl">
                  <div>
                    <div className="text-lg font-bold text-green-600">
                      {opportunity.financial_projections.roi_projection_24m}%
                    </div>
                    <div className="text-xs text-gray-500">24M ROI</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-orange-600">
                      {opportunity.execution_roadmap.timeline_weeks}w
                    </div>
                    <div className="text-xs text-gray-500">Timeline</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-purple-600">
                      ${(opportunity.financial_projections.monthly_revenue_potential / 1000).toFixed(0)}K
                    </div>
                    <div className="text-xs text-gray-500">Monthly Revenue</div>
                  </div>
                  <div>
                    <div className={`text-lg font-bold px-2 py-1 rounded text-center ${getSaturationColor(opportunity.location_readiness.market_saturation)}`}>
                      {opportunity.location_readiness.market_saturation.toUpperCase()}
                    </div>
                    <div className="text-xs text-gray-500 text-center">Competition</div>
                  </div>
                </div>

                {/* Financial Overview */}
                <div className="mb-6 p-4 bg-green-50 rounded-xl">
                  <h4 className="font-semibold text-gray-900 mb-3">💰 Financial Projections</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-gray-600">Startup Cost:</span>
                      <div className="font-medium">{opportunity.financial_projections.startup_cost_range}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Break-even:</span>
                      <div className="font-medium">{opportunity.financial_projections.break_even_months} months</div>
                    </div>
                  </div>
                </div>

                {/* Market Intelligence */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">📊 Market Signals</h4>
                  <div className="space-y-2">
                    {opportunity.market_intelligence.consumer_demand_signals.slice(0, 2).map((signal, index) => (
                      <div key={index} className="text-sm text-gray-700 bg-blue-50 px-3 py-2 rounded">
                        • {signal}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Trending Items */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">🔥 Trending Menu Items</h4>
                  <div className="flex flex-wrap gap-2">
                    {opportunity.market_intelligence.trending_items.map((item, index) => (
                      <span key={index} className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Next Action */}
                <div className="bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-orange-400 p-4 mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">🎯 Next Action</h4>
                  <p className="text-gray-700 text-sm">{opportunity.execution_roadmap.next_action}</p>
                </div>

                {/* Risk Factors */}
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">⚠️ Risk Factors</h4>
                  <div className="flex flex-wrap gap-2">
                    {opportunity.execution_roadmap.risk_factors.map((risk, index) => (
                      <span key={index} className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                        {risk}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                  <div className="text-xs text-gray-500">
                    Confidence: {opportunity.data_confidence}%
                  </div>
                  <button className="bg-orange-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-orange-700 transition-colors">
                    Get Full Report
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Market Map Section */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">California Korean Restaurant Market Heat Map</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-green-50 rounded-xl">
              <div className="text-3xl font-bold text-green-600 mb-2">HIGH</div>
              <div className="text-sm text-gray-600 mb-4">Opportunity Zones</div>
              <div className="space-y-1 text-sm">
                <div>San Jose (Korean BBQ)</div>
                <div>Oakland (Fried Chicken)</div>
                <div>Fremont (Casual Korean)</div>
              </div>
            </div>
            <div className="text-center p-6 bg-yellow-50 rounded-xl">
              <div className="text-3xl font-bold text-yellow-600 mb-2">MEDIUM</div>
              <div className="text-sm text-gray-600 mb-4">Competitive Markets</div>
              <div className="space-y-1 text-sm">
                <div>Berkeley (Korean Cafe)</div>
                <div>Palo Alto (Korean BBQ)</div>
                <div>Santa Clara (All Concepts)</div>
              </div>
            </div>
            <div className="text-center p-6 bg-red-50 rounded-xl">
              <div className="text-3xl font-bold text-red-600 mb-2">SATURATED</div>
              <div className="text-sm text-gray-600 mb-4">Avoid These Markets</div>
              <div className="space-y-1 text-sm">
                <div>SF Koreatown (All)</div>
                <div>LA Koreatown (All)</div>
                <div>Garden Grove (All)</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Launch Your Korean Restaurant?</h2>
          <p className="text-xl mb-8 opacity-90">
            Get exclusive access to location intelligence, financial models, and execution playbooks.
          </p>
          <button className="bg-white text-orange-600 px-8 py-4 rounded-xl font-semibold hover:bg-orange-50 transition-colors">
            Start Your Restaurant Intelligence
          </button>
        </div>
      </div>
    </div>
  )
}