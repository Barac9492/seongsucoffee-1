import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { coffeeName, koreanName } = await request.json()

    if (!coffeeName?.trim() || !koreanName?.trim()) {
      return NextResponse.json(
        { error: 'Both English and Korean names are required' },
        { status: 400 }
      )
    }

    // Step 1: Run verification check
    const verificationResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/trend-verification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        coffeeName: coffeeName.trim(),
        koreanName: koreanName.trim()
      }),
    })

    const verification = await verificationResponse.json()

    // Step 2: Block if verification fails
    if (!verification.verified && verification.status === 'BLOCKED') {
      return NextResponse.json(
        { 
          error: `❌ BLOCKED: ${verification.reason}`,
          verification: verification,
          howardSays: 'This trend has been identified as fake. Please submit authentic Korean cafe trends only.'
        },
        { status: 400 }
      )
    }

    // Step 3: Warn if verification score is low
    if (!verification.verified && verification.confidence < 50) {
      return NextResponse.json(
        { 
          error: `⚠️ INSUFFICIENT EVIDENCE: ${verification.recommendation}`,
          verification: verification,
          howardSays: 'This trend lacks sufficient Korean authenticity markers. Please verify it exists in Seoul cafes.'
        },
        { status: 400 }
      )
    }

    // Step 4: Create trend if verification passes
    const newTrend = {
      id: Date.now().toString(),
      name: coffeeName.trim(),
      nameKr: koreanName.trim(),
      
      // Verification metadata
      verificationStatus: verification.status,
      verificationScore: verification.confidence,
      verificationDate: new Date().toISOString(),
      
      status: 'pending_review',
      addedAt: new Date().toISOString()
    }

    const statusMessage = verification.verified 
      ? `✅ VERIFIED: "${coffeeName}" approved by Howard&apos;s verification system`
      : `⏳ PENDING: "${coffeeName}" requires manual review (Score: ${verification.confidence}/100)`

    return NextResponse.json({
      success: true,
      trend: newTrend,
      verification: verification,
      message: statusMessage,
      howardSays: verification.verified 
        ? 'This trend shows authentic Korean characteristics and is approved for development.'
        : 'This trend requires manual verification before full platform inclusion.'
    })

  } catch (error) {
    console.error('Error in add-trend-simple:', error)
    return NextResponse.json(
      { 
        error: 'Failed to process trend submission',
        howardSays: 'System error occurred. Please contact admin for manual review.'
      },
      { status: 500 }
    )
  }
}