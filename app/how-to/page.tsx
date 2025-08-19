export default function HowToPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">Korean Trend Scout</h1>
            <div className="flex items-center gap-4">
              <a href="/coffee-trends" className="text-blue-600 font-medium">Trends</a>
              <a href="/how-to" className="text-blue-600 font-medium">Guide</a>
              <a href="/pricing" className="text-gray-600 font-medium">Pricing</a>
              <a href="/" className="text-gray-600 font-medium">Home</a>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            How to Use Korean Trend Scout
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your complete guide to Korean coffee trend intelligence for business success
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-blue-800 mb-2">🎯 Two Critical Questions</h2>
            <p className="text-blue-700">
              For every Korean coffee trend: "Should I launch this?" and "How do I launch it?" 
              Professional-grade intelligence for serious coffee businesses.
            </p>
          </div>
        </div>

        {/* Navigation Guide */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Platform Overview</h2>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-xl p-8 text-center">
            
            {/* Coffee Trends - Single Focus */}
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              ☕ Korean Coffee Trend Tracker
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Your complete platform for tracking emerging Korean coffee products with video proof.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-sm text-gray-600">
              <div>
                <div className="font-semibold text-orange-800">Growth Metrics</div>
                <div>Real-time % growth tracking</div>
              </div>
              <div>
                <div className="font-semibold text-orange-800">Video Proof</div>
                <div>Korean cafe YouTube evidence</div>
              </div>
              <div>
                <div className="font-semibold text-orange-800">Lifecycle Stages</div>
                <div>Discovery → Mainstream</div>
              </div>
              <div>
                <div className="font-semibold text-orange-800">Social Analytics</div>
                <div>TikTok, Instagram, search trends</div>
              </div>
            </div>
            <a href="/coffee-trends" className="inline-block px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors">
              Start Tracking Trends →
            </a>

          </div>
        </section>

        {/* Step by Step Guide */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Step-by-Step Usage Guide</h2>
          
          <div className="space-y-8">
            {/* Step 1 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                1
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Explore Korean Coffee Trends
                </h3>
                <p className="text-gray-600 mb-3">
                  Visit the Coffee Trends page to see what&apos;s emerging in Korean cafes right now.
                </p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700 mb-2"><strong>Look for:</strong></p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Trends in &quot;Discovery&quot; or &quot;Early&quot; stages (highest opportunity)</li>
                    <li>• High growth percentages (300%+ is exceptional)</li>
                    <li>• Multiple video proof points</li>
                    <li>• Trends with &lt;50 cafes serving (early adoption window)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                2
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Watch the Video Proof
                </h3>
                <p className="text-gray-600 mb-3">
                  Click on any trend card to see YouTube videos of Korean cafes actually making these products.
                </p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700 mb-2"><strong>Evaluate:</strong></p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Are cafes actually serving this?</li>
                    <li>• Does it look technically feasible?</li>
                    <li>• What ingredients/equipment needed?</li>
                    <li>• How are customers responding?</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                3
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Plan Your California Launch
                </h3>
                <p className="text-gray-600 mb-3">
                  Use the 3-week window to test and launch before mainstream adoption.
                </p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700 mb-2"><strong>Action plan:</strong></p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Week 1: Source ingredients, test recipe</li>
                    <li>• Week 2: Soft launch with Korean hashtags</li>
                    <li>• Week 3: Scale up before mainstream discovers</li>
                    <li>• Price premium: 20-30% above similar items</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                4
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Monitor and Scale
                </h3>
                <p className="text-gray-600 mb-3">
                  Track your implementation success and find the next opportunity.
                </p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700 mb-2"><strong>Success metrics:</strong></p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 30%+ higher margins vs regular menu items</li>
                    <li>• Social media buzz (Korean → English transition)</li>
                    <li>• Customer retention for &quot;authentic&quot; experience</li>
                    <li>• First-mover advantage in your area</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Success Framework */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">The K-Bridge Success Framework</h2>
          
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl mb-4">🇰🇷</div>
                <h3 className="text-lg font-semibold mb-2">Cultural Bridge</h3>
                <p className="text-sm text-gray-300">
                  You understand both Korean and American tastes. 
                  This isn&apos;t just translation—it&apos;s cultural adaptation.
                </p>
              </div>
              <div>
                <div className="text-4xl mb-4">⏰</div>
                <h3 className="text-lg font-semibold mb-2">Timing Advantage</h3>
                <p className="text-sm text-gray-300">
                  3-week window before mainstream adoption. 
                  Perfect time to establish as the &quot;authentic&quot; source.
                </p>
              </div>
              <div>
                <div className="text-4xl mb-4">💰</div>
                <h3 className="text-lg font-semibold mb-2">Premium Positioning</h3>
                <p className="text-sm text-gray-300">
                  When others copy, customers come to you for the real thing. 
                  Authenticity commands premium pricing.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pro Tips */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Pro Tips for Maximum Success</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="font-semibold text-green-800 mb-3">✅ Do This</h3>
              <ul className="space-y-2 text-sm text-green-700">
                <li>• Start with Korean social media marketing</li>
                <li>• Use authentic Korean ingredients when possible</li>
                <li>• Document your &quot;first to market&quot; story</li>
                <li>• Build relationships with Korean food bloggers</li>
                <li>• Train staff on the trend&apos;s Korean origin</li>
                <li>• Price 20-30% premium as &quot;authentic&quot;</li>
              </ul>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="font-semibold text-red-800 mb-3">❌ Avoid This</h3>
              <ul className="space-y-2 text-sm text-red-700">
                <li>• Don&apos;t wait for mainstream adoption</li>
                <li>• Don&apos;t compromise on authenticity</li>
                <li>• Don&apos;t ignore the Korean community</li>
                <li>• Don&apos;t launch without testing the recipe</li>
                <li>• Don&apos;t price at commodity levels</li>
                <li>• Don&apos;t skip the cultural story</li>
              </ul>
            </div>
          </div>
        </section>


        {/* Call to Action */}
        <section className="text-center">
          <div className="bg-orange-600 text-white rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4">
              Ready to Leverage Your K-Bridge Advantage?
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Start tracking trends and building your 3-week competitive edge today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/coffee-trends" 
                className="bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold hover:bg-orange-50 transition-colors"
              >
                Start Tracking Trends
              </a>
              <a 
                href="/pricing" 
                className="bg-orange-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-800 transition-colors"
              >
                View Pricing
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}