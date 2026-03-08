# Quick Start - SOS Alerts with Actual SMS & Calls

## 🚀 Start Both Servers (2 Terminals)

### Terminal 1 - Backend Server:
```bash
cd backend
npm run dev
```
Backend will start at: http://localhost:3001

### Terminal 2 - Frontend Server:
```bash
npm run dev
```
Frontend will start at: http://localhost:5173

---

## ⚙️ Configuration

### For ACTUAL SMS & Calls (Twilio):

1. **Get Twilio Credentials:**
   - Go to https://console.twilio.com/
   - Copy Account SID, Auth Token, and Phone Number

2. **Edit `backend/.env`:**
   ```
   TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxx
   TWILIO_AUTH_TOKEN=your_token_here
   TWILIO_PHONE_NUMBER=+1234567890
   ```

3. **Edit root `.env`:**
   ```
   VITE_USE_BACKEND=true
   ```

4. **Restart both servers**

---

### For Testing (Without Twilio):

1. **Edit root `.env`:**
   ```
   VITE_USE_BACKEND=false
   ```

2. **Start frontend only**
   - SMS app will open on your device
   - Dialer will open for calls

---

## 📱 Test SOS Alert:

1. Login to dashboard
2. Add emergency contacts (with 10+ digit phone numbers)
3. Click SOS button
4. Check if contacts receive SMS and calls!

---

## 📄 Full Documentation:
See `SOS_ALERT_SETUP.md` for detailed setup instructions.
