import { NextResponse } from 'next/server'

// Simple email storage - in production, use a database or email service
const WEBHOOK_URL = process.env.WEBHOOK_URL || ''

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // Log for now - replace with actual email service
    console.log('Newsletter signup:', data)
    
    // Send to webhook if configured (Zapier, Make, etc.)
    if (WEBHOOK_URL) {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          timestamp: new Date().toISOString(),
          source: data.source || 'website'
        })
      })
    }
    
    // Store in local JSON file as backup (temporary solution)
    const fs = require('fs').promises
    const path = require('path')
    const filePath = path.join(process.cwd(), 'subscribers.json')
    
    try {
      let subscribers = []
      try {
        const fileContent = await fs.readFile(filePath, 'utf-8')
        subscribers = JSON.parse(fileContent)
      } catch (e) {
        // File doesn't exist yet
      }
      
      subscribers.push({
        ...data,
        subscribedAt: new Date().toISOString(),
        id: Date.now().toString()
      })
      
      await fs.writeFile(filePath, JSON.stringify(subscribers, null, 2))
    } catch (e) {
      console.error('Failed to save locally:', e)
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Successfully subscribed!' 
    })
  } catch (error) {
    console.error('Subscription error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to subscribe' },
      { status: 500 }
    )
  }
}