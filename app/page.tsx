export default function SimpleLanding() {
  return (
    <div className="min-h-screen bg-white">
      {/* Simple Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">K-Wave F&B Intelligence</h1>
            <a href="/fnb" className="text-orange-600 font-medium">Dashboard</a>
          </div>
        </div>
      </header>

      {/* Hero - Ultra Simple */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Know which Korean menu items will trend in LA 
            <span className="text-orange-600"> before your competitors</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            Daily reports on matcha, Korean desserts, and cafe trends 
            trending on TikTok and Google in California.
          </p>

          <div className="space-y-4 mb-8">
            <a 
              href="/fnb" 
              className="inline-block w-full sm:w-auto px-8 py-4 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors"
            >
              Get Free 4-Week Trial
            </a>
            
            <div className="text-sm text-gray-500">
              For California cafe & bakery owners • Focus: Matcha & Korean desserts
            </div>
          </div>
        </div>
      </section>

      {/* Simple Example */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Today&apos;s Example Report
          </h2>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-500">December 18, 2024</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded">High Confidence</span>
            </div>
            
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              🔥 Matcha Latte trending +22.5% on LA TikTok
            </h3>
            
            <p className="text-gray-600 mb-4">
              TikTok views up 22.5% (7d vs 28d), Google searches up 20%. 
              LA Koreatown consumers showing strong interest.
            </p>
            
            <div className="bg-orange-50 border-l-4 border-orange-400 p-4 mb-4">
              <h4 className="font-semibold text-orange-800 mb-1">Action for Cafe Owners</h4>
              <p className="text-orange-700 text-sm">
                Add matcha latte to menu or run limited-time popup within 2 weeks. 
                Source premium matcha, develop 2-3 menu variations.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="bg-blue-50 p-3 rounded">
                <div className="font-medium text-blue-800">B2B Ad Copy</div>
                <div className="text-blue-700">&quot;LA TikTok matcha latte +22.5%. Add to menu now.&quot;</div>
              </div>
              <div className="bg-pink-50 p-3 rounded">
                <div className="font-medium text-pink-800">B2C Ad Copy</div>
                <div className="text-pink-700">&quot;Authentic Japanese matcha latte, now in LA.&quot;</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simple CTA */}
      <section className="py-16 px-6">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Start your 4-week free trial
          </h2>
          <p className="text-gray-600 mb-8">
            Join 2-3 CA cafe owners testing new menu items based on our reports.
          </p>
          <a 
            href="/fnb" 
            className="inline-block px-8 py-4 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors"
          >
            Get Daily Reports
          </a>
          <p className="text-sm text-gray-500 mt-4">
            No credit card required • CA cafe/bakery focus • Matcha & Korean desserts only
          </p>
        </div>
      </section>
    </div>
  )
}