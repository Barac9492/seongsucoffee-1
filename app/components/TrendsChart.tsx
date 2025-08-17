'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface Signal {
  entity_id: string
  metric: string
  avg_value: number
  count: number
  latest: string
}

interface TrendsChartProps {
  signals: Signal[]
}

export default function TrendsChart({ signals }: TrendsChartProps) {
  // Group signals by metric type
  const trendingKeywords = signals
    .filter(s => s.metric === 'search_index')
    .sort((a, b) => b.avg_value - a.avg_value)
    .slice(0, 8)

  const busynessData = signals
    .filter(s => s.metric === 'live_busyness')
    .sort((a, b) => b.avg_value - a.avg_value)

  if (signals.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        <div className="text-4xl mb-4">📈</div>
        <div className="text-lg font-medium">No trend data available</div>
        <div className="text-sm">Signals will appear as data is collected</div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-8">
      {/* Trending Keywords */}
      <div>
        <h3 className="text-md font-semibold text-gray-900 mb-4">
          🔥 Trending Keywords (24h avg)
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {trendingKeywords.map((signal, i) => (
            <div key={signal.entity_id} className="bg-gray-50 rounded-lg p-3">
              <div className="text-sm font-medium text-gray-900 truncate">
                {signal.entity_id}
              </div>
              <div className="text-lg font-bold text-blue-600">
                {signal.avg_value.toFixed(0)}
              </div>
              <div className="text-xs text-gray-500">
                #{i + 1} trending
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Busyness */}
      {busynessData.length > 0 && (
        <div>
          <h3 className="text-md font-semibold text-gray-900 mb-4">
            🏪 Current Busyness Levels
          </h3>
          <div className="space-y-3">
            {busynessData.slice(0, 6).map((signal) => (
              <div key={signal.entity_id} className="flex items-center justify-between">
                <div className="text-sm font-medium text-gray-900">
                  {signal.entity_id.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-500"
                      style={{ width: `${Math.min(100, signal.avg_value * 100)}%` }}
                    />
                  </div>
                  <span className="text-sm font-mono text-gray-600 w-12 text-right">
                    {(signal.avg_value * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Signal Distribution */}
      <div>
        <h3 className="text-md font-semibold text-gray-900 mb-4">
          📊 Signal Distribution
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['search_index', 'video_views', 'live_busyness', 'queue_mentions_72h'].map(metric => {
            const count = signals.filter(s => s.metric === metric).length
            const icon = {
              'search_index': '🔍',
              'video_views': '📹', 
              'live_busyness': '🏪',
              'queue_mentions_72h': '⏰'
            }[metric] || '📈'
            
            return (
              <div key={metric} className="text-center">
                <div className="text-2xl mb-1">{icon}</div>
                <div className="text-2xl font-bold text-gray-900">{count}</div>
                <div className="text-xs text-gray-500 capitalize">
                  {metric.replace(/_/g, ' ')}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}