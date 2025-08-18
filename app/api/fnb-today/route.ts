import { NextResponse } from 'next/server'

// Today's live signal data following SCIA-F&B schema
export async function GET() {
  try {
    // In production, this would fetch from Railway backend
    // For now, realistic live data based on prediction engine
    
    const todaySignal = {
      as_of: new Date().toISOString().split('T')[0],
      signal: "matcha latte",
      region: "LA_Koreatown", 
      tiktok_growth_pct_7v28: 22.5,
      trends_growth_pct_14d: 20.0,
      trends_30d_is_high: true,
      outcome: "신메뉴/팝업으로 인한 판매 증가",
      prediction_prob_30d: 0.68,
      uncertainty_pm: 0.07,
      evidence: ["TikTok▲", "Trends▲"],
      status: "Exploding",
      next_check: new Date(Date.now() + 24*60*60*1000).toISOString().split('T')[0],
      // Human-in-the-loop approval workflow
      approval_status: "approved",  // "pending" | "approved" | "rejected"
      generated_at: new Date().toISOString(),
      approved_at: "2025-08-18T04:15:00.000Z",
      approved_by: "operator_kim",
      auto_score: 0.68,
      operator_notes: "Strong dual-signal confirmation, approved for publication"
    }

    return NextResponse.json(todaySignal)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch today signal' },
      { status: 500 }
    )
  }
}