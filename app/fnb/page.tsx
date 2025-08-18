'use client'

import { useState, useEffect } from 'react'

interface DailyBriefFnB {
  date: string
  top_signal: {
    keyword: string
    tiktok_growth: string
    trends_growth: string
    region: string
    timeframe: string
  }
  so_what: string
  action_for_owner: {
    action: string
    who: string
    what: string
    when: string
    confidence: string
  }
  ad_copy_b2b: string
  ad_copy_b2c: string
  next_check: string
}

interface WeeklyOnePageFnB {
  week_ending: string
  executive_oneliner: string
  signals: Array<{
    platform: string
    keyword: string
    growth: string
    chart_data: number[]
    confidence: string
  }>
  what_to_do: string[]
  ad_creative_seeds: {
    graph_data: any
    headlines: string[]
    b2b_copy: string
    b2c_copy: string
  }
  timing_window: string
  risks_unknowns: string[]
  next_checkin: string
}

async function fetchDailyBrief(): Promise<DailyBriefFnB | null> {
  try {
    // 실제로는 /scia-fnb/daily-brief API 호출
    // 현재는 시뮬레이션 데이터
    return {
      date: new Date().toISOString().split('T')[0],
      top_signal: {
        keyword: 'matcha latte',
        tiktok_growth: '+22.5%',
        trends_growth: '+20.0%',
        region: 'LA_Koreatown',
        timeframe: '7d vs 28d'
      },
      so_what: 'Matcha latte trending strongly on both TikTok (+22.5%) and Google Trends (+20.0%). High consumer interest in LA Koreatown.',
      action_for_owner: {
        action: 'Add matcha latte to menu or launch limited-time popup',
        who: 'Cafe/Bakery Owner',
        what: 'Develop and test 2-3 new matcha latte menu items',
        when: 'Within 2 weeks',
        confidence: 'High'
      },
      ad_copy_b2b: 'Matcha latte trending +22.5% on LA TikTok. Add to your menu now.',
      ad_copy_b2c: 'Authentic Japanese matcha latte, now available in LA.',
      next_check: new Date(Date.now() + 24*60*60*1000).toISOString().split('T')[0]
    }
  } catch (error) {
    console.error('Failed to fetch daily brief:', error)
    return null
  }
}

async function fetchWeeklyOnepager(): Promise<WeeklyOnePageFnB | null> {
  try {
    return {
      week_ending: new Date().toISOString().split('T')[0],
      executive_oneliner: 'Next 45-60 days: Matcha latte trend expected to spread across LA. Menu preparation now provides competitive advantage.',
      signals: [
        {
          platform: 'TikTok',
          keyword: 'matcha latte',
          growth: '+22.5%',
          chart_data: [85, 95, 110, 125, 135],
          confidence: 'High'
        },
        {
          platform: 'Google Trends',
          keyword: 'matcha latte',
          growth: '+20.0%',
          chart_data: [65, 68, 72, 75, 78],
          confidence: 'High'
        }
      ],
      what_to_do: [
        '✅ Develop matcha latte recipe (secure premium matcha ingredients)',
        '✅ Review matcha croissant bakery partnerships',
        '✅ Select 3 Seongsu-style interior elements',
        '✅ Create TikTok/Instagram matcha content (2x per week)',
        '✅ Establish limited edition marketing plan (4-week campaign)'
      ],
      ad_creative_seeds: {
        graph_data: null,
        headlines: ['Matcha Latte Craze Hits LA!', 'Seongsu-Style Desserts, Now Here'],
        b2b_copy: 'Matcha croissant trending +22% on LA TikTok. Add to your menu now.',
        b2c_copy: 'Seongsu-style matcha croissant, now available in LA.'
      },
      timing_window: '30-60 days',
      risks_unknowns: [
        'Supply chain stability (Japanese matcha sourcing)',
        'Risk of fast competitor imitation',
        'Limited evidence: No actual sales conversion data'
      ],
      next_checkin: new Date(Date.now() + 7*24*60*60*1000).toISOString().split('T')[0]
    }
  } catch (error) {
    console.error('Failed to fetch weekly onepager:', error)
    return null
  }
}

