'use client'

import { useState } from 'react'
import Navigation from '../../components/Navigation'

export default function SocialPage() {
  const [activeTab, setActiveTab] = useState('feed')

  return (
    <div className="min-h-screen bg-coffee-warm">
      <Navigation currentPage="home" />
      
      {/* Hero */}
      <section className="pt-32 pb-16 px-8 coffee-texture">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-light leading-tight tracking-tight mb-6 text-coffee-primary">
            Coffee<br/>
            <span className="text-coffee-accent">Professional Network</span>
          </h1>
          <p className="text-xl text-coffee-secondary font-light max-w-3xl mx-auto mb-8">
            Where 47,000+ coffee professionals share real-time insights, build careers, and shape the industry&apos;s future.
          </p>
          
          <div className="flex items-center justify-center gap-8 text-sm text-coffee-earth">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-coffee-accent rounded-full animate-pulse"></div>
              <span>2,847 active now</span>
            </div>
            <div>•</div>
            <div>156 new connections today</div>
            <div>•</div>
            <div>$4.2M revenue shared in network</div>
          </div>
        </div>
      </section>

      {/* Network Intelligence Dashboard */}
      <section className="py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Live Activity Feed */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg p-6 shadow-medium border border-coffee">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-craft text-coffee-primary">Live Intelligence Feed</h2>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setActiveTab('feed')}
                      className={`px-4 py-2 rounded-lg transition-all ${
                        activeTab === 'feed' 
                          ? 'bg-coffee-accent text-coffee-foam' 
                          : 'bg-coffee-cream text-coffee-earth hover:bg-coffee-accent hover:text-coffee-foam'
                      }`}
                    >
                      Live Feed
                    </button>
                    <button 
                      onClick={() => setActiveTab('trending')}
                      className={`px-4 py-2 rounded-lg transition-all ${
                        activeTab === 'trending' 
                          ? 'bg-coffee-accent text-coffee-foam' 
                          : 'bg-coffee-cream text-coffee-earth hover:bg-coffee-accent hover:text-coffee-foam'
                      }`}
                    >
                      Trending
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Trending Professional Insight */}
                  <div className="border border-coffee rounded-lg p-4 hover:shadow-soft transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-coffee-accent rounded-full flex items-center justify-center text-coffee-foam font-craft">
                        JK
                      </div>
                      <div>
                        <div className="font-craft text-coffee-primary">James Kim</div>
                        <div className="text-sm text-coffee-earth">Anthracite Coffee, Seoul • 847 followers</div>
                      </div>
                      <div className="ml-auto text-xs text-coffee-earth">2 min ago</div>
                    </div>
                    <p className="text-coffee-earth mb-3">
                      🔥 LIVE: Brown butter latte trend is exploding in Gangnam. 3 new shops launched this week. 
                      Customer demand up 340% vs last month. This is the next major wave.
                    </p>
                    <div className="flex items-center gap-4 text-sm text-coffee-earth">
                      <button className="hover:text-coffee-accent transition-colors">👍 847</button>
                      <button className="hover:text-coffee-accent transition-colors">💬 23 insights</button>
                      <button className="hover:text-coffee-accent transition-colors">🔄 Share</button>
                      <span className="ml-auto bg-coffee-accent text-coffee-foam px-2 py-1 rounded text-xs">Trending #1</span>
                    </div>
                  </div>

                  {/* Market Intelligence */}
                  <div className="border border-coffee rounded-lg p-4 hover:shadow-soft transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-earth rounded-full flex items-center justify-center text-coffee-primary font-craft">
                        AI
                      </div>
                      <div>
                        <div className="font-craft text-coffee-primary">Market Intelligence</div>
                        <div className="text-sm text-coffee-earth">Real-time trend analysis</div>
                      </div>
                      <div className="ml-auto text-xs text-coffee-earth">5 min ago</div>
                    </div>
                    <div className="bg-gradient-earth p-4 rounded-lg mb-3">
                      <p className="text-coffee-primary mb-2 font-craft">📊 Trend Alert: Cold Foam Innovations</p>
                      <p className="text-coffee-earth text-sm">
                        AI detected 47% increase in cold foam experiments across Seoul. 
                        Profit opportunity: $2,400-4,800/month for early adopters.
                      </p>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-coffee-earth">
                      <button className="hover:text-coffee-accent transition-colors">📈 View Analysis</button>
                      <button className="hover:text-coffee-accent transition-colors">💰 Calculate ROI</button>
                      <span className="ml-auto bg-coffee-roast text-coffee-foam px-2 py-1 rounded text-xs">AI Insight</span>
                    </div>
                  </div>

                  {/* Success Story */}
                  <div className="border border-coffee rounded-lg p-4 hover:shadow-soft transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-coffee-roast rounded-full flex items-center justify-center text-coffee-foam font-craft">
                        MH
                      </div>
                      <div>
                        <div className="font-craft text-coffee-primary">Maria Hernandez</div>
                        <div className="text-sm text-coffee-earth">Cafe Luna, Portland • 1,247 followers</div>
                      </div>
                      <div className="ml-auto text-xs text-coffee-earth">12 min ago</div>
                    </div>
                    <p className="text-coffee-earth mb-3">
                      💰 SUCCESS: Used First Launch&apos;s Korean honey bread latte prediction. 
                      Week 1: $3,200 revenue. Week 2: $5,800. Week 3: $8,400. 
                      ROI: 420%. Thank you @firstlaunch community! 🙏
                    </p>
                    <div className="flex items-center gap-4 text-sm text-coffee-earth">
                      <button className="hover:text-coffee-accent transition-colors">🎉 1,247</button>
                      <button className="hover:text-coffee-accent transition-colors">💬 89 congratulations</button>
                      <button className="hover:text-coffee-accent transition-colors">🔄 Share success</button>
                      <span className="ml-auto bg-green-500 text-white px-2 py-1 rounded text-xs">Success Story</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <button className="px-6 py-3 bg-coffee-accent text-coffee-foam rounded-lg hover:scale-105 transition-transform font-craft">
                    Load More Intelligence
                  </button>
                </div>
              </div>
            </div>

            {/* Network Effects Sidebar */}
            <div className="space-y-6">
              {/* Your Network Influence */}
              <div className="bg-white rounded-lg p-6 shadow-medium border border-coffee">
                <h3 className="font-craft text-coffee-primary mb-4">Your Network Influence</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-coffee-earth">Professional Score</span>
                    <span className="font-craft text-coffee-accent">847</span>
                  </div>
                  <div className="w-full bg-coffee-cream rounded-full h-2">
                    <div className="bg-coffee-accent h-2 rounded-full" style={{width: '73%'}}></div>
                  </div>
                  <div className="text-xs text-coffee-earth">
                    Top 15% of coffee professionals globally
                  </div>
                </div>
              </div>

              {/* Trending Connections */}
              <div className="bg-white rounded-lg p-6 shadow-medium border border-coffee">
                <h3 className="font-craft text-coffee-primary mb-4">Connect with Rising Stars</h3>
                <div className="space-y-3">
                  {[
                    { name: "Chen Wei", role: "Roaster, Shanghai", followers: "2.1K", trending: "+340% engagement" },
                    { name: "Sofia Martinez", role: "Cafe Owner, Mexico City", followers: "1.8K", trending: "+280% revenue" },
                    { name: "Ahmad Hassan", role: "Supplier, Dubai", followers: "3.2K", trending: "+190% network" }
                  ].map((person, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gradient-earth rounded-lg hover:shadow-soft transition-shadow">
                      <div className="w-8 h-8 bg-coffee-accent rounded-full flex items-center justify-center text-coffee-foam font-craft text-sm">
                        {person.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <div className="font-craft text-coffee-primary text-sm">{person.name}</div>
                        <div className="text-xs text-coffee-earth">{person.role}</div>
                      </div>
                      <button className="px-3 py-1 bg-coffee-accent text-coffee-foam text-xs rounded-full hover:scale-105 transition-transform">
                        Connect
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Network Intelligence */}
              <div className="bg-white rounded-lg p-6 shadow-medium border border-coffee">
                <h3 className="font-craft text-coffee-primary mb-4">Network Intelligence</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-coffee-earth">Active Professionals</span>
                    <span className="font-craft text-coffee-accent">47,247</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-coffee-earth">New Connections Today</span>
                    <span className="font-craft text-coffee-accent">1,847</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-coffee-earth">Insights Shared</span>
                    <span className="font-craft text-coffee-accent">23,891</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-coffee-earth">Revenue Generated</span>
                    <span className="font-craft text-coffee-accent">$4.2M</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}