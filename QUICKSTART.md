# 🚀 Suraksha - Quick Start Guide

Get up and running with Suraksha in minutes!

---

## ⚡ Quick Installation

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:5173`

### 3. Build for Production

```bash
npm run build
```

---

## 📁 Project Structure at a Glance

```
src/
├── components/       # Reusable UI components
│   ├── Header.jsx
│   ├── Footer.jsx
│   └── ProtectedRoute.jsx
├── pages/            # Page components
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── Dashboard.jsx
│   ├── PublicMap.jsx
│   ├── Community.jsx
│   └── History.jsx
├── services/         # Business logic
│   └── firestoreService.js
├── firebase.js       # Firebase config
├── App.jsx           # Main app + routing
└── main.jsx          # Entry point
```

---

## 🔑 Available Routes

| Route | Component | Auth Required |
|-------|-----------|---------------|
| `/` | Home | ❌ |
| `/public-map` | PublicMap | ❌ |
| `/login` | Login | ❌ |
| `/signup` | Signup | ❌ |
| `/dashboard` | Dashboard | ✅ |
| `/community` | Community | ✅ |
| `/history` | History | ✅ |

---

## 🔥 Firebase Setup

### 1. Enable Services in Firebase Console

- **Authentication** → Email/Password provider
- **Firestore Database** → Create database
- **Storage** → Enable storage
- **Realtime Database** → Enable (optional)

### 2. Deploy Security Rules

```bash
firebase login
firebase deploy --only firestore:rules,storage:rules
```

### 3. Firestore Data Structure

```
users/{userId}
  ├── name, email, phone, safetyScore
  ├── contacts/ (subcollection)
  ├── incidents/ (subcollection)
  └── locations/ (subcollection)

community/ (public posts)
volunteers/ (volunteer profiles)
publicIncidents/ (public safety data)
```

---

## 🎨 Key Technologies

| Technology | Purpose |
|------------|---------|
| React 19 | UI Framework |
| Vite 7 | Build Tool |
| Tailwind CSS 4 | Styling |
| Framer Motion 12 | Animations |
| Firebase 12 | Backend |
| React Router 7 | Routing |
| Lucide React | Icons |

---

## 📝 Common Commands

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint

# Deployment
firebase deploy      # Deploy to Firebase
firebase deploy --only hosting  # Deploy hosting only
```

---

## 🐛 Quick Troubleshooting

### Port Already in Use

```bash
# Use different port
npm run dev -- --port 3000
```

### Firebase Permission Denied

```bash
# Redeploy rules
firebase deploy --only firestore:rules
```

### Dependencies Issues

```bash
# Clean reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 📱 Features Overview

### Authentication
- ✅ Email/password login
- ✅ User registration with profile photo
- ✅ Password strength indicator
- ✅ Protected routes

### Dashboard
- ✅ Safety score display
- ✅ Emergency contacts management
- ✅ SOS alert button with GPS
- ✅ Activity history

### Public Map
- ✅ Safety zone markers
- ✅ Incident reports
- ✅ Search & filter

### Community
- ✅ Discussion forums
- ✅ Volunteer network
- ✅ Safety tips

---

## 🔐 Default Test Credentials

Create a test account:

1. Go to `/signup`
2. Enter any valid email format
3. Use password: `test123` (min 6 chars)
4. Complete registration

---

## 📞 Need Help?

- **Full Documentation:** See `DOCUMENTATION.md`
- **Firebase Console:** https://console.firebase.google.com/
- **React Docs:** https://react.dev/

---

**Happy Coding! 🛡️**
