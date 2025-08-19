'use client'

import { useState, useEffect } from 'react'
import { VideoProofModal, VideoProofCard } from '../../components/VideoProofModal'

interface CoffeeTrend {
  id: string
  name: string
  nameKr: string
  growth: number
  stage: 'discovery' | 'early' | 'growth' | 'mainstream' | 'saturated'
  cafesServing: number
  firstDetected: string
  socialMentions: number
  searchGrowth: number
  districts: string[]
  videoProof: {
    youtubeId: string
    title: string
    channel: string
    views: number
    uploadDate: string
  }[]
  ingredients?: string[]
  priceRange?: string
  targetDemo?: string
  instagramHashtag?: string
  naverSearchVolume?: number
  tiktokViews?: number
}

interface TrendResponse {
  status: string
  summary: {
    totalTrends: number
    avgGrowth: number
    totalCafes: number
    totalVideos: number
    lastUpdated: string
  }
  trends: CoffeeTrend[]
  methodology: {
    dataSources: string[]
    updateFrequency: string
    geographicCoverage: string
    confidenceScore: number
  }
}

function getStageColor(stage: string) {
  switch(stage) {
    case 'discovery': return 'bg-purple-100 text-purple-800'
    case 'early': return 'bg-blue-100 text-blue-800'
    case 'growth': return 'bg-green-100 text-green-800'
    case 'mainstream': return 'bg-orange-100 text-orange-800'
    case 'saturated': return 'bg-gray-100 text-gray-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

function getStageLabel(stage: string) {
  switch(stage) {
    case 'discovery': return '🌱 Discovery (1-10 cafes)'
    case 'early': return '📊 Early Adoption (10-50 cafes)'
    case 'growth': return '🔥 Growth (50-200 cafes)'
    case 'mainstream': return '🚀 Mainstream (200+ cafes)'
    case 'saturated': return '✅ Saturated (Everywhere)'
    default: return stage
  }
}

function daysAgo(date: string) {
  const now = new Date()
  const then = new Date(date)
  const diff = Math.floor((now.getTime() - then.getTime()) / (1000 * 60 * 60 * 24))
  return diff
}

export default function CoffeeTrendsPage() {
  const [trends, setTrends] = useState<CoffeeTrend[]>([])
  const [selectedTrend, setSelectedTrend] = useState<CoffeeTrend | null>(null)
  const [videoModalOpen, setVideoModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)

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
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
          <p className="mt-2 text-gray-600">Loading Korean coffee trends...</p>
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
              <h1 className="text-2xl font-bold text-gray-900">Korean Coffee Trends</h1>
              <p className="text-sm text-gray-600">Real-time tracking of emerging coffee products in Korea</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">↑ {avgGrowth}%</div>
                <div className="text-xs text-gray-500">Avg. trend growth</div>
              </div>
              <nav className="flex items-center gap-4">
                <a href="/" className="text-gray-600 hover:text-orange-600 font-medium">
                  Home
                </a>
                <a href="/how-to" className="text-gray-600 hover:text-orange-600 font-medium">
                  How To
                </a>
                <a href="/pricing" className="text-gray-600 hover:text-orange-600 font-medium">
                  Pricing
                </a>
                <a href="/admin" className="text-gray-600 hover:text-orange-600 font-medium">
                  Admin
                </a>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Trend */}
      {trends.length > 0 && (
        <section className="bg-gradient-to-b from-orange-50 to-white">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="bg-white rounded-2xl shadow-lg border-2 border-orange-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-orange-600">🔥 TOP EMERGING TREND</span>
                <span className="text-xs text-gray-500">Updated 2 hours ago</span>
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {trends[0].name}
              </h2>
              <p className="text-lg text-gray-600 mb-4">{trends[0].nameKr}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div>
                <div className="text-3xl font-bold text-green-600">↑{trends[0].growth}%</div>
                <div className="text-sm text-gray-500">Last 30 days</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{trends[0].cafesServing}</div>
                <div className="text-sm text-gray-500">Cafes serving</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{trends[0].socialMentions.toLocaleString()}</div>
                <div className="text-sm text-gray-500">Social mentions</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{daysAgo(trends[0].firstDetected)}</div>
                <div className="text-sm text-gray-500">Days old</div>
              </div>
            </div>

              {/* Video Proof Section */}
              <div className="border-t pt-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  🎥 Video Proof from Korean Cafes
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {trends[0].videoProof.map((video, idx) => (
                    <VideoProofCard
                      key={idx}
                      video={video}
                      onClick={() => {
                        setSelectedTrend(trends[0])
                        setVideoModalOpen(true)
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Trend Discovery Feed */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Emerging Trends Feed</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trends.map((trend) => (
            <div 
              key={trend.id}
              className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => {
                setSelectedTrend(trend)
                setVideoModalOpen(true)
              }}
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-lg text-gray-900">{trend.name}</h3>
                <span className="text-green-600 font-mono font-bold">↑{trend.growth}%</span>
              </div>
              
              <p className="text-sm text-gray-600 mb-3">{trend.nameKr}</p>
              
              {/* Progress Bar */}
              <div className="mb-3">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className={`px-2 py-1 rounded-full ${getStageColor(trend.stage)}`}>
                    {trend.stage}
                  </span>
                  <span className="text-gray-500">{trend.cafesServing} cafes</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-orange-400 to-orange-600 h-2 rounded-full"
                    style={{ width: `${Math.min((trend.cafesServing / 200) * 100, 100)}%` }}
                  />
                </div>
              </div>
              
              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-1">
                  <span className="text-gray-500">📍</span>
                  <span className="text-gray-700">{trend.districts[0]}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-gray-500">🕐</span>
                  <span className="text-gray-700">{daysAgo(trend.firstDetected)} days</span>
                </div>
              </div>

              {/* Video Indicator */}
              {trend.videoProof.length > 0 && (
                <div className="mt-3 pt-3 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      🎥 {trend.videoProof.length} video{trend.videoProof.length > 1 ? 's' : ''}
                    </span>
                    <span className="text-xs font-medium text-orange-600">
                      {trend.videoProof.reduce((acc, v) => acc + v.views, 0).toLocaleString()} total views
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Proof Points */}
      <section className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">How We Track Trends</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl mb-2">☕</div>
              <div className="text-2xl font-bold mb-1">10,000+</div>
              <div className="text-sm opacity-80">Korean cafe menus tracked daily</div>
            </div>
            <div>
              <div className="text-3xl mb-2">📱</div>
              <div className="text-2xl font-bold mb-1">1M+</div>
              <div className="text-sm opacity-80">Social posts analyzed weekly</div>
            </div>
            <div>
              <div className="text-3xl mb-2">🎥</div>
              <div className="text-2xl font-bold mb-1">5,000+</div>
              <div className="text-sm opacity-80">YouTube videos monitored</div>
            </div>
            <div>
              <div className="text-3xl mb-2">📈</div>
              <div className="text-2xl font-bold mb-1">89%</div>
              <div className="text-sm opacity-80">Prediction accuracy</div>
            </div>
          </div>
        </div>
      </section>

      {/* Trend Lifecycle */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Trend Lifecycle Stages</h2>
        
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            {['discovery', 'early', 'growth', 'mainstream', 'saturated'].map((stage, idx) => (
              <div key={stage} className="text-center flex-1">
                <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-2 ${getStageColor(stage)}`}>
                  {trends.filter(t => t.stage === stage).length}
                </div>
                <p className="text-xs font-medium text-gray-600">{stage.charAt(0).toUpperCase() + stage.slice(1)}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 h-2 bg-gray-200 rounded-full relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-blue-400 via-green-400 via-orange-400 to-gray-400 rounded-full opacity-50" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-orange-600 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Catch Tomorrow&apos;s Coffee Trends Today
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Get weekly reports on emerging Korean coffee trends before they go global
          </p>
          <button className="bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold hover:bg-orange-50 transition-colors">
            Start Free Trial
          </button>
          <p className="text-sm opacity-75 mt-4">
            No credit card required • 7-day free trial
          </p>
        </div>
      </section>

      {/* Video Proof Modal */}
      {selectedTrend && (
        <VideoProofModal
          videos={selectedTrend.videoProof}
          trendName={selectedTrend.name}
          isOpen={videoModalOpen}
          onClose={() => setVideoModalOpen(false)}
        />
      )}
    </div>
  )
}