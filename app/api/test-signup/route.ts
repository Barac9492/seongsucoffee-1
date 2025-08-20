import { NextResponse } from 'next/server'

export async function POST() {
  return NextResponse.json({ 
    success: true, 
    message: 'Test signup works!',
    timestamp: new Date().toISOString()
  })
}