'use client'

interface NavigationProps {
  currentPage: 'home' | 'trends' | 'pricing'
}

export default function Navigation({ currentPage }: NavigationProps) {
  return (
    <header className="fixed top-0 w-full z-50 glass">
      <div className="max-w-7xl mx-auto px-8 py-6">
        <div className="flex items-center justify-between">
          <a href="/" className="font-semibold text-sm tracking-wide hover:opacity-70 transition-opacity">
            PROFIT
          </a>
          <nav className="flex items-center gap-8">
            <a 
              href="/" 
              className={`text-sm transition-colors ${
                currentPage === 'home' 
                  ? 'text-black font-medium' 
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              Home
            </a>
            <a 
              href="/coffee-trends" 
              className={`text-sm transition-colors ${
                currentPage === 'trends' 
                  ? 'text-black font-medium' 
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              Trends
            </a>
            <a 
              href="/pricing" 
              className={`text-sm transition-colors ${
                currentPage === 'pricing' 
                  ? 'text-black font-medium' 
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              Pricing
            </a>
            <a 
              href="/coffee-trends" 
              className="btn-primary text-white text-sm px-6 py-2 rounded-full hover:scale-105 transition-transform"
            >
              Get Started
            </a>
            <a 
              href="/admin" 
              className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
            >
              Admin
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}