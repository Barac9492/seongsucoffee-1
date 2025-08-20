'use client'

import Navigation from '../../components/Navigation'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-coffee-foam">
      <Navigation currentPage="about" />
      
      <section className="pt-32 pb-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-light leading-tight tracking-tight mb-6 text-coffee-primary">
              About Coffee Trends Weekly
            </h1>
            <p className="text-xl text-coffee-earth font-light max-w-3xl mx-auto">
              Korean coffee trends before your competition gets them
            </p>
          </div>

          <div className="space-y-12">
            
            {/* Mission */}
            <div className="bg-white p-8 rounded-lg shadow-soft">
              <h2 className="text-2xl font-craft text-coffee-primary mb-4">Our Mission</h2>
              <p className="text-coffee-earth leading-relaxed mb-4">
                Every Tuesday, we deliver profitable Korean coffee trends directly to your inbox. 
                Our goal is simple: help independent coffee shops compete with major chains by 
                getting innovative drinks to market first.
              </p>
              <p className="text-coffee-earth leading-relaxed">
                We verify every trend through real Seoul cafe visits, ensuring authenticity and 
                profit potential before sharing with our community of 231+ coffee shop owners.
              </p>
            </div>

            {/* How We Work */}
            <div className="bg-white p-8 rounded-lg shadow-soft">
              <h2 className="text-2xl font-craft text-coffee-primary mb-6">How We Find Trends</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-coffee-primary mb-2">Seoul Cafe Network</h3>
                  <p className="text-coffee-earth text-sm">
                    We monitor 200+ cafes across Seoul&apos;s trendiest districts: Gangnam, Hongdae, Seongsu, and Itaewon.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-coffee-primary mb-2">Social Media Analysis</h3>
                  <p className="text-coffee-earth text-sm">
                    Track Korean Instagram, TikTok, and Naver for emerging coffee hashtags and viral drinks.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-coffee-primary mb-2">US Market Validation</h3>
                  <p className="text-coffee-earth text-sm">
                    Every trend is evaluated for American taste preferences and supply chain feasibility.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-coffee-primary mb-2">Profit Analysis</h3>
                  <p className="text-coffee-earth text-sm">
                    We calculate real costs, margins, and revenue potential for US coffee shops.
                  </p>
                </div>
              </div>
            </div>

            {/* Team */}
            <div className="bg-white p-8 rounded-lg shadow-soft">
              <h2 className="text-2xl font-craft text-coffee-primary mb-6">Our Team</h2>
              <p className="text-coffee-earth leading-relaxed">
                We're a dedicated team of coffee industry professionals and trend researchers 
                with deep connections in Seoul's cafe scene. Our experts combine years of 
                experience in coffee innovation, market analysis, and cross-cultural business 
                to bring you the most profitable Korean trends every week.
              </p>
            </div>

            {/* Stats */}
            <div className="bg-white p-8 rounded-lg shadow-soft">
              <h2 className="text-2xl font-craft text-coffee-primary mb-6">By The Numbers</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-light text-coffee-accent mb-2">231</div>
                  <div className="text-sm text-coffee-earth">Coffee Shops</div>
                  <div className="text-xs text-coffee-earth mt-1">Subscribed</div>
                </div>
                <div>
                  <div className="text-3xl font-light text-coffee-accent mb-2">47</div>
                  <div className="text-sm text-coffee-earth">Issues</div>
                  <div className="text-xs text-coffee-earth mt-1">Published</div>
                </div>
                <div>
                  <div className="text-3xl font-light text-coffee-accent mb-2">89%</div>
                  <div className="text-sm text-coffee-earth">Success Rate</div>
                  <div className="text-xs text-coffee-earth mt-1">Profitable trends</div>
                </div>
                <div>
                  <div className="text-3xl font-light text-coffee-accent mb-2">$2.94M</div>
                  <div className="text-sm text-coffee-earth">Revenue</div>
                  <div className="text-xs text-coffee-earth mt-1">Generated</div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-coffee-primary p-8 rounded-lg text-center">
              <h2 className="text-2xl font-light text-coffee-foam mb-4">Join Our Community</h2>
              <p className="text-coffee-cream mb-6">
                Get Korean coffee trends in your inbox every Tuesday. Always free.
              </p>
              
              <div className="bg-white p-4 rounded-lg max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full p-3 mb-3 border border-coffee-neutral-200 rounded-lg focus:border-coffee-accent"
                />
                <button className="w-full bg-coffee-accent text-white py-3 rounded-lg font-medium hover:scale-105 transition-transform">
                  Subscribe Free
                </button>
                <p className="text-xs text-coffee-earth mt-2">Next issue: Tuesday 9 AM PST</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}