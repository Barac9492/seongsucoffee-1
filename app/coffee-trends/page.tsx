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
    async function fetchTrends() {
      try {
        const response = await fetch('/api/coffee-trends')
        const data = await response.json()
        setTrends(data.trends)
        
        // Also fetch videos from JSON storage and merge them
        await fetchAndMergeVideos(data.trends)
      } catch (error) {
        console.error('Failed to fetch trends:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchTrends()
  }, [])

  const fetchAndMergeVideos = async (trendsData: CoffeeTrend[]) => {
    try {
      const response = await fetch('/api/videos')
      const videoData = await response.json()
      
      // Merge videos into trends
      const trendsWithVideos = trendsData.map(trend => ({
        ...trend,
        videoProof: videoData.videos[trend.id] || []
      }))
      
      setTrends(trendsWithVideos)
    } catch (error) {
      console.error('Failed to fetch videos:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400"></div>
          <p className="mt-2 text-gray-600">Loading Korean trends...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPage="trends" />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-light leading-tight tracking-tight mb-6">
              Launch these drinks<br/>
              <span className="text-gray-400">before your competition</span>
            </h1>
            <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto">
              Four trending Korean drinks with complete business packages.
              <br/>Priority ranked by market readiness and profit potential.
            </p>
          </div>
        </div>
      </section>

      {/* Trends */}
      <section className="px-8 pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-16">
            {trends.map((trend, index) => {
              const priority = index === 0 ? 'Launch Now' : index === 1 ? 'Launch Soon' : 'Monitor'
              const priorityColor = index === 0 ? 'bg-green-100 text-green-800' : index === 1 ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
              
              return (
              <div key={trend.id} className={`border border-gray-100 ${index === 0 ? 'border-green-200' : ''} ${index > 0 ? 'animate-fade-in-up' : ''}`}>
                
                {/* Priority Header */}
                <div className="p-8 border-b border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${priorityColor}`}>
                        {priority}
                      </span>
                      <span className="text-sm text-gray-500">#{index + 1} Priority</span>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-light">{trend.pricing.margin}</div>
                      <div className="text-xs text-gray-500">margin</div>
                    </div>
                  </div>
                  
                  <h2 className="text-3xl font-light tracking-tight mb-2">{trend.name}</h2>
                  <p className="text-gray-600">{trend.historicalPrecedent}</p>
                </div>

                {/* Quick Stats */}
                <div className="p-8 border-b border-gray-100">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div>
                      <div className="text-2xl font-light mb-1">{trend.successProbability}%</div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider">Success Rate</div>
                    </div>
                    <div>
                      <div className="text-2xl font-light mb-1">{trend.recipe.difficulty}</div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider">Difficulty</div>
                    </div>
                    <div>
                      <div className="text-2xl font-light mb-1">{trend.recipe.prepTime}</div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider">Prep Time</div>
                    </div>
                    <div>
                      <div className="text-2xl font-light mb-1">{trend.pricing.suggestedRetail}</div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider">Retail Price</div>
                    </div>
                  </div>
                </div>

                {/* Action */}
                <div className="p-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Complete launch package available</p>
                      <p className="text-xs text-gray-500">Recipe, suppliers, training, pricing strategy</p>
                    </div>
                    <button 
                      onClick={() => {
                        setSelectedTrend(trend)
                        setDetailsOpen(true)
                      }}
                      className={`px-6 py-3 rounded-full font-medium transition-transform hover:scale-105 ${
                        index === 0 
                          ? 'bg-black text-white' 
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      {index === 0 ? 'Launch now' : 'View details'}
                    </button>
                  </div>
                </div>

                {/* Video Proof Section */}
                {trend.videoProof && trend.videoProof.length > 0 && (
                  <div className="mt-12 pt-8 border-t border-gray-100">
                    <div className="mb-6">
                      <h4 className="text-lg font-light mb-2">Video proof</h4>
                      <p className="text-sm text-gray-500">{trend.videoProof.length} reference{trend.videoProof.length !== 1 ? 's' : ''}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {trend.videoProof.map((video, index) => (
                        <div key={index} className="group">
                          <div className="p-4 border border-gray-100 hover:border-gray-200 transition-colors">
                            <p className="font-light text-sm text-gray-900 mb-1 line-clamp-2">{video.title}</p>
                            <p className="text-xs text-gray-500 mb-3">{video.channel}</p>
                            <a
                              href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black group"
                            >
                              <span>Watch</span>
                              <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )})}
          </div>
        </div>
      </section>

      {/* Recipe Modal */}
      {selectedTrend && detailsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-8 bg-black bg-opacity-30 backdrop-blur-sm">
          <div className="bg-white max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-large">
            <div className="p-12">
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-4xl font-light tracking-tight">{selectedTrend.name}</h2>
                <button 
                  onClick={() => setDetailsOpen(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                {/* Recipe */}
                <div>
                  <h3 className="text-2xl font-light mb-8">Recipe</h3>
                  <div className="space-y-8">
                    <div>
                      <h4 className="font-medium mb-4 text-gray-900">Ingredients</h4>
                      <ul className="text-gray-600 space-y-2">
                        {selectedTrend.recipe.ingredients.map((ingredient, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-gray-400 mr-3">•</span>
                            <span>{ingredient}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-4 text-gray-900">Instructions</h4>
                      <ol className="text-gray-600 space-y-3">
                        {selectedTrend.recipe.instructions.map((step, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-gray-400 mr-3 font-mono text-sm">{idx + 1}.</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
                
                {/* Business Details */}
                <div>
                  <h3 className="text-2xl font-light mb-8">Business</h3>
                  <div className="space-y-8">
                    <div>
                      <h4 className="font-medium mb-4 text-gray-900">Suppliers</h4>
                      <div className="space-y-4">
                        {selectedTrend.suppliers.map((supplier, idx) => (
                          <div key={idx} className="border-l-2 border-gray-100 pl-4">
                            <p className="font-medium text-gray-900">{supplier.ingredient}</p>
                            <p className="text-gray-600 text-sm">Source: {supplier.source}</p>
                            <p className="text-gray-600 text-sm">Cost: {supplier.cost}</p>
                            <p className="text-gray-500 text-xs mt-1">{supplier.notes}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-4 text-gray-900">Training</h4>
                      <div className="space-y-6">
                        <div>
                          <p className="font-medium text-gray-900 mb-2">Key Techniques</p>
                          <ul className="text-gray-600 space-y-1">
                            {selectedTrend.training.keyTechniques.map((technique, idx) => (
                              <li key={idx} className="flex items-start">
                                <span className="text-gray-400 mr-3">•</span>
                                <span>{technique}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 mb-2">Common Mistakes</p>
                          <ul className="text-gray-600 space-y-1">
                            {selectedTrend.training.commonMistakes.map((mistake, idx) => (
                              <li key={idx} className="flex items-start">
                                <span className="text-gray-400 mr-3">•</span>
                                <span>{mistake}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 mb-2">Quality Control</p>
                          <p className="text-gray-600">{selectedTrend.training.qualityControl}</p>
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