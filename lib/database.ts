// Database connection and ML data models
import { Pool } from 'pg'

// Database connection
let pool: Pool | null = null

export function getPool(): Pool {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    })
  }
  return pool
}

// Types for ML-enhanced trend data
export interface TrendSignal {
  id: string
  trendId: string
  recordedAt: Date
  source: 'manual' | 'youtube_api' | 'instagram_api' | 'tiktok_api' | 'naver_api'
  sourceConfidence: number
  
  // Core metrics
  growthRate: number
  socialMentions: number
  searchVolume: number
  cafesServing: number
  
  // Platform-specific metrics
  youtubeVideos: number
  youtubeViews: number
  instagramPosts: number
  instagramEngagement: number
  tiktokVideos: number
  tiktokViews: number
  naverBlogPosts: number
  naverSearchRank: number | null
  
  // Geographic data
  primaryDistricts: string[]
  geographicSpread: number
  
  // Context
  notes?: string
  rawData?: any
}

export interface MLPrediction {
  id: string
  trendId: string
  modelVersion: string
  modelType: 'success_prediction' | 'stage_classification' | 'peak_timing'
  predictionValue: number
  confidenceScore: number
  predictionDate?: Date
  featuresUsed: Record<string, any>
  featureImportance: Record<string, number>
  actualValue?: number
  predictionError?: number
  createdAt: Date
}

export interface SocialContent {
  id: string
  trendId: string
  platform: 'youtube' | 'instagram' | 'tiktok' | 'naver'
  platformId: string
  url?: string
  title?: string
  description?: string
  author?: string
  authorId?: string
  postedAt?: Date
  
  // Engagement metrics
  views: number
  likes: number
  comments: number
  shares: number
  
  // Content analysis
  language: string
  containsRecipe: boolean
  containsIngredients: boolean
  sentimentScore?: number
  
  // ML features
  mlRelevanceScore?: number
  mlInfluenceScore?: number
  mlAuthenticityScore?: number
  
  lastUpdated: Date
}

export interface EnhancedTrend {
  id: string
  name: string
  nameKr: string
  slug: string
  
  // Discovery metadata
  firstDetected: Date
  discoverySource: string
  discoveryConfidence?: number
  
  // Current status
  stage: 'discovery' | 'early' | 'growth' | 'peak' | 'decline'
  status: 'active' | 'archived' | 'rejected'
  
  // Business intelligence (manual)
  successProbability?: number
  marketReadiness?: 'Low' | 'Medium' | 'High'
  competitorRisk?: 'Low' | 'Medium' | 'High'
  historicalPrecedent?: string
  timeToGlobal?: string
  
  // Recipe and business data
  recipe?: any
  suppliers?: any
  pricing?: any
  training?: any
  
  // ML predictions
  mlSuccessPrediction?: number
  mlConfidenceScore?: number
  mlTrendStage?: string
  mlPeakPrediction?: Date
  mlLastUpdated?: Date
  
  createdAt: Date
  updatedAt: Date
  
  // Related data
  signals?: TrendSignal[]
  socialContent?: SocialContent[]
  predictions?: MLPrediction[]
}

// Database operations for ML data
export class MLDataService {
  private pool: Pool

  constructor() {
    this.pool = getPool()
  }

  // Store new trend signal
  async addTrendSignal(signal: Omit<TrendSignal, 'id'>): Promise<TrendSignal> {
    const query = `
      INSERT INTO trend_signals (
        trend_id, recorded_at, source, source_confidence,
        growth_rate, social_mentions, search_volume, cafes_serving,
        youtube_videos, youtube_views, instagram_posts, instagram_engagement,
        tiktok_videos, tiktok_views, naver_blog_posts, naver_search_rank,
        primary_districts, geographic_spread, notes, raw_data
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)
      RETURNING *
    `
    
    const values = [
      signal.trendId, signal.recordedAt, signal.source, signal.sourceConfidence,
      signal.growthRate, signal.socialMentions, signal.searchVolume, signal.cafesServing,
      signal.youtubeVideos, signal.youtubeViews, signal.instagramPosts, signal.instagramEngagement,
      signal.tiktokVideos, signal.tiktokViews, signal.naverBlogPosts, signal.naverSearchRank,
      signal.primaryDistricts, signal.geographicSpread, signal.notes, signal.rawData
    ]
    
    const result = await this.pool.query(query, values)
    return this.mapSignalRow(result.rows[0])
  }

