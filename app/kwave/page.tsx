interface Prediction {
  time: string
  surge_probability: number
  expected_wait_minutes: number
  confidence_level: number
  recommendation: string
  peak_start?: string
  peak_end?: string
  top_factors: Record<string, number>
}

interface RestaurantPrediction {
  restaurant_name: string
  location: string
  type: string
  predictions: Prediction[]
}

interface KWaveData {
  status: string
  timestamp: string
  predictions: Record<string, RestaurantPrediction>
  restaurants_covered: number
}

async function getKWaveData(): Promise<KWaveData | null> {
  try {
    const response = await fetch('https://web-production-a60f.up.railway.app/predictions', {
      cache: 'no-store',
      next: { revalidate: 300 } // 5 minutes
    })
    if (!response.ok) {
      throw new Error('Failed to fetch predictions')
    }
    return await response.json()
  } catch (error) {
    console.error('Failed to fetch K-Wave data:', error)
    return null
  }
}

async function getKWaveStatus() {
  try {
    const response = await fetch('https://web-production-a60f.up.railway.app/status', {
      cache: 'no-store',
      next: { revalidate: 300 } // 5 minutes
    })
    if (!response.ok) {
      throw new Error('Failed to fetch status')
    }
    return await response.json()
  } catch (error) {
    console.error('Failed to fetch K-Wave status:', error)
    return null
  }
}

