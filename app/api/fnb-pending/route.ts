import { NextResponse } from 'next/server'

// Pending signals awaiting human approval
export async function GET() {
  try {
    // In production, this would fetch from Railway backend
    // For now, realistic pending signals data
    
    const pendingSignals = [
      {
        id: 'signal_001',
        as_of: new Date().toISOString().split('T')[0],
        signal: 'matcha croissant',
        region: 'LA_Koreatown',
        tiktok_growth_pct_7v28: 18.2,
        trends_growth_pct_14d: 15.5,
        prediction_prob_30d: 0.72,
        uncertainty_pm: 0.08,
        evidence: ['TikTok▲', 'Trends▲'],
        status: 'Exploding',
        auto_score: 0.72,
        generated_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
        confidence_level: 'high',
        risk_flags: [],
        outcome: '베이커리 신메뉴 도입으로 인한 매출 증가'
      },
      {
        id: 'signal_002', 
        as_of: new Date().toISOString().split('T')[0],
        signal: 'korean milk tea',
        region: 'LA_Koreatown',
        tiktok_growth_pct_7v28: 12.3,
        trends_growth_pct_14d: 8.1,
        prediction_prob_30d: 0.55,
        uncertainty_pm: 0.12,
        evidence: ['TikTok▲'],
        status: 'Peaking',
        auto_score: 0.55,
        generated_at: new Date(Date.now() - 35 * 60 * 1000).toISOString(), // 35 minutes ago
        confidence_level: 'medium',
        risk_flags: ['Single signal only', 'High uncertainty'],
        outcome: '밀크티 전문점 메뉴 추가 검토'
      }
    ]

    return NextResponse.json({
      status: 'success',
      pending_count: pendingSignals.length,
      pending_signals: pendingSignals,
      note: 'Human approval required before publication'
    })

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch pending signals' },
      { status: 500 }
    )
  }
}