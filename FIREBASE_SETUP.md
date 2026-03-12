# 🔑 Firebase Configuration Setup Guide

## ❗ Error: API Key Not Valid

Your Firebase API key is not configured. Follow these steps to fix it.

---

## 📋 Step-by-Step Setup

### Step 1: Go to Firebase Console

1. Visit: https://console.firebase.google.com
2. Sign in with your Google account
3. Select your project (or create a new one)

---

### Step 2: Get Firebase Configuration

1. **Click on Project Settings** (⚙️ icon in left sidebar)
2. **Scroll down** to "Your apps" section
3. **Find your web app** (or create one if not exists)
4. **Copy the configuration values**

---

### Step 3: Update `.env` File

Open `.env` file in project root and replace values:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

---

### Step 4: Restart Development Server

**Stop the current server** (Ctrl+C) and restart:

```bash
npm run dev
```

---

## 📸 Visual Guide

### Firebase Console → Project Settings

```
┌─────────────────────────────────────────────┐
│  Firebase Console                           │
│                                             │
│  ⚙️ Project Settings                        │
│                                             │
│  ┌───────────────────────────────────────┐ │
│  │  Your apps                            │ │
│  │                                       │ │
│  │  Web App: Suraksha Web                │ │
│  │  ┌─────────────────────────────────┐ │ │
│  │  │  firebaseConfig {               │ │ │
│  │  │    apiKey: "AIzaSy...",        │ │ │
│  │  │    authDomain: "...",          │ │ │
│  │  │    projectId: "...",           │ │ │
│  │  │    ...                         │ │ │
│  │  │  }                              │ │ │
│  │  └─────────────────────────────────┘ │ │
│  └───────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

---

## 🔍 Where to Find Each Value

### 1. **API Key**
- **Location:** Firebase Project Settings → General → Your apps → SDK setup and configuration
- **Format:** `AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXX` (39 characters)
- **Example:** `AIzaSyB5vXzXXXXXXXXXXXXXXXXXXXXXXXX`

### 2. **Auth Domain**
- **Location:** Same as above
- **Format:** `your-project-id.firebaseapp.com`
- **Example:** `suraksha-app.firebaseapp.com`

### 3. **Project ID**
- **Location:** Project Settings → General → Project ID
- **Format:** Unique project identifier
- **Example:** `suraksha-app`

### 4. **Storage Bucket**
- **Location:** Same as API Key section
- **Format:** `your-project-id.appspot.com`
- **Example:** `suraksha-app.appspot.com`

### 5. **Messaging Sender ID**
- **Location:** Same as API Key section
- **Format:** 12-digit number
- **Example:** `123456789012`

### 6. **App ID**
- **Location:** Same as API Key section
- **Format:** `1:123456789012:web:abcdef123456`
- **Example:** `1:123456789012:web:abc123def456`

### 7. **Measurement ID** (Optional)
- **Location:** Same as API Key section
- **Format:** `G-XXXXXXXXXX`
- **Example:** `G-ABC123DEF4`

---

## ✅ Verify Configuration

After updating `.env`, check if it works:

1. **Open browser console** (F12)
2. **Try to login**
3. **Check for errors**

**Expected:** No Firebase API key errors

**If still error:** 
- Make sure server is restarted
- Check `.env` file is in root directory
- Verify all values are copied correctly

---

## 🆘 Creating New Firebase Project

If you don't have a Firebase project:

### 1. Create Project
1. Go to https://console.firebase.google.com
2. Click "Add project"
3. Enter project name: `suraksha-app`
4. Follow setup wizard

### 2. Enable Authentication
1. Go to **Authentication** in left menu
2. Click **Get started**
3. Enable **Email/Password** sign-in method

### 3. Create Firestore Database
1. Go to **Firestore Database**
2. Click **Create database**
3. Start in **test mode** (for development)
4. Choose location: `us-central` or nearest

### 4. Create Web App
1. Go to **Project Settings** (⚙️)
2. Scroll to "Your apps"
3. Click web icon (</>)
4. Register app with nickname: `Suraksha Web`
5. Copy the `firebaseConfig` values

### 5. Update `.env` File
Copy all values from Firebase console to `.env` file

---

## 🔐 Security Notes

- **`.env` file is in `.gitignore`** - never commit to GitHub
- **API key is safe to expose** in frontend (Firebase handles security via rules)
- **Enable Firebase Security Rules** for production
- **Use environment variables** for all sensitive config

---

## ✅ Quick Checklist

- [ ] Firebase project created
- [ ] Authentication enabled (Email/Password)
- [ ] Firestore database created
- [ ] Web app registered
- [ ] Config values copied to `.env`
- [ ] Development server restarted
- [ ] Login works without errors

---

## 🧪 Test Login

After configuration:

1. Go to: http://localhost:5173/login
2. Enter email and password
3. Click Login
4. Should redirect to Dashboard

---

**Need Help?** 

Check Firebase Console: https://console.firebase.google.com
