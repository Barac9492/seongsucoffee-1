import { NextResponse } from 'next/server'

// Today's signal in pending approval state (for demo)
export async function GET() {
  try {
    const todaySignal = {
      as_of: new Date().toISOString().split('T')[0],
      signal: "matcha croissant",
      region: "LA_Koreatown", 
      tiktok_growth_pct_7v28: 18.2,
      trends_growth_pct_14d: 15.5,
      trends_30d_is_high: true,
      outcome: "베이커리 신메뉴 도입으로 인한 매출 증가",
      prediction_prob_30d: 0.72,
      uncertainty_pm: 0.08,
      evidence: ["TikTok▲", "Trends▲"],
      status: "Exploding",
      next_check: new Date(Date.now() + 24*60*60*1000).toISOString().split('T')[0],
      // Human-in-the-loop approval workflow - PENDING state
      approval_status: "pending",
      generated_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 min ago
      approved_at: null,
      approved_by: null,
      auto_score: 0.72,
      operator_notes: null,
      confidence_level: "high",
      risk_flags: []
    }

    return NextResponse.json(todaySignal)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch today signal' },
      { status: 500 }
    )
  }
}