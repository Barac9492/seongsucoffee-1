'use client'

import { useState } from 'react'
import Navigation from '../../components/Navigation'

export default function UniversityPage() {
  const [selectedTrack, setSelectedTrack] = useState('barista')

  const tracks = {
    barista: {
      title: "Master Barista Certification",
      duration: "12 weeks",
      students: 2847,
      rating: 4.9,
      modules: [
        "Korean Coffee Culture & History",
        "Advanced Foam Art Techniques", 
        "Flavor Profile Development",
        "Customer Experience Mastery",
        "Trend Identification & Adaptation",
        "Business Operations for Baristas"
      ],
      instructor: "Lee Min-jun, Anthracite Coffee Seoul",
      price: "Free with Professional Plan"
    },
    owner: {
      title: "Coffee Business Strategy",
      duration: "8 weeks", 
      students: 1256,
      rating: 4.8,
      modules: [
        "Market Analysis & Positioning",
        "Financial Planning & Pricing",
        "Supply Chain Management",
        "Staff Training & Culture",
        "Digital Marketing for Coffee",
        "Scaling Your Coffee Business"
      ],
      instructor: "David Thompson, Former Starbucks VP",
      price: "Free with Enterprise Plan"
    },
    roaster: {
      title: "Artisan Roasting Mastery",
      duration: "16 weeks",
      students: 892,
      rating: 4.9,
      modules: [
        "Green Bean Selection & Sourcing",
        "Roasting Science & Chemistry", 
        "Profile Development",
        "Quality Control & Cupping",
        "Packaging & Storage",
        "Building Your Roasting Brand"
      ],
      instructor: "Isabella Rossi, Milan Master Roaster",
      price: "Free with Professional Plan"
    }
  }

  const currentTrack = tracks[selectedTrack as keyof typeof tracks]

  const achievements = [
    { name: "First Launch Graduate", icon: "🏆", earned: 1247, description: "Launched first Korean trend successfully" },
    { name: "Community Mentor", icon: "🎓", earned: 89, description: "Helped 10+ coffee professionals" },
    { name: "Innovation Pioneer", icon: "💡", earned: 34, description: "Created original trend adaptation" },
    { name: "Revenue Master", icon: "💰", earned: 156, description: "Generated $50K+ from trends" },
    { name: "Global Connector", icon: "🌍", earned: 67, description: "Connected with professionals from 5+ countries" }
  ]

  return (
    <div className="min-h-screen bg-page-primary">
      <Navigation currentPage="home" />
      
      {/* Hero */}
      <section className="section-padding bg-page-secondary coffee-texture">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-light leading-tight tracking-tight mb-6">
            Coffee Trends Weekly<br/>
            <span className="text-accent">University</span>
          </h1>
          <p className="body-large max-w-3xl mx-auto mb-8">
            Master the art and business of coffee with world-class education from Seoul to Seattle
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12">
            <div className="text-center">
              <div className="text-3xl font-ritual text-accent mb-2">4,995</div>
              <div className="body-small">Active Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-light mb-2">127</div>
              <div className="text-sm text-gray-600">Expert Instructors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-light mb-2">89%</div>
              <div className="text-sm text-gray-600">Career Advancement</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-light mb-2">$2.8M</div>
              <div className="text-sm text-gray-600">Student Revenue Generated</div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Tracks */}
      <section className="py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light mb-4">Choose Your Learning Path</h2>
            <p className="text-xl text-gray-600 font-light">
              Structured programs designed by industry legends
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Track Selection */}
            <div className="lg:col-span-1">
              <div className="space-y-4">
                {Object.entries(tracks).map(([key, track]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedTrack(key)}
                    className={`w-full text-left p-4 rounded-lg transition-colors ${
                      selectedTrack === key 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="font-medium mb-1">{track.title}</div>
                    <div className="text-sm opacity-75">{track.duration} • {track.students} students</div>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Track Details */}
            <div className="lg:col-span-3">
              <div className="border border-gray-200 rounded-lg p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-light mb-2">{currentTrack.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <span>⏱️ {currentTrack.duration}</span>
                      <span>👥 {currentTrack.students} students</span>
                      <span>⭐ {currentTrack.rating}</span>
                    </div>
                    <p className="text-gray-600 mb-4">Instructor: {currentTrack.instructor}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-light mb-1">{currentTrack.price}</div>
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Enroll Now
                    </button>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-4">Course Modules</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentTrack.modules.map((module, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                        <span className="text-blue-600 font-medium">{index + 1}</span>
                        <span className="text-sm">{module}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements & Certifications */}
      <section className="py-16 px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light mb-4">Achievements & Recognition</h2>
            <p className="text-xl text-gray-600 font-light">
              Build your professional reputation in the global coffee community
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {achievements.map((achievement, index) => (
              <div key={index} className="bg-white p-6 rounded-lg text-center hover:shadow-md transition-shadow">
                <div className="text-4xl mb-3">{achievement.icon}</div>
                <h3 className="font-medium mb-2">{achievement.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
                <div className="text-xs text-gray-500">
                  {achievement.earned.toLocaleString()} earned
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <div className="bg-white p-8 rounded-lg inline-block">
              <h3 className="text-xl font-medium mb-4">Ready to Start Learning?</h3>
              <p className="text-gray-600 mb-6">
                Join 4,995 coffee professionals advancing their careers through education
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="/pricing" className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  View Plans & Pricing
                </a>
                <a href="/community" className="px-8 py-3 border border-gray-300 text-gray-900 rounded-lg hover:border-gray-900 transition-colors">
                  Explore Community
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}