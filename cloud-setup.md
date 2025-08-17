# Cloud Deployment Guide

## Option A: Vercel Postgres (Recommended)

1. **Create Vercel Postgres Database**:
   ```bash
   # In your Vercel dashboard
   # Go to Storage > Create Database > Postgres
   # Copy connection strings
   ```

2. **Update .env for production**:
   ```
   POSTGRES_URL="postgresql://user:pass@hostname:5432/database"
   POSTGRES_PRISMA_URL="postgresql://user:pass@hostname:5432/database?pgbouncer=true"
   ```

## Option B: Supabase (Alternative)

1. **Create Supabase Project**:
   - Go to supabase.com
   - Create new project
   - Copy connection string from Settings > Database

2. **Connection String Format**:
   ```
   postgresql://postgres:[PASSWORD]@db.[PROJECT_ID].supabase.co:5432/postgres
   ```

## Cloud Agent Deployment Options

### Option 1: Railway (Easiest)
- Connect GitHub repo
- Set environment variables
- Automatic deployment from git pushes
- Built-in cron scheduling

### Option 2: Google Cloud Run + Cloud Scheduler
- Docker container deployment
- Serverless scaling
- Cloud Scheduler for cron jobs

### Option 3: AWS ECS + EventBridge
- Container deployment
- Event-driven scheduling
- High availability

## Recommended: Railway + Vercel Postgres
- Simple setup
- Automatic scaling
- Built-in monitoring
- Cost-effective for MVP