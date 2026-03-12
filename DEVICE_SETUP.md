# 🛡️ Suraksha IoT Device Setup Guide

**Complete guide to connect ESP32/ESP8266 devices with Suraksha App**

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Hardware Requirements](#hardware-requirements)
3. [Software Setup](#software-setup)
4. [Firebase Configuration](#firebase-configuration)
5. [Arduino Code Setup](#arduino-code-setup)
6. [Frontend Integration](#frontend-integration)
7. [Testing & Troubleshooting](#testing--troubleshooting)

---

## 📖 Overview

This guide helps you connect ESP32/ESP8266 IoT devices to your Suraksha safety app using **Firebase Realtime Database**. The device will:

- ✅ Send real-time sensor data (temperature, humidity, motion)
- ✅ Track GPS location
- ✅ Monitor battery and WiFi status
- ✅ Trigger SOS alerts with button press
- ✅ Sync data instantly with your React dashboard

### Architecture

```
┌─────────────────┐      Firebase       ┌──────────────────┐
│   ESP32 Device  │ ────────────────→   │  React Dashboard │
│                 │   Realtime DB       │   (Web App)      │
│ - Sensors       │ ←────────────────   │                  │
│ - GPS           │   Live Updates      │ - Live Monitoring│
│ - SOS Button    │                     │ - SOS Alerts     │
└─────────────────┘                     └──────────────────┘
```

---

## 🔧 Hardware Requirements

### Essential Components

| Component | Quantity | Purpose | Approx. Price |
|-----------|----------|---------|---------------|
| **ESP32 DevKit V1** | 1 | Main microcontroller with WiFi | ₹350-450 |
| **NEO-6M GPS Module** | 1 | GPS location tracking | ₹400-500 |
| **DHT11/DHT22 Sensor** | 1 | Temperature & humidity | ₹150-250 |
| **PIR Motion Sensor (HC-SR501)** | 1 | Motion detection | ₹150-200 |
| **Push Button** | 1 | SOS trigger | ₹20-30 |
| **LED (any color)** | 1 | Status indicator | ₹10-20 |
| **3.7V Li-ion Battery** | 1 | Power supply | ₹200-300 |
| **TP4056 Charging Module** | 1 | Battery charging | ₹50-80 |
| **Jumper Wires** | 20+ | Connections | ₹100-150 |
| **Breadboard/PCB** | 1 | Assembly | ₹100-200 |

**Total Estimated Cost: ₹1,500 - 2,000**

### Pin Connections (ESP32)

```
ESP32 Pin → Component Pin
─────────────────────────
3.3V      → NEO-6M VCC
GND       → NEO-6M GND
GPIO 16   → NEO-6M TX
GPIO 17   → NEO-6M RX

3.3V      → DHT11 VCC
GND       → DHT11 GND
GPIO 15   → DHT11 DATA (with 10K pull-up resistor)

5V        → PIR VCC
GND       → PIR GND
GPIO 5    → PIR OUT

GPIO 4    → SOS Button (INPUT_PULLUP)
GND       → SOS Button other pin

GPIO 2    → LED + (with 220Ω resistor)
GND       → LED -

GPIO 34   → Battery + (via voltage divider)
GND       → Battery -
```

---

## 💻 Software Setup

### 1. Install Arduino IDE

Download from: https://www.arduino.cc/en/software

### 2. Install ESP32 Board Support

1. Open Arduino IDE
2. Go to **File → Preferences**
3. Add to "Additional Board Manager URLs":
   ```
   https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json
   ```
4. Go to **Tools → Board → Boards Manager**
5. Search "esp32" and install **esp32 by Espressif Systems**

### 3. Install Required Libraries

Open **Sketch → Include Library → Manage Libraries** and install:

1. **Firebase ESP32 Client** by Mobizt (v4.2.6 or higher)
2. **DHT sensor library** by Adafruit (v1.4.4 or higher)
3. **TinyGPSPlus** by Mikal Hart (v1.0.3 or higher)
4. **Adafruit Unified Sensor** by Adafruit (v1.1.14 or higher)

---

## 🔥 Firebase Configuration

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **Add Project**
3. Enter project name: `womern-safety` (or your existing project)
4. Enable Google Analytics (optional)
5. Click **Create Project**

### Step 2: Enable Realtime Database

1. In Firebase Console, go to **Build → Realtime Database**
2. Click **Create Database**
3. Choose **Start in Test Mode** (for development)
4. Select location (choose closest to India: `asia-southeast1`)
5. Click **Enable**

### Step 3: Deploy Security Rules

1. Go to **Realtime Database → Rules**
2. Copy rules from `database.rules.json`
3. Paste and click **Publish**

### Step 4: Create Device User

1. Go to **Build → Authentication**
2. Click **Get Started**
3. Enable **Email/Password** sign-in method
4. Click **Add User**
   - Email: `device@suraksha.com`
   - Password: `DevicePassword123!` (change in production!)
5. Copy the **User UID** (you'll need it)

### Step 5: Get Firebase Config

1. Go to **Project Settings** (⚙️ icon)
2. Scroll to "Your apps" section
3. Click **Web** (</> icon)
4. Register app (name: "Suraksha Web")
5. Copy the `firebaseConfig` object
6. Update `src/firebase.js` with your config

### Step 6: Get Database URL

1. Go to **Realtime Database**
2. Click the **⋮** (three dots) menu
3. Select **Realtime Database rules**
4. Copy your database URL (e.g., `https://womern-safety-default-rtdb.asia-southeast1.firebasedatabase.app`)

---

## 📝 Arduino Code Setup

### Step 1: Open Arduino Code

1. Navigate to `esp32-code/SurakshaDevice/SurakshaDevice.ino`
2. Open in Arduino IDE

### Step 2: Update Configuration

Edit these values in the code:

```cpp
// WiFi Credentials
#define WIFI_SSID "YOUR_WIFI_SSID"
#define WIFI_PASSWORD "YOUR_WIFI_PASSWORD"

// Firebase Configuration
#define API_KEY "YOUR_FIREBASE_API_KEY"         // From Project Settings
#define FIREBASE_PROJECT_ID "womern-safety"     // Your project ID
#define USER_EMAIL "device@suraksha.com"        // Device user email
#define USER_PASSWORD "DevicePassword123!"      // Device user password

// Device Configuration
#define DEVICE_ID "SURAKSHA_DEV_001"  // Unique ID for this device
```

### Step 3: Upload Code

1. Connect ESP32 to PC via USB
2. Select **Tools → Board → ESP32 Dev Module**
3. Select correct **Port** (Tools → Port)
4. Click **Upload** (→ arrow button)
5. Wait for "Done uploading" message

### Step 4: Monitor Serial Output

1. Open **Serial Monitor** (magnifying glass icon)
2. Set baud rate to **115200**
3. You should see:
   ```
   🛡️ SURAKSHA SMART DEVICE
   ========================
   Device ID: SURAKSHA_DEV_001
   Connecting to WiFi: YOUR_WIFI_SSID
   ✅ WiFi connected!
   IP Address: 192.168.1.100
   ✅ Firebase authentication successful!
   ✅ Device initialized successfully!
   ```

---

## 🎨 Frontend Integration

### Step 1: Add Device Routes

Already done! Routes added to `src/App.jsx`:

```javascript
<Route path="/my-devices" element={...<MyDevices />...} />
<Route path="/device/:deviceId" element={...<DeviceDashboard />...} />
```

### Step 2: Access Device Dashboard

1. Start your React app:
   ```bash
   npm run dev
   ```

2. Navigate to: `http://localhost:5173/my-devices`

3. Click **"Add New Device"**

4. Enter Device ID: `SURAKSHA_DEV_001`

5. Click **"Register Device"**

6. Click **"View Dashboard"** to see live data!

### Step 3: Test Real-time Updates

Your dashboard should now show:

- 🌡️ **Temperature** (from DHT sensor)
- 💧 **Humidity** (from DHT sensor)
- 🏃 **Motion Detection** (PIR sensor)
- 📍 **GPS Location** (NEO-6M)
- 🔋 **Battery Level** (ADC reading)
- 📶 **WiFi Signal** (RSSI)
- 🚨 **SOS Alerts** (when button pressed)

---

## 🧪 Testing & Troubleshooting

### Common Issues

#### 1. **WiFi Connection Failed**

**Problem:** `❌ WiFi connection failed!`

**Solutions:**
- Check WiFi SSID and password (case-sensitive!)
- Ensure 2.4GHz WiFi (ESP32 doesn't support 5GHz)
- Move closer to router
- Check power supply (use 5V 2A adapter)

#### 2. **Firebase Auth Failed**

**Problem:** `❌ Firebase authentication failed!`

**Solutions:**
- Verify API key is correct
- Check device user exists in Firebase Auth
- Ensure Email/Password sign-in is enabled
- Check database rules allow writes

#### 3. **No GPS Data**

**Problem:** `📍 GPS: Waiting for satellites...`

**Solutions:**
- Take device outdoors with clear sky view
- Check GPS TX/RX connections (swap if needed)
- Wait 2-5 minutes for cold start
- Verify GPS baud rate (9600)

#### 4. **Sensor Reading NaN**

**Problem:** Temperature/Humidity showing `NaN`

**Solutions:**
- Check DHT sensor wiring
- Verify GPIO pin (GPIO 15)
- Add 10K pull-up resistor on DATA line
- Try DHT22 instead of DHT11 (update code)

#### 5. **Database Write Failed**

**Problem:** Sensor data not appearing in Firebase

**Solutions:**
- Check Realtime Database rules
- Verify database URL in code
- Ensure device user has write permissions
- Check internet connection

### Testing Checklist

- [ ] ESP32 connects to WiFi successfully
- [ ] Firebase authentication works
- [ ] Temperature reading updates every 5 seconds
- [ ] GPS location appears (outdoors test)
- [ ] Motion detection triggers on movement
- [ ] SOS button sends alert
- [ ] Dashboard shows real-time updates
- [ ] Battery level displays correctly

---

## 📊 Firebase Data Structure

Your device data will be stored at:

```
users/{userId}/devices/{deviceId}/
├── deviceId: "SURAKSHA_DEV_001"
├── name: "My Suraksha Device"
├── online: true/false
├── lastSeen: timestamp
│
├── /sensors
│   ├── temperature: 28.5
│   ├── humidity: 65.2
│   └── motion: true/false
│
├── /location
│   ├── latitude: 28.6139
│   ├── longitude: 77.2090
│   ├── altitude: 215.3
│   ├── speed: 0.5
│   ├── satellites: 8
│   └── gpsValid: true
│
├── /status
│   ├── online: true
│   ├── wifiSignal: -65
│   ├── battery: 85.5
│   ├── lastUpdate: timestamp
│   └── lastError: ""
│
└── /sos
    ├── active: true/false
    ├── timestamp: timestamp
    ├── latitude: 28.6139
    ├── longitude: 77.2090
    └── message: "EMERGENCY! Need immediate help!"
```

---

## 🚀 Advanced Features

### Multiple Devices

You can register multiple devices with unique IDs:

```cpp
#define DEVICE_ID "SURAKSHA_DEV_002"  // Second device
#define DEVICE_ID "SURAKSHA_DEV_003"  // Third device
```

Each device will appear separately in your dashboard.

### Custom Alert Messages

Update SOS message in Arduino code:

```cpp
Firebase.RTDB.setString(&fbdo, sosPath + "/message", 
  "Help! I'm in danger at this location!");
```

### Update Intervals

Change sensor update frequency:

```cpp
#define SENSOR_UPDATE_INTERVAL 3000    // 3 seconds
#define LOCATION_UPDATE_INTERVAL 5000  // 5 seconds
#define STATUS_UPDATE_INTERVAL 2000    // 2 seconds
```

**Note:** Faster updates = more battery consumption.

---

## 🔒 Security Best Practices

### Production Setup

1. **Change default passwords:**
   - Update device user password
   - Use strong, unique passwords

2. **Restrict database access:**
   - Deploy production database rules
   - Use Firebase App Check

3. **Secure WiFi credentials:**
   - Don't hardcode in production
   - Use WiFiManager library

4. **Enable HTTPS only:**
   - Force secure connections
   - Use SSL/TLS for all API calls

5. **Monitor device access:**
   - Log all device activities
   - Set up alerts for suspicious behavior

---

## 📱 Mobile App Integration

The same Firebase Realtime Database can be used for mobile apps:

```javascript
// React Native example
import database from '@react-native-firebase/database';

const subscription = database()
  .ref(`/users/${userId}/devices/${deviceId}/sensors`)
  .on('value', snapshot => {
    console.log('Sensor data:', snapshot.val());
  });
```

---

## 🎯 Next Steps

1. ✅ Test with one device
2. ✅ Add more sensors (gas, sound, etc.)
3. ✅ Create custom enclosure (3D print)
4. ✅ Add battery management
5. ✅ Deploy to production Firebase
6. ✅ Share with hackathon judges!

---

## 📞 Support

**Issues?** Check these resources:

- Firebase Docs: https://firebase.google.com/docs
- ESP32 Forum: https://forum.esp32.com/
- Arduino Community: https://forum.arduino.cc/

**Hackathon Team:** Contact your team lead for help!

---

**Made with ❤️ for Suraksha - Women's Safety Initiative**
