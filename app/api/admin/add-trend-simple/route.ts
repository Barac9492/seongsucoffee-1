import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { coffeeName, koreanName } = await request.json()
    
    if (!coffeeName || !koreanName) {
      return NextResponse.json(
        { error: 'Coffee name and Korean name are required' },
        { status: 400 }
      )
    }

    // Simple success response - doesn't modify files
    // In production, this would connect to a database
    const newTrend = {
      id: Date.now().toString(),
      name: coffeeName,
      nameKr: koreanName,
      status: 'pending_review',
      addedAt: new Date().toISOString()
    }

    return NextResponse.json({
      message: 'Trend submitted for review successfully',
      trend: newTrend,
      note: 'In production, this would be saved to database and reviewed by the team'
    })

  } catch (error) {
    console.error('Error adding trend:', error)
    return NextResponse.json(
      { error: 'Failed to submit trend' },
      { status: 500 }
    )
  }
}