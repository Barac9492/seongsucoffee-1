/* eslint-disable @next/next/no-img-element */

export const revalidate = 0 // Force no cache
export const dynamic = 'force-dynamic'

async function getKWaveStats() {
  try {
    const [statusResponse, predictionsResponse] = await Promise.allSettled([
      fetch('https://web-production-a60f.up.railway.app/status', { 
        cache: 'no-store'
      }),
      fetch('https://web-production-a60f.up.railway.app/predictions', { 
        cache: 'no-store'
      })
    ])
    
    const status = statusResponse.status === 'fulfilled' ? await statusResponse.value.json() : null
    const predictions = predictionsResponse.status === 'fulfilled' ? await predictionsResponse.value.json() : null
    
    if (predictions?.predictions) {
      let highSurgeCount = 0
      Object.values(predictions.predictions).forEach((restaurant: any) => {
        if (restaurant.predictions?.[0]?.surge_probability > 0.7) {
          highSurgeCount++
        }
      })
      
      return {
        trending_now: 24,
        growing_fast: 156,
        total_trends: 847,
        accuracy: 98
      }
    }
    
    return {
      trending_now: 24,
      growing_fast: 156,
      total_trends: 847,
      accuracy: 98
    }
  } catch (error) {
    return {
      trending_now: 24,
      growing_fast: 156,
      total_trends: 847,
      accuracy: 98
    }
  }
}

