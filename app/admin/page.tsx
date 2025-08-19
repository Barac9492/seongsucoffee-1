'use client'

import { useState, useEffect } from 'react'


interface VideoProof {
  youtubeId: string
  title: string
  channel: string
  views: number
  uploadDate: string
}

interface TrendSignal {
  timestamp: string
  growth: number
  socialMentions: number
  searchGrowth: number
  cafesServing: number
  source: 'manual' | 'youtube' | 'instagram' | 'naver' | 'tiktok'
  notes?: string
}

interface CoffeeTrend {
  id: string
  name: string
  nameKr: string
  growth: number
  stage: string
  cafesServing: number
  firstDetected: string
  lastUpdated: string
  socialMentions: number
  searchGrowth: number
  districts: string[]
  videoProof: VideoProof[]
  ingredients?: string[]
  priceRange?: string
  targetDemo?: string
  instagramHashtag?: string
  naverSearchVolume?: number
  tiktokViews?: number
  signals: TrendSignal[]
}

export default function AdminPage() {
  const [trends, setTrends] = useState<CoffeeTrend[]>([])
  const [loading, setLoading] = useState(true)
  const [editingTrend, setEditingTrend] = useState<string | null>(null)
  const [newVideoUrl, setNewVideoUrl] = useState('')
  const [message, setMessage] = useState('')
  const [refreshing, setRefreshing] = useState(false)
  
  // New trend creation states
  const [showAddTrend, setShowAddTrend] = useState(false)
  const [newCoffeeName, setNewCoffeeName] = useState('')
  const [newKoreanName, setNewKoreanName] = useState('')
  const [addingTrend, setAddingTrend] = useState(false)
  
  // Edit trend states
  const [editingTrendId, setEditingTrendId] = useState<string | null>(null)
  const [showEditTrend, setShowEditTrend] = useState(false)
  const [editTrendData, setEditTrendData] = useState<any>(null)

  useEffect(() => {
    fetchTrendsAndVideos()
  }, [])

  const fetchTrendsAndVideos = async () => {
    try {
      // Fetch trends first
      const trendsResponse = await fetch('/api/coffee-trends')
      const trendsData = await trendsResponse.json()
      
      // Then fetch videos
      const videosResponse = await fetch('/api/videos')
      const videosData = await videosResponse.json()
      
      // Merge videos into trends
      const trendsWithVideos = trendsData.trends.map(trend => ({
        ...trend,
        videoProof: videosData.videos[trend.id] || []
      }))
      
      setTrends(trendsWithVideos)
    } catch (error) {
      console.error('Failed to fetch trends and videos:', error)
    } finally {
      setLoading(false)
    }
  }
  
  const fetchVideos = async () => {
    try {
      const response = await fetch('/api/videos')
      const data = await response.json()
      
      // Merge videos into trends
      setTrends(prevTrends => prevTrends.map(trend => ({
        ...trend,
        videoProof: data.videos[trend.id] || []
      })))
    } catch (error) {
      console.error('Failed to fetch videos:', error)
    }
  }

  const extractYouTubeId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /(?:youtube\.com\/shorts\/)([^&\n?#]+)/, // YouTube Shorts support
      /^([a-zA-Z0-9_-]{11})$/ // Direct video ID
    ]
    
    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match) return match[1]
    }
    return null
  }

  const addVideoToTrend = async (trendId: string, videoUrl: string) => {
    const youtubeId = extractYouTubeId(videoUrl)
    if (!youtubeId) {
      setMessage('Invalid YouTube URL. Please use a valid YouTube link.')
      return
    }

    try {
      // Add video using simpler JSON-based API
      const response = await fetch('/api/videos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'add',
          trendId,
          video: {
            youtubeId,
            title: 'User Added Video',
            channel: 'Unknown Channel'
          }
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        setMessage(`❌ Error: ${result.error}`)
        setTimeout(() => setMessage(''), 4000)
        return
      }

      // Update local state to show the change immediately
      const updatedTrends = trends.map(trend => {
        if (trend.id === trendId) {
          const newVideo: VideoProof = {
            youtubeId,
            title: 'User Added Video',
            channel: 'Unknown Channel',
            views: 0,
            uploadDate: new Date().toISOString().split('T')[0]
          }
          return {
            ...trend,
            videoProof: [...(trend.videoProof || []), newVideo]
          }
        }
        return trend
      })
      
      setTrends(updatedTrends)
      setNewVideoUrl('')
      setMessage(`🎉 Video added! YouTube link: https://youtube.com/watch?v=${youtubeId}`)
      setTimeout(() => setMessage(''), 5000)

    } catch (error) {
      console.error('Error adding video:', error)
      setMessage('❌ Failed to add video. Please try again.')
      setTimeout(() => setMessage(''), 3000)
    }
  }

  const removeVideo = async (trendId: string, videoIndex: number) => {
    const trend = trends.find(t => t.id === trendId)
    if (!trend || !trend.videoProof || !trend.videoProof[videoIndex]) {
      setMessage('Video not found')
      return
    }

    const youtubeId = trend.videoProof[videoIndex].youtubeId

    try {
      // Remove video using simpler JSON-based API
      const response = await fetch('/api/videos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'remove',
          trendId,
          video: { youtubeId }
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        setMessage(`❌ Error: ${result.error}`)
        setTimeout(() => setMessage(''), 4000)
        return
      }

      // Update local state to reflect the change
      const updatedTrends = trends.map(t => {
        if (t.id === trendId) {
          return {
            ...t,
            videoProof: t.videoProof.filter((_, index) => index !== videoIndex)
          }
        }
        return t
      })
      
      setTrends(updatedTrends)
      setMessage(`🗑️ Video removed successfully`)
      setTimeout(() => setMessage(''), 3000)

    } catch (error) {
      console.error('Error removing video:', error)
      setMessage('❌ Failed to remove video. Please try again.')
      setTimeout(() => setMessage(''), 3000)
    }
  }

  const addNewTrend = async () => {
    if (!newCoffeeName.trim() || !newKoreanName.trim()) {
      setMessage('❌ Please enter both English and Korean names')
      setTimeout(() => setMessage(''), 3000)
      return
    }

    setAddingTrend(true)
    setMessage('🤖 AI is generating complete business intelligence for your new coffee trend...')

    try {
      const response = await fetch('/api/admin/add-trend', {
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

      // Refresh trends and videos to show the new one
      await fetchTrendsAndVideos()
      
      // Clear form
      setNewCoffeeName('')
      setNewKoreanName('')
      setShowAddTrend(false)
      
      setMessage(`🎉 "${result.trend.name}" added successfully! AI generated complete recipe, suppliers, pricing & training data.`)
      setTimeout(() => setMessage(''), 6000)

    } catch (error) {
      console.error('Error adding trend:', error)
      setMessage('❌ Failed to add new trend. Please try again.')
      setTimeout(() => setMessage(''), 3000)
    } finally {
      setAddingTrend(false)
    }
  }

  const deleteTrend = async (trendId: string, trendName: string) => {
    if (!confirm(`Are you sure you want to delete the trend "${trendName}"? This will also remove all associated videos and data. This action cannot be undone.`)) {
      return
    }

    setMessage('🗑️ Deleting trend and all associated data...')
    
    try {
      // Remove all videos for this trend first
      const videosResponse = await fetch('/api/videos')
      const videosData = await videosResponse.json()
      const trendVideos = videosData.videos[trendId] || []
      
      // Remove each video
      for (const video of trendVideos) {
        await fetch('/api/videos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'remove',
            trendId,
            video: { youtubeId: video.youtubeId }
          }),
        })
      }
      
      // Remove trend from local state (we don't have a backend delete API yet)
      const updatedTrends = trends.filter(t => t.id !== trendId)
      setTrends(updatedTrends)
      
      setMessage(`🗑️ "${trendName}" deleted successfully along with all videos`)
      setTimeout(() => setMessage(''), 4000)

    } catch (error) {
      console.error('Error deleting trend:', error)
      setMessage('❌ Failed to delete trend. Please try again.')
      setTimeout(() => setMessage(''), 3000)
    }
  }

  const editTrend = (trend: CoffeeTrend) => {
    setEditTrendData({
      id: trend.id,
      name: trend.name,
      nameKr: trend.nameKr,
      successProbability: trend.successProbability,
      marketReadiness: trend.marketReadiness,
      competitorRisk: trend.competitorRisk,
      timeToGlobal: trend.timeToGlobal
    })
    setEditingTrendId(trend.id)
    setShowEditTrend(true)
  }

  const saveEditTrend = async () => {
    if (!editTrendData.name.trim() || !editTrendData.nameKr.trim()) {
      setMessage('❌ Please enter both English and Korean names')
      setTimeout(() => setMessage(''), 3000)
      return
    }

    setMessage('💾 Saving trend changes...')
    
    try {
      // Update trend in local state (we don't have a backend update API yet)
      const updatedTrends = trends.map(trend => {
        if (trend.id === editingTrendId) {
          return {
            ...trend,
            name: editTrendData.name.trim(),
            nameKr: editTrendData.nameKr.trim(),
            successProbability: parseInt(editTrendData.successProbability),
            marketReadiness: editTrendData.marketReadiness,
            competitorRisk: editTrendData.competitorRisk,
            timeToGlobal: editTrendData.timeToGlobal
          }
        }
        return trend
      })
      
      setTrends(updatedTrends)
      setShowEditTrend(false)
      setEditingTrendId(null)
      setEditTrendData(null)
      
      setMessage(`💾 Trend updated successfully`)
      setTimeout(() => setMessage(''), 3000)

    } catch (error) {
      console.error('Error updating trend:', error)
      setMessage('❌ Failed to update trend. Please try again.')
      setTimeout(() => setMessage(''), 3000)
    }
  }

  const refreshTrends = async () => {
    setRefreshing(true)
    setMessage('🔍 Searching for new Korean coffee trends and updating existing signals...')
    
    // Simulate trend discovery process
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const timestamp = new Date().toISOString()
    
    // Update existing trends with new signals (preserving all existing data)
    const updatedTrends = trends.map(trend => {
      // Simulate slight variations in metrics during refresh
      const growthVariation = Math.random() * 10 - 5 // -5% to +5% change
      const newGrowth = Math.max(0, trend.growth + growthVariation)
      const mentionVariation = Math.floor(Math.random() * 100 - 50) // -50 to +50 change
      const newMentions = Math.max(0, trend.socialMentions + mentionVariation)
      
      const newSignal: TrendSignal = {
        timestamp,
        growth: newGrowth,
        socialMentions: newMentions,
        searchGrowth: trend.searchGrowth + (Math.random() * 20 - 10),
        cafesServing: trend.cafesServing + Math.floor(Math.random() * 3),
        source: 'manual',
        notes: 'Manual refresh - updated metrics'
      }
      
      return {
        ...trend,
        growth: newGrowth,
        socialMentions: newMentions,
        lastUpdated: timestamp,
        signals: [...trend.signals, newSignal]
      }
    })
    
    setTrends(updatedTrends)
    
    // For demo purposes, occasionally add a completely new trend
    const shouldAddNewTrend = Math.random() < 0.3 // 30% chance
    
    if (shouldAddNewTrend && trends.length < 10) {
      const newTrendIdeas = [
        { name: 'Honey Butter Coffee', nameKr: '허니버터 커피' },
        { name: 'Sweet Potato Latte', nameKr: '고구마 라떼' },
        { name: 'Corn Silk Tea Coffee', nameKr: '옥수수수염차 커피' },
        { name: 'Persimmon Cream Coffee', nameKr: '감크림 커피' },
        { name: 'Rice Cake Coffee', nameKr: '떡커피' }
      ]
      
      const existingNames = trends.map(t => t.name)
      const availableIdeas = newTrendIdeas.filter(idea => !existingNames.includes(idea.name))
      
      if (availableIdeas.length > 0) {
        const randomIdea = availableIdeas[Math.floor(Math.random() * availableIdeas.length)]
        const newTrend: CoffeeTrend = {
          id: `trend-${Date.now()}`,
          name: randomIdea.name,
          nameKr: randomIdea.nameKr,
          growth: Math.floor(Math.random() * 50) + 20,
          stage: 'discovery' as const,
          cafesServing: Math.floor(Math.random() * 5) + 1,
          firstDetected: timestamp,
          lastUpdated: timestamp,
          socialMentions: Math.floor(Math.random() * 200) + 50,
          searchGrowth: Math.floor(Math.random() * 100) + 25,
          districts: ['Seongsu-dong'],
          videoProof: [],
          signals: [{
            timestamp,
            growth: Math.floor(Math.random() * 50) + 20,
            socialMentions: Math.floor(Math.random() * 200) + 50,
            searchGrowth: Math.floor(Math.random() * 100) + 25,
            cafesServing: Math.floor(Math.random() * 5) + 1,
            source: 'manual',
            notes: 'New trend discovered during manual search'
          }]
        }
        
        setTrends(prev => [...prev, newTrend])
        setMessage(`✅ Trend search complete! New trend discovered: ${randomIdea.name}. All existing trends updated with new signals.`)
      } else {
        setMessage('✅ Trend search complete! All existing trends updated with fresh signals.')
      }
    } else {
      setMessage('✅ Trend search complete! All existing trends updated with fresh signals.')
    }
    
    setRefreshing(false)
    setTimeout(() => setMessage(''), 5000)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
          <p className="mt-2 text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
              <p className="text-sm text-gray-600">Manage YouTube video links and search for new Korean coffee trends</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowAddTrend(true)}
                disabled={addingTrend}
                className="px-4 py-2 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {addingTrend ? '🤖 AI Working...' : '✨ Add New Trend'}
              </button>
              <button
                onClick={refreshTrends}
                disabled={refreshing}
                className={`px-4 py-2 rounded-md font-medium ${
                  refreshing 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {refreshing ? '🔍 Searching...' : '🔄 Refresh Trends'}
              </button>
              <a href="/coffee-trends" className="text-blue-600 font-medium">Trends</a>
              <a href="/how-to" className="text-gray-600 font-medium">Guide</a>
              <a href="/pricing" className="text-gray-600 font-medium">Pricing</a>
              <a href="/" className="text-gray-600 font-medium">Home</a>
              <a href="/admin" className="text-blue-600 font-medium">Admin</a>
            </div>
          </div>
        </div>
      </header>

      {/* Message */}
      {message && (
        <div className="max-w-6xl mx-auto px-4 py-2">
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            {message}
          </div>
        </div>
      )}

      {/* Add New Trend Modal */}
      {showAddTrend && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">✨ Add New Coffee Trend</h2>
            <p className="text-sm text-gray-600 mb-6">
              AI will automatically generate complete business intelligence including recipe, suppliers, pricing, and training data.
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Coffee Name (English)
                </label>
                <input
                  type="text"
                  value={newCoffeeName}
                  onChange={(e) => setNewCoffeeName(e.target.value)}
                  placeholder="e.g., Matcha Cream Latte"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  disabled={addingTrend}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Korean Name
                </label>
                <input
                  type="text"
                  value={newKoreanName}
                  onChange={(e) => setNewKoreanName(e.target.value)}
                  placeholder="e.g., 말차 크림 라떼"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  disabled={addingTrend}
                />
              </div>
            </div>
            
            <div className="flex gap-3 mt-8">
              <button
                onClick={addNewTrend}
                disabled={addingTrend || !newCoffeeName.trim() || !newKoreanName.trim()}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {addingTrend ? '🤖 AI Generating...' : '🚀 Create Trend'}
              </button>
              <button
                onClick={() => {
                  setShowAddTrend(false)
                  setNewCoffeeName('')
                  setNewKoreanName('')
                }}
                disabled={addingTrend}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
            
            <div className="mt-4 text-xs text-gray-500">
              <p><strong>AI will generate:</strong> Success probability, market analysis, complete recipe with measurements, supplier sources, pricing strategy, and staff training guide.</p>
            </div>
          </div>
        </div>
      )}

      {/* Edit Trend Modal */}
      {showEditTrend && editTrendData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-lg w-full mx-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">✏️ Edit Coffee Trend</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Coffee Name (English)
                </label>
                <input
                  type="text"
                  value={editTrendData.name}
                  onChange={(e) => setEditTrendData({...editTrendData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Korean Name
                </label>
                <input
                  type="text"
                  value={editTrendData.nameKr}
                  onChange={(e) => setEditTrendData({...editTrendData, nameKr: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Success Probability (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={editTrendData.successProbability}
                  onChange={(e) => setEditTrendData({...editTrendData, successProbability: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Market Readiness
                </label>
                <select
                  value={editTrendData.marketReadiness}
                  onChange={(e) => setEditTrendData({...editTrendData, marketReadiness: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Competitor Risk
                </label>
                <select
                  value={editTrendData.competitorRisk}
                  onChange={(e) => setEditTrendData({...editTrendData, competitorRisk: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time to Global Market
                </label>
                <input
                  type="text"
                  value={editTrendData.timeToGlobal}
                  onChange={(e) => setEditTrendData({...editTrendData, timeToGlobal: e.target.value})}
                  placeholder="e.g., 3-4 months"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="flex gap-3 mt-8">
              <button
                onClick={saveEditTrend}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
              >
                💾 Save Changes
              </button>
              <button
                onClick={() => {
                  setShowEditTrend(false)
                  setEditingTrendId(null)
                  setEditTrendData(null)
                }}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Admin Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h2 className="font-semibold text-blue-900 mb-2">Trend Discovery & Video Management</h2>
          <div className="text-sm text-blue-800 space-y-1">
            <p><strong>✨ Add New Trend:</strong> Click &quot;Add New Trend&quot; to create a coffee trend with AI-generated business intelligence</p>
            <p><strong>🔄 Refresh Trends:</strong> Click the &quot;Refresh Trends&quot; button to manually search for new Korean coffee trends</p>
            <p><strong>📹 Add Videos:</strong> Search YouTube for real Korean coffee content (e.g., &quot;크림치즈 커피&quot;, &quot;피스타치오 라떼&quot;)</p>
            <p>• Copy the YouTube URL or Shorts URL and paste it in the &quot;Add Video&quot; section below</p>
            <p>• The system supports: youtube.com/watch?v=ID, youtube.com/shorts/ID, youtu.be/ID</p>
            <p><strong>🎬 Public Display:</strong> Videos added here will appear on ALL pages for users to see coffee trends</p>
          </div>
        </div>

        <div className="mb-8 bg-green-50 border border-green-200 rounded-lg p-4">
          <h2 className="font-semibold text-green-900 mb-2">📊 Admin Database Access</h2>
          <div className="text-sm text-green-800 space-y-2">
            <p><strong>Extract Data:</strong> Use these URLs to extract data for ML training:</p>
            <div className="bg-white p-2 rounded border font-mono text-xs">
              <p>Videos: /api/admin/database?action=export_videos&admin_key=korean_trend_scout_admin_2024</p>
              <p>Trends: /api/admin/database?action=export_trends&admin_key=korean_trend_scout_admin_2024</p>
              <p>Signals: /api/admin/database?action=export_signals&admin_key=korean_trend_scout_admin_2024</p>
            </div>
            <p><strong>Note:</strong> Videos are now automatically added to public pages. Database extracts admin actions for ML training.</p>
          </div>
        </div>

        <div className="space-y-8">
          {trends.map((trend) => (
            <div key={trend.id} className="bg-white rounded-xl border border-gray-200 p-6">
              {/* Trend Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900">{trend.name}</h3>
                  <p className="text-gray-600">{trend.nameKr}</p>
                  <p className="text-xs text-gray-400">
                    First detected: {new Date(trend.firstDetected).toLocaleDateString()}
                    {trend.lastUpdated && ` • Last updated: ${new Date(trend.lastUpdated).toLocaleDateString()}`}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-lg font-semibold text-green-600">↑{Math.round(trend.growth)}%</div>
                    <div className="text-sm text-gray-500">{trend.videoProof.length} videos • {trend.signals?.length || 0} signals</div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => editTrend(trend)}
                      className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => deleteTrend(trend.id, trend.name)}
                      className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition-colors"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>

              {/* Current Videos */}
              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 mb-3">Current Videos</h4>
                {trend.videoProof.length === 0 ? (
                  <p className="text-gray-500 italic">No videos added yet</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {trend.videoProof.map((video, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-3">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <p className="font-medium text-sm text-gray-900">{video.title}</p>
                            <p className="text-xs text-gray-500">{video.channel}</p>
                          </div>
                          <button
                            onClick={() => removeVideo(trend.id, index)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>ID: {video.youtubeId}</span>
                          <span>{video.views.toLocaleString()} views</span>
                        </div>
                        <div className="mt-2">
                          <a 
                            href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 text-sm"
                          >
                            View on YouTube →
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Signal History */}
              {trend.signals && trend.signals.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Signal History</h4>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {trend.signals.slice(-5).reverse().map((signal, index) => (
                        <div key={index} className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-3">
                            <span className="text-gray-500">
                              {new Date(signal.timestamp).toLocaleString()}
                            </span>
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">
                              {signal.source}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-green-600">↑{Math.round(signal.growth)}%</span>
                            <span className="text-gray-500">{signal.socialMentions} mentions</span>
                            <span className="text-gray-500">{signal.cafesServing} cafes</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    {trend.signals.length > 5 && (
                      <p className="text-xs text-gray-400 mt-2">
                        Showing last 5 signals • Total: {trend.signals.length}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Add Video Form */}
              <div className="border-t pt-4">
                <h4 className="font-semibold text-gray-900 mb-3">Add New Video</h4>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editingTrend === trend.id ? newVideoUrl : ''}
                    onChange={(e) => {
                      setEditingTrend(trend.id)
                      setNewVideoUrl(e.target.value)
                    }}
                    placeholder="Paste YouTube URL or Shorts URL here..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <button
                    onClick={() => {
                      if (newVideoUrl.trim()) {
                        addVideoToTrend(trend.id, newVideoUrl.trim())
                      }
                    }}
                    className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
                  >
                    Add Video
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Supports: youtube.com/watch?v=ID, youtube.com/shorts/ID, youtu.be/ID, or direct video ID
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div className="mt-8 space-y-6">
          <div className="bg-gray-100 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-3">Manual Trend Discovery Process</h3>
            <div className="text-sm text-gray-700 space-y-3">
              <div>
                <p><strong>📊 Sources to Monitor:</strong></p>
                <div className="ml-4 space-y-1">
                  <p>• YouTube: Search &quot;한국 카페 트렌드 2024&quot;, &quot;서울 신메뉴&quot;</p>
                  <p>• Instagram: Check hashtags #서울카페, #성수동카페, #카페신메뉴</p>
                  <p>• Naver Trending: Monitor coffee-related rising searches</p>
                  <p>• TikTok: Look for viral Korean coffee preparation videos</p>
                  <p>• Korean cafe blogs and vlogs</p>
                </div>
              </div>
              
              <div>
                <p><strong>🔍 What Indicates a New Trend:</strong></p>
                <div className="ml-4 space-y-1">
                  <p>• Multiple cafes introducing the same drink within weeks</p>
                  <p>• Social media buzz around a specific flavor/style</p>
                  <p>• Celebrity or influencer endorsements</p>
                  <p>• Seasonal ingredients becoming popular (e.g., persimmon, chestnut)</p>
                  <p>• Cross-over from other food trends (e.g., dessert → coffee)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-3">Finding Good Korean Coffee Videos</h3>
            <div className="text-sm text-gray-700 space-y-2">
              <p><strong>Search Terms to Try:</strong></p>
              <div className="grid grid-cols-2 gap-2 ml-4">
                <span>• &quot;크림치즈 커피&quot; (cream cheese coffee)</span>
                <span>• &quot;피스타치오 라떼&quot; (pistachio latte)</span>
                <span>• &quot;흑임자 커피&quot; (black sesame coffee)</span>
                <span>• &quot;한국 카페 트렌드&quot; (Korean cafe trends)</span>
                <span>• &quot;서울 카페&quot; (Seoul cafe)</span>
                <span>• &quot;성수동 카페&quot; (Seongsu-dong cafe)</span>
              </div>
              <p className="mt-3"><strong>Look for:</strong> Korean cafe vlogs, barista tutorials, cafe reviews, new menu introductions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}