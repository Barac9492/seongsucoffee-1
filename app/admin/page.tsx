'use client'

import { useState, useEffect } from 'react'

interface VideoProof {
  youtubeId: string
  title: string
  channel: string
  views: number
  uploadDate: string
}

interface CoffeeTrend {
  id: string
  name: string
  nameKr: string
  growth: number
  stage: string
  cafesServing: number
  firstDetected: string
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
}

export default function AdminPage() {
  const [trends, setTrends] = useState<CoffeeTrend[]>([])
  const [loading, setLoading] = useState(true)
  const [editingTrend, setEditingTrend] = useState<string | null>(null)
  const [editingVideo, setEditingVideo] = useState<VideoProof | null>(null)
  const [newVideoUrl, setNewVideoUrl] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchTrends()
  }, [])

  const fetchTrends = async () => {
    try {
      const response = await fetch('/api/coffee-trends')
      const data = await response.json()
      setTrends(data.trends)
    } catch (error) {
      console.error('Failed to fetch trends:', error)
    } finally {
      setLoading(false)
    }
  }

  const extractYouTubeId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
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

    // For demo purposes, we'll just update the local state
    // In a real app, this would make an API call to update the database
    const updatedTrends = trends.map(trend => {
      if (trend.id === trendId) {
        const newVideo: VideoProof = {
          youtubeId,
          title: 'User Added Video', // You could fetch this from YouTube API
          channel: 'Unknown Channel',
          views: 0,
          uploadDate: new Date().toISOString().split('T')[0]
        }
        return {
          ...trend,
          videoProof: [...trend.videoProof, newVideo]
        }
      }
      return trend
    })
    
    setTrends(updatedTrends)
    setNewVideoUrl('')
    setMessage(`Video added to ${trends.find(t => t.id === trendId)?.name}`)
    setTimeout(() => setMessage(''), 3000)
  }

  const removeVideo = (trendId: string, videoIndex: number) => {
    const updatedTrends = trends.map(trend => {
      if (trend.id === trendId) {
        return {
          ...trend,
          videoProof: trend.videoProof.filter((_, index) => index !== videoIndex)
        }
      }
      return trend
    })
    
    setTrends(updatedTrends)
    setMessage('Video removed')
    setTimeout(() => setMessage(''), 3000)
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
              <p className="text-sm text-gray-600">Manage YouTube video links for Korean coffee trends</p>
            </div>
            <div className="flex gap-4">
              <a href="/coffee-trends" className="text-orange-600 font-medium">View Trends</a>
              <a href="/" className="text-gray-600 font-medium">Home</a>
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

      {/* Admin Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h2 className="font-semibold text-blue-900 mb-2">How to Add YouTube Videos</h2>
          <div className="text-sm text-blue-800 space-y-1">
            <p>• Search YouTube for real Korean coffee content (e.g., "크림치즈 커피", "피스타치오 라떼")</p>
            <p>• Copy the YouTube URL (e.g., https://www.youtube.com/watch?v=ABC123)</p>
            <p>• Paste it in the "Add Video" section below</p>
            <p>• The system will extract the video ID and add it to the trend</p>
          </div>
        </div>

        <div className="space-y-8">
          {trends.map((trend) => (
            <div key={trend.id} className="bg-white rounded-xl border border-gray-200 p-6">
              {/* Trend Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{trend.name}</h3>
                  <p className="text-gray-600">{trend.nameKr}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-green-600">↑{trend.growth}%</div>
                  <div className="text-sm text-gray-500">{trend.videoProof.length} videos</div>
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
                    placeholder="Paste YouTube URL here..."
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
                  Supports: youtube.com/watch?v=ID, youtu.be/ID, or direct video ID
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-gray-100 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-3">Finding Good Korean Coffee Videos</h3>
          <div className="text-sm text-gray-700 space-y-2">
            <p><strong>Search Terms to Try:</strong></p>
            <div className="grid grid-cols-2 gap-2 ml-4">
              <span>• "크림치즈 커피" (cream cheese coffee)</span>
              <span>• "피스타치오 라떼" (pistachio latte)</span>
              <span>• "흑임자 커피" (black sesame coffee)</span>
              <span>• "한국 카페 트렌드" (Korean cafe trends)</span>
              <span>• "서울 카페" (Seoul cafe)</span>
              <span>• "성수동 카페" (Seongsu-dong cafe)</span>
            </div>
            <p className="mt-3"><strong>Look for:</strong> Korean cafe vlogs, barista tutorials, cafe reviews, new menu introductions</p>
          </div>
        </div>
      </div>
    </div>
  )
}