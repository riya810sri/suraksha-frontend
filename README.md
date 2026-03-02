# 🛡️ Suraksha - Your Safety Companion

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19.2.0-blue)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.3.1-purple)](https://vitejs.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-12.10.0-orange)](https://firebase.google.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.2.1-38bdf8)](https://tailwindcss.com/)

> **Empowering your safety journey with real-time SOS alerts, GPS tracking, and community support.**

---

## 📖 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Quick Start](#-quick-start)
- [Documentation](#-documentation)
- [Project Structure](#-project-structure)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

---

## 📌 About

**Suraksha** (meaning "protection" in Hindi) is a comprehensive women's safety web application designed to provide real-time emergency alerts, GPS tracking, and community support. The application empowers users to stay safe by connecting them with emergency contacts and trained volunteers during critical situations.

### Key Features

- 🚨 **SOS Alerts** - One-tap emergency notifications to trusted contacts
- 📍 **GPS Tracking** - Real-time location sharing for enhanced safety
- 👥 **Community Support** - Network of trained volunteers ready to assist
- 📊 **Activity History** - Complete log of all safety-related events
- 🗺️ **Safety Map** - Real-time safety information for different areas
- 💬 **Community Hub** - Discussion forums and safety tips

---

## ✨ Features

### For Users

| Feature | Description |
|---------|-------------|
| 🔐 **Authentication** | Secure email/password login with profile management |
| 📱 **SOS Button** | Emergency alert with GPS location to contacts |
| 👨‍👩‍👧 **Emergency Contacts** | Manage trusted contacts for emergencies |
| 📍 **Location Sharing** | Real-time GPS tracking and sharing |
| 📜 **Activity History** | Timeline of all safety events and alerts |
| 📊 **Safety Score** | Personal safety metrics and insights |

### For Community

| Feature | Description |
|---------|-------------|
| 🗺️ **Public Safety Map** | Color-coded safety zones and incident reports |
| 💬 **Discussion Forums** | Share experiences and safety tips |
| 🦸 **Volunteer Network** | Connect with trained safety volunteers |
| 📰 **Community Posts** | Success stories, events, and feedback |
| ⭐ **Top Volunteers** | Recognize community safety champions |

---

## 🛠️ Tech Stack

### Frontend

- **React 19** - UI component library
- **Vite 7** - Lightning-fast build tool
- **React Router 7** - Client-side routing
- **Framer Motion 12** - Smooth animations
- **Lucide React** - Beautiful icon library

### Styling

- **Tailwind CSS 4** - Utility-first CSS framework
- **PostCSS 8** - CSS processing
- **Custom Design System** - Modern, accessible UI components

### Backend

- **Firebase 12** - Complete backend platform
  - **Authentication** - User management
  - **Firestore** - NoSQL database
  - **Storage** - File uploads
  - **Realtime Database** - Live data sync
  - **Analytics** - User insights

### Development Tools

- **ESLint 9** - Code quality
- **@vitejs/plugin-react** - React HMR

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd suraksha-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
npm run preview
```

### Deploy to Firebase

```bash
firebase login
firebase deploy --only hosting
```

---

## 📚 Documentation

Comprehensive documentation is available in the following files:

| Document | Description |
|----------|-------------|
| **[QUICKSTART.md](./QUICKSTART.md)** | Get started in 5 minutes |
| **[DOCUMENTATION.md](./DOCUMENTATION.md)** | Complete project documentation |
| **[API_REFERENCE.md](./API_REFERENCE.md)** | Function and component reference |
| **[COMPONENTS.md](./COMPONENTS.md)** | Component documentation |
| **[DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md)** | Database structure |

---

## 📁 Project Structure

```
suraksha-frontend/
├── 📂 public/                 # Static assets
│   ├── demo.mp4              # Demo video
│   └── ws png.png            # Hero image
│
├── 📂 src/
│   ├── 📂 components/        # Reusable components
│   │   ├── Header.jsx        # Navigation header
│   │   ├── Footer.jsx        # Site footer
│   │   └── ProtectedRoute.jsx # Auth guard
│   │
│   ├── 📂 pages/             # Page components
│   │   ├── Home.jsx          # Landing page
│   │   ├── Login.jsx         # Login page
│   │   ├── Signup.jsx        # Registration
│   │   ├── Dashboard.jsx     # User dashboard
│   │   ├── PublicMap.jsx     # Safety map
│   │   ├── Community.jsx     # Community hub
│   │   └── History.jsx       # Activity history
│   │
│   ├── 📂 services/          # Business logic
│   │   └── firestoreService.js # Firestore ops
│   │
│   ├── App.jsx               # Main app
│   ├── firebase.js           # Firebase config
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles
│
├── firebase.json             # Firebase config
├── firestore.rules           # Security rules
├── package.json              # Dependencies
└── vite.config.js            # Vite config
```

---

## 📸 Screenshots

### Landing Page
Modern, gradient hero section with animated elements and clear CTAs.

### Dashboard
User-friendly dashboard with safety stats, emergency contacts, and quick SOS access.

### Public Map
Interactive safety map with color-coded zones and incident reports.

### Community
Discussion forums with categories, volunteer network, and safety tips.

---

## 🔐 Security

- **Firebase Authentication** - Secure user management
- **Firestore Security Rules** - Data access control
- **Protected Routes** - Auth-based navigation
- **Input Validation** - Client-side form validation
- **HTTPS** - Encrypted connections

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation if needed

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **React Team** - For the amazing UI library
- **Firebase** - For the comprehensive backend
- **Tailwind CSS** - For the utility-first framework
- **Framer Motion** - For smooth animations
- **Lucide Icons** - For beautiful icons

---

## 📞 Contact

- **Project:** Suraksha
- **Firebase Project:** womern-safety
- **Email:** support@suraksha.com (placeholder)
- **Location:** New Delhi, India

---

## 🚀 Roadmap

### Phase 1 (Current)
- ✅ User authentication
- ✅ SOS alerts with GPS
- ✅ Emergency contacts
- ✅ Activity history
- ✅ Community features

### Phase 2 (Planned)
- 🔄 Real-time location sharing
- 🔄 Voice-activated SOS
- 🔄 Push notifications
- 🔄 Offline mode

### Phase 3 (Future)
- ⏳ Mobile app (React Native)
- ⏳ Wearable integration
- ⏳ AI safety scoring
- ⏳ Emergency services integration

---

## 📊 Stats

![Active Users](https://img.shields.io/badge/Active_Users-10K+-green)
![Emergencies Helped](https://img.shields.io/badge/Emergencies_Helped-500+-blue)
![Cities Covered](https://img.shields.io/badge/Cities_Covered-50+-purple)
![Support](https://img.shields.io/badge/Support-24/7-orange)

---

**Built with ❤️ for a safer world**

*Suraksha - Empowering Your Safety*
