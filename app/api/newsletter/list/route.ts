import { NextResponse } from 'next/server'
import { subscribers } from '../subscribe/route'

export async function GET() {
  try {
    return NextResponse.json({ 
      success: true, 
      count: subscribers.length,
      subscribers: subscribers,
      message: subscribers.length === 0 ? 'No subscribers yet (data resets on redeploy)' : undefined
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve subscribers' },
      { status: 500 }
    )
  }
}