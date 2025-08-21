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
    
    // Send to webhook for permanent storage (Google Sheets, etc.)
    const webhookUrls = [
      `${process.env.VERCEL_URL || 'http://localhost:3003'}/api/backup`, // Local backup
      process.env.ZAPIER_WEBHOOK_1, // Primary Zapier backup
      process.env.ZAPIER_WEBHOOK_2, // Secondary Zapier backup
      process.env.BACKUP_WEBHOOK_URL // Custom webhook if configured
    ].filter(Boolean)
    
    // Send to all backup webhooks
    webhookUrls.forEach(async (webhookUrl) => {
      if (!webhookUrl) return
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...newSubscriber,
            source: 'coffee-trends-weekly',
            timestamp: new Date().toISOString()
          })
        })
        console.log('Data backed up to webhook:', webhookUrl.substring(0, 50) + '...')
      } catch (backupError) {
        console.error('Webhook backup failed:', backupError)
      }
    })
    
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