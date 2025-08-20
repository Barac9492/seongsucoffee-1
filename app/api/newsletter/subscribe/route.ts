import { NextResponse } from 'next/server'

// Simple counter for testing
let signupCount = 0
let lastSignup: any = null

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // Increment counter
    signupCount++
    
    // Store last signup
    lastSignup = {
      ...data,
      subscribedAt: new Date().toISOString(),
      id: signupCount
    }
    
    // Log for debugging
    console.log('Signup #' + signupCount, lastSignup)
    
    return NextResponse.json({ 
      success: true, 
      message: 'Successfully subscribed!',
      id: signupCount,
      data: lastSignup
    })
  } catch (error) {
    console.error('Subscription error:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Subscription failed: ' + (error instanceof Error ? error.message : 'Unknown error'),
        error: String(error)
      },
      { status: 500 }
    )
  }
}

// Export GET method for checking status
export async function GET() {
  return NextResponse.json({ 
    success: true, 
    signupCount: signupCount,
    lastSignup: lastSignup,
    message: 'Newsletter API is working!'
  })
}