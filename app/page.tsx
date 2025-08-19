export default function SimpleLanding() {
  return (
    <div className="min-h-screen bg-white">
      {/* Simple Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">Next Drink Profit</h1>
            <div className="flex items-center gap-4">
              <a href="/coffee-trends" className="text-blue-600 font-medium">4 Drinks to Launch</a>
              <a href="/pricing" className="text-gray-600 font-medium">Pricing</a>
              <a href="/admin" className="text-gray-400 font-medium text-xs">Admin</a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero - Laser Focused */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Your next $50K menu item<br/>
            <span className="text-green-600">is trending in Seoul right now</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-6">
            We monitor Korean cafes. You launch proven winners.<br/>
            Recipe included. Suppliers included. Training included.
          </p>

          {/* Immediate Proof */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-green-900 text-lg">RIGHT NOW: Cream Cheese Foam Coffee</h3>
                <p className="text-sm text-green-700 mt-1">$1.85 cost → $7.50 retail = <strong>75% margin</strong></p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">+$18K/month</div>
                <div className="text-xs text-green-600">avg. shop revenue</div>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <a 
              href="/coffee-trends" 
              className="inline-block w-full sm:w-auto px-8 py-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors text-lg"
            >
              Get Recipe + Launch Plan →
            </a>
            
            <div className="text-sm text-gray-500">
              $97/month • Cancel anytime • ROI in first week
            </div>
          </div>
        </div>
      </section>

      {/* What You Get - Simple */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">
            Everything You Need. Nothing You Don&apos;t.
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="bg-white rounded-lg p-6">
              <div className="text-3xl mb-3">📋</div>
              <h3 className="font-bold text-gray-900 mb-2">Exact Recipe</h3>
              <p className="text-sm text-gray-600">Measurements, temps, timing</p>
            </div>
            
            <div className="bg-white rounded-lg p-6">
              <div className="text-3xl mb-3">📞</div>
              <h3 className="font-bold text-gray-900 mb-2">Supplier Contacts</h3>
              <p className="text-sm text-gray-600">Names, numbers, minimums</p>
            </div>
            
            <div className="bg-white rounded-lg p-6">
              <div className="text-3xl mb-3">💰</div>
              <h3 className="font-bold text-gray-900 mb-2">Pricing Formula</h3>
              <p className="text-sm text-gray-600">Cost, retail, margin</p>
            </div>
            
            <div className="bg-white rounded-lg p-6">
              <div className="text-3xl mb-3">📖</div>
              <h3 className="font-bold text-gray-900 mb-2">Staff Script</h3>
              <p className="text-sm text-gray-600">Training in 10 minutes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Results Only */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">
            Real Shops. Real Revenue.
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">+$18K</div>
              <p className="text-sm text-gray-600">Portland coffee shop<br/>First month with cream cheese foam</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">+$50K</div>
              <p className="text-sm text-gray-600">Austin roastery<br/>Black sesame product line</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">+40%</div>
              <p className="text-sm text-gray-600">12-location chain<br/>Margin improvement</p>
            </div>
          </div>
          
          <div className="bg-gray-900 text-white rounded-xl p-8 text-center">
            <h3 className="text-3xl font-bold mb-6">Start Monday. Profit Tuesday.</h3>
            <p className="text-lg mb-6 opacity-90">
              4 ready-to-launch Korean drinks. Updated monthly.
            </p>
            <a 
              href="/coffee-trends" 
              className="inline-block px-8 py-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors text-lg"
            >
              Get Your First Recipe →
            </a>
            <p className="text-sm mt-4 opacity-70">$97/month • ROI guaranteed or money back</p>
          </div>
        </div>
      </section>
    </div>
  )
}