# 🚨 SOS Alert Setup Guide - Suraksha

## Overview
This guide explains how to set up **actual SMS and Call notifications** to emergency contacts when SOS button is pressed.

---

## 📋 Two Modes Available

### Mode 1: **Backend Mode (Recommended)** ✅
- **Sends REAL SMS** to contacts' phones
- **Makes REAL Calls** to contacts
- Uses **Twilio API** via backend server
- Requires Twilio account (free trial available)

### Mode 2: **Frontend Mode (Fallback)** ⚠️
- Opens SMS app on user's device (doesn't send automatically)
- Opens phone dialer (user must press call)
- No backend required
- Works immediately but requires user action

---

## 🔧 Setup Instructions

### Option A: Backend Mode (Actual SMS & Calls)

#### Step 1: Create Twilio Account
1. Go to https://www.twilio.com/try-twilio
2. Sign up for free trial ($15 credit)
3. Verify your email and phone number

#### Step 2: Get Twilio Credentials
1. Go to https://console.twilio.com/
2. Copy your **Account SID** (starts with AC...)
3. Copy your **Auth Token**
4. Get a Twilio phone number (free in trial)

#### Step 3: Configure Backend
```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create .env file (already created)
# Edit backend/.env with your Twilio credentials:
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=+1234567890
```

#### Step 4: Configure Frontend
```bash
# Edit .env file in root directory:
VITE_USE_BACKEND=true
VITE_BACKEND_API_URL=http://localhost:3001
```

#### Step 5: Start Both Servers
```bash
# Terminal 1 - Start Backend
cd backend
npm run dev

# Terminal 2 - Start Frontend
npm run dev
```

#### Step 6: Test SOS Alert
1. Login to your account
2. Add emergency contacts with valid phone numbers
3. Click SOS button
4. **Backend will send actual SMS and calls!**

---

### Option B: Frontend Mode (No Backend)

#### Step 1: Configure Frontend
```bash
# Edit .env file in root directory:
VITE_USE_BACKEND=false
```

#### Step 2: Start Frontend
```bash
npm run dev
```

#### Step 3: Test SOS Alert
1. Login to your account
2. Add emergency contacts
3. Click SOS button
4. **SMS app and dialer will open** (you need to send manually)

---

## 💰 Twilio Pricing (India)

| Service | Cost | Free Trial |
|---------|------|------------|
| SMS | ~₹1.50 per message | $15 credit |
| Voice Calls | ~₹3.50 per minute | $15 credit |
| Phone Number | ~₹100/month | Free |

**Example:** 10 SOS alerts with 2 contacts each = ~₹150/month

---

## 🔐 Security Notes

1. **Never commit `.env` files to Git**
2. Keep Twilio credentials secret
3. Use HTTPS in production
4. Enable Twilio API authentication

---

## 📱 How It Works

### Backend Mode Flow:
```
User clicks SOS
    ↓
Frontend sends request to Backend API
    ↓
Backend calls Twilio API
    ↓
Twilio sends SMS to all contacts ✅
Twilio calls all contacts ✅
    ↓
Success response to frontend
```

### Frontend Mode Flow:
```
User clicks SOS
    ↓
Frontend opens SMS app (user sends) ⚠️
Frontend opens dialer (user calls) ⚠️
```

---

## 🐛 Troubleshooting

### Backend not starting?
```bash
# Check if port 3001 is in use
netstat -ano | findstr :3001

# Kill the process or change port in backend/.env
PORT=3002
```

### SMS not sending?
1. Check Twilio credentials in `backend/.env`
2. Verify Twilio phone number is active
3. Check Twilio console for errors
4. Ensure contacts have valid phone numbers

### CORS error?
Make sure `CORS_ORIGIN` in `backend/.env` matches your frontend URL:
```
CORS_ORIGIN=http://localhost:5173
```

### Phone number format?
- Include country code: `+919876543210`
- Or just 10 digits: `9876543210` (auto-adds +91)
- Minimum 10 digits required

---

## 📞 Emergency Contact Format

Add contacts in this format:
```json
{
  "name": "Rahul Kumar",
  "phone": "+919876543210",
  "relation": "Father"
}
```

Or:
```json
{
  "name": "Mother",
  "phone": "9876543210",
  "relation": "Parent"
}
```

---

## 🚀 Production Deployment

### Deploy Backend:
1. **Render**: https://render.com/
2. **Railway**: https://railway.app/
3. **Heroku**: https://heroku.com/

### Deploy Frontend:
1. **Vercel**: https://vercel.com/
2. **Netlify**: https://netlify.com/
3. **Firebase Hosting**: https://firebase.google.com/

### Update Environment Variables:
```env
# Frontend .env (in Vercel/Netlify)
VITE_BACKEND_API_URL=https://your-backend-url.com
VITE_USE_BACKEND=true
```

---

## 📚 API Reference

### POST `/api/send-sos-alert`

**Request Body:**
```json
{
  "userName": "John Doe",
  "userEmail": "john@example.com",
  "location": {
    "latitude": 28.6139,
    "longitude": 77.2090,
    "accuracy": 10
  },
  "contacts": [
    {
      "name": "Rahul Kumar",
      "phone": "+919876543210"
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "message": "SOS alerts sent successfully",
  "total": 2,
  "smsSent": 2,
  "callsInitiated": 2,
  "failed": 0,
  "details": [
    {
      "name": "Rahul Kumar",
      "phone": "+919876543210",
      "smsSuccess": true,
      "callSuccess": true
    }
  ]
}
```

---

## ✅ Quick Start (5 Minutes)

```bash
# 1. Install backend dependencies
cd backend
npm install

# 2. Get Twilio credentials from console.twilio.com

# 3. Edit backend/.env with your credentials

# 4. Edit root .env: VITE_USE_BACKEND=true

# 5. Start backend
npm run dev

# 6. In another terminal, start frontend
npm run dev

# 7. Test SOS button!
```

---

## 🆘 Support

- Twilio Docs: https://www.twilio.com/docs
- Firebase Docs: https://firebase.google.com/docs
- Issue? Check console logs in browser (F12)

---

**Made with ❤️ for Suraksha Safety App**
