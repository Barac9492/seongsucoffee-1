import { NextResponse } from 'next/server'

// Past hits and track record following SCIA-F&B schema  
export async function GET() {
  try {
    const historyData = {
      track_record: {
        window_days: 90,
        hit_rate: 0.71,
        avg_abs_error: 0.08,
        note: "확률 60% 이상 예측군 기준"
      },
      cases: [
        {
          signal: "matcha croissant",
          region: "LA_Koreatown",
          as_of: "2024-06-10",
          pred_prob_30d: 0.65,
          outcome_realized: true,
          realization_lag_days: 24,
          spark: [12, 14, 18, 19, 26, 31],
          evidence: ["TikTok▲", "Trends▲"],
          status: "Peaking",
          note: "2곳 카페 신메뉴 도입 + 리뷰 언급 증가"
        },
        {
          signal: "seongsu brunch",
          region: "LA_Koreatown", 
          as_of: "2024-05-02",
          pred_prob_30d: 0.60,
          outcome_realized: true,
          realization_lag_days: 33,
          spark: [8, 9, 10, 12, 15, 21],
          evidence: ["Trends▲"],
          status: "Exploding",
          note: "주말 웨이팅·UGC 증가"
        },
        {
          signal: "black sesame latte",
          region: "LA_Koreatown",
          as_of: "2024-04-18", 
          pred_prob_30d: 0.50,
          outcome_realized: false,
          realization_lag_days: 45,
          spark: [6, 7, 7, 8, 7, 6],
          evidence: ["TikTok△"],
          status: "Cooling",
          note: "신호 약함—불발"
        },
        {
          signal: "korean corn dog",
          region: "LA_Koreatown",
          as_of: "2024-03-25",
          pred_prob_30d: 0.72,
          outcome_realized: true,
          realization_lag_days: 18,
          spark: [15, 18, 22, 28, 35, 42],
          evidence: ["TikTok▲", "Trends▲"],
          status: "Exploding", 
          note: "3곳 신메뉴 추가, 배달 주문 급증"
        },
        {
          signal: "korean milk bread",
          region: "LA_Koreatown",
          as_of: "2024-02-14",
          pred_prob_30d: 0.58,
          outcome_realized: true,
          realization_lag_days: 28,
          spark: [10, 12, 14, 16, 20, 24],
          evidence: ["TikTok▲"],
          status: "Peaking",
          note: "베이커리 2곳 한정판 출시"
        },
        {
          signal: "matcha mochi",
          region: "LA_Koreatown",
          as_of: "2024-01-30",
          pred_prob_30d: 0.45,
          outcome_realized: false,
          realization_lag_days: 35,
          spark: [8, 9, 8, 7, 6, 5],
          evidence: ["Trends△"],
          status: "Cooling",
          note: "신호 부족—실매출 연결 안됨"
        }
      ]
    }

    return NextResponse.json(historyData)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch history data' },
      { status: 500 }
    )
  }
}