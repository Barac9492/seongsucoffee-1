'use client'

import { useEffect, useState } from 'react'
import Navigation from '../components/Navigation'

export default function SimpleLanding() {
  const [mounted, setMounted] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [signupData, setSignupData] = useState({
    name: '',
    shopName: '',
    email: '',
    shopSize: '',
    willingness: ''
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      console.log('Submitting signup...', signupData)
      
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...signupData,
          source: 'homepage',
          page: 'landing'
        })
      })
      
      console.log('Response status:', response.status)
      const result = await response.json()
      console.log('Response data:', result)
      
      if (response.ok && result.success) {
        setSubmitted(true)
        // Track conversion
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'sign_up', {
            'method': 'Newsletter',
            'value': 1
          })
        }
      } else {
        console.error('Signup failed:', result)
        alert('Signup failed: ' + (result.message || 'Unknown error'))
      }
    } catch (error) {
      console.error('Signup error:', error)
      alert('Network error: ' + (error instanceof Error ? error.message : 'Unknown error'))
    }
  }

  return (
    <div className="min-h-screen bg-coffee-warm coffee-texture">
      <Navigation currentPage="home" />

      {/* Hero - Strategic Focus */}
      <section className="pt-40 pb-32 px-8">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center space-y-16 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}>
            
            {/* Problem Statement */}
            <div className="max-w-5xl mx-auto">
              <h1 className="text-7xl md:text-8xl font-ritual leading-[0.85] tracking-tight mb-8 text-coffee-primary">
                Get Korean coffee trends<br/>
                <span className="text-coffee-accent">before your competition</span><br/>
                <span className="text-coffee-earth">every Tuesday</span>
              </h1>
              
              <p className="text-2xl text-coffee-secondary font-light max-w-3xl mx-auto mb-8">
                Weekly insider newsletter with profitable Korean trends.<br/>
                <span className="text-coffee-accent font-medium">Free. 231 coffee shops already subscribed.</span>
              </p>
              
              {/* Newsletter Signup */}
              <div className="bg-white p-8 rounded-xl shadow-coffee border border-coffee mb-12 max-w-2xl mx-auto">
                {submitted ? (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-4">🎉</div>
                    <h3 className="text-2xl font-craft text-coffee-primary mb-2">You&apos;re In!</h3>
                    <p className="text-coffee-earth">
                      Check your email for this week&apos;s Korean coffee trends.<br/>
                      Next issue: Tuesday 9 AM PST
                    </p>
                  </div>
                ) : (
                  <>
                <h3 className="text-2xl font-craft text-coffee-primary mb-4">Get This Week&apos;s Trends</h3>
                <p className="text-coffee-earth mb-6">4 verified Korean trends making $8K-12K monthly. Next issue Tuesday.</p>
                
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Your name"
                      value={signupData.name}
                      onChange={(e) => setSignupData({...signupData, name: e.target.value})}
                      className="w-full p-3 border border-coffee-neutral-200 rounded-lg focus:border-coffee-accent"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Coffee shop name"
                      value={signupData.shopName}
                      onChange={(e) => setSignupData({...signupData, shopName: e.target.value})}
                      className="w-full p-3 border border-coffee-neutral-200 rounded-lg focus:border-coffee-accent"
                      required
                    />
                  </div>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={signupData.email}
                    onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                    className="w-full p-3 border border-coffee-neutral-200 rounded-lg focus:border-coffee-accent"
                    required
                  />
                  
                  {/* Hidden monetization tracking fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select
                      value={signupData.shopSize}
                      onChange={(e) => setSignupData({...signupData, shopSize: e.target.value})}
                      className="w-full p-3 border border-coffee-neutral-200 rounded-lg focus:border-coffee-accent text-coffee-earth"
                    >
                      <option value="">Daily customers (optional)</option>
                      <option value="<50">Less than 50</option>
                      <option value="50-100">50-100</option>
                      <option value="100-200">100-200</option>
                      <option value="200+">200+</option>
                    </select>
                    <select
                      value={signupData.willingness}
                      onChange={(e) => setSignupData({...signupData, willingness: e.target.value})}
                      className="w-full p-3 border border-coffee-neutral-200 rounded-lg focus:border-coffee-accent text-coffee-earth"
                    >
                      <option value="">Would pay for trends? (optional)</option>
                      <option value="0">No, free only</option>
                      <option value="<20">Under $20/month</option>
                      <option value="20-50">$20-50/month</option>
                      <option value="50+">$50+/month</option>
                    </select>
                  </div>
                  
                  <button type="submit" className="w-full btn-primary text-white py-3 rounded-lg text-lg font-craft font-medium">
                    🚀 Get Korean Trends (Free)
                  </button>
                </form>
                
                <div className="text-center mt-4">
                  <div className="text-xs text-coffee-earth">✓ Free weekly newsletter ✓ Unsubscribe anytime ✓ No spam</div>
                  <a href="/pricing" className="text-xs text-coffee-accent hover:underline mt-2 inline-block">
                    Pro version coming soon →
                  </a>
                </div>
                </>
                )}
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a 
                  href="/coffee-trends" 
                  className="inline-block border border-coffee text-coffee-primary px-8 py-3 rounded-full hover:shadow-soft transition-all font-craft"
                >
                  Preview This Week&apos;s Trends
                </a>
              </div>
            </div>

            {/* Social Proof */}
            <div className="pt-16">
              <div className="text-center">
                <p className="text-lg text-coffee-secondary mb-4">Trusted by coffee shop owners in:</p>
                <div className="flex flex-wrap justify-center gap-4 text-coffee-earth">
                  <span>Seattle</span> • <span>Portland</span> • <span>San Francisco</span> • <span>Los Angeles</span> • <span>Chicago</span> • <span>New York</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-32 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-light tracking-tight mb-6 text-coffee-primary">How Coffee Trends Weekly works</h2>
            <p className="text-xl text-coffee-secondary font-light">Get profitable Korean trends before your competition</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { 
                step: '01',
                title: 'Subscribe (Free)', 
                description: 'Get weekly newsletter every Tuesday with 2-3 verified Korean coffee trends' 
              },
              { 
                step: '02',
                title: 'Pick Your Favorite', 
                description: 'Each trend includes recipe, supplier info, and profit projections' 
              },
              { 
                step: '03',
                title: 'Launch & Profit', 
                description: 'Beat competitors to market with 2-6 month head start' 
              }
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="text-sm text-coffee-earth font-mono mb-4">{item.step}</div>
                <h3 className="text-2xl font-light mb-4 text-coffee-primary">{item.title}</h3>
                <p className="text-coffee-earth leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Preview */}
      <section className="py-32 px-8 gradient-earth">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-light tracking-tight mb-8 text-coffee-primary">This Tuesday&apos;s Newsletter Preview</h2>
          
          <div className="bg-white p-8 rounded-lg shadow-large text-left mb-8">
            <div className="border-b border-gray-200 pb-4 mb-6">
              <h3 className="text-xl font-craft text-coffee-primary">Coffee Trends Weekly #47</h3>
              <p className="text-sm text-coffee-earth">4 Korean trends making $8K-12K monthly</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-coffee-accent rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-coffee-primary">Black Pepper Latte</h4>
                  <p className="text-sm text-coffee-earth">87% success rate • 82% margin • Seoul&apos;s signature spiced coffee trend</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-coffee-accent rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-coffee-primary">Dutch Einspanner</h4>
                  <p className="text-sm text-coffee-earth">94% success rate • 85% margin • Featured in every Seoul cafe</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-coffee-accent rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-coffee-primary">Jeju Hallabong Latte</h4>
                  <p className="text-sm text-coffee-earth">91% success rate • 73% margin • Premium citrus positioning</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-coffee-accent rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-coffee-primary">Honey Butter Coffee</h4>
                  <p className="text-sm text-coffee-earth">89% success rate • 77% margin • Korean comfort drink appeal</p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4 mt-6">
              <p className="text-xs text-coffee-earth">Each trend includes: Complete recipe, supplier contacts, pricing strategy, training tips</p>
            </div>
          </div>
          
          <p className="text-coffee-earth">Next issue: Tuesday 9 AM PST • Always free • Unsubscribe anytime</p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-8 bg-coffee-primary text-coffee-foam">
        <div className="max-w-7xl mx-auto text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-5xl md:text-6xl font-ritual leading-tight">
              Get Tuesday&apos;s trends<br/>in your inbox
            </h2>
            <p className="text-xl text-coffee-cream font-light">
              Free weekly newsletter. Korean coffee trends before your competition.
            </p>
            
            {/* Newsletter Signup - Simplified */}
            <div className="bg-white p-6 rounded-xl max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full p-3 mb-4 border border-coffee-neutral-200 rounded-lg focus:border-coffee-accent text-coffee-primary"
              />
              <button className="w-full bg-coffee-accent text-white py-3 rounded-lg text-lg font-craft font-medium hover:scale-105 transition-transform">
                Subscribe Free
              </button>
              <p className="text-xs text-coffee-earth mt-2">231 coffee shops subscribed • Unsubscribe anytime</p>
            </div>
            
            <p className="text-sm text-coffee-cream">Next issue: This Tuesday 9 AM PST</p>
          </div>
        </div>
      </section>

      {/* Footer - Minimal */}
      <footer className="py-16 px-8 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <div className="text-xs text-gray-400">© 2024 First Launch</div>
            <div className="flex gap-8">
              <a href="/admin" className="text-xs text-gray-400 hover:text-gray-600">Admin</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}