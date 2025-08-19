import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const videosFilePath = path.join(process.cwd(), 'data/videos.json')

// Get all videos
export async function GET() {
  try {
    const fileContent = fs.readFileSync(videosFilePath, 'utf-8')
    const data = JSON.parse(fileContent)
    return NextResponse.json(data)
  } catch (error) {
    // If file doesn't exist, create it
    const defaultData = { videos: { "1": [], "2": [], "3": [], "4": [] } }
    fs.mkdirSync(path.dirname(videosFilePath), { recursive: true })
    fs.writeFileSync(videosFilePath, JSON.stringify(defaultData, null, 2))
    return NextResponse.json(defaultData)
  }
}

// Add or remove video
export async function POST(request: NextRequest) {
  try {
    const { action, trendId, video } = await request.json()
    
    // Read current data
    let data
    try {
      const fileContent = fs.readFileSync(videosFilePath, 'utf-8')
      data = JSON.parse(fileContent)
    } catch {
      data = { videos: { "1": [], "2": [], "3": [], "4": [] } }
    }
    
    // Initialize trend videos if not exists
    if (!data.videos[trendId]) {
      data.videos[trendId] = []
    }
    
    if (action === 'add') {
      // Check if video already exists
      const exists = data.videos[trendId].some((v: any) => v.youtubeId === video.youtubeId)
      if (!exists) {
        data.videos[trendId].push({
          youtubeId: video.youtubeId,
          title: video.title || 'User Added Video',
          channel: video.channel || 'Unknown Channel',
          views: 0,
          uploadDate: new Date().toISOString().split('T')[0]
        })
      }
    } else if (action === 'remove') {
      data.videos[trendId] = data.videos[trendId].filter((v: any) => v.youtubeId !== video.youtubeId)
    }
    
    // Save updated data
    fs.mkdirSync(path.dirname(videosFilePath), { recursive: true })
    fs.writeFileSync(videosFilePath, JSON.stringify(data, null, 2))
    
    return NextResponse.json({ 
      success: true, 
      videos: data.videos[trendId],
      message: action === 'add' ? 'Video added successfully' : 'Video removed successfully'
    })
    
  } catch (error) {
    console.error('Error updating videos:', error)
    return NextResponse.json(
      { error: 'Failed to update videos' },
      { status: 500 }
    )
  }
}