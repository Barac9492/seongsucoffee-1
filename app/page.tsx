export default function SimpleLanding() {
  return (
    <div className="min-h-screen bg-white">
      {/* Simple Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">Korean Trends Alerts</h1>
            <div className="flex items-center gap-4">
              <a href="/predict" className="text-orange-600 font-medium">Live Predictions</a>
              <a href="/operator" className="text-gray-600 font-medium text-sm">Operator</a>
              <a href="/fnb" className="text-orange-600 font-medium">Dashboard</a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero - Ultra Simple */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Get Korean trends alerts 
            <span className="text-orange-600">before they hit mainstream</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            Simple daily alerts for Korean coffee shops and restaurants in California.
            Know what's trending on Korean social media before your competitors.
          </p>

          <div className="space-y-4 mb-8">
            <a 
              href="/fnb" 
              className="inline-block w-full sm:w-auto px-8 py-4 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors"
            >
              Get Free 4-Week Trial
            </a>
            
            <div className="text-sm text-gray-500">
              For Korean coffee shops & restaurants in California
            </div>
          </div>
        </div>
      </section>

      {/* Simple Example */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Example Alert
          </h2>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-500">Today</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded">Strong Signal</span>
            </div>
            
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              🔥 Korean milk bread trending on LA TikTok
            </h3>
            
            <p className="text-gray-600 mb-4">
              +18% growth in Korean bakery searches this week. 
              Multiple influencers posting from Koreatown.
            </p>
            
            <div className="bg-orange-50 border-l-4 border-orange-400 p-4">
              <h4 className="font-semibold text-orange-800 mb-1">What to do</h4>
              <p className="text-orange-700 text-sm">
                Consider adding Korean milk bread to your menu. Test customer interest with a weekend special.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Simple CTA */}
      <section className="py-16 px-6">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Get daily Korean trends alerts
          </h2>
          <p className="text-gray-600 mb-8">
            Simple daily emails with trending Korean food and drinks. Made for Korean business owners in California.
          </p>
          <a 
            href="/fnb" 
            className="inline-block px-8 py-4 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors"
          >
            Start Free Trial
          </a>
          <p className="text-sm text-gray-500 mt-4">
            Free for Korean coffee shops & restaurants in California
          </p>
        </div>
      </section>
    </div>
  )
}