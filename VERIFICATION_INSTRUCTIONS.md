# Google Search Console Verification Instructions

## Method 1: HTML Tag (Recommended)

1. In Google Search Console, select "HTML tag" verification method
2. Copy the content value from the meta tag (example: "abc123xyz789...")
3. Edit app/layout.tsx and replace YOUR_GOOGLE_VERIFICATION_CODE with your code
4. Deploy to production
5. Click "Verify" in Google Search Console

## Method 2: HTML File Upload

If you prefer the HTML file method:

1. Download the HTML verification file from Google Search Console
2. Place it in the public/ folder of your project
3. Deploy to production
4. The file will be accessible at: https://coffeetrendsweekly.com/[filename].html
5. Click "Verify" in Google Search Console

## After Verification

1. Submit your sitemap: https://coffeetrendsweekly.com/sitemap.xml
2. Monitor performance in Google Search Console
3. Track keyword rankings for "korean coffee trends"

## Quick Deployment

After adding your verification code:
```bash
git add .
git commit -m "Add Google Search Console verification"
vercel --prod
```

Then verify in Google Search Console within 5 minutes.