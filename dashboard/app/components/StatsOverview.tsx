'use client'

interface Signal {
  entity_id: string
  metric: string
  avg_value: number
  count: number
  latest: string
}

interface StatsOverviewProps {
  signals: Signal[]
}

export default function StatsOverview({ signals }: StatsOverviewProps) {
  const totalSignals = signals.reduce((sum, s) => sum + s.count, 0)
  const uniqueVenues = new Set(signals.filter(s => s.metric === 'live_busyness').map(s => s.entity_id)).size
  const trendingKeywords = signals.filter(s => s.metric === 'search_index' && s.avg_value > 50).length
  const avgBusyness = signals
    .filter(s => s.metric === 'live_busyness')
    .reduce((sum, s, _, arr) => sum + s.avg_value / arr.length, 0)

  const stats = [
    {
      name: 'Total Signals (24h)',
      value: totalSignals.toLocaleString(),
      icon: '📊',
      color: 'text-blue-600'
    },
    {
      name: 'Active Venues',
      value: uniqueVenues.toString(),
      icon: '🏪',
      color: 'text-green-600'
    },
    {
      name: 'Trending Keywords',
      value: trendingKeywords.toString(),
      icon: '🔥',
      color: 'text-red-600'
    },
    {
      name: 'Avg Busyness',
      value: `${(avgBusyness * 100).toFixed(0)}%`,
      icon: '📈',
      color: 'text-purple-600'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div key={stat.name} className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="text-3xl">{stat.icon}</div>
            </div>
            <div className="ml-4 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">
                  {stat.name}
                </dt>
                <dd className={`text-2xl font-bold ${stat.color}`}>
                  {stat.value}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}