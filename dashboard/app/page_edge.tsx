import { get } from '@vercel/edge-config'

interface Signal {
  entity_id: string
  value: number
  timestamp: string
  source: string
  metric: string
}

interface Analysis {
  trending?: {
    trending?: any
    recent_spikes?: any
  }
  insights?: string[]
  generated_at?: string
}

async function getEdgeConfigData(): Promise<{
  signals: Signal[]
  analysis: Analysis | null
  stats: any
}> {
  try {
    const [signals, analysis, stats] = await Promise.all([
      get('signals') as Promise<Signal[]>,
      get('latest_analysis') as Promise<Analysis>,
      get('stats') as Promise<any>
    ])

    return {
      signals: signals || [],
      analysis: analysis || null,
      stats: stats || { total_signals: 0, sources: [] }
    }
  } catch (error) {
    console.error('Failed to fetch from Edge Config:', error)
    return {
      signals: [],
      analysis: null,
      stats: { total_signals: 0, sources: [] }
    }
  }
}

export default async function DashboardEdge() {
  const { signals, analysis, stats } = await getEdgeConfigData()

  // Process recent signals (last 24 hours)
  const now = new Date()
  const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)
  
  const recentSignals = signals.filter(signal => {
    const signalDate = new Date(signal.timestamp)
    return signalDate > dayAgo
  })

  // Get trending keywords
  const trendingKeywords = recentSignals
    .filter(s => s.metric === 'search_index')
    .reduce((acc, signal) => {
      acc[signal.entity_id] = (acc[signal.entity_id] || 0) + signal.value
      return acc
    }, {} as Record<string, number>)

  const topKeywords = Object.entries(trendingKeywords)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-amber-900 mb-2">
            ☕ Seongsu Coffee Intelligence
          </h1>
          <p className="text-amber-700">
            Real-time trend analysis powered by Vercel Edge Config
          </p>
        </header>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-amber-600 mb-2">
              {stats.total_signals}
            </div>
            <div className="text-gray-600">Total Signals</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {recentSignals.length}
            </div>
            <div className="text-gray-600">Last 24h</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {stats.sources?.length || 0}
            </div>
            <div className="text-gray-600">Data Sources</div>
          </div>
        </div>

        {/* Trending Keywords */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            🔥 Trending Keywords
          </h2>
          {topKeywords.length > 0 ? (
            <div className="space-y-3">
              {topKeywords.map(([keyword, value]) => (
                <div key={keyword} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="font-medium">{keyword}</span>
                  <span className="text-lg font-bold text-amber-600">{Math.round(value)}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No trending data available</p>
          )}
        </div>

        {/* Recent Analysis */}
        {analysis && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              📊 Latest Analysis
            </h2>
            {analysis.insights && analysis.insights.length > 0 ? (
              <div className="space-y-2">
                {analysis.insights.map((insight, index) => (
                  <div key={index} className="p-3 bg-blue-50 rounded text-blue-800">
                    {insight}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No analysis insights available</p>
            )}
            {analysis.generated_at && (
              <p className="text-sm text-gray-500 mt-4">
                Generated: {new Date(analysis.generated_at).toLocaleString()}
              </p>
            )}
          </div>
        )}

        {/* Data Sources */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            📡 Active Sources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.sources?.map((source: string) => (
              <div key={source} className="p-3 bg-green-50 rounded text-center">
                <div className="font-medium text-green-800">{source}</div>
                <div className="text-sm text-green-600">Active</div>
              </div>
            )) || (
              <p className="text-gray-500 col-span-3">No active sources</p>
            )}
          </div>
        </div>

        <footer className="text-center mt-8 text-gray-500">
          <p>Powered by Vercel Edge Config • Updated in real-time</p>
        </footer>
      </div>
    </div>
  )
}