# 🛡️ Suraksha ESP32 Device Code

**IoT Smart Device Firmware for Women's Safety**

---

## 📦 What's Included

- `SurakshaDevice.ino` - Main Arduino code for ESP32/ESP8266
- Complete sensor integration (GPS, DHT, PIR)
- Firebase Realtime Database sync
- SOS button functionality
- Real-time monitoring dashboard

---

## ⚡ Quick Start

### 1. Install Arduino Libraries

Open Arduino IDE → Sketch → Include Library → Manage Libraries:

```
✅ Firebase ESP32 Client by Mobizt
✅ DHT sensor library by Adafruit
✅ TinyGPSPlus by Mikal Hart
✅ Adafruit Unified Sensor
```

### 2. Update Configuration

Edit `SurakshaDevice.ino`:

```cpp
// WiFi
#define WIFI_SSID "your_wifi"
#define WIFI_PASSWORD "your_password"

// Firebase
#define API_KEY "your_firebase_api_key"
#define FIREBASE_PROJECT_ID "womern-safety"
#define USER_EMAIL "device@suraksha.com"
#define USER_PASSWORD "DevicePassword123!"

// Device ID (must be unique)
#define DEVICE_ID "SURAKSHA_DEV_001"
```

### 3. Upload to ESP32

1. Connect ESP32 via USB
2. Select **Board: ESP32 Dev Module**
3. Select correct **Port**
4. Click **Upload**

### 4. View in Dashboard

1. Open React app: `http://localhost:5173/my-devices`
2. Register device: `SURAKSHA_DEV_001`
3. View live dashboard!

---

## 🔌 Pin Configuration

```cpp
#define SOS_BUTTON_PIN 4      // GPIO 4
#define LED_PIN 2             // GPIO 2 (built-in LED)
#define PIR_PIN 5             // GPIO 5
#define DHT_PIN 15            // GPIO 15
#define GPS_RX_PIN 16         // GPIO 16
#define GPS_TX_PIN 17         // GPIO 17
#define BATTERY_PIN 34        // GPIO 34 (ADC)
```

---

## 📊 Features

| Feature | Status | Update Interval |
|---------|--------|-----------------|
| Temperature | ✅ Working | 5 seconds |
| Humidity | ✅ Working | 5 seconds |
| Motion Detection | ✅ Working | Real-time |
| GPS Location | ✅ Working | 10 seconds |
| Battery Level | ✅ Working | 5 seconds |
| WiFi Signal | ✅ Working | 3 seconds |
| SOS Button | ✅ Working | Real-time |

---

## 🚨 SOS Alert

When button is pressed:
1. LED blinks 10 times
2. SOS alert sent to Firebase
3. Dashboard shows emergency banner
4. Location coordinates included

---

## 📝 Serial Monitor Output

Open Serial Monitor (115200 baud) to see:

```
🛡️ SURAKSHA SMART DEVICE
========================
Device ID: SURAKSHA_DEV_001
Connecting to WiFi: YOUR_WIFI
✅ WiFi connected!
IP Address: 192.168.1.100
✅ Firebase authentication successful!
🌡️ Temp: 28.50°C | 💧 Humidity: 65.20% | No motion
📍 Location: 28.613900, 77.209000 (8 sats)
🔋 Battery: 85%
✅ Firebase updated!
```

---

## 🔧 Troubleshooting

| Issue | Solution |
|-------|----------|
| WiFi not connecting | Check 2.4GHz network, verify password |
| Firebase auth failed | Verify API key and device user credentials |
| No GPS data | Go outdoors, wait 2-5 minutes |
| Sensor shows NaN | Check wiring, add 10K pull-up resistor |

---

## 📄 Full Documentation

See `DEVICE_SETUP.md` for complete setup guide.

---

**Made with ❤️ for Suraksha**