  // Store ML prediction
  async storePrediction(prediction: Omit<MLPrediction, 'id' | 'createdAt'>): Promise<MLPrediction> {
    const query = `
      INSERT INTO ml_predictions (
        trend_id, model_version, model_type, prediction_value,
        confidence_score, prediction_date, features_used, feature_importance
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `
    
    const values = [
      prediction.trendId, prediction.modelVersion, prediction.modelType,
      prediction.predictionValue, prediction.confidenceScore, prediction.predictionDate,
      JSON.stringify(prediction.featuresUsed), JSON.stringify(prediction.featureImportance)
    ]
    
    const result = await this.pool.query(query, values)
    return this.mapPredictionRow(result.rows[0])
  }

  // Get trend with all ML data
  async getTrendWithMLData(trendId: string): Promise<EnhancedTrend | null> {
    const trendQuery = `SELECT * FROM trends WHERE id = $1`
    const signalsQuery = `SELECT * FROM trend_signals WHERE trend_id = $1 ORDER BY recorded_at DESC`
    const predictionsQuery = `SELECT * FROM ml_predictions WHERE trend_id = $1 ORDER BY created_at DESC`
    const contentQuery = `SELECT * FROM social_content WHERE trend_id = $1 ORDER BY posted_at DESC`
    
    const [trendResult, signalsResult, predictionsResult, contentResult] = await Promise.all([
      this.pool.query(trendQuery, [trendId]),
      this.pool.query(signalsQuery, [trendId]),
      this.pool.query(predictionsQuery, [trendId]),
      this.pool.query(contentQuery, [trendId])
    ])
    
    if (trendResult.rows.length === 0) return null
    
    const trend = this.mapTrendRow(trendResult.rows[0])
    trend.signals = signalsResult.rows.map(this.mapSignalRow)
    trend.predictions = predictionsResult.rows.map(this.mapPredictionRow)
    trend.socialContent = contentResult.rows.map(this.mapContentRow)
    
    return trend
  }

  // Get trends with ML insights for dashboard
  async getTrendsWithMLInsights(): Promise<EnhancedTrend[]> {
    const query = `
      SELECT 
        t.*,
        COUNT(DISTINCT ts.id) as signal_count,
        COUNT(DISTINCT sc.id) as content_count,
        MAX(ts.recorded_at) as last_signal_at,
        AVG(mp.confidence_score) as avg_ml_confidence
      FROM trends t
      LEFT JOIN trend_signals ts ON t.id = ts.trend_id
      LEFT JOIN social_content sc ON t.id = sc.trend_id
      LEFT JOIN ml_predictions mp ON t.id = mp.trend_id
      WHERE t.status = 'active'
      GROUP BY t.id
      ORDER BY t.ml_success_prediction DESC NULLS LAST, t.updated_at DESC
    `
    
    const result = await this.pool.query(query)
    return result.rows.map(this.mapTrendRow)
  }

