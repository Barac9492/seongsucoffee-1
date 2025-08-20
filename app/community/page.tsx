'use client'

import { useState } from 'react'
import Navigation from '../../components/Navigation'

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState('discussions')

  const discussions = [
    {
      title: "Korean Brown Butter Latte: My 3-month journey from $0 to $15K",
      author: "Maria Santos",
      location: "Austin, TX",
      replies: 47,
      likes: 156,
      time: "2 hours ago",
      tag: "Success Story",
      featured: true
    },
    {
      title: "Sourcing authentic Korean ingredients: My supplier network",
      author: "James Chen", 
      location: "Portland, OR",
      replies: 23,
      likes: 89,
      time: "4 hours ago",
      tag: "Suppliers"
    },
    {
      title: "Training staff on foam art: Lessons from Seoul cafes",
      author: "Sarah Kim",
      location: "Los Angeles, CA", 
      replies: 31,
      likes: 124,
      time: "1 day ago",
      tag: "Training"
    },
    {
      title: "Ube vs Taro: Which purple drink trend wins in your market?",
      author: "Alex Rodriguez",
      location: "Miami, FL",
      replies: 67,
      likes: 203,
      time: "2 days ago",
      tag: "Market Research"
    }
  ]

  const mentors = [
    {
      name: "Lee Min-jun",
      title: "Head Barista, Anthracite Coffee",
      location: "Seoul, South Korea",
      expertise: "Korean Coffee Innovation",
      students: 1247,
      rating: 4.9,
      bio: "Pioneer of Korean specialty coffee movement. 15 years creating trends that go global."
    },
    {
      name: "Isabella Rossi", 
      title: "Master Roaster",
      location: "Milan, Italy",
      expertise: "Espresso Innovation",
      students: 892,
      rating: 4.8,
      bio: "Third-generation coffee family. Bridging Italian tradition with modern techniques."
    },
    {
      name: "David Thompson",
      title: "Coffee Chain Strategy",
      location: "Seattle, WA",
      expertise: "Scale & Operations",
      students: 634,
      rating: 4.9,
      bio: "Former Starbucks VP. Scaled 50+ coffee concepts from startup to 100+ locations."
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPage="home" />
      
      {/* Hero */}
      <section className="pt-32 pb-16 px-8 bg-gradient-to-r from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-light leading-tight tracking-tight mb-6">
            The global coffee<br/>
            <span className="text-amber-600">professional community</span>
          </h1>
          <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto mb-8">
            Connect with 15,000+ coffee professionals worldwide. Share trends, learn techniques, grow together.
          </p>
          
          <div className="flex items-center justify-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>2,847 online now</span>
            </div>
            <div>•</div>
            <div>47 countries represented</div>
            <div>•</div>
            <div>156 new discussions this week</div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="border-b border-gray-200 sticky top-16 bg-white z-30">
        <div className="max-w-7xl mx-auto px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'discussions', label: 'Discussions', count: 1247 },
              { id: 'mentorship', label: 'Mentorship', count: 89 },
              { id: 'masterclasses', label: 'Masterclasses', count: 34 },
              { id: 'showcase', label: 'Showcase', count: 567 }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-amber-600 text-amber-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </nav>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-8">
        <div className="max-w-7xl mx-auto">
          
          {activeTab === 'discussions' && (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              
              {/* Main Discussions */}
              <div className="lg:col-span-3">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-light">Community Discussions</h2>
                  <button className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors">
                    Start Discussion
                  </button>
                </div>
                
                <div className="space-y-4">
                  {discussions.map((discussion, index) => (
                    <div key={index} className={`p-6 border rounded-lg hover:shadow-md transition-shadow cursor-pointer ${
                      discussion.featured ? 'border-amber-200 bg-amber-50' : 'border-gray-200'
                    }`}>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-lg font-medium mb-2 hover:text-amber-600 transition-colors">
                            {discussion.title}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="font-medium">{discussion.author}</span>
                            <span>•</span>
                            <span>{discussion.location}</span>
                            <span>•</span>
                            <span>{discussion.time}</span>
                          </div>
                        </div>
                        <span className={`px-3 py-1 text-xs rounded-full ${
                          discussion.featured 
                            ? 'bg-amber-100 text-amber-800' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {discussion.tag}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-6 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <span>💬</span>
                          <span>{discussion.replies} replies</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>❤️</span>
                          <span>{discussion.likes} likes</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h3 className="font-medium mb-4">Trending Topics</h3>
                  <div className="space-y-2">
                    {['#KoreanCoffee', '#UbeTrend', '#FoamArt', '#ColdBrew', '#PlantMilk'].map((tag) => (
                      <span key={tag} className="inline-block bg-white px-3 py-1 text-sm rounded-full mr-2 mb-2 hover:bg-amber-50 cursor-pointer">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-medium mb-4">Community Stats</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>Total Members</span>
                      <span className="font-medium">15,247</span>
                    </div>
                    <div className="flex justify-between">
                      <span>This Week</span>
                      <span className="font-medium text-green-600">+342</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Success Stories</span>
                      <span className="font-medium">1,089</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Revenue Generated</span>
                      <span className="font-medium">$4.2M</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'mentorship' && (
            <div>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-light mb-4">Learn from Coffee Masters</h2>
                <p className="text-xl text-gray-600 font-light">
                  One-on-one mentorship with industry legends from Seoul to Seattle
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {mentors.map((mentor, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <div className="text-center mb-4">
                      <div className="w-20 h-20 bg-amber-100 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl">
                        ☕
                      </div>
                      <h3 className="text-xl font-medium mb-1">{mentor.name}</h3>
                      <p className="text-gray-600 text-sm mb-1">{mentor.title}</p>
                      <p className="text-gray-500 text-sm">{mentor.location}</p>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span>Expertise</span>
                        <span className="font-medium">{mentor.expertise}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span>Students</span>
                        <span className="font-medium">{mentor.students.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span>Rating</span>
                        <span className="font-medium">⭐ {mentor.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4">{mentor.bio}</p>
                    
                    <button className="w-full py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors">
                      Book Session
                    </button>
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