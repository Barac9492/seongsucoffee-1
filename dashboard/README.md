# Seongsu Coffee Dashboard

Real-time web dashboard for the Seongsu Coffee Forecast Agent data.

## Features

- 📊 Live signal monitoring (Google Trends, YouTube, Maps busyness)
- 🏪 Venue performance tracking with D/O/C/S indices
- 📈 Trending keywords and queue analysis
- ✅ System health monitoring

## Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Barac9492/seongsucoffee-1/tree/main/dashboard)

### Setup Steps

1. **Click Deploy button above**
2. **Add environment variable**:
   - `POSTGRES_URL`: Connection string to your forecast database
3. **Deploy!**

### Database Setup

The dashboard reads from the same PostgreSQL database as the agent. Make sure your database is accessible from Vercel (use connection pooling).

Example connection string:
```
POSTGRES_URL="postgres://user:pass@hostname:5432/seongsu_forecast"
```

### Local Development

```bash
cd dashboard
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the dashboard.

## Architecture

```
Agent (Docker/Server) → PostgreSQL ← Dashboard (Vercel)
     ↓                      ↑              ↓
Data Collection         Database      Web Interface
```

The dashboard is read-only and visualizes data collected by the main agent.