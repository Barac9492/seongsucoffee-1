'use client'

import { useState, useEffect } from 'react'

interface DailyBrief {
  date: string
  top_signals: Array<{
    rank: number
    topic: string
    geo: string
    tcs: number
    confidence: string
    key_driver: string
  }>
  executive_summary: string
  persona_actions: {
    vc?: { action: string, confidence: string, timeline: number }
    strategic?: { action: string, confidence: string, timeline: number }
    chain?: { action: string, confidence: string, timeline: number }
  }
  confidence_note: string
  next_review: string
}

interface Alert {
  type: string
  topic: string
  geo: string
  tcs: number
  message: string
  recommended_action: string
  urgency: string
  timestamp: string
}

async function fetchDailyBrief(): Promise<DailyBrief | null> {
  try {
    // In production, this would call the SCIA agent at /scia/brief
    // For now, return realistic demo data based on the agent logic
    return {
      date: new Date().toISOString().split('T')[0],
      top_signals: [
        {
          rank: 1,
          topic: 'Matcha Latte',
          geo: 'Los Angeles CA',
          tcs: 78,
          confidence: 'High',
          key_driver: 'tiktok_velocity'
        },
        {
          rank: 2,
          topic: 'Korean Skincare',
          geo: 'San Francisco CA',
          tcs: 65,
          confidence: 'Medium',
          key_driver: 'sephora_new_launches'
        },
        {
          rank: 3,
          topic: 'Seongsu Cafe',
          geo: 'Berkeley CA',
          tcs: 58,
          confidence: 'Medium',
          key_driver: 'search_momentum'
        }
      ],
      executive_summary: 'Matcha Latte trending in Los Angeles CA with TCS 78 (High confidence). Key drivers: tiktok_velocity, sephora_new_launches. Window: next 45-90 days for positioning ahead of mainstream adoption.',
      persona_actions: {
        vc: {
          action: 'Scout 2-3 matcha brands in CA for Series A positioning',
          confidence: 'High',
          timeline: 60
        },
        strategic: {
          action: 'Launch limited matcha test in Los Angeles within 30 days',
          confidence: 'High',
          timeline: 30
        },
        chain: {
          action: '30-day matcha pop-up test in LA high-traffic location',
          confidence: 'High',
          timeline: 30
        }
      },
      confidence_note: 'Based on 23 independent signals',
      next_review: new Date(Date.now() + 24*60*60*1000).toISOString().split('T')[0]
    }
  } catch (error) {
    console.error('Failed to fetch daily brief:', error)
    return null
  }
}

async function fetchAlerts(): Promise<Alert[]> {
  try {
    // Demo alerts based on SCIA agent logic
    return [
      {
        type: 'high_tcs',
        topic: 'matcha_latte',
        geo: 'Los_Angeles_CA',
        tcs: 78,
        message: 'Matcha Latte crossed TCS 70 in Los Angeles CA',
        recommended_action: 'Launch limited test in Los Angeles within 30 days',
        urgency: 'high',
        timestamp: new Date().toISOString()
      }
    ]
  } catch (error) {
    console.error('Failed to fetch alerts:', error)
    return []
  }
}

