# 📧 Email Setup Guide for Order Confirmations

## ✅ Configuration Complete!

Seller email has been configured to receive all order notifications.

---

## 🎯 Email Recipients

When a customer places an order, emails are sent to:

### 1️⃣ **Customer Email** (Buyer)
- **To:** Customer's email (from order form)
- **Content:** Order confirmation, order number, shipping details
- **Subject:** 🎉 Order Confirmed! - SURAKSHA-XXXXX

### 2️⃣ **Seller Email** (You - Admin)
- **To:** rs2004262@gmail.com
- **Content:** New order alert, customer details, shipping address
- **Subject:** 📦 NEW ORDER ALERT! - SURAKSHA-XXXXX - Action Required

---

## ⚙️ Email Configuration Setup

### Step 1: Configure Gmail for Sending Emails

You need to set up a Gmail account to send emails:

1. **Go to Gmail Account** (use your business Gmail)
2. **Enable 2-Factor Authentication** (if not enabled)
3. **Generate App Password:**
   - Visit: https://myaccount.google.com/apppasswords
   - Select "Mail" and your device
   - Copy the 16-character password

### Step 2: Update `.env` File

Edit `backend/.env` file:

```env
# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-sender-email@gmail.com
EMAIL_PASS=your-16-char-app-password

# Seller Email (receives notifications)
ADMIN_EMAIL=rs2004262@gmail.com
SELLER_EMAIL=rs2004262@gmail.com
```

### Step 3: Restart Backend Server

```bash
cd backend
npm start
```

---

## 📧 Email Flow Diagram

```
Customer Places Order
        │
        ▼
┌───────────────────────┐
│  Backend Server       │
│  (server.js)          │
└───────────┬───────────┘
            │
    ┌───────┴───────┐
    │               │
    ▼               ▼
┌──────────┐   ┌──────────┐
│ Customer │   │  Seller  │
│  Email   │   │   Email  │
│ (Buyer)  │   │ (Admin)  │
└──────────┘   └──────────┘
     │                │
     ▼                ▼
Order          New Order Alert
Confirmation   - Customer name
- Order number - Email
- Plan details - Phone
- Shipping     - Address
  address      - Payment method
```

---

## 📋 What Emails Are Sent

### Customer Email Content:
```
Subject: 🎉 Order Confirmed! - SURAKSHA-ABC123

Dear [Customer Name],

Your order has been placed successfully!

Order Number: SURAKSHA-ABC123
Plan: [Plan Name]
Price: ₹[Amount]

Shipping Address:
[Customer Name]
[Street Address]
[City] - [Pincode]
Phone: [Phone Number]

Payment Method: Cash on Delivery / Online Payment

Your device will be shipped within 24-48 hours.

Thank you for choosing Suraksha!
```

### Seller Email Content:
```
Subject: 📦 NEW ORDER ALERT! - SURAKSHA-ABC123 - Action Required

⚠️ New order needs to be processed!

Order Number: SURAKSHA-ABC123
Order Date: [Date/Time]

ORDER DETAILS:
Plan: [Plan Name]
Price: ₹[Amount]
Payment Method: COD / Online

CUSTOMER INFORMATION:
Name: [Customer Name]
Email: [customer@email.com]
Phone: [+91 XXXXXXXXX]

Shipping Address:
[Full Address]

✅ ACTION REQUIRED:
Please process this order within 24 hours:
1. Verify payment (if online)
2. Pack the device
3. Generate shipping label
4. Update tracking information
```

---

## 🧪 Testing Email Notifications

### Test Order Flow:

1. **Start Backend Server:**
   ```bash
   cd backend
   npm start
   ```

2. **Place Test Order:**
   - Go to: http://localhost:5173/get-device
   - Fill in order form with test data
   - Use your email as customer email
   - Complete order

3. **Check Emails:**
   - **Customer Email:** Check customer's inbox
   - **Seller Email:** Check rs2004262@gmail.com inbox

4. **Check Backend Logs:**
   ```
   ✅ Order confirmation email sent to customer@email.com
   ✅ Admin/Seller notification sent to: rs2004262@gmail.com
   ```

---

## ⚠️ Troubleshooting

### Issue: Emails not sending

**Check:**
1. `.env` file has correct EMAIL_USER and EMAIL_PASS
2. Backend server is running (port 3001)
3. Gmail App Password is correct (16 characters)
4. Internet connection is active

**Error Messages:**

| Error | Solution |
|-------|----------|
| `Email not configured` | Check EMAIL_USER in .env |
| `Authentication failed` | Regenerate Gmail App Password |
| `Connection timeout` | Check EMAIL_HOST and EMAIL_PORT |
| `Backend API error` | Make sure backend server is running |

### Issue: Seller not receiving emails

**Check:**
1. ADMIN_EMAIL and SELLER_EMAIL in `.env` are set to rs2004262@gmail.com
2. Check spam/junk folder
3. Backend logs show "Admin/Seller notification sent"

---

## 🔐 Security Notes

- **Never commit `.env` file to Git** (it's in .gitignore)
- **Use App Password**, not your regular Gmail password
- **Keep App Password secret** - regenerate if compromised
- **Enable 2FA** on Gmail account for better security

---

## 📞 Support

If emails still don't work:

1. Check backend server logs for errors
2. Verify Gmail App Password is correct
3. Test with a different email account
4. Check firewall/antivirus blocking connections

---

## ✅ Quick Checklist

- [ ] Gmail account with 2FA enabled
- [ ] App Password generated
- [ ] `.env` file updated with credentials
- [ ] Backend server restarted
- [ ] Test order placed
- [ ] Both customer and seller emails received

---

**Setup Complete!** 🎉

All order confirmations will now be sent to rs2004262@gmail.com
