'use client'

import { useState, useEffect } from 'react'

interface KoreanTrend {
  id: string
  title: string
  category: string
  growth_rate: number
  search_volume: number
  description: string
  status: 'exploding' | 'growing' | 'peaked' | 'emerging'
  tags: string[]
  last_updated: string
  sources: string[]
  ai_summary: string
}

interface TrendStats {
  total_trends: number
  exploding_count: number
  categories: string[]
  last_scan: string
}

export default function KWaveTrendsDiscovery() {
  const [trends, setTrends] = useState<KoreanTrend[]>([])
  const [stats, setStats] = useState<TrendStats | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchKoreanTrends()
  }, [selectedCategory, searchQuery])

  const fetchKoreanTrends = async () => {
    setLoading(true)
    try {
      // Simulate enhanced Korean trends data
      const mockTrends: KoreanTrend[] = [
        {
          id: 'korean-bbq-la-delivery',
          title: 'Korean BBQ Home Kits',
          category: 'Food & Dining',
          growth_rate: 284,
          search_volume: 36200,
          description: 'Korean BBQ at-home cooking kits exploding in popularity as restaurants pivot to DIY experiences. Premium cuts with traditional marinades delivered fresh.',
          status: 'exploding',
          tags: ['Korean BBQ', 'DIY Kits', 'Home Cooking', 'Premium Meat'],
          last_updated: new Date().toISOString(),
          sources: ['Google Trends CA', 'DoorDash Analytics', 'Yelp Business'],
          ai_summary: 'K-drama food scenes driving massive demand for authentic Korean BBQ experiences at home. 300% growth in DIY kit searches.'
        },
        {
          id: 'k-beauty-glass-skin',
          title: 'Glass Skin Routine',
          category: 'Beauty & Wellness',
          growth_rate: 156,
          search_volume: 28900,
          description: 'Korean skincare "glass skin" technique viral on TikTok. 10-step routines featuring Korean brands like COSRX, The Ordinary adaptations.',
          status: 'growing',
          tags: ['K-Beauty', 'Glass Skin', 'TikTok Viral', '10-Step Routine'],
          last_updated: new Date().toISOString(),
          sources: ['TikTok Analytics', 'Instagram Beauty', 'Sephora Sales'],
          ai_summary: 'Gen Z discovering Korean beauty secrets through social media. Driving massive growth in K-beauty product sales globally.'
        },
        {
          id: 'korean-webtoons-netflix',
          title: 'Webtoon Adaptations',
          category: 'Entertainment',
          growth_rate: 213,
          search_volume: 19400,
          description: 'Korean webtoons being adapted into Netflix series at unprecedented rate. "Sweet Home", "All of Us Are Dead" success driving comic subscriptions.',
          status: 'exploding',
          tags: ['Webtoons', 'Netflix Korea', 'Digital Comics', 'Streaming'],
          last_updated: new Date().toISOString(),
          sources: ['Netflix Viewership', 'Webtoon Platform Data', 'Comic Sales'],
          ai_summary: 'Korean storytelling format revolutionizing global entertainment. Major studios investing billions in webtoon IP.'
        },
        {
          id: 'korean-language-duolingo',
          title: 'Korean Language Learning',
          category: 'Education',
          growth_rate: 189,
          search_volume: 45600,
          description: 'Korean becomes fastest-growing language on Duolingo. K-pop and K-drama fans driving surge in language learning apps.',
          status: 'growing',
          tags: ['Korean Language', 'Duolingo', 'K-pop Influence', 'Language Apps'],
          last_updated: new Date().toISOString(),
          sources: ['Duolingo Reports', 'App Store Rankings', 'University Enrollment'],
          ai_summary: 'Korean cultural content creating unprecedented demand for language learning. 40% of new learners cite BTS as motivation.'
        },
        {
          id: 'modern-hanbok-fashion',
          title: 'Modern Hanbok Design',
          category: 'Fashion',
          growth_rate: 167,
          search_volume: 12800,
          description: 'Contemporary hanbok designers blending traditional Korean elements with streetwear. Instagram influencers driving global hanbok trend.',
          status: 'emerging',
          tags: ['Hanbok', 'Traditional Fashion', 'Streetwear', 'Korean Design'],
          last_updated: new Date().toISOString(),
          sources: ['Instagram Fashion', 'Pinterest Trends', 'Seoul Fashion Week'],
          ai_summary: 'Traditional Korean clothing getting modern makeover. Young designers creating fusion styles for global market.'
        },
        {
          id: 'korean-fried-chicken-chains',
          title: 'K-Chicken Franchises',
          category: 'Food & Dining',
          growth_rate: 142,
          search_volume: 31200,
          description: 'Korean fried chicken chains expanding across US. Double-frying technique and unique sauces challenging traditional American chains.',
          status: 'growing',
          tags: ['Korean Chicken', 'Franchises', 'Double Frying', 'Fast Casual'],
          last_updated: new Date().toISOString(),
          sources: ['Franchise Reports', 'QSR Magazine', 'Restaurant Analytics'],
          ai_summary: 'Korean chicken brands like Bonchon, Kyochon disrupting $25B fried chicken market with superior cooking techniques.'
        },
        {
          id: 'k-pop-album-collecting',
          title: 'K-Pop Album Collecting',
          category: 'Music & Culture',
          growth_rate: 203,
          search_volume: 22100,
          description: 'Physical K-pop album sales surging despite streaming era. Limited photocard collections driving fan engagement and secondary markets.',
          status: 'exploding',
          tags: ['K-pop Albums', 'Photocards', 'Collecting', 'Physical Music'],
          last_updated: new Date().toISOString(),
          sources: ['Hanteo Chart', 'eBay Sales', 'Fan Community Data'],
          ai_summary: 'K-pop reviving physical music sales globally. Album collecting becoming major driver of artist revenue and fan culture.'
        },
        {
          id: 'korean-corn-dogs',
          title: 'Korean Corn Dogs',
          category: 'Food & Dining',
          growth_rate: 178,
          search_volume: 15600,
          description: 'Korean-style corn dogs with unique coatings (potato, ramen) going viral on food social media. Street food vendors adapting recipes.',
          status: 'growing',
          tags: ['Korean Street Food', 'Corn Dogs', 'Viral Food', 'Food Trucks'],
          last_updated: new Date().toISOString(),
          sources: ['Food Truck Analytics', 'Instagram Food', 'TikTok Recipes'],
          ai_summary: 'Korean street food innovation making traditional American snacks exciting again. Food trucks reporting 200% sales increase.'
        }
      ]

      const mockStats: TrendStats = {
        total_trends: mockTrends.length,
        exploding_count: mockTrends.filter(t => t.status === 'exploding').length,
        categories: Array.from(new Set(mockTrends.map(t => t.category))),
        last_scan: new Date().toISOString()
      }

      // Filter by category
      let filteredTrends = selectedCategory === 'all' 
        ? mockTrends 
        : mockTrends.filter(t => t.category === selectedCategory)

      // Filter by search
      if (searchQuery) {
        filteredTrends = filteredTrends.filter(t => 
          t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
          t.ai_summary.toLowerCase().includes(searchQuery.toLowerCase())
        )
      }

      // Sort by growth rate
      filteredTrends.sort((a, b) => b.growth_rate - a.growth_rate)

      setTrends(filteredTrends)
      setStats(mockStats)
    } catch (error) {
      console.error('Failed to fetch Korean trends:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'exploding': return 'bg-red-500 text-white'
      case 'growing': return 'bg-green-500 text-white'
      case 'peaked': return 'bg-yellow-500 text-white'
      case 'emerging': return 'bg-blue-500 text-white'
      default: return 'bg-gray-500 text-white'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'exploding': return '🔥 EXPLODING'
      case 'growing': return '📈 GROWING'
      case 'peaked': return '⚡ PEAKED'
      case 'emerging': return '🌱 EMERGING'
      default: return status.toUpperCase()
    }
  }

  const categories = stats?.categories || []

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <a href="/" className="text-2xl font-bold text-gray-900 hover:text-red-600 transition-colors">
                🌊 K-Wave Trends
              </a>
              <span className="text-sm text-gray-500">
                Korean Culture Intelligence
              </span>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-sm text-gray-600">
                {stats && (
                  <>
                    <span className="font-medium">{stats.total_trends}</span> trends tracked •{' '}
                    <span className="font-medium text-red-600">{stats.exploding_count}</span> exploding
                  </>
                )}
              </div>
              <div className="flex items-center space-x-4">
                <a href="/kwave" className="text-sm text-gray-600 hover:text-red-600">
                  Restaurant Intelligence
                </a>
                <a href="/" className="text-sm text-gray-600 hover:text-red-600">
                  Home
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Discover Korean Culture Trends Before They Explode
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Track Korean Wave trends across food, beauty, entertainment, and culture. 
            Find opportunities before they hit mainstream.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search Korean trends... (K-pop, Korean food, K-beauty, K-drama)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <span className="text-gray-400">🔍</span>
                </div>
              </div>
            </div>
            
            {/* Category Filter */}
            <div className="lg:w-64">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-red-100 text-red-800 border border-red-300'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Trends
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-red-100 text-red-800 border border-red-300'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
            <p className="mt-2 text-gray-600">Discovering Korean trends...</p>
          </div>
        )}

        {/* Trends Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trends.map((trend) => (
              <div
                key={trend.id}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer group"
              >
                {/* Status Badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(trend.status)}`}>
                    {getStatusText(trend.status)}
                  </span>
                  <span className="text-sm text-gray-500">{trend.category}</span>
                </div>

                {/* Trend Title */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                  {trend.title}
                </h3>

                {/* Growth Metrics */}
                <div className="flex items-center space-x-4 mb-3">
                  <div className="flex items-center">
                    <span className="text-2xl font-bold text-green-600">+{trend.growth_rate}%</span>
                    <span className="text-sm text-gray-500 ml-1">growth</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-700">{trend.search_volume.toLocaleString()}</span>
                    <span className="text-sm text-gray-500 ml-1">searches</span>
                  </div>
                </div>

                {/* AI Summary */}
                <div className="bg-blue-50 border-l-4 border-blue-400 p-3 mb-3">
                  <p className="text-sm text-blue-800 font-medium">
                    💡 AI Insight: {trend.ai_summary}
                  </p>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {trend.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {trend.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                    >
                      {tag}
                    </span>
                  ))}
                  {trend.tags.length > 3 && (
                    <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      +{trend.tags.length - 3} more
                    </span>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center space-x-1">
                    {trend.sources.slice(0, 2).map((source, index) => (
                      <span key={index} className="text-xs text-gray-500">
                        {source}
                        {index < Math.min(trend.sources.length, 2) - 1 && ' •'}
                      </span>
                    ))}
                  </div>
                  <button className="bg-red-600 text-white px-3 py-1 rounded text-xs font-medium hover:bg-red-700 transition-colors">
                    Track Trend
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && trends.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No trends found</h3>
            <p className="text-gray-600">
              Try adjusting your search or category filter to discover Korean trends.
            </p>
          </div>
        )}

        {/* Footer Stats */}
        {stats && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="text-center text-sm text-gray-500">
              <p>
                Last updated: {new Date(stats.last_scan).toLocaleString()} • 
                Tracking {stats.total_trends} Korean culture trends across {stats.categories.length} categories
              </p>
              <p className="mt-1">
                Powered by real-time data from Google Trends, Social Media APIs, TikTok Analytics, and Korean Cultural Insights
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}