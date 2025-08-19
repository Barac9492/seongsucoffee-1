import { NextRequest, NextResponse } from 'next/server'

interface VideoProof {
  youtubeId: string
  title: string
  channel: string
  views: number
  uploadDate: string
}

// Simple API to add videos to Cream Cheese Foam Coffee trend
export async function POST(request: NextRequest) {
  try {
    const { youtubeId, title, channel, trendId, trendName } = await request.json()
    
    if (!youtubeId) {
      return NextResponse.json(
        { error: 'YouTube ID is required' },
        { status: 400 }
      )
    }

    const videoData = {
      youtubeId,
      title: title || 'User Added Video',
      channel: channel || 'Unknown Channel',
      trendId,
      trendName,
      addedAt: new Date().toISOString(),
      source: 'admin_panel',
      status: 'pending_review'
    }

    // Store in admin database for extraction
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/admin/database`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          admin_key: 'korean_trend_scout_admin_2024',
          action: 'store_video',
          data: videoData
        }),
      })
    } catch (error) {
      console.error('Failed to store in admin database:', error)
    }

    return NextResponse.json({
      message: 'Video stored in admin database for extraction',
      video: videoData,
      extraction_url: '/api/admin/database?action=export_videos&admin_key=korean_trend_scout_admin_2024'
    })
    
  } catch (error) {
    console.error('Error adding video:', error)
    return NextResponse.json(
      { error: 'Failed to add video' },
      { status: 500 }
    )
  }
}