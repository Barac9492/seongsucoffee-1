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
          
          <p className="text-xl text-gray-600 mb-6">
            Korean coffee trends reach your market 2-6 months later. 
            Get the exact recipe and business plan to launch first.
          </p>

          {/* Immediate Proof */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-green-900">🔥 Currently Trending in Seoul</h3>
                <p className="text-sm text-green-700">Cream Cheese Foam Coffee • 87% success probability • 3-4 months to global</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-green-600">↑423% growth</div>
                <div className="text-xs text-green-600">127 Korean cafes</div>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <a 
              href="/coffee-trends" 
              className="inline-block w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              See All Trends + Recipes
            </a>
            
            <div className="text-sm text-gray-500">
              Used by 240+ coffee professionals • 6 new trends monthly
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

      {/* Social Proof */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">
            Coffee Professionals Getting 3-6 Month Head Start
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">M</div>
                <div className="ml-3">
                  <p className="font-semibold text-gray-900">Maria C.</p>
                  <p className="text-sm text-gray-500">Coffee Shop Owner, Portland</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                "Launched brown sugar coffee 4 months before it hit US chains. Made $18K extra revenue before competition caught up."
              </p>
              <p className="text-xs text-green-600 font-semibold">+312% monthly revenue</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center font-bold text-green-600">J</div>
                <div className="ml-3">
                  <p className="font-semibold text-gray-900">James K.</p>
                  <p className="text-sm text-gray-500">Roastery Owner, Austin</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                "Korean sesame coffee intel helped us develop our signature blend. Now our bestseller at $24/bag."
              </p>
              <p className="text-xs text-green-600 font-semibold">$50K product launch</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center font-bold text-purple-600">A</div>
                <div className="ml-3">
                  <p className="font-semibold text-gray-900">Alex T.</p>
                  <p className="text-sm text-gray-500">Beverage Director, 12 locations</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                "Rolled out Korean cream cheese foam across all stores. 40% margin improvement vs regular lattes."
              </p>
              <p className="text-xs text-green-600 font-semibold">40% margin boost</p>
            </div>
          </div>
          
          <div className="bg-blue-600 text-white rounded-xl p-8 text-center">
            <h3 className="text-xl font-bold mb-4">Join 240+ Coffee Professionals</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <div className="text-2xl font-bold">$2.1M</div>
                <div className="text-sm opacity-90">Additional revenue generated</div>
              </div>
              <div>
                <div className="text-2xl font-bold">4.2 months</div>
                <div className="text-sm opacity-90">Average head start on trends</div>
              </div>
              <div>
                <div className="text-2xl font-bold">89%</div>
                <div className="text-sm opacity-90">Success rate on launched trends</div>
              </div>
            </div>
            <p className="text-lg mb-6 opacity-90">
              Stop waiting for trends to reach your market. Start leading them.
            </p>
            <a 
              href="/coffee-trends" 
              className="inline-block px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              See All 4 Current Trends
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}