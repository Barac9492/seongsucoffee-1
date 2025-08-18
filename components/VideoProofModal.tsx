'use client'

import { useState } from 'react'

interface VideoProof {
  youtubeId: string
  title: string
  channel: string
  views: number
  uploadDate: string
}

interface VideoProofModalProps {
  videos: VideoProof[]
  trendName: string
  isOpen: boolean
  onClose: () => void
}

export function VideoProofModal({ videos, trendName, isOpen, onClose }: VideoProofModalProps) {
  const [selectedVideo, setSelectedVideo] = useState(0)

  if (!isOpen) return null

  const currentVideo = videos[selectedVideo]

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black opacity-50"
          onClick={onClose}
        />
        
        {/* Modal */}
        <div className="relative bg-white rounded-xl max-w-4xl w-full mx-auto shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                Video Proof: {trendName}
              </h3>
              <p className="text-sm text-gray-500">
                {videos.length} videos from Korean cafes and influencers
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Video Player */}
          <div className="aspect-video bg-black">
            <iframe
              src={`https://www.youtube.com/embed/${currentVideo.youtubeId}?autoplay=1`}
              className="w-full h-full"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>

          {/* Video Info */}
          <div className="p-4 border-b">
            <h4 className="font-semibold text-gray-900">{currentVideo.title}</h4>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
              <span>{currentVideo.channel}</span>
              <span>•</span>
              <span>{currentVideo.views.toLocaleString()} views</span>
              <span>•</span>
              <span>Uploaded {currentVideo.uploadDate}</span>
            </div>
          </div>

          {/* Video Thumbnails */}
          {videos.length > 1 && (
            <div className="p-4">
              <p className="text-sm font-medium text-gray-700 mb-3">More Videos</p>
              <div className="grid grid-cols-3 gap-3">
                {videos.map((video, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedVideo(idx)}
                    className={`relative rounded-lg overflow-hidden border-2 transition-all ${
                      idx === selectedVideo 
                        ? 'border-orange-500 shadow-md' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="aspect-video bg-gray-200">
                      <img 
                        src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                        <div className="text-white text-2xl">▶</div>
                      </div>
                    </div>
                    <div className="p-2">
                      <p className="text-xs font-medium text-gray-700 line-clamp-2">
                        {video.title}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Inline Video Card Component
export function VideoProofCard({ video, onClick }: { video: VideoProof; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow text-left w-full"
    >
      <div className="aspect-video relative bg-gray-100">
        <img 
          src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
          alt={video.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
          <div className="text-white">
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-red-600 px-2 py-1 rounded text-xs font-semibold">YouTube</span>
              <span className="text-xs">{video.views.toLocaleString()} views</span>
            </div>
          </div>
        </div>
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-black bg-opacity-50 rounded-full p-3">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="p-3">
        <h4 className="font-medium text-sm text-gray-900 line-clamp-2 mb-1">
          {video.title}
        </h4>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">{video.channel}</span>
          <span className="text-xs text-gray-500">{video.uploadDate}</span>
        </div>
      </div>
    </button>
  )
}