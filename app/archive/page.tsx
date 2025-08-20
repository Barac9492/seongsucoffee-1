'use client'

import Navigation from '../../components/Navigation'

export default function ArchivePage() {
  const pastIssues = [
    {
      issue: '#47',
      date: 'Dec 17, 2024',
      title: '4 Korean Coffee Trends Making $8K-12K Monthly',
      trends: ['Dalgona Whipped Coffee', 'Cream Cheese Foam Coffee', 'Jeju Hallabong Latte', 'Honey Butter Coffee'],
      subscribers: 231
    },
    {
      issue: '#46', 
      date: 'Dec 10, 2024',
      title: 'Korean Winter Coffee Specials Drive 40% Revenue Boost',
      trends: ['Hot Honey Cinnamon Americano', 'Korean Pear Latte', 'Roasted Rice Tea Coffee'],
      subscribers: 218
    },
    {
      issue: '#45',
      date: 'Dec 3, 2024', 
      title: 'Seoul Cafe Owners Share Their Most Profitable Trends',
      trends: ['Brown Sugar Milk Coffee', 'Korean Citron Coffee', 'Sweet Potato Latte'],
      subscribers: 201
    },
    {
      issue: '#44',
      date: 'Nov 26, 2024',
      title: 'Thanksgiving Week: Korean Comfort Coffee Trends',
      trends: ['Korean Chestnut Coffee', 'Persimmon Spice Latte', 'Honey Ginger Coffee'],
      subscribers: 189
    }
  ]

  return (
    <div className="min-h-screen bg-coffee-foam">
      <Navigation currentPage="archive" />
      
      <section className="pt-32 pb-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-light leading-tight tracking-tight mb-6 text-coffee-primary">
              Newsletter Archive
            </h1>
            <p className="text-xl text-coffee-earth font-light max-w-3xl mx-auto">
              Browse past issues of Coffee Trends Weekly
            </p>
          </div>

          <div className="space-y-8">
            {pastIssues.map((issue, index) => (
              <div key={issue.issue} className="bg-white p-8 rounded-lg shadow-soft border border-coffee-neutral-200">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-craft text-coffee-primary mb-2">{issue.title}</h2>
                    <div className="flex items-center gap-4 text-coffee-earth text-sm">
                      <span className="font-medium">Issue {issue.issue}</span>
                      <span>•</span>
                      <span>{issue.date}</span>
                      <span>•</span>
                      <span>{issue.subscribers} subscribers</span>
                    </div>
                  </div>
                  {index === 0 && (
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                      Latest
                    </span>
                  )}
                </div>
                
                <div className="mb-6">
                  <h3 className="font-medium text-coffee-primary mb-3">Featured Korean Trends:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {issue.trends.map((trend, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-coffee-accent rounded-full"></div>
                        <span className="text-coffee-earth">{trend}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm text-coffee-earth">
                    Complete recipes, supplier info, and profit projections included
                  </div>
                  {index === 0 ? (
                    <a 
                      href="/coffee-trends"
                      className="text-coffee-accent hover:text-coffee-primary font-medium text-sm"
                    >
                      View Current Trends →
                    </a>
                  ) : (
                    <button 
                      className="text-coffee-earth hover:text-coffee-primary font-medium text-sm cursor-not-allowed"
                      disabled
                    >
                      Subscriber Only
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Newsletter Signup CTA */}
          <div className="mt-16 bg-coffee-primary p-8 rounded-lg text-center">
            <h2 className="text-2xl font-light text-coffee-foam mb-4">Don&apos;t Miss Next Week&apos;s Issue</h2>
            <p className="text-coffee-cream mb-6">Get Korean coffee trends in your inbox every Tuesday</p>
            
            <div className="bg-white p-4 rounded-lg max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full p-3 mb-3 border border-coffee-neutral-200 rounded-lg focus:border-coffee-accent"
              />
              <button className="w-full bg-coffee-accent text-white py-3 rounded-lg font-medium hover:scale-105 transition-transform">
                Subscribe Free
              </button>
              <p className="text-xs text-coffee-earth mt-2">Join 231+ coffee shop owners</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}