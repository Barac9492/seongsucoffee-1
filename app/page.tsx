export default function SimpleLanding() {
  return (
    <div className="min-h-screen bg-white">
      {/* Simple Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">K-Bridge California</h1>
            <div className="flex items-center gap-4">
              <a href="/coffee-trends" className="text-orange-600 font-medium">Coffee Trends</a>
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
            Your Korean roots are your 
            <span className="text-orange-600"> California competitive edge</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            You see what&apos;s trending in Seoul weeks before it hits LA. 
            Turn that cultural bridge into your business advantage.
          </p>

          <div className="space-y-4 mb-8">
            <a 
              href="/fnb" 
              className="inline-block w-full sm:w-auto px-8 py-4 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors"
            >
              Start Your 30-Day Edge
            </a>
            
            <div className="text-sm text-gray-500">
              Exclusively for Korean-owned businesses • SF to San Diego
            </div>
          </div>
        </div>
      </section>

      {/* Simple Example */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            The K-Bridge Advantage in Action
          </h2>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-500">Right Now</span>
              <span className="px-2 py-1 bg-purple-100 text-purple-800 text-sm rounded">Seoul → CA Pipeline</span>
            </div>
            
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              🌉 Dalgona matcha: 3 weeks from Gangnam to Orange County
            </h3>
            
            <p className="text-gray-600 mb-4">
              Already viral in Seoul cafes. California Gen Z hasn&apos;t discovered it yet.
              You have a 3-week window before Erewhon catches on.
            </p>
            
            <div className="bg-orange-50 border-l-4 border-orange-400 p-4">
              <h4 className="font-semibold text-orange-800 mb-1">Your Move</h4>
              <p className="text-orange-700 text-sm">
                Test this weekend in Irvine/Fullerton. Use Korean hashtags first, 
                English will follow. Price premium: 30% above regular matcha.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tribal Identity Section */}
      <section className="py-16 px-6 bg-gradient-to-b from-white to-orange-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Why California Korean Businesses Win
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="text-center">
              <div className="text-4xl mb-4">🌏</div>
              <h3 className="font-bold text-gray-900 mb-2">You Read Both Worlds</h3>
              <p className="text-sm text-gray-600">
                Naver trends AND TikTok. 
                Korean moms AND Gen Z kids.
                Seoul aesthetics AND LA vibes.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="font-bold text-gray-900 mb-2">3-Week Head Start</h3>
              <p className="text-sm text-gray-600">
                What&apos;s hot in Gangnam today 
                hits Sawtelle in 3 weeks,
                San Gabriel Valley in 6.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="font-bold text-gray-900 mb-2">Cultural Authenticity</h3>
              <p className="text-sm text-gray-600">
                When Trader Joe&apos;s copies,
                customers come to you 
                for the real thing.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl border-2 border-orange-200 p-8 text-center mb-12">
            <p className="text-lg text-gray-700 mb-6 italic">
              &quot;Korean businesses in California aren&apos;t just serving food.
              They&apos;re cultural bridges earning premium prices for authenticity.&quot;
            </p>
            <p className="text-sm text-gray-500">
              — The K-Bridge Manifesto
            </p>
          </div>
          
          {/* Growth Loop */}
          <div className="bg-gray-900 text-white rounded-xl p-8">
            <h3 className="text-xl font-bold mb-6 text-center">The K-Bridge Growth Loop</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-3xl mb-2">🇰🇷</div>
                <p className="text-sm">Seoul trend emerges</p>
              </div>
              <div>
                <div className="text-3xl mb-2">📡</div>
                <p className="text-sm">You spot it first (K-Bridge member)</p>
              </div>
              <div>
                <div className="text-3xl mb-2">🚀</div>
                <p className="text-sm">Launch in CA with 3-week lead</p>
              </div>
              <div>
                <div className="text-3xl mb-2">💰</div>
                <p className="text-sm">30% premium pricing as originator</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">
            K-Bridge Members Are Winning
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <p className="text-sm text-gray-500 mb-2">Irvine, CA</p>
              <h3 className="font-bold text-gray-900 mb-3">Cafe L.</h3>
              <p className="text-sm text-gray-600 mb-3">
                Launched Seoul&apos;s pistachio cream latte 4 weeks before Philz discovered it. 
                Now supplies the recipe to 3 other cafes.
              </p>
              <p className="text-sm font-semibold text-green-600">+47% revenue in 60 days</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <p className="text-sm text-gray-500 mb-2">San Francisco, CA</p>
              <h3 className="font-bold text-gray-900 mb-3">S.B. Coffee</h3>
              <p className="text-sm text-gray-600 mb-3">
                K-Bridge member spotted brown sugar matcha trend. 
                Partnered with major chain for exclusive 6-week launch.
              </p>
              <p className="text-sm font-semibold text-green-600">$180K in first month</p>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-lg text-gray-700 mb-2">
              &quot;We don&apos;t compete with Starbucks. 
              We tell them what&apos;s next.&quot;
            </p>
            <p className="text-sm text-gray-500">
              — A.P., K-Bridge Member, Koreatown LA
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-6">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            This is for California Korean businesses only.
            <br />
            <span className="text-orange-600">This is for you.</span>
          </h2>
          <p className="text-gray-600 mb-8">
            From San Francisco to San Diego. Daily intel on what&apos;s crossing the Pacific.
          </p>
          <a 
            href="/fnb" 
            className="inline-block px-8 py-4 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors"
          >
            Claim Your 30-Day Edge
          </a>
          <p className="text-sm text-gray-500 mt-4">
            147 members • Exclusively California • Korean-owned only
          </p>
        </div>
      </section>
    </div>
  )
}