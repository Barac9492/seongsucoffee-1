export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">K-Bridge California</h1>
            <div className="flex items-center gap-4">
              <a href="/coffee-trends" className="text-orange-600 font-medium">Coffee Trends</a>
              <a href="/how-to" className="text-gray-600 font-medium">How To</a>
              <a href="/pricing" className="text-orange-600 font-medium">Pricing</a>
              <a href="/" className="text-gray-600 font-medium">Home</a>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Start free during beta. Pay only when you&apos;re ready to scale.
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 max-w-2xl mx-auto">
            <h2 className="text-lg font-semibold text-green-800 mb-2">🎉 Beta Period Active</h2>
            <p className="text-green-700">
              All features completely free while we&apos;re in beta. 
              No credit card required. No time limits.
            </p>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          
          {/* Free Tier */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Daily Updates</h3>
              <div className="mb-6">
                <span className="text-5xl font-bold text-gray-900">Free</span>
                <span className="text-gray-500"> forever</span>
              </div>
              <p className="text-gray-600 mb-8">
                Perfect for staying informed on Korean coffee trends
              </p>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700">Daily trend updates</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700">Coffee trends with video proof</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700">Live predictions</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700">Basic dashboard access</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700">Community support</span>
              </div>
            </div>
            
            <button className="w-full bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors">
              Get Started Free
            </button>
          </div>

          {/* Pro Tier */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200 rounded-2xl p-8 relative">
            {/* Beta Badge */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Free During Beta
              </span>
            </div>
            
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Database Access</h3>
              <div className="mb-6">
                <span className="text-5xl font-bold text-orange-600">$99</span>
                <span className="text-gray-500"> /month</span>
              </div>
              <p className="text-gray-600 mb-8">
                Full historical data and advanced analytics for serious businesses
              </p>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700"><strong>Everything in Free</strong></span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700">Complete historical database</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700">Advanced analytics & insights</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700">Custom trend alerts</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700">API access for integration</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700">Priority support</span>
              </div>
            </div>
            
            <button className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors">
              Start Free Beta
            </button>
            <p className="text-center text-xs text-gray-500 mt-2">
              No billing until beta ends
            </p>
          </div>
        </div>

        {/* Beta Information */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            Why Free During Beta?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl mb-3">🔧</div>
              <h3 className="font-semibold text-gray-900 mb-2">We&apos;re Building</h3>
              <p className="text-sm text-gray-600">
                Platform is actively evolving based on user feedback. 
                Your input shapes the final product.
              </p>
            </div>
            <div>
              <div className="text-3xl mb-3">🤝</div>
              <h3 className="font-semibold text-gray-900 mb-2">Community First</h3>
              <p className="text-sm text-gray-600">
                Early users help us understand what Korean businesses 
                really need to succeed in California.
              </p>
            </div>
            <div>
              <div className="text-3xl mb-3">📈</div>
              <h3 className="font-semibold text-gray-900 mb-2">Prove Value</h3>
              <p className="text-sm text-gray-600">
                We want you to see real business results before 
                asking for payment. Success first, billing second.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                How long is the beta period?
              </h3>
              <p className="text-gray-600">
                We&apos;ll announce the end of beta at least 30 days in advance. 
                Currently, we&apos;re focused on building the best product rather than rushing to monetize.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                What happens to free users after beta?
              </h3>
              <p className="text-gray-600">
                Free daily updates remain free forever. Only advanced database features 
                require the paid plan. You can continue using the core platform at no cost.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                Why $99/month for database access?
              </h3>
              <p className="text-gray-600">
                Database features are for serious businesses making data-driven decisions. 
                The ROI from catching one major trend early typically pays for years of service.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                Can I cancel anytime?
              </h3>
              <p className="text-gray-600">
                Absolutely. No contracts, no setup fees. Cancel anytime and you&apos;ll still 
                have access to free features. Your historical data remains available.
              </p>
            </div>
          </div>
        </div>

        {/* Value Proposition */}
        <div className="bg-gray-900 text-white rounded-2xl p-8 mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">
            The K-Bridge ROI Calculator
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-orange-400 mb-2">1</div>
              <h3 className="font-semibold mb-2">Trend Captured</h3>
              <p className="text-sm text-gray-300">
                Catch one major coffee trend 3 weeks early
              </p>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-400 mb-2">30%</div>
              <h3 className="font-semibold mb-2">Premium Pricing</h3>
              <p className="text-sm text-gray-300">
                Charge premium as the &quot;authentic&quot; source
              </p>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-400 mb-2">$10K+</div>
              <h3 className="font-semibold mb-2">Monthly Revenue</h3>
              <p className="text-sm text-gray-300">
                Conservative estimate for successful implementation
              </p>
            </div>
          </div>
          <div className="text-center mt-6">
            <p className="text-gray-300 mb-4">
              One successful trend implementation pays for 8+ years of service
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="bg-orange-600 text-white rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4">
              Start Your Free Beta Access Today
            </h2>
            <p className="text-lg mb-6 opacity-90">
              No credit card. No risk. Just your competitive advantage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/coffee-trends" 
                className="bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold hover:bg-orange-50 transition-colors"
              >
                Start Free Beta
              </a>
              <a 
                href="/how-to" 
                className="bg-orange-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-800 transition-colors"
              >
                Learn How It Works
              </a>
            </div>
            <p className="text-sm opacity-75 mt-4">
              Join 147+ Korean businesses already using K-Bridge
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}