import { NextResponse } from 'next/server'

// In-memory storage for Vercel (resets on redeploy)
// For production, use a database like Vercel KV or Supabase
let subscribers: any[] = []

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // Add subscriber to memory
    const newSubscriber = {
      ...data,
      subscribedAt: new Date().toISOString(),
      id: Date.now().toString()
    }
    
    subscribers.push(newSubscriber)
    
    // Log for Vercel Functions logs
    console.log('New subscriber:', newSubscriber)
    
    // Send to webhook if configured (Zapier, Make, etc.)
    const WEBHOOK_URL = process.env.WEBHOOK_URL || ''
    if (WEBHOOK_URL) {
      try {
        await fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newSubscriber)
        })
      } catch (webhookError) {
        console.error('Webhook failed:', webhookError)
        // Don't fail the signup if webhook fails
      }
    }
    
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

// Export the subscribers array for the list endpoint
export { subscribers }