export default function SCIADashboard() {
  const [brief, setBrief] = useState<DailyBrief | null>(null)
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [selectedPersona, setSelectedPersona] = useState<'vc' | 'strategic' | 'chain'>('vc')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([fetchDailyBrief(), fetchAlerts()]).then(([briefData, alertsData]) => {
      setBrief(briefData)
      setAlerts(alertsData)
      setLoading(false)
    })
  }, [])

  const getConfidenceColor = (confidence: string) => {
    switch (confidence.toLowerCase()) {
      case 'high': return 'text-green-600 bg-green-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getTCSColor = (tcs: number) => {
    if (tcs >= 70) return 'text-green-600'
    if (tcs >= 50) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getPersonaIcon = (persona: string) => {
    switch (persona) {
      case 'vc': return '💰'
      case 'strategic': return '🎯'
      case 'chain': return '🏪'
      default: return '📊'
    }
  }

  const getPersonaTitle = (persona: string) => {
    switch (persona) {
      case 'vc': return 'Venture Capital'
      case 'strategic': return 'Strategic/Brand'
      case 'chain': return 'Chain/Restaurant'
      default: return 'Enterprise'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <p className="mt-2 text-gray-600">Loading SCIA Intelligence...</p>
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
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">SCIA Intelligence</h1>
                <p className="text-sm text-gray-600">SeongsuCoffee Intelligence Agent • Enterprise Grade</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">
                Last Updated: {brief?.date}
              </span>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-green-600">Live</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Alerts Bar */}
        {alerts.length > 0 && (
          <div className="mb-8">
            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="text-red-400 text-xl">🚨</span>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">High Priority Alert</h3>
                  <div className="mt-2 text-sm text-red-700">
                    {alerts[0].message} • Recommended: {alerts[0].recommended_action}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Executive Summary */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Executive Summary</h2>
              <span className="text-xs text-gray-500">Daily Brief • ≤300 words</span>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              {brief?.executive_summary}
            </p>
            <div className="text-sm text-gray-600">
              {brief?.confidence_note} • Next review: {brief?.next_review}
            </div>
          </div>
        </div>

        {/* Top Signals */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Top Trend Signals</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {brief?.top_signals.map((signal) => (
              <div key={signal.rank} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-gray-500">#{signal.rank} Signal</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConfidenceColor(signal.confidence)}`}>
                    {signal.confidence}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{signal.topic}</h3>
                <p className="text-gray-600 text-sm mb-3">{signal.geo}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className={`text-2xl font-bold ${getTCSColor(signal.tcs)}`}>
                      {signal.tcs}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">TCS</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    Key: {signal.key_driver.replace('_', ' ')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Persona Actions */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Actionable Intelligence by Role</h2>
            <div className="flex gap-2">
              {(['vc', 'strategic', 'chain'] as const).map((persona) => (
                <button
                  key={persona}
                  onClick={() => setSelectedPersona(persona)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedPersona === persona
                      ? 'bg-indigo-100 text-indigo-800 border border-indigo-300'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {getPersonaIcon(persona)} {getPersonaTitle(persona)}
                </button>
              ))}
            </div>
          </div>

          {brief?.persona_actions[selectedPersona] && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center text-2xl">
                  {getPersonaIcon(selectedPersona)}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {getPersonaTitle(selectedPersona)} Action
                  </h3>
                  <p className="text-gray-700 mb-4">
                    {brief.persona_actions[selectedPersona]?.action}
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Confidence:</span>
                      <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${getConfidenceColor(brief.persona_actions[selectedPersona]?.confidence || 'medium')}`}>
                        {brief.persona_actions[selectedPersona]?.confidence}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Timeline:</span>
                      <span className="ml-2 font-medium text-gray-900">
                        {brief.persona_actions[selectedPersona]?.timeline} days
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Methodology & Trust */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Intelligence Methodology</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">TCS Formula</h4>
              <p className="text-sm text-gray-600">
                TCS = 0.35×velocity + 0.25×persistence + 0.15×geoSpread + 0.15×creatorGrade + 0.10×commerceDelta
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Confidence Levels</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <div>High: ≥5 signals, TCS≥70</div>
                <div>Medium: ≥3 signals, TCS≥50</div>
                <div>Low: &lt;3 signals or TCS&lt;50</div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Signal Sources</h4>
              <div className="text-sm text-gray-600">
                Google Trends, TikTok, Sephora, Amazon, Yelp, Korean platforms
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Self-Improvement</h4>
              <div className="text-sm text-gray-600">
                Weekly backtesting and weight updates for accuracy
              </div>
            </div>
          </div>
        </div>

        {/* Enterprise CTA */}
        <div className="mt-12 text-center bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Enterprise K-Culture Intelligence</h2>
          <p className="text-xl mb-8 opacity-90">
            Get 3-6 months time arbitrage for your investment and launch decisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold hover:bg-indigo-50 transition-colors">
              Schedule Enterprise Demo
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors">
              Download Sample Report
            </button>
          </div>
          <p className="mt-6 text-sm opacity-75">
            Starting at $2K/month • Enterprise pricing available • 99.5% uptime SLA
          </p>
        </div>
      </div>
    </div>
  )
}