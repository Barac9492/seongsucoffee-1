-- Initialize Seongsu Forecast Database

-- Create schema if needed
CREATE SCHEMA IF NOT EXISTS public;

-- Grant permissions
GRANT ALL ON SCHEMA public TO forecast_user;

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";  -- For text search

-- Optional: Create read-only user for dashboards
CREATE USER dashboard_user WITH PASSWORD 'readonly_pass';
GRANT CONNECT ON DATABASE seongsu_forecast TO dashboard_user;
GRANT USAGE ON SCHEMA public TO dashboard_user;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO dashboard_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO dashboard_user;

-- Create indexes for common queries (after tables are created by agent)
-- These will be created automatically by agent.py but included here for reference
/*
CREATE INDEX IF NOT EXISTS idx_signals_source_metric 
ON signals_raw(source, metric);

CREATE INDEX IF NOT EXISTS idx_signals_venue_timestamp 
ON signals_raw(entity_id, timestamp) 
WHERE entity_type = 'venue';

CREATE INDEX IF NOT EXISTS idx_features_recent 
ON features_daily(date DESC, venue_id);
*/