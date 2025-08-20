'use client'

import { useState } from 'react'
import Navigation from '../../components/Navigation'

export default function AILabPage() {
  const [selectedFeature, setSelectedFeature] = useState('taste-profiler')

  const aiFeatures = {
    'taste-profiler': {
      title: "AI Taste Profiler",
      subtitle: "Personalized drink recommendations",
      description: "Our AI analyzes customer preferences, local demographics, and seasonal patterns to suggest which Korean trends will resonate most with your specific customer base.",
      benefits: [
        "87% accuracy in predicting customer adoption",
        "Reduces failed menu launches by 64%",
        "Increases customer satisfaction by 31%"
      ],
      howItWorks: [
        "Analyzes your sales data and customer feedback",
        "Considers local taste preferences and demographics", 
        "Matches trends to your customer profile",
        "Provides confidence scores for each recommendation"
      ],
      status: "Available to Professional+ plans"
    },
    'demand-forecaster': {
      title: "Demand Forecaster",
      subtitle: "Smart inventory and staffing", 
      description: "Predict exactly how much of each ingredient you'll need and optimal staffing levels for new trend launches based on similar successful launches.",
      benefits: [
        "Reduces ingredient waste by 42%",
        "Optimizes labor costs by 28%", 
        "Prevents stockouts during trend peaks"
      ],
      howItWorks: [
        "Analyzes historical launch data from similar markets",
        "Factors in seasonality and local events",
        "Calculates ingredient requirements with confidence intervals",
        "Suggests optimal launch timing and staff scheduling"
      ],
      status: "Beta testing with select customers"
    },
    'trend-detector': {
      title: "Early Trend Detector",
      subtitle: "Spot trends before they explode",
      description: "AI monitors social media, cafe reviews, and industry signals across Korea to identify emerging trends 8-12 weeks before they hit mainstream adoption.",
      benefits: [
        "3+ month head start over manual detection",
        "95% accuracy in trend validation",
        "Identifies micro-trends that become major movements"
      ],
      howItWorks: [
        "Scans 50+ Korean cafe Instagram accounts daily",
        "Analyzes review sentiment and keyword patterns",
        "Cross-references with supplier data and cafe menus",
        "Validates trends with Korean coffee professional network"
      ],
      status: "Enterprise plan exclusive"
    },
    'pricing-optimizer': {
      title: "Dynamic Pricing Optimizer", 
      subtitle: "Maximize profitability",
      description: "AI-powered pricing recommendations that balance customer acceptance with profit margins, adjusting for local market conditions and competition.",
      benefits: [
        "Increases profit margins by average 18%",
        "Maintains customer satisfaction above 4.2/5",
        "Adapts pricing to local purchasing power"
      ],
      howItWorks: [
        "Analyzes local market pricing and competition",
        "Considers customer price sensitivity by demographic",
        "Factors in ingredient costs and seasonal availability",
        "Provides tiered pricing strategies with expected outcomes"
      ],
      status: "Professional+ plans"
    }
  }

  const currentFeature = aiFeatures[selectedFeature as keyof typeof aiFeatures]

  return (
    <div className="min-h-screen bg-coffee-warm">
      <Navigation currentPage="home" />
      
      {/* Hero */}
      <section className="pt-32 pb-16 px-8 coffee-texture">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-light leading-tight tracking-tight mb-6 text-coffee-primary">
            AI Coffee<br/>
            <span className="text-coffee-accent">Intelligence Lab</span>
          </h1>
          <p className="text-xl text-coffee-secondary font-light max-w-3xl mx-auto mb-8">
            Where artificial intelligence meets artisanal coffee craft.<br/>
            Amplifying human intuition with superhuman pattern recognition.
          </p>
          
          <div className="flex items-center justify-center gap-8 text-sm text-coffee-earth">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-coffee-accent rounded-full"></div>
              <span>4 AI systems active</span>
            </div>
            <div>•</div>
            <div>2.3M+ data points analyzed daily</div>
            <div>•</div>
            <div>87% prediction accuracy</div>
          </div>
        </div>
      </section>

      {/* Feature Selection */}
      <section className="py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Feature Navigation */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-craft mb-6 text-coffee-primary">AI Features</h2>
              <div className="space-y-3">
                {Object.entries(aiFeatures).map(([key, feature]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedFeature(key)}
                    className={`w-full text-left p-4 rounded-lg transition-all hover-coffee ${
                      selectedFeature === key 
                        ? 'bg-coffee-accent text-coffee-foam shadow-coffee' 
                        : 'bg-white border border-coffee text-coffee-secondary hover:shadow-soft'
                    }`}
                  >
                    <div className="font-craft font-medium mb-1">{feature.title}</div>
                    <div className="text-sm opacity-75">{feature.subtitle}</div>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Feature Detail */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg p-8 shadow-medium border border-coffee">
                <div className="mb-8">
                  <h3 className="text-3xl font-light mb-3 text-coffee-primary">{currentFeature.title}</h3>
                  <p className="text-lg text-coffee-secondary mb-4">{currentFeature.subtitle}</p>
                  <p className="text-coffee-earth leading-relaxed">{currentFeature.description}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  {/* Benefits */}
                  <div>
                    <h4 className="font-craft text-coffee-primary mb-4">Proven Benefits</h4>
                    <div className="space-y-3">
                      {currentFeature.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-coffee-accent rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-coffee-earth">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* How It Works */}
                  <div>
                    <h4 className="font-craft text-coffee-primary mb-4">How It Works</h4>
                    <div className="space-y-3">
                      {currentFeature.howItWorks.map((step, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <span className="text-coffee-accent font-craft font-medium flex-shrink-0">{index + 1}.</span>
                          <span className="text-coffee-earth">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gradient-earth rounded-lg">
                  <div>
                    <span className="text-coffee-secondary font-craft">Availability: </span>
                    <span className="text-coffee-primary font-medium">{currentFeature.status}</span>
                  </div>
                  <button className="px-6 py-3 bg-coffee-accent text-coffee-foam rounded-lg hover:scale-105 transition-transform font-craft">
                    Try This Feature
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Philosophy */}
      <section className="py-16 px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-light mb-8 text-coffee-primary">Our AI Philosophy</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="p-6">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="font-craft text-coffee-primary mb-3">Amplify, Don&apos;t Replace</h3>
              <p className="text-coffee-earth">AI enhances human expertise and intuition, never replaces the artisanal craft of coffee.</p>
            </div>
            <div className="p-6">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="font-craft text-coffee-primary mb-3">Privacy First</h3>
              <p className="text-coffee-earth">Your business data stays private. AI insights are generated without compromising customer privacy.</p>
            </div>
            <div className="p-6">
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="font-craft text-coffee-primary mb-3">Continuously Learning</h3>
              <p className="text-coffee-earth">Our AI gets smarter with every coffee professional who joins the platform.</p>
            </div>
          </div>
          
          <div className="bg-gradient-earth p-8 rounded-lg max-w-4xl mx-auto">
            <blockquote className="text-xl font-light italic text-coffee-primary mb-4">
              &ldquo;AI should feel like having a master coffee consultant who&apos;s analyzed every successful cafe launch in history, 
              but still respects that every cup of coffee is a personal, human experience.&rdquo;
            </blockquote>
            <div className="text-coffee-secondary">— First Launch AI Team</div>
          </div>
        </div>
      </section>
    </div>
  )
}