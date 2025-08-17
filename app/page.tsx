import { sql } from '@vercel/postgres'

interface Signal {
  entity_id: string
  value: number
  timestamp: string
  source: string
  metric: string
}

async function getRailwayData(): Promise<{
  signals: Signal[]
  stats: any
}> {
  try {
    // Get recent signals (last 24 hours)
    const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    
    const { rows } = await sql`
      SELECT entity_id, value, timestamp, source, 'search_index' as metric
      FROM signals_raw 
      WHERE timestamp > ${dayAgo}
      ORDER BY timestamp DESC 
      LIMIT 1000
    `

    // Convert to Signal type
    const signals: Signal[] = rows.map(row => ({
      entity_id: row.entity_id as string,
      value: Number(row.value),
      timestamp: row.timestamp as string,
      source: row.source as string,
      metric: row.metric as string
    }))

    // Calculate stats
    const totalCount = signals?.length || 0
    const sourceSet = new Set(signals?.map(s => s.source) || [])
    const sources = Array.from(sourceSet)
    
    return {
      signals: signals,
      stats: {
        total_signals: totalCount,
        sources: sources,
        last_updated: signals?.[0]?.timestamp || null
      }
    }
  } catch (error) {
    console.error('Failed to fetch from Railway PostgreSQL:', error)
    return {
      signals: [],
      stats: { total_signals: 0, sources: [] }
    }
  }
}

export default async function Dashboard() {
  const { signals, stats } = await getRailwayData()

  // Process trending keywords
  const trendingKeywords = signals
    .filter(s => s.value > 0)
    .reduce((acc, signal) => {
      acc[signal.entity_id] = (acc[signal.entity_id] || 0) + signal.value
      return acc
    }, {} as Record<string, number>)

  const topKeywords = Object.entries(trendingKeywords)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)

  // Get source activity
  const googleTrendsSignals = signals.filter(s => s.source === 'google_trends' || s.source === 'google_trends_youtube')
  const totalTrendValue = googleTrendsSignals.reduce((sum, s) => sum + s.value, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-amber-900 mb-2">
            ☕ Seongsu Coffee Intelligence
          </h1>
          <p className="text-amber-700">
            Real-time trend analysis powered by Railway PostgreSQL
          </p>
        </header>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-amber-600 mb-2">
              {stats.total_signals}
            </div>
            <div className="text-gray-600">Signals (24h)</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {topKeywords.length}
            </div>
            <div className="text-gray-600">Trending Keywords</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {googleTrendsSignals.length}
            </div>
            <div className="text-gray-600">Google Trends</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {Math.round(totalTrendValue).toLocaleString()}
            </div>
            <div className="text-gray-600">Total Trend Value</div>
          </div>
        </div>

        {/* Trending Keywords */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            🔥 Trending Keywords (성수 카페 지역)
          </h2>
          {topKeywords.length > 0 ? (
            <div className="space-y-3">
              {topKeywords.map(([keyword, value]) => (
                <div key={keyword} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="font-medium text-lg">{keyword}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-amber-600 h-3 rounded-full" 
                        style={{ width: `${Math.min((value / Math.max(...topKeywords.map(([,v]) => v))) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <span className="text-xl font-bold text-amber-600">{Math.round(value)}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No trending data available</p>
          )}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            📊 Recent Activity
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Google Trends (Korean)</h3>
              <div className="text-2xl font-bold text-blue-600">
                {googleTrendsSignals.length}
              </div>
              <div className="text-sm text-gray-500">signals collected (24h)</div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Trend Intensity</h3>
              <div className="text-2xl font-bold text-red-600">
                {Math.round(totalTrendValue / Math.max(googleTrendsSignals.length, 1))}
              </div>
              <div className="text-sm text-gray-500">average trend value</div>
            </div>
          </div>
        </div>

        {/* Data Sources */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            📡 Data Sources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.sources?.map((source: string) => (
              <div key={source} className="p-3 bg-green-50 rounded text-center">
                <div className="font-medium text-green-800">{source}</div>
                <div className="text-sm text-green-600">
                  {signals.filter(s => s.source === source).length} signals
                </div>
              </div>
            )) || (
              <p className="text-gray-500 col-span-3">No active sources</p>
            )}
          </div>
        </div>

        <footer className="text-center mt-8 text-gray-500">
          <p>Powered by Railway PostgreSQL • Real-time Korean trend analysis</p>
          {stats.last_updated && (
            <p className="text-sm">Last updated: {new Date(stats.last_updated).toLocaleString()}</p>
          )}
        </footer>
      </div>
    </div>
  )
}