export default async function KWaveDashboard() {
  const [data, status] = await Promise.all([
    getKWaveData(),
    getKWaveStatus()
  ])

  if (!data || data.status !== 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No prediction data available</p>
          <p className="text-sm text-gray-500">The K-Wave agent may still be collecting data</p>
          <div className="mt-4">
            <a 
              href="https://web-production-a60f.up.railway.app/force-run"
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              target="_blank"
              rel="noopener noreferrer"
            >
              Trigger Data Collection
            </a>
          </div>
        </div>
      </div>
    )
  }

  const restaurants = Object.entries(data.predictions)
  const now = new Date()

  // Get current prediction for each restaurant
  const currentPredictions = restaurants.map(([id, restaurant]) => {
    const currentPred = restaurant.predictions[0] // First prediction is current
    return {
      id,
      name: restaurant.restaurant_name,
      type: restaurant.type,
      location: restaurant.location,
      ...currentPred
    }
  })

  // Sort by surge probability
  currentPredictions.sort((a, b) => b.surge_probability - a.surge_probability)

  const getSurgeColor = (surge: number) => {
    if (surge > 0.8) return 'text-red-600 bg-red-100'
    if (surge > 0.6) return 'text-orange-600 bg-orange-100'
    if (surge > 0.4) return 'text-yellow-600 bg-yellow-100'
    return 'text-green-600 bg-green-100'
  }

  const getSurgeIcon = (surge: number) => {
    if (surge > 0.8) return '🔥'
    if (surge > 0.6) return '⚡'
    if (surge > 0.4) return '💡'
    return '✅'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-red-900 mb-2">
            🌊 K-Wave California Intelligence
          </h1>
          <p className="text-red-700 text-lg mb-1">
            Korean Restaurant Surge Prediction Platform
          </p>
          <p className="text-red-600">
            Real-time demand forecasting for Korean restaurants in California
          </p>
        </header>

        {/* Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">
              {restaurants.length}
            </div>
            <div className="text-gray-600">Restaurants Monitored</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">
              {currentPredictions.filter(p => p.surge_probability > 0.6).length}
            </div>
            <div className="text-gray-600">High Surge Expected</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-yellow-600 mb-2">
              {Math.round(currentPredictions.reduce((acc, p) => acc + p.expected_wait_minutes, 0) / currentPredictions.length)}
            </div>
            <div className="text-gray-600">Avg Wait Time (min)</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {status?.total_runs || 0}
            </div>
            <div className="text-gray-600">Prediction Cycles</div>
          </div>
        </div>

        {/* Current Surge Predictions */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            🍖 Current Surge Predictions
          </h2>
          <div className="space-y-4">
            {currentPredictions.map((prediction) => (
              <div key={prediction.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {prediction.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {prediction.type} • {prediction.location}
                    </p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${getSurgeColor(prediction.surge_probability)}`}>
                    {getSurgeIcon(prediction.surge_probability)} {Math.round(prediction.surge_probability * 100)}% Surge
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                  <div className="text-center p-3 bg-gray-50 rounded">
                    <div className="text-2xl font-bold text-gray-800">
                      {Math.round(prediction.expected_wait_minutes)}
                    </div>
                    <div className="text-sm text-gray-600">Minutes Wait</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded">
                    <div className="text-2xl font-bold text-gray-800">
                      {Math.round(prediction.confidence_level * 100)}%
                    </div>
                    <div className="text-sm text-gray-600">Confidence</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded">
                    <div className="text-sm text-gray-800 font-medium">
                      {prediction.peak_start && prediction.peak_end 
                        ? `Peak: ${new Date(prediction.peak_start).toLocaleTimeString('en-US', {hour: 'numeric', minute: '2-digit'})} - ${new Date(prediction.peak_end).toLocaleTimeString('en-US', {hour: 'numeric', minute: '2-digit'})}`
                        : 'No peak hours detected'
                      }
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="text-sm font-medium text-gray-700 mb-1">Recommendation:</div>
                  <div className="text-sm text-gray-600 bg-blue-50 p-2 rounded">
                    {prediction.recommendation}
                  </div>
                </div>

                <div>
                  <div className="text-sm font-medium text-gray-700 mb-2">Top Contributing Factors:</div>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(prediction.top_factors).slice(0, 3).map(([factor, value]) => (
                      <span 
                        key={factor}
                        className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs"
                      >
                        {factor.replace(/_/g, ' ')}: {(value as number).toFixed(2)}x
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 24-Hour Predictions Chart */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            📈 24-Hour Surge Forecast
          </h2>
          <div className="space-y-6">
            {restaurants.slice(0, 2).map(([id, restaurant]) => (
              <div key={id}>
                <h3 className="text-lg font-medium text-gray-700 mb-3">
                  {restaurant.restaurant_name}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-12 gap-2">
                  {restaurant.predictions.map((pred, index) => {
                    const time = new Date(pred.time)
                    const surge = pred.surge_probability
                    return (
                      <div 
                        key={index}
                        className="text-center p-2 rounded border"
                        title={`${time.toLocaleTimeString()}: ${Math.round(surge * 100)}% surge, ${Math.round(pred.expected_wait_minutes)}min wait`}
                      >
                        <div className="text-xs text-gray-600 mb-1">
                          {time.toLocaleTimeString('en-US', {hour: 'numeric'})}
                        </div>
                        <div className={`w-full h-8 rounded ${getSurgeColor(surge).split(' ')[1]} flex items-center justify-center`}>
                          <span className="text-xs font-medium">
                            {Math.round(surge * 100)}%
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {Math.round(pred.expected_wait_minutes)}m
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            📊 Platform Status
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Data Collection</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Update:</span>
                  <span className="text-gray-800">
                    {data.timestamp ? new Date(data.timestamp).toLocaleString() : 'Unknown'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Cycles:</span>
                  <span className="text-gray-800">{status?.total_runs || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Success Rate:</span>
                  <span className="text-green-600">
                    {status?.error_rate ? Math.round((1 - status.error_rate) * 100) : 100}%
                  </span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Coverage</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Restaurants:</span>
                  <span className="text-gray-800">{restaurants.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Geographic Area:</span>
                  <span className="text-gray-800">California</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Prediction Window:</span>
                  <span className="text-gray-800">24 hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="text-center mt-8 text-gray-500">
          <div className="flex items-center justify-center mb-2">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            <p>K-Wave Intelligence Active • Monitoring Korean Restaurant Trends</p>
          </div>
          <p>Powered by Railway • Korean Culture Trend Analysis • California Coverage</p>
          {data.timestamp && (
            <p className="text-sm">Last updated: {new Date(data.timestamp).toLocaleString()}</p>
          )}
        </footer>
      </div>
    </div>
  )
}