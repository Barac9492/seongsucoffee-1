export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">Next Drink Profit</h1>
            <div className="flex items-center gap-4">
              <a href="/coffee-trends" className="text-blue-600 font-medium">4 Drinks to Launch</a>
              <a href="/" className="text-gray-600 font-medium">Home</a>
              <a href="/admin" className="text-gray-400 font-medium text-xs">Admin</a>
            </div>
          </div>
        </div>
      </header>

      {/* Simple Pricing */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            One Price. All Profits.
          </h1>
          
          <div className="bg-white border-2 border-green-600 rounded-xl p-8 mb-8">
            <div className="text-5xl font-bold text-gray-900 mb-2">$97</div>
            <div className="text-gray-600 mb-6">per month</div>
            
            <div className="space-y-4 text-left mb-8">
              <div className="flex items-center">
                <span className="text-green-600 mr-3">✓</span>
                <span>4 ready-to-launch Korean drinks</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-600 mr-3">✓</span>
                <span>Complete recipes with exact measurements</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-600 mr-3">✓</span>
                <span>Supplier contacts and pricing</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-600 mr-3">✓</span>
                <span>Staff training scripts</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-600 mr-3">✓</span>
                <span>Monthly updates with new trends</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-600 mr-3">✓</span>
                <span>Cancel anytime</span>
              </div>
            </div>
            
            <a 
              href="/coffee-trends" 
              className="block w-full py-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors text-lg"
            >
              Start Now →
            </a>
          </div>
          
          <div className="bg-gray-100 rounded-lg p-6">
            <h3 className="font-bold text-gray-900 mb-2">ROI Guarantee</h3>
            <p className="text-sm text-gray-600">
              Launch one drink. If you don&apos;t make $97 in profit on day one, we&apos;ll refund your month.
            </p>
          </div>
          
          <div className="mt-12">
            <p className="text-sm text-gray-500 mb-4">Trusted by 240+ coffee professionals</p>
            <div className="flex justify-center gap-8">
              <div>
                <div className="text-2xl font-bold text-gray-900">$2.1M</div>
                <div className="text-xs text-gray-600">Revenue generated</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">89%</div>
                <div className="text-xs text-gray-600">Success rate</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">4 months</div>
                <div className="text-xs text-gray-600">Avg. head start</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}