'use client'

interface NavigationProps {
  currentPage: 'home' | 'trends' | 'pricing'
}

export default function Navigation({ currentPage }: NavigationProps) {
  return (
    <header className="fixed top-0 w-full z-50 glass">
      <div className="max-w-7xl mx-auto px-8 py-6">
        <div className="flex items-center justify-between">
          <a href="/" className="font-ritual text-sm tracking-wide text-coffee-primary hover:text-coffee-accent transition-colors">
            COFFEE TRENDS WEEKLY
          </a>
          <nav className="flex items-center gap-8">
            <a 
              href="/" 
              className={`text-sm font-craft transition-colors ${
                currentPage === 'home' 
                  ? 'text-coffee-primary font-medium' 
                  : 'text-coffee-earth hover:text-coffee-primary'
              }`}
            >
              Home
            </a>
            <a 
              href="/coffee-trends" 
              className={`text-sm font-craft transition-colors ${
                currentPage === 'trends' 
                  ? 'text-coffee-primary font-medium' 
                  : 'text-coffee-earth hover:text-coffee-primary'
              }`}
            >
              Trends
            </a>
            <a 
              href="/pricing" 
              className={`text-sm font-craft transition-colors ${
                currentPage === 'pricing' 
                  ? 'text-coffee-primary font-medium' 
                  : 'text-coffee-earth hover:text-coffee-primary'
              }`}
            >
              Pricing
            </a>
            <a 
              href="/mvp" 
              className="btn-primary text-white text-sm px-6 py-3 rounded-full hover:scale-105 transition-transform font-craft font-medium"
            >
              MVP Launch
            </a>
            <a 
              href="/launch" 
              className="text-sm text-coffee-earth hover:text-coffee-primary transition-colors"
            >
              Launch Plan
            </a>
            <a 
              href="/admin" 
              className="text-sm text-coffee-earth opacity-60 hover:opacity-100 hover:text-coffee-secondary transition-all"
            >
              Admin
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}