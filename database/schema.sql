-- Korean Coffee Trend Scout Database Schema
-- ML-Driven Trend Intelligence Platform

-- Core trends table with business intelligence
CREATE TABLE trends (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    name_kr VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    
    -- Discovery metadata
    first_detected TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    discovery_source VARCHAR(50), -- 'manual', 'youtube_api', 'instagram_api', 'tiktok_api', 'naver_api'
    discovery_confidence DECIMAL(3,2), -- 0.00 to 1.00
    
    -- Current status
    stage VARCHAR(20) DEFAULT 'discovery', -- 'discovery', 'early', 'growth', 'peak', 'decline'
    status VARCHAR(20) DEFAULT 'active', -- 'active', 'archived', 'rejected'
    
    -- Business intelligence (manually curated)
    success_probability INTEGER, -- 0-100
    market_readiness VARCHAR(20), -- 'Low', 'Medium', 'High'
    competitor_risk VARCHAR(20), -- 'Low', 'Medium', 'High'
    historical_precedent TEXT,
    time_to_global VARCHAR(50),
    
    -- Recipe and business data (JSON for flexibility)
    recipe JSONB,
    suppliers JSONB,
    pricing JSONB,
    training JSONB,
    
    -- ML predictions
    ml_success_prediction DECIMAL(3,2), -- ML calculated success probability
    ml_confidence_score DECIMAL(3,2), -- How confident the ML model is
    ml_trend_stage VARCHAR(20), -- ML predicted current stage
    ml_peak_prediction DATE, -- When ML predicts trend will peak
    ml_last_updated TIMESTAMP WITH TIME ZONE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Time series data for trend signals
CREATE TABLE trend_signals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    trend_id UUID REFERENCES trends(id) ON DELETE CASCADE,
    
    -- Timestamp and source
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    source VARCHAR(50) NOT NULL, -- 'manual', 'youtube_api', 'instagram_api', 'tiktok_api', 'naver_api'
    source_confidence DECIMAL(3,2) DEFAULT 1.00,
    
    -- Core metrics
    growth_rate DECIMAL(5,2), -- Percentage growth
    social_mentions INTEGER DEFAULT 0,
    search_volume INTEGER DEFAULT 0,
    cafes_serving INTEGER DEFAULT 0,
    
    -- Platform-specific metrics
    youtube_videos INTEGER DEFAULT 0,
    youtube_views BIGINT DEFAULT 0,
    instagram_posts INTEGER DEFAULT 0,
    instagram_engagement BIGINT DEFAULT 0,
    tiktok_videos INTEGER DEFAULT 0,
    tiktok_views BIGINT DEFAULT 0,
    naver_blog_posts INTEGER DEFAULT 0,
    naver_search_rank INTEGER,
    
    -- Geographic data
    primary_districts TEXT[], -- Korean districts where trend is popular
    geographic_spread INTEGER DEFAULT 1, -- Number of cities/regions
    
    -- Additional context
    notes TEXT,
    raw_data JSONB, -- Store full API responses
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Social media content tracking
CREATE TABLE social_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    trend_id UUID REFERENCES trends(id) ON DELETE CASCADE,
    
    -- Content identification
    platform VARCHAR(20) NOT NULL, -- 'youtube', 'instagram', 'tiktok', 'naver'
    platform_id VARCHAR(255) NOT NULL, -- Video ID, post ID, etc.
    url TEXT,
    
    -- Content metadata
    title TEXT,
    description TEXT,
    author VARCHAR(255),
    author_id VARCHAR(255),
    posted_at TIMESTAMP WITH TIME ZONE,
    
    -- Engagement metrics
    views BIGINT DEFAULT 0,
    likes INTEGER DEFAULT 0,
    comments INTEGER DEFAULT 0,
    shares INTEGER DEFAULT 0,
    
    -- Content analysis
    language VARCHAR(10) DEFAULT 'ko',
    contains_recipe BOOLEAN DEFAULT FALSE,
    contains_ingredients BOOLEAN DEFAULT FALSE,
    sentiment_score DECIMAL(3,2), -- -1.00 to 1.00
    
    -- ML features
    ml_relevance_score DECIMAL(3,2), -- How relevant to the trend
    ml_influence_score DECIMAL(3,2), -- How influential this content is
    ml_authenticity_score DECIMAL(3,2), -- How authentic/not-promotional
    
    -- Tracking
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(platform, platform_id)
);

