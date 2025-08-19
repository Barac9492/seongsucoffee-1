import { NextRequest, NextResponse } from 'next/server'

// Admin-only database operations for data extraction
export async function GET(request: NextRequest) {
  try {
    // Simple admin check (in production, use proper authentication)
    const { searchParams } = new URL(request.url)
    const adminKey = searchParams.get('admin_key')
    
    if (adminKey !== 'korean_trend_scout_admin_2024') {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 401 }
      )
    }

    const action = searchParams.get('action')

    switch (action) {
      case 'export_videos':
        return exportVideos()
      case 'export_trends':
        return exportTrends()
      case 'export_signals':
        return exportSignals()
      default:
        return NextResponse.json({
          message: 'Korean Trend Scout Admin Database API',
          available_actions: [
            'export_videos - Export all video data',
            'export_trends - Export all trend data', 
            'export_signals - Export all signal data'
          ],
          usage: 'GET /api/admin/database?action=export_videos&admin_key=korean_trend_scout_admin_2024'
        })
    }

  } catch (error) {
    console.error('Database API error:', error)
    return NextResponse.json(
      { error: 'Database operation failed' },
      { status: 500 }
    )
  }
}

// Export video data (admin added videos + existing ones)
async function exportVideos() {
  // In production, this would query the PostgreSQL database
  // For now, return structure for manual data collection
  
  const videoData = {
    metadata: {
      exported_at: new Date().toISOString(),
      source: 'korean_trend_scout_admin',
      version: '1.0'
    },
    videos: [
      // Example structure - admin videos would be collected here
      {
        id: 'admin_001',
        trend_id: '1',
        trend_name: 'Cream Cheese Foam Coffee',
        youtube_id: 'dQw4w9WgXcQ',
        title: 'Korean Cafe Cream Cheese Coffee Tutorial',
        channel: 'Seoul Coffee Lab',
        added_via: 'admin_panel',
        added_at: '2024-12-19',
        ml_relevance_score: null,
        manual_verification: 'pending'
      }
    ],
    admin_notes: [
      'Videos added via admin panel are stored here for ML training',
      'Manual verification needed before adding to main trend data',
      'Use this data to update app/api/coffee-trends/route.ts videoProof arrays'
    ]
  }

  return NextResponse.json(videoData)
}

// Export trend data with ML features
async function exportTrends() {
  const trendData = {
    metadata: {
      exported_at: new Date().toISOString(),
      ml_features_included: true,
      manual_curation_included: true
    },
    trends: [
      {
        id: '1',
        name: 'Cream Cheese Foam Coffee',
        manual_success_probability: 87,
        ml_predicted_success: null, // Would be calculated by ML models
        social_signals: {
          youtube_mentions: 127,
          instagram_posts: 45,
          naver_searches: 890,
          manual_cafe_count: 127
        },
        business_intelligence: {
          recipe_completeness: 100,
          supplier_data_quality: 95,
          pricing_analysis: 90,
          training_materials: 85
        },
        prediction_confidence: null // ML model confidence
      }
    ],
    ml_training_features: [
      'social_mention_velocity',
      'geographic_spread_rate', 
      'ingredient_complexity',
      'historical_precedent_similarity',
      'manual_expert_rating'
    ]
  }

  return NextResponse.json(trendData)
}

// Export signal data for ML training
async function exportSignals() {
  const signalData = {
    metadata: {
      exported_at: new Date().toISOString(),
      signal_types: ['manual', 'youtube_api', 'instagram_api', 'naver_api'],
      time_range: '90_days'
    },
    signals: [
      {
        trend_id: '1',
        timestamp: '2024-12-19T04:00:00Z',
        source: 'manual',
        confidence: 1.0,
        metrics: {
          growth_rate: 423,
          social_mentions: 127,
          cafes_serving: 127,
          geographic_districts: ['Gangnam', 'Hongdae', 'Seongsu']
        }
      }
    ],
    feature_extraction_ready: true,
    ml_training_notes: [
      'Manual signals have highest confidence (1.0)',
      'API signals need validation and confidence scoring',
      'Time series analysis ready for trend stage classification',
      'Cross-validation with business outcomes needed'
    ]
  }

  return NextResponse.json(signalData)
}

// POST endpoint for storing admin data
export async function POST(request: NextRequest) {
  try {
    const { admin_key, action, data } = await request.json()
    
    if (admin_key !== 'korean_trend_scout_admin_2024') {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 401 }
      )
    }

    switch (action) {
      case 'store_video':
        return storeVideoData(data)
      case 'store_signal':
        return storeSignalData(data)
      case 'store_feedback':
        return storeFeedbackData(data)
      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        )
    }

  } catch (error) {
    console.error('Database store error:', error)
    return NextResponse.json(
      { error: 'Failed to store data' },
      { status: 500 }
    )
  }
}

async function storeVideoData(data: any) {
  // In production, this would insert into PostgreSQL
  // For now, log the data for manual collection
  
  console.log('ADMIN VIDEO DATA:', {
    timestamp: new Date().toISOString(),
    type: 'video_addition',
    data
  })

  return NextResponse.json({
    message: 'Video data stored for extraction',
    stored_at: new Date().toISOString(),
    data_id: `video_${Date.now()}`
  })
}

async function storeSignalData(data: any) {
  console.log('ADMIN SIGNAL DATA:', {
    timestamp: new Date().toISOString(),
    type: 'trend_signal',
    data
  })

  return NextResponse.json({
    message: 'Signal data stored for ML training',
    stored_at: new Date().toISOString(),
    data_id: `signal_${Date.now()}`
  })
}

async function storeFeedbackData(data: any) {
  console.log('ADMIN FEEDBACK DATA:', {
    timestamp: new Date().toISOString(),
    type: 'expert_feedback',
    data
  })

  return NextResponse.json({
    message: 'Feedback stored for model improvement',
    stored_at: new Date().toISOString(),
    data_id: `feedback_${Date.now()}`
  })
}