# 📧 Order Confirmation Setup Guide

This guide explains how to configure email and WhatsApp notifications for order confirmations.

## Overview

When a customer places an order, the system will automatically send:
1. **Email Confirmation** - Beautiful HTML email with order details
2. **WhatsApp Message** - Order confirmation via WhatsApp (requires Twilio)

## Configuration Steps

### 1. Email Configuration (Gmail - FREE)

#### Step 1: Enable 2-Factor Authentication on Gmail
1. Go to your Google Account: https://myaccount.google.com/
2. Click on **Security** in the left sidebar
3. Under "Signing in to Google", click **2-Step Verification**
4. Follow the steps to enable 2FA

#### Step 2: Generate App Password
1. After enabling 2FA, go to: https://myaccount.google.com/apppasswords
2. Select **Mail** and your device
3. Click **Generate**
4. Copy the 16-character app password (e.g., `abcd efgh ijkl mnop`)
5. **Important**: Remove spaces from the password when using it

#### Step 3: Add to .env file
Create a `.env` file in the `backend` folder:

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=abcdefghijklmnop
```

### 2. WhatsApp Configuration (Twilio - PAID)

#### Step 1: Create Twilio Account
1. Go to https://console.twilio.com/
2. Sign up for a free account
3. Verify your email and phone number

#### Step 2: Get Credentials
1. Go to **Dashboard** → **Settings** → **General**
2. Copy your **Account SID**
3. Copy your **Auth Token** (click "Show")

#### Step 3: Get WhatsApp Enabled Number
1. Go to **Messaging** → **Try it out** → **Send a WhatsApp message**
2. Follow the setup wizard
3. Get your Twilio WhatsApp number (e.g., `+14155238886`)

#### Step 4: Add to .env file
```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=+1234567890
```

### 3. Complete .env Example

Here's a complete `.env` file for the backend:

```env
# Email Configuration (Gmail)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# WhatsApp Configuration (Twilio)
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=+1234567890

# Telegram Configuration (SOS Alerts - FREE)
TELEGRAM_BOT_TOKEN=your_telegram_bot_token

# Server Configuration
PORT=3001
CORS_ORIGIN=http://localhost:5173
```

## Testing

### 1. Start the Backend Server

```bash
cd backend
npm start
```

You should see:
```
🚀 Suraksha Backend Server
📡 Running on http://localhost:3001
📧 Email: ✅ Configured
💬 WhatsApp: ✅ Configured
📱 Telegram: ✅ Configured

✅ Ready to send SOS alerts and order confirmations!
```

### 2. Test Order Placement

1. Start the frontend: `npm run dev`
2. Navigate to **Get Device** page
3. Fill in the order form
4. Place an order
5. Check your email and WhatsApp for confirmation

## API Endpoint

### POST /api/send-order-confirmation

**Request Body:**
```json
{
  "orderData": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+919876543210",
    "address": "123 Main St",
    "city": "Mumbai",
    "pincode": "400001",
    "paymentMethod": "cod"
  },
  "selectedPlan": {
    "id": "pro",
    "name": "Suraksha Pro",
    "price": "₹2,499",
    "features": ["Feature 1", "Feature 2"]
  },
  "orderNumber": "SURAKSHA-ABC12345"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Order confirmation processed",
  "emailSent": true,
  "whatsappSent": true,
  "details": {
    "email": {
      "success": true,
      "to": "john@example.com"
    },
    "whatsapp": {
      "success": true,
      "to": "+919876543210"
    }
  }
}
```

## Troubleshooting

### Email Not Sending

1. **Check App Password**: Make sure you're using the app password, not your regular Gmail password
2. **Remove Spaces**: App passwords have spaces - remove them when copying
3. **Less Secure Apps**: For older Gmail accounts, you may need to enable "Less secure app access"
4. **Check Console**: Look for error messages in the backend console

### WhatsApp Not Sending

1. **Twilio Credits**: Make sure you have credits in your Twilio account
2. **WhatsApp Sandbox**: In development, use the Twilio WhatsApp sandbox
3. **Phone Format**: Ensure phone numbers include country code (e.g., +91 for India)
4. **Check Console**: Look for error messages in the backend console

### Both Email and WhatsApp Fail

1. **Backend Running**: Ensure the backend server is running on port 3001
2. **CORS Issues**: Check that `CORS_ORIGIN` matches your frontend URL
3. **Network Issues**: Verify the frontend can reach the backend API

## Free Alternative (Development Only)

If you don't want to configure Twilio for development, you can use the WhatsApp link feature already built into the success page. Customers can click "Contact on WhatsApp" to manually send a message.

## Security Notes

- Never commit your `.env` file to Git
- Keep your API keys and passwords secure
- Use environment variables in production
- Rotate your credentials regularly

## Support

For issues or questions:
- Email: support@suraksha.com
- Phone: +91 93695 08929
