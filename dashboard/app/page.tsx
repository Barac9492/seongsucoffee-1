import { sql } from '@vercel/postgres'
import { format } from 'date-fns'
import VenueGrid from './components/VenueGrid'
import TrendsChart from './components/TrendsChart'
import StatsOverview from './components/StatsOverview'

interface Signal {
  entity_id: string
  metric: string
  avg_value: number
  count: number
  latest: string
}

interface VenueFeature {
  venue_id: string
  date: string
  d_index: number
  o_index: number
  c_index: number
  s_index: number
}

interface RunLog {
  status: string
  started_at: string
  finished_at: string
  rows_inserted: number
}

async function getRecentSignals(): Promise<Signal[]> {
  try {
    const { rows } = await sql`
      SELECT 
        entity_id,
        metric,
        AVG(value) as avg_value,
        COUNT(*) as count,
        MAX(timestamp) as latest
      FROM signals_raw 
      WHERE timestamp > NOW() - INTERVAL '24 hours'
      GROUP BY entity_id, metric
      ORDER BY latest DESC
      LIMIT 100
    `
    return rows as Signal[]
  } catch (error) {
    console.error('Database error:', error)
    return []
  }
}

async function getVenueFeatures(): Promise<VenueFeature[]> {
  try {
    const { rows } = await sql`
      SELECT 
        venue_id,
        date,
        d_index,
        o_index,
        c_index,
        s_index
      FROM features_daily 
      WHERE date >= CURRENT_DATE - INTERVAL '7 days'
      ORDER BY date DESC, d_index DESC
      LIMIT 50
    `
    return rows as VenueFeature[]
  } catch (error) {
    console.error('Database error:', error)
    return []
  }
}

async function getRunStatus(): Promise<RunLog[]> {
  try {
    const { rows } = await sql`
      SELECT 
        status,
        started_at,
        finished_at,
        rows_inserted
      FROM runs_log 
      ORDER BY started_at DESC 
      LIMIT 10
    `
    return rows as RunLog[]
  } catch (error) {
    console.error('Database error:', error)
    return []
  }
}

export default async function Dashboard() {
  const [signals, features, runs] = await Promise.all([
    getRecentSignals(),
    getVenueFeatures(),
    getRunStatus()
  ])

  const lastRun = runs[0]
  const isHealthy = lastRun?.status === 'success' && 
    lastRun.finished_at &&
    new Date(lastRun.finished_at) > new Date(Date.now() - 4 * 60 * 60 * 1000) // 4 hours

  return (
    <div className="space-y-8">
      {/* Status Overview */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">System Status</h2>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            isHealthy 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {isHealthy ? '✅ Healthy' : '⚠️ Issues Detected'}
          </div>
        </div>
        
        {lastRun && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <div className="text-gray-500">Last Collection</div>
              <div className="font-medium">
                {format(new Date(lastRun.started_at), 'MMM dd, HH:mm')}
              </div>
            </div>
            <div>
              <div className="text-gray-500">Signals Collected</div>
              <div className="font-medium">{lastRun.rows_inserted || 0}</div>
            </div>
            <div>
              <div className="text-gray-500">Status</div>
              <div className="font-medium capitalize">{lastRun.status}</div>
            </div>
          </div>
        )}
      </div>

      {/* Stats Overview */}
      <StatsOverview signals={signals} />

      {/* Venue Grid */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Venue Performance</h2>
          <p className="text-gray-600">D/O/C/S indices for top Seongsu venues</p>
        </div>
        <VenueGrid features={features} />
      </div>

      {/* Trends Chart */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Signal Trends</h2>
          <p className="text-gray-600">Recent attention and demand patterns</p>
        </div>
        <TrendsChart signals={signals} />
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Recent Collections</h2>
        </div>
        <div className="divide-y">
          {runs.slice(0, 5).map((run, i) => (
            <div key={i} className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  run.status === 'success' ? 'bg-green-400' : 'bg-red-400'
                }`} />
                <div>
                  <div className="text-sm font-medium">
                    {format(new Date(run.started_at), 'MMM dd, HH:mm')}
                  </div>
                  <div className="text-xs text-gray-500">
                    {run.rows_inserted || 0} signals collected
                  </div>
                </div>
              </div>
              <div className={`text-xs px-2 py-1 rounded ${
                run.status === 'success' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {run.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}