-- ML model predictions and training data
CREATE TABLE ml_predictions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    trend_id UUID REFERENCES trends(id) ON DELETE CASCADE,
    
    -- Model information
    model_version VARCHAR(50) NOT NULL,
    model_type VARCHAR(50) NOT NULL, -- 'success_prediction', 'stage_classification', 'peak_timing'
    
    -- Prediction details
    prediction_value DECIMAL(10,4), -- The actual prediction
    confidence_score DECIMAL(3,2), -- How confident the model is
    prediction_date DATE, -- What date this prediction is for (if applicable)
    
    -- Input features used
    features_used JSONB, -- Store feature names and values used
    feature_importance JSONB, -- Store feature importance scores
    
    -- Validation
    actual_value DECIMAL(10,4), -- Actual outcome (filled in later)
    prediction_error DECIMAL(10,4), -- Difference between predicted and actual
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- API data sources and rate limiting
CREATE TABLE data_sources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    platform VARCHAR(50) NOT NULL,
    
    -- API configuration
    api_endpoint TEXT,
    api_key_hash VARCHAR(255), -- Hashed API key for security
    rate_limit_per_hour INTEGER,
    rate_limit_per_day INTEGER,
    
    -- Usage tracking
    requests_today INTEGER DEFAULT 0,
    requests_this_hour INTEGER DEFAULT 0,
    last_request_at TIMESTAMP WITH TIME ZONE,
    
    -- Health monitoring
    status VARCHAR(20) DEFAULT 'active', -- 'active', 'rate_limited', 'error', 'disabled'
    last_error TEXT,
    last_error_at TIMESTAMP WITH TIME ZONE,
    success_rate DECIMAL(3,2) DEFAULT 1.00,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User feedback and manual corrections
CREATE TABLE user_feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    trend_id UUID REFERENCES trends(id) ON DELETE CASCADE,
    
    -- Feedback details
    feedback_type VARCHAR(50), -- 'success_correction', 'stage_correction', 'quality_rating'
    original_value DECIMAL(10,4),
    corrected_value DECIMAL(10,4),
    feedback_text TEXT,
    
    -- User context
    user_role VARCHAR(50), -- 'admin', 'expert', 'community'
    user_confidence INTEGER, -- 1-5 rating of user's confidence
    
    -- ML training usage
    used_for_training BOOLEAN DEFAULT FALSE,
    training_weight DECIMAL(3,2) DEFAULT 1.00, -- How much to weight this feedback
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_trends_stage ON trends(stage);
CREATE INDEX idx_trends_discovery_source ON trends(discovery_source);
CREATE INDEX idx_trends_ml_last_updated ON trends(ml_last_updated);

CREATE INDEX idx_trend_signals_trend_id ON trend_signals(trend_id);
CREATE INDEX idx_trend_signals_recorded_at ON trend_signals(recorded_at);
CREATE INDEX idx_trend_signals_source ON trend_signals(source);

CREATE INDEX idx_social_content_trend_id ON social_content(trend_id);
CREATE INDEX idx_social_content_platform ON social_content(platform);
CREATE INDEX idx_social_content_posted_at ON social_content(posted_at);

CREATE INDEX idx_ml_predictions_trend_id ON ml_predictions(trend_id);
CREATE INDEX idx_ml_predictions_model_type ON ml_predictions(model_type);
CREATE INDEX idx_ml_predictions_created_at ON ml_predictions(created_at);

-- Functions for automatic updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_trends_updated_at BEFORE UPDATE ON trends
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_data_sources_updated_at BEFORE UPDATE ON data_sources
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();