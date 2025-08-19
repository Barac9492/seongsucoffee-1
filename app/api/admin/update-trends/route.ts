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

// Add video to the actual trends API file so it appears on all pages
export async function POST(request: NextRequest) {
  try {
    const { trendId, youtubeId, title, channel } = await request.json()
    
    if (!trendId || !youtubeId) {
      return NextResponse.json(
        { error: 'Trend ID and YouTube ID are required' },
        { status: 400 }
      )
    }

    // Read the current trends file
    const trendsFilePath = path.join(process.cwd(), 'app/api/coffee-trends/route.ts')
    let fileContent = fs.readFileSync(trendsFilePath, 'utf-8')

    // Create the new video object
    const newVideo: VideoProof = {
      youtubeId,
      title: title || 'User Added Video',
      channel: channel || 'Unknown Channel',
      views: 0,
      uploadDate: new Date().toISOString().split('T')[0]
    }

    // Find the specific trend and add the video
    // This is a bit hacky but works for the current file structure
    
    // Look for the trend by ID and its videoProof array
    const trendPattern = new RegExp(`(\\{[\\s\\S]*?id: '${trendId}'[\\s\\S]*?videoProof: \\[)([\\s\\S]*?)(\\][\\s\\S]*?\\})`, 'g')
    
    const match = trendPattern.exec(fileContent)
    if (!match) {
      return NextResponse.json(
        { error: `Trend with ID ${trendId} not found` },
        { status: 404 }
      )
    }

    // Extract existing videos
    const beforeArray = match[1]
    const existingVideos = match[2].trim()
    const afterArray = match[3]

    // Check if video already exists
    if (existingVideos.includes(`youtubeId: '${youtubeId}'`)) {
      return NextResponse.json(
        { error: 'Video already exists for this trend' },
        { status: 409 }
      )
    }

    // Create the new video string
    const videoString = `          {
            youtubeId: '${newVideo.youtubeId}',
            title: '${newVideo.title}',
            channel: '${newVideo.channel}',
            views: ${newVideo.views},
            uploadDate: '${newVideo.uploadDate}'
          }`

    // Build the new videoProof array content
    let newVideosContent = ''
    if (existingVideos) {
      // If there are existing videos, add comma and new video
      newVideosContent = existingVideos + ',\n' + videoString
    } else {
      // If no existing videos, just add the new video
      newVideosContent = '\n' + videoString + '\n        '
    }

    // Replace the videoProof array in the file
    const newTrendContent = beforeArray + newVideosContent + afterArray
    fileContent = fileContent.replace(match[0], newTrendContent)

    // Write the updated file
    fs.writeFileSync(trendsFilePath, fileContent, 'utf-8')

    return NextResponse.json({
      message: 'Video added successfully and will appear on all pages',
      video: newVideo,
      trendId
    })

  } catch (error) {
    console.error('Error updating trends file:', error)
    return NextResponse.json(
      { error: 'Failed to add video to trends' },
      { status: 500 }
    )
  }
}

// Remove video from trends file
export async function DELETE(request: NextRequest) {
  try {
    const { trendId, youtubeId } = await request.json()
    
    if (!trendId || !youtubeId) {
      return NextResponse.json(
        { error: 'Trend ID and YouTube ID are required' },
        { status: 400 }
      )
    }

    // Read the current trends file
    const trendsFilePath = path.join(process.cwd(), 'app/api/coffee-trends/route.ts')
    let fileContent = fs.readFileSync(trendsFilePath, 'utf-8')

    // Find and remove the specific video
    const videoPattern = new RegExp(`\\s*,?\\s*\\{[\\s\\S]*?youtubeId: '${youtubeId}'[\\s\\S]*?\\}`, 'g')
    
    const originalContent = fileContent
    fileContent = fileContent.replace(videoPattern, '')
    
    if (fileContent === originalContent) {
      return NextResponse.json(
        { error: 'Video not found' },
        { status: 404 }
      )
    }

    // Clean up any double commas or trailing commas
    fileContent = fileContent.replace(/,(\s*,)+/g, ',') // Remove double commas
    fileContent = fileContent.replace(/,(\s*\])/g, '$1') // Remove trailing commas before ]

    // Write the updated file
    fs.writeFileSync(trendsFilePath, fileContent, 'utf-8')

    return NextResponse.json({
      message: 'Video removed successfully from all pages',
      youtubeId,
      trendId
    })

  } catch (error) {
    console.error('Error removing video from trends file:', error)
    return NextResponse.json(
      { error: 'Failed to remove video from trends' },
      { status: 500 }
    )
  }
}