export default function SCIAFnBDashboard() {
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly'>('daily')
  const [dailyBrief, setDailyBrief] = useState<DailyBriefFnB | null>(null)
  const [weeklyOnepager, setWeeklyOnepager] = useState<WeeklyOnePageFnB | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([fetchDailyBrief(), fetchWeeklyOnepager()]).then(([daily, weekly]) => {
      setDailyBrief(daily)
      setWeeklyOnepager(weekly)
      setLoading(false)
    })
  }, [])

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'High': return 'text-green-600 bg-green-100 border-green-300'
      case 'Medium': return 'text-yellow-600 bg-yellow-100 border-yellow-300'
      case 'Low': return 'text-red-600 bg-red-100 border-red-300'
      default: return 'text-gray-600 bg-gray-100 border-gray-300'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
          <p className="mt-2 text-gray-600">Loading F&B Intelligence...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">SCIA-F&B Lite</h1>
                <p className="text-sm text-gray-600">Early F&B trend detection + ad creative generation</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-500">
                Focus: Matcha·Seongsu cafe (LA)
              </div>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-green-600">Live</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('daily')}
              className={`px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === 'daily'
                  ? 'border-b-2 border-orange-500 text-orange-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              📅 Daily Brief (Today's Trends)
            </button>
            <button
              onClick={() => setActiveTab('weekly')}
              className={`px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === 'weekly'
                  ? 'border-b-2 border-orange-500 text-orange-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              📊 Weekly One-Pager (Weekly Action Plan)
            </button>
          </div>
        </div>

        {/* Daily Brief Tab */}
        {activeTab === 'daily' && dailyBrief && (
          <div className="space-y-6">
            {/* Top Signal Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">🔥 Top Signal</h2>
                <span className="text-sm text-gray-500">{dailyBrief.date}</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {dailyBrief.top_signal.keyword}
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">TikTok Growth:</span>
                      <span className="font-bold text-green-600">{dailyBrief.top_signal.tiktok_growth}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Google Trends:</span>
                      <span className="font-bold text-green-600">{dailyBrief.top_signal.trends_growth}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Region:</span>
                      <span className="font-medium">{dailyBrief.top_signal.region}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Period:</span>
                      <span className="font-medium">{dailyBrief.top_signal.timeframe}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">💡 So-What</h4>
                  <p className="text-blue-700 text-sm">{dailyBrief.so_what}</p>
                </div>
              </div>
            </div>

            {/* Action for Owner */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">🎯 Owner Action (Actionable)</h3>
              
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-semibold text-orange-800">{dailyBrief.action_for_owner.action}</h4>
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${getConfidenceColor(dailyBrief.action_for_owner.confidence)}`}>
                    Confidence: {dailyBrief.action_for_owner.confidence}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-orange-600 font-medium">Who:</span>
                    <div className="text-orange-800">{dailyBrief.action_for_owner.who}</div>
                  </div>
                  <div>
                    <span className="text-orange-600 font-medium">What:</span>
                    <div className="text-orange-800">{dailyBrief.action_for_owner.what}</div>
                  </div>
                  <div>
                    <span className="text-orange-600 font-medium">When:</span>
                    <div className="text-orange-800">{dailyBrief.action_for_owner.when}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ad Copy Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">📢 B2B Ad Copy</h3>
                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                  <p className="text-indigo-800 font-medium">{dailyBrief.ad_copy_b2b}</p>
                  <p className="text-indigo-600 text-sm mt-2">→ Owner/Franchise Target</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">🛍️ B2C Ad Copy</h3>
                <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
                  <p className="text-pink-800 font-medium">{dailyBrief.ad_copy_b2c}</p>
                  <p className="text-pink-600 text-sm mt-2">→ Consumer Target</p>
                </div>
              </div>
            </div>

            {/* Next Check */}
            <div className="text-center text-sm text-gray-500">
              Next Check: {dailyBrief.next_check}
            </div>
          </div>
        )}

        {/* Weekly One-Pager Tab */}
        {activeTab === 'weekly' && weeklyOnepager && (
          <div className="space-y-6">
            {/* Executive One-Liner */}
            <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">🎯 Executive One-Liner (45-60 day action window)</h2>
              <p className="text-lg">{weeklyOnepager.executive_oneliner}</p>
            </div>

            {/* Signals Charts */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6">📈 Signals (TikTok/Trends Charts)</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {weeklyOnepager.signals.map((signal, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-semibold">{signal.platform}</h4>
                      <span className={`px-2 py-1 rounded text-xs border ${getConfidenceColor(signal.confidence)}`}>
                        {signal.confidence}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{signal.keyword}</p>
                    <div className="text-2xl font-bold text-green-600 mb-2">{signal.growth}</div>
                    
                    {/* Simple Chart Visualization */}
                    <div className="flex items-end space-x-1 h-20">
                      {signal.chart_data.map((value, i) => (
                        <div
                          key={i}
                          className="bg-gradient-to-t from-orange-400 to-orange-600 rounded-t"
                          style={{
                            height: `${(value / Math.max(...signal.chart_data)) * 100}%`,
                            width: '20%'
                          }}
                        ></div>
                      ))}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">5-week trend</div>
                  </div>
                ))}
              </div>
            </div>

            {/* What to Do Checklist */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">✅ What to Do (Checklist)</h3>
              <div className="space-y-3">
                {weeklyOnepager.what_to_do.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <span className="text-green-600 mr-3">{item.split(' ')[0]}</span>
                    <span className="text-gray-700">{item.split(' ').slice(1).join(' ')}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ad Creative Seeds */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">🎨 Ad Creative Seeds</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Headlines (Ready to Use)</h4>
                  <div className="space-y-2">
                    {weeklyOnepager.ad_creative_seeds.headlines.map((headline, index) => (
                      <div key={index} className="bg-purple-50 border border-purple-200 rounded p-3">
                        <span className="font-medium text-purple-800">{headline}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">B2B Copy Draft</h4>
                    <div className="bg-indigo-50 border border-indigo-200 rounded p-3">
                      <p className="text-indigo-800">{weeklyOnepager.ad_creative_seeds.b2b_copy}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">B2C Copy Draft</h4>
                    <div className="bg-pink-50 border border-pink-200 rounded p-3">
                      <p className="text-pink-800">{weeklyOnepager.ad_creative_seeds.b2c_copy}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Timing & Risks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">⏰ Timing Window</h3>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-yellow-800 font-medium">{weeklyOnepager.timing_window}</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">⚠️ Risk & Unknowns</h3>
                <div className="space-y-2">
                  {weeklyOnepager.risks_unknowns.map((risk, index) => (
                    <div key={index} className="text-sm text-gray-700">
                      • {risk}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Next Check-in */}
            <div className="text-center text-sm text-gray-500">
              Next Check-in: {weeklyOnepager.next_checkin}
            </div>
          </div>
        )}

        {/* Pilot CTA */}
        <div className="mt-12 text-center bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">4-Week Pilot Program</h2>
          <p className="text-lg mb-6 opacity-90">
            Recruiting 2-3 CA cafe/bakery owners • New menu/popup testing support • Case study development
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors">
              Apply for Pilot
            </button>
            <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
              Download Sample Report
            </button>
          </div>
          <p className="mt-4 text-sm opacity-75">
            Free • 5x weekly Daily Brief • Weekly One-Pager • Ad copy included
          </p>
        </div>
      </div>
    </div>
  )
}