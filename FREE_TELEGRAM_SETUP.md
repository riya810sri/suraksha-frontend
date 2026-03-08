# 🆓 FREE SOS Alerts - Telegram Bot Setup

## ✅ 100% FREE - Unlimited Messages!

Telegram bot ke through **FREE** mein SOS alerts bhej sakte ho. Koi cost nahi!

---

## 📋 Step-by-Step Setup

### **Step 1: Telegram Bot Banao (2 Minutes)**

1. **Telegram App Kholo** (phone ya desktop)

2. **@BotFather ko Search Karo:**
   - Search bar mein `@BotFather` type karo
   - Verified bot pe click karo (blue tick ✅)

3. **New Bot Create Karo:**
   ```
   /newbot command bhejo
   ```

4. **Bot Ka Naam Do:**
   ```
   BotFather: What will your bot be named?
   You: Suraksha Alert Bot
   ```

5. **Bot Username Do:**
   ```
   BotFather: Choose a username for your bot
   You: suraksha_alert_bot
   ```
   
   Username unique hona chahiye aur `_bot` se khatam hona chahiye.

6. **Bot Token Milega:**
   ```
   BotFather: Done! Congratulations on your new bot.
   
   Use this token to access the HTTP API:
   
   1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
   
   Keep this token secure!
   ```
   
   **Is token ko copy karlo!** 🔑

---

### **Step 2: Backend Mein Token Save Karo**

1. **File Kholo:** `backend/.env`

2. **Token Paste Karo:**
   ```env
   TELEGRAM_BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
   ```

3. **Twilio Ko Khali Chhodo:**
   ```env
   TWILIO_ACCOUNT_SID=
   TWILIO_AUTH_TOKEN=
   TWILIO_PHONE_NUMBER=
   ```

---

### **Step 3: Frontend Configuration**

1. **File Kholo:** `.env` (root folder)

2. **Telegram Enable Karo:**
   ```env
   VITE_USE_TELEGRAM=true
   VITE_USE_BACKEND=false
   ```

---

### **Step 4: Bot Ko Start Karo**

1. **Backend Restart Karo:**
   ```bash
   cd backend
   # Ctrl+C dabake band karo
   npm run dev
   ```

2. **Frontend Restart Karo:**
   ```bash
   npm run dev
   ```

---

### **Step 5: Telegram Bot Se Connect Karo**

1. **Telegram Pe Bot Ko Search Karo:**
   - Apne bot ka username search karo (e.g., `@suraksha_alert_bot`)

2. **Start Button Dabo:**
   - `/start` command bhejo

3. **Bot Active Hai!** ✅

---

### **Step 6: Emergency Contacts Ko Telegram ID Add Karo**

#### **Telegram ID Kaise Pata Karein:**

**Method 1: @userinfobot se**
```
1. Telegram pe @userinfobot search karo
2. Start karo
3. Woh tumhari ID bata dega (e.g., 123456789)
```

**Method 2: Browser se**
```
1. Browser mein jao: https://web.telegram.org/
2. Contact pe click karo
3. URL mein ID dikhegi:
   https://web.telegram.org/#-123456789
   ID: 123456789
```

#### **Dashboard Mein Add Karo:**

1. **Dashboard pe jao:** http://localhost:5173
2. **Emergency Contacts section**
3. **Add Contact**
4. **Details bharo:**
   ```
   Name: Rahul Kumar
   Phone: 9876543210
   Telegram ID: 123456789
   Relation: Father
   ```

5. **Save karo**

---

## 🧪 Test Karo

### **Test SOS Alert:**

1. **Dashboard pe SOS button click karo**
2. **Location permission do**
3. **Success message dekho:**
   ```
   🚨 SOS ALERT SENT! 🚨
   
   ✅ Alert saved to Firestore
   ✅ 2 Telegram messages sent
   
   💰 Mode: FREE (Telegram)
   
   📞 Contacts Notified:
     • Rahul Kumar: ✅
     • Mother: ✅
   
   Stay safe! 🙏
   ```

4. **Contacts ke Telegram pe check karo** - unhe message mila hoga!

---

## 📨 Message Format

**Contacts ko yeh message milega:**

```
🚨 SOS EMERGENCY ALERT! 🚨

Priya Sharma needs immediate help!

📍 Location:
https://www.google.com/maps?q=28.6139,77.2090

Please contact them immediately!

This is an automated alert from Suraksha Safety App
```

---

## 💰 Cost Breakdown

| Service | Cost | Limit |
|---------|------|-------|
| **Telegram Bot** | 🆓 FREE | Unlimited |
| **Messages** | 🆓 FREE | Unlimited |
| **Setup** | 🆓 FREE | One time |

**Total: ₹0.00!** 🎉

---

## 🔧 Troubleshooting

### **Bot ko message nahi bhej raha?**

1. **Check bot token:**
   ```bash
   # backend/.env mein check karo
   TELEGRAM_BOT_TOKEN=1234567890:ABCdef...
   ```

2. **Bot ko start kiya?**
   - Telegram pe `/start` command bhejo

3. **Backend running hai?**
   ```bash
   curl http://localhost:3001/api/health
   ```

### **Contacts ko message nahi mila?**

1. **Telegram ID sahi hai?**
   - Dobara check karo @userinfobot se

2. **Contact ne bot ko block toh nahi kiya?**
   - Bot ko unblock karein

3. **Backend logs check karo:**
   ```bash
   # Terminal mein dekho errors
   ```

### **"Telegram bot token not configured" error?**

1. **Backend restart karo:**
   ```bash
   cd backend
   # Ctrl+C
   npm run dev
   ```

2. **`.env` file dobara check karo**

---

## 📱 Multiple Contacts Kaise Add Karein

**Dashboard mein:**

1. **Emergency Contacts tab**
2. **Add Contact button**
3. **Har contact ke liye:**
   - Name
   - Phone
   - **Telegram ID** (important!)
   - Relation

4. **Save**

**Example:**
```json
{
  "name": "Rahul Kumar",
  "phone": "9876543210",
  "telegramId": "123456789",
  "relation": "Father"
}
```

---

## 🎯 Quick Reference

### **Files Modified:**
```
backend/.env          → Telegram bot token
.env                  → VITE_USE_TELEGRAM=true
```

### **Commands:**
```bash
# Backend start
cd backend && npm run dev

# Frontend start
npm run dev

# Health check
curl http://localhost:3001/api/health
```

### **Useful Links:**
- **BotFather:** https://t.me/BotFather
- **User Info Bot:** https://t.me/userinfobot
- **Telegram Web:** https://web.telegram.org/

---

## ✅ Complete Setup Checklist

- [ ] Telegram bot banao (@BotFather)
- [ ] Bot token copy kiya
- [ ] `backend/.env` mein token paste kiya
- [ ] `.env` mein `VITE_USE_TELEGRAM=true` kiya
- [ ] Backend restart kiya
- [ ] Frontend restart kiya
- [ ] Bot ko `/start` command bheja
- [ ] Emergency contacts ki Telegram ID add ki
- [ ] SOS button test kiya
- [ ] Contacts ko message mila ✅

---

## 🎉 Success!

Ab jab SOS button click hoga:
1. ✅ Firestore mein alert save hoga
2. ✅ **Telegram se FREE message jayega** sab contacts ko
3. ✅ Google Maps location link milega
4. ✅ **₹0 kharcha!**

**100% FREE - Unlimited Alerts!** 🚀

---

Made with ❤️ for Suraksha Safety App
