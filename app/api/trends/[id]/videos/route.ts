import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

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
  videoProof: VideoProof[]
  [key: string]: any
}

// Helper function to read and parse the trends data
function getTrendsData(): CoffeeTrend[] {
  const trendsFilePath = path.join(process.cwd(), 'app/api/coffee-trends/route.ts')
  const fileContent = fs.readFileSync(trendsFilePath, 'utf-8')
  
  // Extract the trends array from the file (this is a simplified approach)
  // In production, you'd want to store this in a proper database
  const trendsMatch = fileContent.match(/const trends = \[([\s\S]*?)\]/m)
  if (!trendsMatch) throw new Error('Could not find trends data')
  
  // For now, we'll use eval to parse the data (not recommended for production)
  // In a real app, this would be stored in a database
  const trendsStr = `[${trendsMatch[1]}]`
  return eval(`(${trendsStr})`)
}

// Helper function to write trends data back to file
function saveTrendsData(trends: CoffeeTrend[]): void {
  const trendsFilePath = path.join(process.cwd(), 'app/api/coffee-trends/route.ts')
  let fileContent = fs.readFileSync(trendsFilePath, 'utf-8')
  
  // Replace the trends array in the file
  const trendsStr = JSON.stringify(trends, null, 8).replace(/^/gm, '      ')
  fileContent = fileContent.replace(
    /const trends = \[[\s\S]*?\]/m,
    `const trends = ${trendsStr}`
  )
  
  fs.writeFileSync(trendsFilePath, fileContent, 'utf-8')
}

// Add video to trend
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { youtubeId, title, channel } = await request.json()
    const trendId = params.id
    
    if (!youtubeId) {
      return NextResponse.json(
        { error: 'YouTube ID is required' },
        { status: 400 }
      )
    }
    
    // Get current trends data
    const trends = getTrendsData()
    
    // Find the trend and add the video
    const trendIndex = trends.findIndex(t => t.id === trendId)
    if (trendIndex === -1) {
      return NextResponse.json(
        { error: 'Trend not found' },
        { status: 404 }
      )
    }
    
    const newVideo: VideoProof = {
      youtubeId,
      title: title || 'User Added Video',
      channel: channel || 'Unknown Channel',
      views: 0,
      uploadDate: new Date().toISOString().split('T')[0]
    }
    
    // Initialize videoProof array if it doesn't exist
    if (!trends[trendIndex].videoProof) {
      trends[trendIndex].videoProof = []
    }
    
    // Check if video already exists
    const existingVideo = trends[trendIndex].videoProof.find(v => v.youtubeId === youtubeId)
    if (existingVideo) {
      return NextResponse.json(
        { error: 'Video already exists for this trend' },
        { status: 409 }
      )
    }
    
    // Add the video
    trends[trendIndex].videoProof.push(newVideo)
    
    // Save back to file
    saveTrendsData(trends)
    
    return NextResponse.json({
      message: 'Video added successfully',
      video: newVideo,
      trend: trends[trendIndex].name
    })
    
  } catch (error) {
    console.error('Error adding video:', error)
    return NextResponse.json(
      { error: 'Failed to add video' },
      { status: 500 }
    )
  }
}

// Remove video from trend
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { youtubeId } = await request.json()
    const trendId = params.id
    
    if (!youtubeId) {
      return NextResponse.json(
        { error: 'YouTube ID is required' },
        { status: 400 }
      )
    }
    
    // Get current trends data
    const trends = getTrendsData()
    
    // Find the trend and remove the video
    const trendIndex = trends.findIndex(t => t.id === trendId)
    if (trendIndex === -1) {
      return NextResponse.json(
        { error: 'Trend not found' },
        { status: 404 }
      )
    }
    
    const trend = trends[trendIndex]
    if (!trend.videoProof) {
      return NextResponse.json(
        { error: 'No videos found for this trend' },
        { status: 404 }
      )
    }
    
    // Remove the video
    const originalLength = trend.videoProof.length
    trend.videoProof = trend.videoProof.filter(v => v.youtubeId !== youtubeId)
    
    if (trend.videoProof.length === originalLength) {
      return NextResponse.json(
        { error: 'Video not found' },
        { status: 404 }
      )
    }
    
    // Save back to file
    saveTrendsData(trends)
    
    return NextResponse.json({
      message: 'Video removed successfully',
      trend: trend.name
    })
    
  } catch (error) {
    console.error('Error removing video:', error)
    return NextResponse.json(
      { error: 'Failed to remove video' },
      { status: 500 }
    )
  }
}