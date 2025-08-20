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
      
      {/* Jeff's Revenue-First Admin */}
      <section className="pt-32 pb-8 px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-craft text-coffee-primary mb-2">Coffee Trends Admin</h1>
              <p className="text-coffee-earth">Simplified operations dashboard</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-craft text-coffee-accent">{trends.length}</div>
              <div className="text-sm text-coffee-earth">Active Trends</div>
            </div>
          </div>

          {/* Message */}
          {message && (
            <div className="bg-coffee-accent text-white p-4 rounded-lg mb-6 text-center">
              {message}
            </div>
          )}

          {/* Add New Trend - Simplified */}
          <div className="bg-white rounded-lg shadow-medium p-6 mb-8">
            <h2 className="font-craft text-coffee-primary mb-4">Add New Korean Coffee Trend</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="English name (e.g., Honey Oat Latte)"
                value={newCoffeeName}
                onChange={(e) => setNewCoffeeName(e.target.value)}
                className="p-3 border border-coffee-neutral-200 rounded-lg"
              />
              <input
                type="text"
                placeholder="Korean name (e.g., 허니 오트 라떼)"
                value={newKoreanName}
                onChange={(e) => setNewKoreanName(e.target.value)}
                className="p-3 border border-coffee-neutral-200 rounded-lg"
              />
              <button
                onClick={addNewTrend}
                disabled={addingTrend || !newCoffeeName.trim() || !newKoreanName.trim()}
                className="btn-coffee-primary disabled:opacity-50"
              >
                {addingTrend ? 'Adding...' : 'Add Trend'}
              </button>
            </div>
          </div>

          {/* Trends List - Clean & Operational */}
          <div className="bg-white rounded-lg shadow-medium p-6">
            <h2 className="font-craft text-coffee-primary mb-6">Current Korean Coffee Trends</h2>
            
            <div className="space-y-4">
              {trends.map((trend) => (
                <div key={trend.id} className="border border-coffee-neutral-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-craft text-coffee-primary">{trend.name}</h3>
                      <div className="text-sm text-coffee-earth">{trend.nameKr}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-craft text-coffee-accent">{trend.successProbability}%</div>
                      <div className="text-xs text-coffee-earth">Success Rate</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-coffee-earth">Market: </span>
                      <span className="font-medium">{trend.marketReadiness}</span>
                    </div>
                    <div>
                      <span className="text-coffee-earth">Growth: </span>
                      <span className="font-medium text-green-600">+{trend.growth}%</span>
                    </div>
                    <div>
                      <span className="text-coffee-earth">Cafes: </span>
                      <span className="font-medium">{trend.cafesServing}</span>
                    </div>
                    <div>
                      <span className="text-coffee-earth">Stage: </span>
                      <span className="font-medium capitalize">{trend.stage}</span>
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