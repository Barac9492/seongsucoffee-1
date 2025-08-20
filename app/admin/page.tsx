'use client'

import { useState, useEffect } from 'react'
import Navigation from '../../components/Navigation'

interface CoffeeTrend {
  id: string
  name: string
  nameKr: string
  successProbability: number
  marketReadiness: string
  competitorRisk: string
  stage: string
  growth: number
  cafesServing: number
  firstDetected: string
  lastUpdated: string
}

export default function AdminPage() {
  const [trends, setTrends] = useState<CoffeeTrend[]>([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [newCoffeeName, setNewCoffeeName] = useState('')
  const [newKoreanName, setNewKoreanName] = useState('')
  const [addingTrend, setAddingTrend] = useState(false)

  useEffect(() => {
    fetchTrends()
  }, [])

  const fetchTrends = async () => {
    try {
      const response = await fetch('/api/coffee-trends')
      const data = await response.json()
      setTrends(data.trends || [])
    } catch (error) {
      console.error('Failed to fetch trends:', error)
      setMessage('Failed to load trends')
    } finally {
      setLoading(false)
    }
  }

  const addNewTrend = async () => {
    if (!newCoffeeName.trim() || !newKoreanName.trim()) {
      setMessage('❌ Please enter both English and Korean names')
      setTimeout(() => setMessage(''), 3000)
      return
    }

    setAddingTrend(true)
    setMessage('📝 Adding new trend...')

    try {
      const response = await fetch('/api/admin/add-trend-simple', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          coffeeName: newCoffeeName.trim(),
          koreanName: newKoreanName.trim()
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        setMessage(`❌ Error: ${result.error}`)
        setTimeout(() => setMessage(''), 4000)
        return
      }

      setNewCoffeeName('')
      setNewKoreanName('')
      setMessage(`✅ "${result.trend.name}" submitted for review`)
      setTimeout(() => setMessage(''), 4000)

    } catch (error) {
      console.error('Error adding trend:', error)
      setMessage('❌ Failed to add trend. Please try again.')
      setTimeout(() => setMessage(''), 3000)
    } finally {
      setAddingTrend(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-coffee-foam flex items-center justify-center">
        <div className="text-coffee-primary">Loading trends...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-coffee-foam">
      <Navigation currentPage="home" />
      
      {/* Mobile-Optimized Admin Header */}
      <section className="pt-20 md:pt-32 pb-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Mobile-Friendly Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8">
            <div className="mb-4 md:mb-0">
              <h1 className="text-2xl md:text-3xl font-craft text-coffee-primary mb-1 md:mb-2">Coffee Trends Admin</h1>
              <p className="text-sm md:text-base text-coffee-earth">Operations dashboard</p>
            </div>
            <div className="text-left md:text-right">
              <div className="text-xl md:text-2xl font-craft text-coffee-accent">{trends.length}</div>
              <div className="text-xs md:text-sm text-coffee-earth">Active Trends</div>
            </div>
          </div>

          {/* Message */}
          {message && (
            <div className="bg-coffee-accent text-white p-4 rounded-lg mb-6 text-center">
              {message}
            </div>
          )}

          {/* Mobile-Optimized Add New Trend */}
          <div className="bg-white rounded-lg shadow-medium p-4 md:p-6 mb-6 md:mb-8">
            <h2 className="font-craft text-coffee-primary mb-3 md:mb-4 text-lg md:text-xl">Add New Korean Coffee Trend</h2>
            <div className="space-y-3 md:space-y-0 md:grid md:grid-cols-3 md:gap-4">
              <input
                type="text"
                placeholder="English name"
                value={newCoffeeName}
                onChange={(e) => setNewCoffeeName(e.target.value)}
                className="w-full p-3 border border-coffee-neutral-200 rounded-lg text-sm md:text-base"
              />
              <input
                type="text"
                placeholder="Korean name"
                value={newKoreanName}
                onChange={(e) => setNewKoreanName(e.target.value)}
                className="w-full p-3 border border-coffee-neutral-200 rounded-lg text-sm md:text-base"
              />
              <button
                onClick={addNewTrend}
                disabled={addingTrend || !newCoffeeName.trim() || !newKoreanName.trim()}
                className="w-full btn-coffee-primary disabled:opacity-50 text-sm md:text-base"
              >
                {addingTrend ? 'Adding...' : 'Add Trend'}
              </button>
            </div>
          </div>

          {/* Mobile-Optimized Trends List */}
          <div className="bg-white rounded-lg shadow-medium p-4 md:p-6">
            <h2 className="font-craft text-coffee-primary mb-4 md:mb-6 text-lg md:text-xl">Current Korean Coffee Trends</h2>
            
            <div className="space-y-3 md:space-y-4">
              {trends.map((trend) => (
                <div key={trend.id} className="border border-coffee-neutral-200 rounded-lg p-3 md:p-4">
                  <div className="flex items-start justify-between mb-2 md:mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-craft text-coffee-primary text-sm md:text-base truncate">{trend.name}</h3>
                      <div className="text-xs md:text-sm text-coffee-earth">{trend.nameKr}</div>
                    </div>
                    <div className="text-right ml-3 flex-shrink-0">
                      <div className="text-sm md:text-lg font-craft text-coffee-accent">{trend.successProbability}%</div>
                      <div className="text-xs text-coffee-earth">Success</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 text-xs md:text-sm">
                    <div className="bg-coffee-cream p-2 rounded">
                      <span className="text-coffee-earth block md:inline">Market: </span>
                      <span className="font-medium text-coffee-primary">{trend.marketReadiness}</span>
                    </div>
                    <div className="bg-green-50 p-2 rounded">
                      <span className="text-coffee-earth block md:inline">Growth: </span>
                      <span className="font-medium text-green-600">+{trend.growth}%</span>
                    </div>
                    <div className="bg-blue-50 p-2 rounded">
                      <span className="text-coffee-earth block md:inline">Cafes: </span>
                      <span className="font-medium text-coffee-primary">{trend.cafesServing}</span>
                    </div>
                    <div className="bg-orange-50 p-2 rounded">
                      <span className="text-coffee-earth block md:inline">Stage: </span>
                      <span className="font-medium capitalize text-coffee-primary">{trend.stage}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}