  // Store social media content
  async storeSocialContent(content: Omit<SocialContent, 'id' | 'lastUpdated'>): Promise<SocialContent> {
    const query = `
      INSERT INTO social_content (
        trend_id, platform, platform_id, url, title, description,
        author, author_id, posted_at, views, likes, comments, shares,
        language, contains_recipe, contains_ingredients, sentiment_score,
        ml_relevance_score, ml_influence_score, ml_authenticity_score
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)
      ON CONFLICT (platform, platform_id) 
      DO UPDATE SET
        views = EXCLUDED.views,
        likes = EXCLUDED.likes,
        comments = EXCLUDED.comments,
        shares = EXCLUDED.shares,
        last_updated = NOW()
      RETURNING *
    `
    
    const values = [
      content.trendId, content.platform, content.platformId, content.url,
      content.title, content.description, content.author, content.authorId,
      content.postedAt, content.views, content.likes, content.comments, content.shares,
      content.language, content.containsRecipe, content.containsIngredients,
      content.sentimentScore, content.mlRelevanceScore, content.mlInfluenceScore,
      content.mlAuthenticityScore
    ]
    
    const result = await this.pool.query(query, values)
    return this.mapContentRow(result.rows[0])
  }

  // Helper methods to map database rows to TypeScript objects
  private mapTrendRow(row: any): EnhancedTrend {
    return {
      id: row.id,
      name: row.name,
      nameKr: row.name_kr,
      slug: row.slug,
      firstDetected: row.first_detected,
      discoverySource: row.discovery_source,
      discoveryConfidence: row.discovery_confidence,
      stage: row.stage,
      status: row.status,
      successProbability: row.success_probability,
      marketReadiness: row.market_readiness,
      competitorRisk: row.competitor_risk,
      historicalPrecedent: row.historical_precedent,
      timeToGlobal: row.time_to_global,
      recipe: row.recipe,
      suppliers: row.suppliers,
      pricing: row.pricing,
      training: row.training,
      mlSuccessPrediction: row.ml_success_prediction,
      mlConfidenceScore: row.ml_confidence_score,
      mlTrendStage: row.ml_trend_stage,
      mlPeakPrediction: row.ml_peak_prediction,
      mlLastUpdated: row.ml_last_updated,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    }
  }

  private mapSignalRow(row: any): TrendSignal {
    return {
      id: row.id,
      trendId: row.trend_id,
      recordedAt: row.recorded_at,
      source: row.source,
      sourceConfidence: row.source_confidence,
      growthRate: row.growth_rate,
      socialMentions: row.social_mentions,
      searchVolume: row.search_volume,
      cafesServing: row.cafes_serving,
      youtubeVideos: row.youtube_videos,
      youtubeViews: row.youtube_views,
      instagramPosts: row.instagram_posts,
      instagramEngagement: row.instagram_engagement,
      tiktokVideos: row.tiktok_videos,
      tiktokViews: row.tiktok_views,
      naverBlogPosts: row.naver_blog_posts,
      naverSearchRank: row.naver_search_rank,
      primaryDistricts: row.primary_districts,
      geographicSpread: row.geographic_spread,
      notes: row.notes,
      rawData: row.raw_data
    }
  }

  private mapPredictionRow(row: any): MLPrediction {
    return {
      id: row.id,
      trendId: row.trend_id,
      modelVersion: row.model_version,
      modelType: row.model_type,
      predictionValue: row.prediction_value,
      confidenceScore: row.confidence_score,
      predictionDate: row.prediction_date,
      featuresUsed: row.features_used,
      featureImportance: row.feature_importance,
      actualValue: row.actual_value,
      predictionError: row.prediction_error,
      createdAt: row.created_at
    }
  }

  private mapContentRow(row: any): SocialContent {
    return {
      id: row.id,
      trendId: row.trend_id,
      platform: row.platform,
      platformId: row.platform_id,
      url: row.url,
      title: row.title,
      description: row.description,
      author: row.author,
      authorId: row.author_id,
      postedAt: row.posted_at,
      views: row.views,
      likes: row.likes,
      comments: row.comments,
      shares: row.shares,
      language: row.language,
      containsRecipe: row.contains_recipe,
      containsIngredients: row.contains_ingredients,
      sentimentScore: row.sentiment_score,
      mlRelevanceScore: row.ml_relevance_score,
      mlInfluenceScore: row.ml_influence_score,
      mlAuthenticityScore: row.ml_authenticity_score,
      lastUpdated: row.last_updated
    }
  }
}