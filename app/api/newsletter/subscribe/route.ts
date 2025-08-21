import { NextResponse } from 'next/server'

// Simple newsletter signup storage
let subscribers: any[] = []

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    const newSubscriber = {
      ...data,
      subscribedAt: new Date().toISOString(),
      id: Date.now()
    }
    
    subscribers.push(newSubscriber)
    
    console.log('New subscriber:', newSubscriber)
    
    return NextResponse.json({ 
      success: true, 
      message: 'Successfully subscribed!',
      subscriber: newSubscriber
    })
  } catch (error) {
    console.error('Subscription error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to subscribe' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ 
    success: true, 
    count: subscribers.length,
    subscribers: subscribers
  })
}