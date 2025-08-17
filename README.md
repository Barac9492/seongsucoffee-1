# Seongsu Coffee & Bakery Forecast Agent

An MVP forecasting agent that collects attention signals and demand proxies for popular cafés and bakeries in Seoul's Seongsu district.

## Overview

This agent gathers predictive signals to model the relationship between online attention (Google Trends, YouTube, social media) and real-world demand (busyness, queues) at ~20 popular Seongsu venues.

### Key Features

- **Google Trends**: Web and YouTube search indices for coffee/bakery keywords
- **YouTube Geo API**: Videos posted near Seongsu with view counts
- **Google Maps Scraper**: Live busyness and popular times (via Playwright)
- **Signal Processing**: Normalized D/O/C/S indices for ML modeling
- **PostgreSQL Storage**: Time-series data optimized for backtesting

## Quick Start

### 1. Clone and Setup

```bash
git clone <repo>
cd seongsu-coffee-forecast
cp .env.example .env
# Edit .env with your API keys
```

### 2. Local Development

```bash
# Install dependencies
python -m venv venv
source venv/bin/activate  # or `venv\Scripts\activate` on Windows
pip install -r requirements.txt

# Install Playwright browsers
playwright install chromium

# Setup PostgreSQL
docker run -d \
  --name seongsu_postgres \
  -e POSTGRES_DB=seongsu_forecast \
  -e POSTGRES_USER=forecast_user \
  -e POSTGRES_PASSWORD=changeme \
  -p 5432:5432 \
  postgres:16-alpine

# Run agent
python agent.py config.yaml
```

### 3. Docker Deployment

```bash
# Start all services
docker-compose up -d

# Check logs
docker-compose logs -f agent

# Run manually
docker-compose exec agent python agent.py
```

## Configuration

Edit `config.yaml` to customize:

- **Keywords**: Terms to track in Google Trends
- **Venues**: Cafés/bakeries to monitor (add place_id for better accuracy)
- **Collection settings**: API limits, scraping parameters
- **Signal processing**: Normalization methods, index weights

## Data Schema

### signals_raw
- Raw time-series data from all sources
- ~100-500 rows per hour depending on active sources

### features_daily
- Computed D/O/C/S indices per venue
- One row per venue per day

### labels
- Ground truth surge events for model training
- Populated from busyness percentiles

## API Keys Required

1. **YouTube Data API v3**
   - Get from [Google Cloud Console](https://console.cloud.google.com)
   - Enable YouTube Data API v3
   - Create API key

2. **Naver DataLab** (Optional)
   - Register at [Naver Developers](https://developers.naver.com)
   - Create application for Search Trends API

## Signal Indices

- **D-Index (Dopamine)**: Novelty velocity from search/video spikes
- **O-Index (Oxytocin)**: Social density from busyness/queues
- **C-Index (Cortisol)**: Urgency from time patterns/scarcity
- **S-Index (Serotonin)**: Satisfaction from reviews/photos

## Monitoring

```sql
-- Check recent runs
SELECT * FROM runs_log 
ORDER BY started_at DESC 
LIMIT 10;

-- View signal distribution
SELECT source, COUNT(*) as cnt, MAX(timestamp) as latest
FROM signals_raw
GROUP BY source;

-- Check venue features
SELECT venue_id, date, d_index, o_index, c_index, s_index
FROM features_daily
WHERE date >= CURRENT_DATE - INTERVAL '7 days'
ORDER BY d_index DESC;
```

## Deployment

### Cron Schedule

The agent runs hourly by default. Adjust in `crontab`:

```cron
# Every hour at :15
15 * * * * cd /app && python agent.py

# Every 30 minutes (higher frequency)
*/30 * * * * cd /app && python agent.py
```

### Production Checklist

- [ ] Set strong PostgreSQL password
- [ ] Configure log rotation
- [ ] Set up monitoring alerts
- [ ] Enable SSL for database
- [ ] Implement retry logic for API failures
- [ ] Add data validation checks
- [ ] Set up backup schedule

## Next Steps

1. **Add Instagram/TikTok scrapers** (carefully, with rate limits)
2. **Build IndexBuilder** to compute sophisticated D/O/C/S scores
3. **Create Labeler** to generate surge labels from percentiles
4. **Train Forecaster** with XGBoost/LightGBM + isotonic calibration
5. **Deploy dashboard** for real-time signal monitoring

## License

MIT

## Contributing

Pull requests welcome! Please ensure:
- Code follows PEP 8
- Add tests for new collectors
- Update config.yaml.example
- Document new signals in README