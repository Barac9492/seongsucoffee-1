# 🚀 Production Deployment Guide

## Quick Deploy to Railway (Recommended)

### 1. Setup Cloud Database

**Option A: Vercel Postgres**
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Create new project or go to existing one
3. Go to Storage → Create Database → Postgres
4. Copy connection strings

**Option B: Supabase** 
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Go to Settings → Database → Connection string
4. Copy URI

### 2. Deploy Agent to Railway

1. **Connect Repository**:
   ```bash
   # Go to railway.app
   # Click "Deploy from GitHub repo"
   # Select: Barac9492/seongsucoffee-1
   ```

2. **Set Environment Variables**:
   ```
   POSTGRES_DSN=postgresql://your_connection_string
   YOUTUBE_API_KEY=your_youtube_api_key
   LOG_LEVEL=INFO
   
   # Optional: Alerts
   SLACK_WEBHOOK_URL=your_slack_webhook
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_app_password
   EMAIL_RECIPIENTS=alerts@yourcompany.com
   ```

3. **Configure Scheduling**:
   ```
   # Railway will auto-detect Dockerfile
   # Set start command: python scheduler.py
   ```

### 3. Connect Dashboard to Cloud DB

Update your Vercel dashboard environment:
```
POSTGRES_URL=your_cloud_connection_string
```

## Alternative: Google Cloud Run

### 1. Build & Deploy
```bash
# Build image
docker build -t seongsu-agent .

# Tag for GCR
docker tag seongsu-agent gcr.io/YOUR_PROJECT/seongsu-agent

# Push to registry
docker push gcr.io/YOUR_PROJECT/seongsu-agent

# Deploy to Cloud Run
gcloud run deploy seongsu-agent \
  --image gcr.io/YOUR_PROJECT/seongsu-agent \
  --platform managed \
  --region asia-northeast1
```

### 2. Set up Cloud Scheduler
```bash
# Create scheduler job
gcloud scheduler jobs create http seongsu-collector \
  --schedule="15 * * * *" \
  --uri="https://your-service-url/collect" \
  --http-method=POST
```

## Environment Variables Reference

### Required
```bash
POSTGRES_DSN=postgresql://user:pass@host:port/db
YOUTUBE_API_KEY=your_youtube_api_key_here
```

### Optional - Alerts
```bash
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_RECIPIENTS=alert1@company.com,alert2@company.com

# Alert thresholds
SPIKE_MULTIPLIER=2.0
SURGE_THRESHOLD=80
MIN_DATA_POINTS=10
LOOKBACK_HOURS=24
```

### Optional - Analysis
```bash
LOG_LEVEL=INFO
DRY_RUN=false
MAX_RETRIES=3
BATCH_SIZE=25
```

## Monitoring & Maintenance

### 1. Check Logs
```bash
# Railway: View in dashboard
# GCP: gcloud logs read
# Local: tail -f logs/scheduler.log
```

### 2. Monitor Data Collection
```sql
-- Check recent collections
SELECT source, COUNT(*), MAX(timestamp) 
FROM signals_raw 
WHERE timestamp > NOW() - INTERVAL '24 hours'
GROUP BY source;
```

### 3. Alert Health Check
```bash
# Test alerts manually
python alerts/surge_alerts.py
```

## Scaling Considerations

### Database
- **Small**: Vercel Postgres (free tier)
- **Medium**: Supabase Pro ($25/month)  
- **Large**: Google Cloud SQL or AWS RDS

### Compute
- **Light**: Railway Hobby ($5/month)
- **Medium**: Google Cloud Run (pay-per-use)
- **Heavy**: Dedicated VPS or Kubernetes

### Storage
- **7 days**: ~10MB (SQLite sufficient)
- **30 days**: ~50MB (PostgreSQL recommended)
- **1 year**: ~500MB (with retention policies)

## Security Checklist

- [ ] Use environment variables for all secrets
- [ ] Enable SSL for database connections
- [ ] Rotate API keys quarterly  
- [ ] Set up log retention policies
- [ ] Configure database backups
- [ ] Use least-privilege database user
- [ ] Monitor for unusual API usage

## Troubleshooting

### Common Issues

**1. YouTube API Quota Exceeded**
```bash
# Check quota usage in Google Cloud Console
# Consider reducing collection frequency
# Add retry logic with exponential backoff
```

**2. Database Connection Errors**
```bash
# Check connection string format
# Verify firewall/security group settings
# Test connection locally first
```

**3. Playwright Browser Crashes**
```bash
# Increase memory limits in deployment
# Add --no-sandbox flag for containers
# Monitor resource usage
```

**4. Missing Data**
```bash
# Check agent logs for errors
# Verify API keys are working
# Run manual collection test
```

### Performance Optimization

**1. Database**
```sql
-- Add indexes for common queries
CREATE INDEX idx_signals_timestamp ON signals_raw(timestamp);
CREATE INDEX idx_signals_entity ON signals_raw(entity_id, timestamp);
```

**2. Collection**
```python
# Reduce batch sizes if hitting rate limits
# Add jitter to avoid thundering herd
# Cache frequently accessed data
```

**3. Analysis**
```python
# Run analysis less frequently for historical data
# Use materialized views for complex queries
# Partition large tables by date
```

## Success Metrics

### Data Quality
- 95%+ successful collection runs
- <5% missing data points
- API rate limits not exceeded

### System Health  
- <2 minute average response time
- 99.5% uptime
- <1MB memory growth per day

### Business Value
- Alert accuracy >80%
- Surge predictions lead reality by 2-6 hours
- Dashboard page load <3 seconds

---

🎉 **Your Seongsu Coffee Intelligence System is now production-ready!**