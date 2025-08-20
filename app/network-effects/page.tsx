'use client'

import { useState } from 'react'
import Navigation from '../../components/Navigation'

export default function NetworkEffectsPage() {
  const [selectedMetric, setSelectedMetric] = useState('viral')

  const networkMetrics = {
    viral: {
      title: "Viral Growth Loops",
      description: "How coffee professionals naturally spread platform adoption",
      stats: [
        { label: "Invitation Rate", value: "4.7x", change: "+340%", desc: "Average invites sent per active user" },
        { label: "Conversion Rate", value: "67%", change: "+89%", desc: "Invites that become active users" },
        { label: "Time to First Value", value: "18 min", change: "-72%", desc: "From signup to first profitable insight" },
        { label: "Network Amplification", value: "12.3x", change: "+156%", desc: "How insights spread through connections" }
      ]
    },
    retention: {
      title: "Network Retention Power",
      description: "Why coffee professionals become platform-dependent",
      stats: [
        { label: "Day 1 Retention", value: "89%", change: "+23%", desc: "Users who return next day" },
        { label: "Week 1 Retention", value: "73%", change: "+34%", desc: "Users active after first week" },
        { label: "Month 1 Retention", value: "61%", change: "+45%", desc: "Users still active after month" },
        { label: "Network Dependency", value: "94%", change: "+67%", desc: "Users who can't imagine working without platform" }
      ]
    },
    monetization: {
      title: "Revenue Network Effects",
      description: "How network size drives exponential value creation",
      stats: [
        { label: "ARPU Growth", value: "$247", change: "+189%", desc: "Average revenue per user per month" },
        { label: "Cross-Sell Rate", value: "84%", change: "+156%", desc: "Users upgrading within network" },
        { label: "Network Value", value: "$89M", change: "+278%", desc: "Total economic value created" },
        { label: "Monopoly Strength", value: "94.7%", change: "+23%", desc: "Market share in coffee intelligence" }
      ]
    }
  }

  const currentMetric = networkMetrics[selectedMetric as keyof typeof networkMetrics]

  return (
    <div className="min-h-screen bg-coffee-warm">
      <Navigation currentPage="home" />
      
      {/* Hero */}
      <section className="pt-32 pb-16 px-8 coffee-texture">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-light leading-tight tracking-tight mb-6 text-coffee-primary">
            Network Effects<br/>
            <span className="text-coffee-accent">Monopoly Engine</span>
          </h1>
          <p className="text-xl text-coffee-secondary font-light max-w-3xl mx-auto mb-8">
            How First Launch creates unbreachable competitive moats through exponential network value.
          </p>
          
          <div className="flex items-center justify-center gap-8 text-sm text-coffee-earth">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-coffee-accent rounded-full animate-pulse"></div>
              <span>47,247 professionals</span>
            </div>
            <div>•</div>
            <div>$89M network value created</div>
            <div>•</div>
            <div>94.7% market dominance</div>
          </div>
        </div>
      </section>

      {/* Thiel's Monopoly Philosophy */}
      <section className="py-16 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light mb-4 text-coffee-primary">The Thiel Doctrine: Competition is for Losers</h2>
            <p className="text-xl text-coffee-secondary font-light max-w-4xl mx-auto">
              &ldquo;Every successful business is different: it gains a monopoly by solving a unique problem. 
              In coffee intelligence, we don&apos;t compete—we dominate through network effects.&rdquo;
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="font-craft text-coffee-primary mb-3">Contrarian Truth</h3>
              <p className="text-coffee-earth">
                Most platforms chase scale. We chase depth. 
                47K deeply engaged professionals &gt; 1M casual users.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🏰</div>
              <h3 className="font-craft text-coffee-primary mb-3">Monopoly Moat</h3>
              <p className="text-coffee-earth">
                Network effects create exponential value. 
                Each new professional makes the platform more valuable for everyone.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">♠️</div>
              <h3 className="font-craft text-coffee-primary mb-3">Zero-Sum Thinking</h3>
              <p className="text-coffee-earth">
                We don&apos;t want market share. 
                We want to make competition irrelevant through network dominance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Network Metrics Dashboard */}
      <section className="py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Metric Navigation */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-craft mb-6 text-coffee-primary">Network Metrics</h2>
              <div className="space-y-3">
                {Object.entries(networkMetrics).map(([key, metric]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedMetric(key)}
                    className={`w-full text-left p-4 rounded-lg transition-all hover-coffee ${
                      selectedMetric === key 
                        ? 'bg-coffee-accent text-coffee-foam shadow-coffee' 
                        : 'bg-white border border-coffee text-coffee-secondary hover:shadow-soft'
                    }`}
                  >
                    <div className="font-craft font-medium mb-1">{metric.title}</div>
                    <div className="text-sm opacity-75">{metric.description}</div>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Metric Details */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg p-8 shadow-medium border border-coffee">
                <div className="mb-8">
                  <h3 className="text-3xl font-light mb-3 text-coffee-primary">{currentMetric.title}</h3>
                  <p className="text-lg text-coffee-secondary">{currentMetric.description}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {currentMetric.stats.map((stat, index) => (
                    <div key={index} className="bg-gradient-earth p-6 rounded-lg border border-coffee">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-craft text-coffee-primary">{stat.label}</h4>
                        <span className="text-xs bg-coffee-accent text-coffee-foam px-2 py-1 rounded">
                          {stat.change}
                        </span>
                      </div>
                      <div className="text-3xl font-light text-coffee-accent mb-2">{stat.value}</div>
                      <p className="text-sm text-coffee-earth">{stat.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Zuckerberg's Social Graph Insights */}
      <section className="py-16 px-8 bg-gradient-earth">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-light mb-8 text-coffee-primary">Zuckerberg&apos;s Social Graph Philosophy</h2>
          
          <div className="bg-white p-8 rounded-lg shadow-medium border border-coffee max-w-4xl mx-auto mb-8">
            <blockquote className="text-xl font-light italic text-coffee-primary mb-4">
              &ldquo;The goal was never to build a social network. The goal was to build a social graph—
              the connections between people that create exponential value. In coffee, every professional&apos;s 
              success amplifies the network&apos;s intelligence.&rdquo;
            </blockquote>
            <div className="text-coffee-secondary">— Applied to First Launch Network Architecture</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-medium border border-coffee">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="font-craft text-coffee-primary mb-3">Mobile-First Addiction</h3>
              <p className="text-coffee-earth">
                Coffee professionals check insights 23x/day. 
                FOMO drives compulsive engagement with trend intelligence.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-medium border border-coffee">
              <div className="text-4xl mb-4">🔄</div>
              <h3 className="font-craft text-coffee-primary mb-3">Viral Growth Loops</h3>
              <p className="text-coffee-earth">
                Every successful trend implementation creates social proof. 
                Success stories drive viral user acquisition.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-medium border border-coffee">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="font-craft text-coffee-primary mb-3">Engagement Optimization</h3>
              <p className="text-coffee-earth">
                AI personalizes content feed to maximize time-on-platform. 
                Every scroll increases network intelligence value.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Competitive Moat Visualization */}
      <section className="py-16 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light mb-4 text-coffee-primary">Unbreachable Competitive Moats</h2>
            <p className="text-xl text-coffee-secondary font-light">
              Why competitors can&apos;t replicate our network effects advantage
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                title: "Data Network Effects", 
                value: "47K+ professionals", 
                moat: "More users = better predictions = more users",
                strength: "96%" 
              },
              { 
                title: "Social Network Effects", 
                value: "156K connections", 
                moat: "Your peers are here, so you must be here",
                strength: "89%" 
              },
              { 
                title: "Learning Network Effects", 
                value: "2.3M interactions", 
                moat: "Platform gets smarter with every user action",
                strength: "94%" 
              },
              { 
                title: "Economic Network Effects", 
                value: "$89M value created", 
                moat: "Success stories create FOMO and viral growth",
                strength: "91%" 
              }
            ].map((moat, index) => (
              <div key={index} className="bg-gradient-earth p-6 rounded-lg border border-coffee text-center">
                <h3 className="font-craft text-coffee-primary mb-3">{moat.title}</h3>
                <div className="text-2xl font-light text-coffee-accent mb-2">{moat.value}</div>
                <p className="text-sm text-coffee-earth mb-4">{moat.moat}</p>
                <div className="w-full bg-coffee-cream rounded-full h-2 mb-2">
                  <div 
                    className="bg-coffee-accent h-2 rounded-full" 
                    style={{width: moat.strength}}
                  ></div>
                </div>
                <div className="text-xs text-coffee-earth">{moat.strength} Moat Strength</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}