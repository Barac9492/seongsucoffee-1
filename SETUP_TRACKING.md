# Setup Tracking for Coffee Trends Weekly

## Quick Setup (5 minutes)

### 1. Google Analytics
1. Go to https://analytics.google.com
2. Create new property for "Coffee Trends Weekly"
3. Get your Measurement ID (looks like G-XXXXXXXXXX)
4. Replace in `components/Analytics.tsx` line 11

### 2. Facebook Pixel
1. Go to https://business.facebook.com/events_manager
2. Create new Pixel for "Coffee Trends Weekly"
3. Get your Pixel ID (16-digit number)
4. Replace in `components/Analytics.tsx` line 36 and 43

### 3. Email Capture Webhook (Optional but Recommended)
1. Create free Zapier account at https://zapier.com
2. Create new Zap: Webhook → Google Sheets
3. Get webhook URL
4. Create `.env.local` file and add:
```
WEBHOOK_URL=your_zapier_webhook_url
```

### 4. Deploy
```bash
git add -A
git commit -m "Add tracking"
git push origin main
vercel --prod
```

## What You'll Track

- **Signups**: Name, email, shop size, willingness to pay
- **Sources**: Which page they signed up from
- **Ad Performance**: CPE (cost per email), conversion rates
- **Engagement**: Which trends get clicked most

## Testing Your Setup

1. Open Chrome DevTools (F12)
2. Go to Network tab
3. Submit a test signup
4. Look for:
   - "google-analytics.com" request
   - "facebook.com/tr" request
   - Your webhook URL (if configured)

## First Week Metrics to Watch

- Cost per email (target: <$5)
- Signup conversion rate (target: >3%)
- Most clicked trend
- Geography distribution

---

Ready to launch ads when tracking confirmed working!