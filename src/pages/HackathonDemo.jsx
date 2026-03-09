import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  Activity,
  Thermometer,
  Droplets,
  MapPin,
  Bell,
  Wifi,
  WifiOff,
  RefreshCw,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Cpu,
  Signal,
  Zap,
  ShoppingCart,
  ArrowRight
} from 'lucide-react';
import { ref, onValue, push, update } from 'firebase/database';
import { database, db } from '../firebase';
import { collection, query, orderBy, limit, onSnapshot, addDoc } from 'firebase/firestore';

const HackathonDemo = () => {
  // Sensor Data State
  const [sensorData, setSensorData] = useState({
    temperature: 0,
    humidity: 0,
    location: 'Waiting for data...',
    timestamp: null
  });
  
  const [isConnected, setIsConnected] = useState(false);
  const [dataHistory, setDataHistory] = useState([]);
  const [sosAlerts, setSosAlerts] = useState([]);
  const [simulateMode, setSimulateMode] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [trackedLocations, setTrackedLocations] = useState([]);

  // Real-time Sensor Data Listener
  useEffect(() => {
    const sensorRef = ref(database, 'sensor');

    const unsubscribe = onValue(sensorRef, (snapshot) => {
      const data = snapshot.val();
      console.log('📡 Suraksha Device Sensor Data Received:', data);
      
      if (data) {
        setSensorData({
          temperature: data.temperature || 0,
          humidity: data.humidity || 0,
          location: data.location || 'Location not available',
          timestamp: data.timestamp || new Date().toISOString()
        });
        setIsConnected(true);
        setLastUpdate(new Date());
        
        // Add to history for chart
        setDataHistory(prev => {
          const newHistory = [...prev, {
            temperature: data.temperature || 0,
            humidity: data.humidity || 0,
            timestamp: new Date()
          }];
          // Keep last 20 readings
          return newHistory.slice(-20);
        });
        
        // Track location
        if (data.location && data.location !== 'Location not available' && !data.location.includes('Waiting')) {
          setTrackedLocations(prev => {
            const newLocation = {
              location: data.location,
              temperature: data.temperature || 0,
              humidity: data.humidity || 0,
              timestamp: new Date().toISOString()
            };
            return [...prev.slice(-49), newLocation];
          });
        }
      }
    }, (error) => {
      console.error('Error listening to sensor:', error);
      setIsConnected(false);
    });

    return () => unsubscribe();
  }, []);

  // Listen to SOS Alerts from Firestore
  useEffect(() => {
    // Global SOS alerts collection for demo
    const sosRef = collection(db, 'sos_alerts');
    const q = query(sosRef, orderBy('timestamp', 'desc'), limit(10));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const alerts = [];
      snapshot.forEach((doc) => {
        alerts.push({ id: doc.id, ...doc.data() });
      });
      setSosAlerts(alerts);
      console.log('🚨 SOS Alerts:', alerts);
    }, (error) => {
      console.error('Error listening to SOS alerts:', error);
    });

    return () => unsubscribe();
  }, []);

  // Simulation Mode - Generate fake sensor data for demo
  useEffect(() => {
    if (!simulateMode) return;

    const interval = setInterval(() => {
      const simulatedData = {
        temperature: Math.floor(Math.random() * 15) + 25, // 25-40°C
        humidity: Math.floor(Math.random() * 30) + 40,    // 40-70%
        location: `Lat: ${28.6 + Math.random() * 0.1}, Lng: ${77.2 + Math.random() * 0.1}`,
        timestamp: new Date().toISOString()
      };

      // Update Firebase Realtime Database
      const sensorRef = ref(database, 'sensor');
      update(sensorRef, simulatedData)
        .then(() => console.log('📤 Simulated data sent to Firebase'))
        .catch(err => console.error('Error sending simulated data:', err));

    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, [simulateMode]);

  // Manual refresh
  const handleRefresh = () => {
    const sensorRef = ref(database, 'sensor');
    onValue(sensorRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setSensorData({
          temperature: data.temperature || 0,
          humidity: data.humidity || 0,
          location: data.location || 'Location not available',
          timestamp: data.timestamp || new Date().toISOString()
        });
      }
    });
  };

  // Trigger test SOS alert
  const triggerTestSOS = async () => {
    try {
      const sosRef = collection(db, 'sos_alerts');
      await addDoc(sosRef, {
        message: 'TEST SOS Alert - Hackathon Demo',
        location: {
          latitude: 28.6139,
          longitude: 77.2090,
          accuracy: 10
        },
        timestamp: new Date().toISOString(),
        status: 'active',
        contactsNotified: 3,
        isTest: true
      });
      alert('✅ Test SOS Alert Triggered!');
    } catch (error) {
      console.error('Error triggering SOS:', error);
      alert('Error: ' + error.message);
    }
  };

  const getStatusColor = (value, type) => {
    if (type === 'temperature') {
      if (value > 35) return 'text-red-600 bg-red-50';
      if (value > 30) return 'text-orange-600 bg-orange-50';
      return 'text-green-600 bg-green-50';
    }
    if (type === 'humidity') {
      if (value > 70) return 'text-blue-600 bg-blue-50';
      if (value > 50) return 'text-cyan-600 bg-cyan-50';
      return 'text-yellow-600 bg-yellow-50';
    }
    return 'text-gray-600 bg-gray-50';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto mb-8"
      >
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl p-6 md:p-8 shadow-2xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <Cpu className="h-8 w-8 text-white" />
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  Hackathon Demo - Live Sensor Dashboard
                </h1>
              </div>
              <p className="text-white/90 text-sm md:text-base">
                Suraksha Device → Firebase Realtime Database → Frontend Visualization
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className={`flex items-center space-x-2 px-4 py-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}>
                {isConnected ? <Wifi className="h-5 w-5 text-white" /> : <WifiOff className="h-5 w-5 text-white" />}
                <span className="text-white font-medium text-sm">
                  {isConnected ? 'Connected' : 'Disconnected'}
                </span>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('https://wa.me/919369508929?text=Hi!%20I%27m%20interested%20in%20purchasing%20the%20Suraksha%20device.', '_blank')}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-full hover:shadow-lg transition-all"
              >
                <ShoppingCart className="h-4 w-4" />
                <span className="hidden sm:inline">Order Suraksha Device</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRefresh}
                className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
              >
                <RefreshCw className="h-5 w-5 text-white" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Control Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="max-w-7xl mx-auto mb-6"
      >
        <div className="bg-white rounded-xl shadow-lg p-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={simulateMode}
                  onChange={(e) => setSimulateMode(e.target.checked)}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="font-medium text-gray-700">🎮 Simulation Mode</span>
              </label>
              
              {simulateMode && (
                <span className="text-sm text-orange-600 flex items-center space-x-1">
                  <Activity className="h-4 w-4 animate-pulse" />
                  <span>Auto-generating sensor data every 3s</span>
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={triggerTestSOS}
                className="px-4 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
              >
                <Bell className="h-5 w-5" />
                <span>Test SOS Alert</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Sensor Data Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Temperature Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          whileHover={{ y: -5 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-orange-100 rounded-xl">
                <Thermometer className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Temperature</p>
                <h3 className="text-2xl font-bold text-gray-900">
                  {sensorData.temperature}°C
                </h3>
              </div>
            </div>
            <TrendingUp className={`h-6 w-6 ${sensorData.temperature > 35 ? 'text-red-500' : 'text-green-500'}`} />
          </div>
          
          {/* Mini chart */}
          <div className="flex items-end space-x-1 h-16 mt-4">
            {dataHistory.slice(-10).map((data, idx) => (
              <div
                key={idx}
                className="flex-1 bg-gradient-to-t from-orange-400 to-orange-200 rounded-t"
                style={{ height: `${(data.temperature / 50) * 100}%` }}
              />
            ))}
          </div>
        </motion.div>

        {/* Humidity Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          whileHover={{ y: -5 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Droplets className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Humidity</p>
                <h3 className="text-2xl font-bold text-gray-900">
                  {sensorData.humidity}%
                </h3>
              </div>
            </div>
            <Activity className="h-6 w-6 text-blue-500" />
          </div>
          
          {/* Mini chart */}
          <div className="flex items-end space-x-1 h-16 mt-4">
            {dataHistory.slice(-10).map((data, idx) => (
              <div
                key={idx}
                className="flex-1 bg-gradient-to-t from-blue-400 to-blue-200 rounded-t"
                style={{ height: `${(data.humidity / 100) * 100}%` }}
              />
            ))}
          </div>
        </motion.div>

        {/* Location Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          whileHover={{ y: -5 }}
          className="bg-white rounded-xl shadow-lg p-6 md:col-span-2"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-green-100 rounded-xl">
                <MapPin className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">GPS Location</p>
                <h3 className="text-lg font-bold text-gray-900 truncate max-w-xs">
                  {sensorData.location}
                </h3>
              </div>
            </div>
            <Signal className="h-6 w-6 text-green-500" />
          </div>
          
          {/* Location visualization */}
          <div className="bg-gray-100 rounded-lg p-4 mt-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4" />
              <span className="font-mono">{sensorData.location}</span>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              Last update: {lastUpdate?.toLocaleTimeString() || 'N/A'}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Data Flow Diagram */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="max-w-7xl mx-auto mb-8"
      >
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
            <Zap className="h-5 w-5 text-yellow-500" />
            <span>Data Flow Architecture</span>
          </h2>
          
          <div className="flex flex-wrap items-center justify-center gap-4">
            {/* Suraksha Device */}
            <motion.div
              animate={{
                boxShadow: isConnected
                  ? ['0 0 20px rgba(59, 130, 246, 0.5)', '0 0 40px rgba(59, 130, 246, 0.8)', '0 0 20px rgba(59, 130, 246, 0.5)']
                  : 'none'
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-xl p-6 text-center min-w-[150px]"
            >
              <Cpu className="h-10 w-10 mx-auto mb-2" />
              <p className="font-bold">Suraksha Device</p>
              <p className="text-xs opacity-80 mt-1">Sensor Data</p>
            </motion.div>

            {/* Arrow */}
            <div className="flex items-center">
              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-blue-600"
              >
                <svg className="w-12 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.div>
            </div>

            {/* Firebase */}
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="bg-gradient-to-br from-orange-500 to-orange-700 text-white rounded-xl p-6 text-center min-w-[150px]"
            >
              <Wifi className="h-10 w-10 mx-auto mb-2" />
              <p className="font-bold">Firebase</p>
              <p className="text-xs opacity-80 mt-1">Realtime Database</p>
            </motion.div>

            {/* Arrow */}
            <div className="flex items-center">
              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
                className="text-purple-600"
              >
                <svg className="w-12 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.div>
            </div>

            {/* Frontend */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-purple-500 to-purple-700 text-white rounded-xl p-6 text-center min-w-[150px]"
            >
              <Activity className="h-10 w-10 mx-auto mb-2" />
              <p className="font-bold">React Frontend</p>
              <p className="text-xs opacity-80 mt-1">Live Dashboard</p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Two Column Layout - SOS Alerts & Data History */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SOS Alerts */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-6 lg:col-span-2"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
              <Bell className="h-5 w-5 text-red-600" />
              <span>SOS Alerts (Firestore)</span>
            </h2>
            <span className="text-sm text-gray-500">{sosAlerts.length} alerts</span>
          </div>

          {sosAlerts.length > 0 ? (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {sosAlerts.map((alert, idx) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`p-4 rounded-lg border-l-4 ${
                    alert.isTest 
                      ? 'bg-yellow-50 border-yellow-500' 
                      : 'bg-red-50 border-red-500'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-red-100 rounded-full">
                        <Bell className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{alert.message}</p>
                        <p className="text-sm text-gray-600">
                          {alert.location?.latitude && alert.location?.longitude 
                            ? `Lat: ${alert.location.latitude}, Lng: ${alert.location.longitude}`
                            : 'Location not available'}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {new Date(alert.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Bell className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 font-medium">No SOS alerts yet</p>
              <p className="text-gray-400 text-sm mt-1">Click "Test SOS Alert" to create one</p>
            </div>
          )}
        </motion.div>

        {/* Live Data History */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
              <Clock className="h-5 w-5 text-blue-600" />
              <span>Live Data History</span>
            </h2>
            <span className="text-sm text-gray-500">{dataHistory.length} readings</span>
          </div>

          {dataHistory.length > 0 ? (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {dataHistory.slice().reverse().map((reading, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Thermometer className="h-4 w-4 text-orange-600" />
                      <span className="font-medium text-gray-900">{reading.temperature}°C</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Droplets className="h-4 w-4 text-blue-600" />
                      <span className="font-medium text-gray-900">{reading.humidity}%</span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">
                    {reading.timestamp.toLocaleTimeString()}
                  </span>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Activity className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 font-medium">No data received yet</p>
              <p className="text-gray-400 text-sm mt-1">
                {simulateMode ? 'Waiting for simulated data...' : 'Connect Suraksha Device or enable simulation mode'}
              </p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Location Tracking Section */}
      {trackedLocations.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="max-w-7xl mx-auto mt-6"
        >
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-purple-600" />
                <span>Live Location Tracking</span>
              </h2>
              <span className="text-sm font-bold text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
                {trackedLocations.length} location{trackedLocations.length > 1 ? 's' : ''} tracked
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-64 overflow-y-auto">
              {trackedLocations.map((loc, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-4 border border-purple-200"
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin className="h-4 w-4 text-purple-600" />
                    <span className="text-xs font-bold text-purple-700">Location #{idx + 1}</span>
                  </div>
                  <p className="text-sm text-gray-700 font-medium mb-2 break-words">{loc.location}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{loc.temperature}°C | {loc.humidity}%</span>
                    <span>{new Date(loc.timestamp).toLocaleTimeString()}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Technical Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="max-w-7xl mx-auto mt-8 mb-8"
      >
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl shadow-lg p-6 text-white">
          <h2 className="text-xl font-bold mb-4 flex items-center space-x-2">
            <Cpu className="h-5 w-5" />
            <span>Technical Implementation</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-bold text-blue-400 mb-2">1. Suraksha Device</h3>
              <ul className="text-sm space-y-1 text-gray-300">
                <li>• DHT11/DHT22 Sensor</li>
                <li>• GPS Module (NEO-6M)</li>
                <li>• WiFi Connection</li>
                <li>• Firebase Realtime DB</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-orange-400 mb-2">2. Firebase Backend</h3>
              <ul className="text-sm space-y-1 text-gray-300">
                <li>• Realtime Database</li>
                <li>• Firestore (SOS Alerts)</li>
                <li>• Real-time Sync</li>
                <li>• Cloud Security Rules</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-purple-400 mb-2">3. React Frontend</h3>
              <ul className="text-sm space-y-1 text-gray-300">
                <li>• Firebase SDK v9</li>
                <li>• Real-time Listeners</li>
                <li>• Framer Motion UI</li>
                <li>• TailwindCSS</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HackathonDemo;
