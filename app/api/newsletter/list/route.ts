import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const fs = require('fs').promises
    const path = require('path')
    const filePath = path.join(process.cwd(), 'subscribers.json')
    
    try {
      const fileContent = await fs.readFile(filePath, 'utf-8')
      const subscribers = JSON.parse(fileContent)
      
      return NextResponse.json({ 
        success: true, 
        count: subscribers.length,
        subscribers: subscribers 
      })
    } catch (e) {
      // File doesn't exist yet
      return NextResponse.json({ 
        success: true, 
        count: 0,
        subscribers: [],
        message: 'No subscribers yet' 
      })
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve subscribers' },
      { status: 500 }
    )
  }
}