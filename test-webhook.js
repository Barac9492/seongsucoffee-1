// Test script for Zapier webhook
const testWebhook = async () => {
  const webhookUrl = process.env.ZAPIER_WEBHOOK_1 || 'YOUR_WEBHOOK_URL_HERE';
  
  const testData = {
    name: 'Test User',
    email: 'test@coffeeshop.com',
    shopName: 'Test Coffee Shop',
    shopSize: '50-100',
    willingness: '20-50',
    source: 'webhook-test',
    subscribedAt: new Date().toISOString(),
    timestamp: new Date().toISOString()
  };
  
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testData)
    });
    
    console.log('✅ Webhook test sent!');
    console.log('Check your Google Sheet for the test data');
    console.log('Response status:', response.status);
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
};

testWebhook();
