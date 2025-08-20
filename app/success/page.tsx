'use client'

import { useState } from 'react'
import Navigation from '../../components/Navigation'

export default function CustomerSuccessPage() {
  const [selectedStory, setSelectedStory] = useState(0)
  
  const successStories = [
    {
      name: "Maria's Coffee Corner",
      location: "Austin, TX",
      timeline: "Month 1",
      revenue: "$23,400",
      drinks: ["Brown Butter Latte", "Ube Cloud Coffee"],
      quote: "We launched two Korean trends 3 months before Starbucks. Our profit margins went from 32% to 78%.",
      metrics: {
        revenueIncrease: "+$23K",
        marginImprovement: "+46%",
        customerCount: "+380"
      }
    },
    {
      name: "Roasters United",
      location: "Portland, OR", 
      timeline: "Month 2",
      revenue: "$67,200",
      drinks: ["Cream Cheese Foam Coffee", "Honey Milk Tea Coffee", "Dalgona Cloud Macchiato"],
      quote: "First Launch gave us the competitive edge we needed. Three locations now serving trends our competitors won't have for months.",
      metrics: {
        revenueIncrease: "+$67K",
        marginImprovement: "+52%", 
        customerCount: "+1,240"
      }
    },
    {
      name: "Bean & Beyond Chain",
      location: "Los Angeles, CA",
      timeline: "Month 1",
      revenue: "$124,800",
      drinks: ["Korean Strawberry Latte", "Black Sesame Foam Coffee"],
      quote: "ROI was immediate. We recovered our subscription cost in the first week and haven't looked back.",
      metrics: {
        revenueIncrease: "+$125K",
        marginImprovement: "+41%",
        customerCount: "+2,100"
      }
    }
  ]

  const currentStory = successStories[selectedStory]

  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPage="home" />
      
      {/* Hero */}
      <section className="pt-32 pb-16 px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-light leading-tight tracking-tight mb-6">
            Customer success<br/>
            <span className="text-gray-400">drives our decisions</span>
          </h1>
          <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto">
            240+ coffee businesses launching profitable trends before their competition
          </p>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Story Selection */}
          <div className="flex flex-col lg:flex-row gap-8 mb-16">
            <div className="lg:w-1/3">
              <h2 className="text-2xl font-light mb-6">Featured Stories</h2>
              <div className="space-y-4">
                {successStories.map((story, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedStory(index)}
                    className={`w-full text-left p-4 rounded-lg transition-colors ${
                      selectedStory === index ? 'bg-black text-white' : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="font-medium">{story.name}</div>
                    <div className="text-sm opacity-75">{story.location}</div>
                    <div className="text-sm opacity-75">{story.revenue} in {story.timeline}</div>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Story Detail */}
            <div className="lg:w-2/3">
              <div className="bg-gray-50 p-8 rounded-lg">
                <div className="mb-6">
                  <h3 className="text-3xl font-light mb-2">{currentStory.name}</h3>
                  <p className="text-gray-600">{currentStory.location} • {currentStory.timeline}</p>
                </div>
                
                <blockquote className="text-xl font-light italic mb-8 leading-relaxed">
                  &ldquo;{currentStory.quote}&rdquo;
                </blockquote>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-2xl font-light text-green-600">{currentStory.metrics.revenueIncrease}</div>
                    <div className="text-sm text-gray-600">Revenue Increase</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-light text-green-600">{currentStory.metrics.marginImprovement}</div>
                    <div className="text-sm text-gray-600">Margin Improvement</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-light text-green-600">{currentStory.metrics.customerCount}</div>
                    <div className="text-sm text-gray-600">New Customers</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Drinks Launched:</h4>
                  <div className="flex flex-wrap gap-2">
                    {currentStory.drinks.map((drink, index) => (
                      <span key={index} className="px-3 py-1 bg-white text-sm rounded-full">
                        {drink}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Overall Impact */}
          <div className="bg-black text-white p-12 rounded-lg text-center">
            <h2 className="text-3xl font-light mb-8">Collective Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="text-4xl font-light mb-2">$2.1M</div>
                <div className="text-gray-400">Total Revenue Generated</div>
              </div>
              <div>
                <div className="text-4xl font-light mb-2">240+</div>
                <div className="text-gray-400">Coffee Businesses</div>
              </div>
              <div>
                <div className="text-4xl font-light mb-2">89%</div>
                <div className="text-gray-400">Success Rate</div>
              </div>
              <div>
                <div className="text-4xl font-light mb-2">4.2 mo</div>
                <div className="text-gray-400">Avg. Market Advantage</div>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* Join Section */}
      <section className="py-16 px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-light mb-6">Start your success story</h2>
          <p className="text-xl text-gray-600 font-light mb-8">
            Join 240+ coffee businesses launching profitable trends before their competition
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="/pricing" 
              className="inline-block bg-black text-white px-8 py-3 rounded-full hover:scale-105 transition-transform"
            >
              View pricing plans
            </a>
            <a 
              href="/coffee-trends" 
              className="inline-block border border-gray-300 text-gray-900 px-8 py-3 rounded-full hover:border-gray-900 transition-colors"
            >
              See current trends
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}