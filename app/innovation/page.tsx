'use client'

import { useState } from 'react'
import Navigation from '../../components/Navigation'

export default function InnovationPage() {
  const [selectedCategory, setSelectedCategory] = useState('trending')

  const innovations = {
    trending: [
      {
        title: "AI-Powered Flavor Profiling",
        creator: "TechCafe Labs, Seoul",
        description: "Machine learning algorithm that predicts customer taste preferences and suggests personalized drink modifications",
        status: "Beta Testing",
        impact: "34% increase in customer satisfaction",
        category: "Technology",
        votes: 247
      },
      {
        title: "Sustainable Coffee Pod Alternative", 
        creator: "EcoBean Collective, Portland",
        description: "Fully biodegradable coffee pods made from compressed coffee grounds and plant-based materials",
        status: "Production Ready",
        impact: "Zero waste solution for 80% of coffee shops",
        category: "Sustainability", 
        votes: 189
      },
      {
        title: "Mobile Coffee Sommelier App",
        creator: "CoffeeMaster, Milan", 
        description: "AR app that guides customers through coffee origins, processing methods, and perfect brewing techniques in real-time",
        status: "Pilot Program",
        impact: "67% increase in premium coffee sales",
        category: "Customer Experience",
        votes: 156
      }
    ],
    research: [
      {
        title: "Cold Extraction Science Project",
        creator: "Coffee Research Institute",
        description: "Studying optimal time and temperature combinations for maximum flavor extraction in cold brewing methods",
        status: "In Progress",
        funding: "$125,000 raised",
        timeline: "6 months",
        participants: 47
      },
      {
        title: "Plant-Based Milk Foam Innovation",
        creator: "Alternative Dairy Lab",
        description: "Developing new protein structures that create stable, creamy foam from oat, almond, and pea milk",
        status: "Phase 2 Testing", 
        funding: "$89,000 raised",
        timeline: "4 months",
        participants: 23
      }
    ],
    collaboration: [
      {
        title: "Global Barista Exchange Program",
        description: "3-month cultural exchange between coffee professionals from different continents",
        participants: 156,
        locations: ["Seoul", "Portland", "Milan", "Melbourne", "São Paulo"],
        nextCohort: "March 2025"
      },
      {
        title: "Roaster-Farmer Direct Connect",
        description: "Platform connecting small roasters directly with coffee farmers, eliminating middlemen",
        partnerships: 89,
        impact: "40% increase in farmer income",
        regions: ["Colombia", "Ethiopia", "Guatemala", "Vietnam"]
      }
    ]
  }

  const currentInnovations = innovations[selectedCategory as keyof typeof innovations]

  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPage="home" />
      
      {/* Hero */}
      <section className="pt-32 pb-16 px-8 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-light leading-tight tracking-tight mb-6">
            Coffee Innovation<br/>
            <span className="text-purple-600">Lab</span>
          </h1>
          <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto mb-8">
            Where the future of coffee is imagined, tested, and brought to life by our global community
          </p>
          
          <div className="flex items-center justify-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>47 active projects</span>
            </div>
            <div>•</div>
            <div>$2.3M in community funding</div>
            <div>•</div>
            <div>156 innovations launched</div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="border-b border-gray-200 sticky top-16 bg-white z-30">
        <div className="max-w-7xl mx-auto px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'trending', label: 'Trending Innovations' },
              { id: 'research', label: 'Research Projects' },
              { id: 'collaboration', label: 'Global Collaborations' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  selectedCategory === tab.id
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-8">
        <div className="max-w-7xl mx-auto">
          
          {selectedCategory === 'trending' && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-light">Community-Voted Innovations</h2>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  Submit Innovation
                </button>
              </div>
              
              <div className="space-y-6">
                {currentInnovations.map((innovation, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-8 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-medium mb-2">{innovation.title}</h3>
                        {'creator' in innovation && <p className="text-gray-600 mb-1">by {innovation.creator}</p>}
                        <span className={`inline-block px-3 py-1 text-xs rounded-full ${'category' in innovation ? (
                          innovation.category === 'Technology' ? 'bg-blue-100 text-blue-800' :
                          innovation.category === 'Sustainability' ? 'bg-green-100 text-green-800' :
                          'bg-orange-100 text-orange-800'
                        ) : ''}`}>
                          {'category' in innovation && innovation.category}
                        </span>
                      </div>
                      <div className="text-right">
                        {'votes' in innovation && (
                          <div className="flex items-center gap-2 mb-2">
                            <button className="text-purple-600 hover:text-purple-700">
                              ▲
                            </button>
                            <span className="font-medium">{innovation.votes}</span>
                          </div>
                        )}
                        <span className={`px-3 py-1 text-xs rounded-full ${
                          'status' in innovation && innovation.status === 'Production Ready' ? 'bg-green-100 text-green-800' :
                          'status' in innovation && innovation.status === 'Beta Testing' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {'status' in innovation ? innovation.status : ''}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-4">{innovation.description}</p>
                    
                    {'impact' in innovation && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Impact</h4>
                        <p className="text-sm text-gray-600">{innovation.impact}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {selectedCategory === 'research' && (
            <div>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-light mb-4">Community-Funded Research</h2>
                <p className="text-xl text-gray-600 font-light">
                  Supporting breakthrough research that advances the entire industry
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {currentInnovations.map((project, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-8">
                    <h3 className="text-xl font-medium mb-3">{project.title}</h3>
                    {'creator' in project && <p className="text-gray-600 mb-1">Led by {project.creator}</p>}
                    
                    <p className="text-gray-700 mb-6">{project.description}</p>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Funding Progress</span>
                        <span className="font-medium">{'funding' in project ? project.funding : 'N/A'}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full" style={{width: '73%'}}></div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Timeline: </span>
                          <span className="font-medium">{'timeline' in project ? project.timeline : 'N/A'}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Participants: </span>
                          <span className="font-medium">{'participants' in project ? project.participants : 'N/A'}</span>
                        </div>
                      </div>
                    </div>
                    
                    <button className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                      Support Research
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {selectedCategory === 'collaboration' && (
            <div>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-light mb-4">Global Coffee Collaborations</h2>
                <p className="text-xl text-gray-600 font-light">
                  Breaking down borders to unite the worldwide coffee community
                </p>
              </div>
              
              <div className="space-y-8">
                {currentInnovations.map((collaboration, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-8">
                    <h3 className="text-2xl font-medium mb-4">{collaboration.title}</h3>
                    <p className="text-gray-700 text-lg mb-6">{collaboration.description}</p>
                    
                    {('locations' in collaboration) && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="font-medium mb-3">Partner Cities</h4>
                          <div className="flex flex-wrap gap-2">
                            {collaboration.locations?.map((location, i) => (
                              <span key={i} className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
                                {location}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>Participants</span>
                              <span className="font-medium">{collaboration.participants}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Next Cohort</span>
                              <span className="font-medium">{collaboration.nextCohort}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {('partnerships' in collaboration) && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="font-medium mb-3">Active Regions</h4>
                          <div className="flex flex-wrap gap-2">
                            {collaboration.regions?.map((region, i) => (
                              <span key={i} className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                                {region}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>Partnerships</span>
                              <span className="font-medium">{collaboration.partnerships}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Impact</span>
                              <span className="font-medium text-green-600">{collaboration.impact}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}