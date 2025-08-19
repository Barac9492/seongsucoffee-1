export default function SimpleLanding() {
  return (
    <div className="min-h-screen bg-white">
      {/* Simple Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">Korean Trend Scout</h1>
            <div className="flex items-center gap-4">
              <a href="/coffee-trends" className="text-blue-600 font-medium">Trends</a>
              <a href="/how-to" className="text-gray-600 font-medium">Guide</a>
              <a href="/pricing" className="text-gray-600 font-medium">Pricing</a>
              <a href="/admin" className="text-gray-600 font-medium text-sm">Admin</a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero - Laser Focused */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Spot the next Dalgona coffee
            <span className="text-blue-600"> 3 months early</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            Korean coffee trends reach your market 2-6 months later. 
            Get the exact recipe and business plan to launch first.
          </p>

          <div className="space-y-4 mb-8">
            <a 
              href="/coffee-trends" 
              className="inline-block w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              See Current Trends
            </a>
            
            <div className="text-sm text-gray-500">
              For coffee shop owners • Roasters • Product developers
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">
            Two Questions. Crystal Clear Answers.
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <div className="text-center mb-6">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-bold text-gray-900">THE WHY</h3>
                <p className="text-gray-600 mt-2">Should I launch this in my market?</p>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Success Probability</span>
                  <span className="font-semibold">87%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Market Readiness</span>
                  <span className="font-semibold text-green-600">High</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Competitor Risk</span>
                  <span className="font-semibold text-blue-600">Low</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Historical Precedent</span>
                  <span className="font-semibold">Dalgona-like</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <div className="text-center mb-6">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-bold text-gray-900">THE HOW</h3>
                <p className="text-gray-600 mt-2">Exact recipe + business execution</p>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Recipe + Measurements</span>
                  <span className="font-semibold text-blue-600">✓</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Supplier Sources</span>
                  <span className="font-semibold text-blue-600">✓</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pricing Strategy</span>
                  <span className="font-semibold text-blue-600">✓</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Staff Training</span>
                  <span className="font-semibold text-blue-600">✓</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-6">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Stop following trends.
            <br />
            <span className="text-blue-600">Start leading them.</span>
          </h2>
          <p className="text-gray-600 mb-8">
            Professional-grade Korean coffee intelligence for serious coffee businesses.
          </p>
          <a 
            href="/coffee-trends" 
            className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            See Current Trends
          </a>
          <p className="text-sm text-gray-500 mt-4">
            Real data • No fluff • Manual curation
          </p>
        </div>
      </section>
    </div>
  )
}