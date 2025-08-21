#!/bin/bash

echo "Setting up Zapier webhook for Google Sheets backup"
echo "=================================================="
echo ""
echo "Please enter your Zapier webhook URL"
echo "(It looks like: https://hooks.zapier.com/hooks/catch/12345678/abc123/)"
echo ""
read -p "Zapier Webhook URL: " WEBHOOK_URL

# Add to .env.local for local testing
echo "ZAPIER_WEBHOOK_1=$WEBHOOK_URL" >> .env.local

echo ""
echo "✅ Added to .env.local"
echo ""
echo "Now add this to Vercel:"
echo "vercel env add ZAPIER_WEBHOOK_1 production"
echo ""
echo "Then paste: $WEBHOOK_URL"