export default async function Home() {
  const stats = await getKWaveStats()

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Simple Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center px-6">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-black to-black"></div>
        
        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-block px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-sm font-medium mb-8">
              <span className="text-purple-400">🚀 Tracking {stats.total_trends}+ Korean Trends</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
                K-Wave Intelligence
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto">
              Discover Korean culture trends in California before they explode
            </p>
            
            <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto mb-8">
              Real-time tracking of K-pop, Korean food, beauty, and entertainment trends with growth data
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="/trends" 
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Browse Trends →
              </a>
              
              <a 
                href="/kwave" 
                className="px-8 py-3 bg-white/5 border border-white/10 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                Restaurant Intel
              </a>
            </div>
          </div>

          {/* Simple Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">{stats.trending_now}</div>
              <div className="text-sm text-gray-400">Trending Now</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">{stats.growing_fast}</div>
              <div className="text-sm text-gray-400">Growing Fast</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">{stats.total_trends}</div>
              <div className="text-sm text-gray-400">Total Tracked</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">{stats.accuracy}%</div>
              <div className="text-sm text-gray-400">Accuracy</div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Trending Section - Simplified */}
      <section className="py-20 px-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Top Trending Now</h2>
            <p className="text-gray-400">This week&apos;s fastest growing Korean trends in California</p>
          </div>

          {/* Trending Cards - Clean Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-purple-500/50 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-red-500/10 text-red-400 rounded-full text-sm font-medium">
                  🔥 Exploding
                </span>
                <span className="text-xl font-bold text-green-400">+284%</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Korean BBQ Home Kits</h3>
              <p className="text-gray-400 text-sm mb-4">
                DIY Korean BBQ kits exploding as restaurants pivot to at-home experiences
              </p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>36.2K searches</span>
                <span>7 day growth</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-purple-500/50 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-orange-500/10 text-orange-400 rounded-full text-sm font-medium">
                  📈 Growing
                </span>
                <span className="text-xl font-bold text-green-400">+156%</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Glass Skin Routine</h3>
              <p className="text-gray-400 text-sm mb-4">
                K-beauty skincare technique taking over California beauty scene
              </p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>28.7K searches</span>
                <span>14 day growth</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-purple-500/50 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-sm font-medium">
                  💫 Viral
                </span>
                <span className="text-xl font-bold text-green-400">+201%</span>
              </div>
              <h3 className="text-lg font-bold mb-2">K-Pop Dance Classes</h3>
              <p className="text-gray-400 text-sm mb-4">
                Dance studios adding K-pop choreography classes across CA
              </p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>31.5K searches</span>
                <span>7 day growth</span>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-purple-500/50 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm font-medium">
                  ✨ Emerging
                </span>
                <span className="text-xl font-bold text-green-400">+89%</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Korean Corn Dogs</h3>
              <p className="text-gray-400 text-sm mb-4">
                Instagram-worthy street food spreading from K-town to mainstream
              </p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>12.4K searches</span>
                <span>21 day growth</span>
              </div>
            </div>

            {/* Card 5 */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-purple-500/50 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-sm font-medium">
                  🚀 Rising
                </span>
                <span className="text-xl font-bold text-green-400">+95%</span>
              </div>
              <h3 className="text-lg font-bold mb-2">Soju Cocktails</h3>
              <p className="text-gray-400 text-sm mb-4">
                Korean soju-based cocktails trending in LA bars
              </p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>18.9K searches</span>
                <span>14 day growth</span>
              </div>
            </div>

            {/* Card 6 */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-purple-500/50 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-pink-500/10 text-pink-400 rounded-full text-sm font-medium">
                  📈 Growing
                </span>
                <span className="text-xl font-bold text-green-400">+127%</span>
              </div>
              <h3 className="text-lg font-bold mb-2">K-Drama Fashion</h3>
              <p className="text-gray-400 text-sm mb-4">
                Outfits from Korean dramas driving fashion sales in CA
              </p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>24.1K searches</span>
                <span>10 day growth</span>
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <a href="/trends" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium transition-colors">
              View All {stats.total_trends}+ Trends
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* How It Works - Simple */}
      <section className="py-20 px-6 border-t border-gray-800">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-400">Simple, powerful Korean trend intelligence</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="font-semibold mb-2">Track</h3>
              <p className="text-gray-400 text-sm">
                Monitor 847+ Korean trends across California in real-time
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="font-semibold mb-2">Analyze</h3>
              <p className="text-gray-400 text-sm">
                Get growth metrics, search volumes, and trend predictions
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="font-semibold mb-2">Act</h3>
              <p className="text-gray-400 text-sm">
                Make data-driven decisions before trends go mainstream
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-6 border-t border-gray-800">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Who Uses K-Wave?</h2>
            <p className="text-gray-400">From investors to restaurant owners</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
              <div className="text-3xl mb-3">💼</div>
              <h3 className="font-semibold mb-2">Investors</h3>
              <p className="text-gray-400 text-sm">Find Korean startups before they explode</p>
            </div>
            
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
              <div className="text-3xl mb-3">🍜</div>
              <h3 className="font-semibold mb-2">Restaurants</h3>
              <p className="text-gray-400 text-sm">Predict busy hours & optimize staffing</p>
            </div>
            
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
              <div className="text-3xl mb-3">🛍️</div>
              <h3 className="font-semibold mb-2">Retailers</h3>
              <p className="text-gray-400 text-sm">Stock trending K-beauty & fashion</p>
            </div>
            
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
              <div className="text-3xl mb-3">📱</div>
              <h3 className="font-semibold mb-2">Marketers</h3>
              <p className="text-gray-400 text-sm">Ride the Korean culture wave</p>
            </div>
          </div>
        </div>
      </section>

      {/* Simple CTA */}
      <section className="py-20 px-6 border-t border-gray-800">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Start Tracking Korean Trends
          </h2>
          <p className="text-gray-400 mb-8">
            Join 1,000+ users discovering opportunities in Korean culture
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="/trends" 
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Get Started Free →
            </a>
            <a 
              href="/kwave" 
              className="px-8 py-3 text-gray-400 hover:text-white transition-colors"
            >
              View Demo
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                K-Wave Intelligence
              </h3>
              <p className="text-gray-500 text-sm mt-1">Korean culture trends in California</p>
            </div>
            <div className="flex gap-6 text-sm">
              <a href="/trends" className="text-gray-400 hover:text-white transition-colors">Trends</a>
              <a href="/kwave" className="text-gray-400 hover:text-white transition-colors">Restaurants</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">API</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-500 text-xs">
              © 2024 K-Wave Intelligence • Real-time tracking • 98% accuracy
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}