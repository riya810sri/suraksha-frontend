import { motion } from 'framer-motion';
import {
  Clock,
  MapPin,
  Bell,
  CheckCircle,
  AlertTriangle,
  Shield,
  Download,
  Filter,
  Calendar,
  Search,
  Activity
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { getUserIncidents } from '../services/firestoreService';
import { useNavigate } from 'react-router-dom';

const History = () => {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [currentUser, setCurrentUser] = useState(null);
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        const userIncidents = await getUserIncidents(user.uid);
        setIncidents(userIncidents);
        setLoading(false);
      } else {
        navigate('/login');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const stats = {
    totalEvents: incidents.length,
    sosAlerts: incidents.filter(i => i.type === 'sos').length,
    locationsShared: incidents.filter(i => i.type === 'location').length,
    checkIns: incidents.filter(i => i.type === 'checkin').length,
  };

  const filteredData = incidents.filter(item => {
    const matchesSearch = item.message?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || item.type === selectedType;
    
    // Filter by period
    const now = new Date();
    const itemDate = item.createdAt?.toDate ? item.createdAt.toDate() : new Date();
    const hoursDiff = (now - itemDate) / (1000 * 60 * 60);
    
    let matchesPeriod = true;
    if (selectedPeriod === 'today') {
      matchesPeriod = hoursDiff <= 24;
    } else if (selectedPeriod === 'week') {
      matchesPeriod = hoursDiff <= (24 * 7);
    } else if (selectedPeriod === 'month') {
      matchesPeriod = hoursDiff <= (24 * 30);
    }
    
    return matchesSearch && matchesType && matchesPeriod;
  });

  const periods = [
    { id: 'today', label: 'Today' },
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'all', label: 'All Time' },
  ];

  const types = [
    { id: 'all', label: 'All Types' },
    { id: 'sos', label: 'SOS Alerts' },
    { id: 'location', label: 'Location Shares' },
    { id: 'checkin', label: 'Check-ins' },
    { id: 'alert', label: 'Safety Alerts' },
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'sos': return Bell;
      case 'location': return MapPin;
      case 'checkin': return CheckCircle;
      case 'alert': return AlertTriangle;
      default: return Clock;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'sos': return 'text-red-600 bg-red-50 border-red-200';
      case 'location': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'checkin': return 'text-green-600 bg-green-50 border-green-200';
      case 'alert': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'resolved': return 'bg-green-100 text-green-700';
      case 'completed': return 'bg-blue-100 text-blue-700';
      case 'active': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } }
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Activity History
          </h1>
          <p className="text-gray-600">
            Track and review all your safety-related activities
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { icon: Activity, label: 'Total Events', value: stats.totalEvents || 0, color: 'text-primary-600', bgColor: 'bg-primary-50' },
            { icon: Bell, label: 'SOS Alerts', value: stats.sosAlerts || 0, color: 'text-red-600', bgColor: 'bg-red-50' },
            { icon: MapPin, label: 'Locations Shared', value: stats.locationsShared || 0, color: 'text-blue-600', bgColor: 'bg-blue-50' },
            { icon: CheckCircle, label: 'Check-ins', value: stats.checkIns || 0, color: 'text-green-600', bgColor: 'bg-green-50' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.05 }}
              className={`${stat.bgColor} rounded-xl p-4 shadow-md text-center cursor-pointer transition-all`}
            >
              <stat.icon className={`h-6 w-6 ${stat.color} mx-auto mb-2`} />
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-4 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search activities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* Type Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none bg-white"
              >
                {types.map((type) => (
                  <option key={type.id} value={type.id}>{type.label}</option>
                ))}
              </select>
            </div>

            {/* Period Filter */}
            <div className="flex gap-2">
              {periods.map((period) => (
                <button
                  key={period.id}
                  onClick={() => setSelectedPeriod(period.id)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                    selectedPeriod === period.id
                      ? 'bg-primary-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {period.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        {loading ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600 font-medium">Loading your history...</p>
          </div>
        ) : filteredData.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {filteredData.map((item, index) => {
              const IconComponent = getTypeIcon(item.type);
              const timestamp = item.createdAt?.toDate ? item.createdAt.toDate().toLocaleString() : 'Recently';
              
              return (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  whileHover={{ x: 5, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden transition-all"
                >
                  <div className="p-4 md:p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-3 md:space-x-4">
                        <div className={`${getTypeColor(item.type)} p-2 md:p-3 rounded-xl border-2 flex-shrink-0`}>
                          <IconComponent className="h-5 w-5 md:h-6 md:w-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1 capitalize">
                            {item.type} Alert
                          </h3>
                          <p className="text-gray-600 text-sm mb-2">
                            {item.message || `${item.type} event recorded`}
                          </p>
                          <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-3 w-3 md:h-4 md:w-4" />
                              <span>{timestamp}</span>
                            </div>
                            {item.location?.latitude && item.location?.longitude && (
                              <div className="flex items-center space-x-1">
                                <MapPin className="h-3 w-3 md:h-4 md:w-4" />
                                <span>Lat: {item.location.latitude.toFixed(2)}, Lng: {item.location.longitude.toFixed(2)}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <span className={`px-2 md:px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(item.status || 'completed')}`}>
                        {item.status || 'completed'}
                      </span>
                    </div>

                    {/* Additional Details */}
                    <div className="bg-gray-50 rounded-lg p-3 md:p-4 mt-4">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                        {item.contactsNotified !== undefined && (
                          <div className="flex items-center space-x-2">
                            <Shield className="h-4 w-4 md:h-5 md:w-5 text-primary-600" />
                            <div>
                              <div className="text-xs text-gray-500">Contacts Notified</div>
                              <div className="font-semibold text-gray-900 text-sm md:text-base">{item.contactsNotified}</div>
                            </div>
                          </div>
                        )}
                        {item.location && (
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
                            <div>
                              <div className="text-xs text-gray-500">Location</div>
                              <div className="font-semibold text-gray-900 text-sm">Tracked</div>
                            </div>
                          </div>
                        )}
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 md:h-5 md:w-5 text-purple-600" />
                          <div>
                            <div className="text-xs text-gray-500">Recorded</div>
                            <div className="font-semibold text-gray-900 text-sm">{timestamp.split(',')[1] || 'Recently'}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-white rounded-xl shadow-lg"
          >
            <Clock className="h-20 w-20 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No activity found</h3>
            <p className="text-gray-600 mb-6">Your SOS alerts and activities will appear here</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/dashboard')}
              className="bg-primary-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-primary-700 transition-all shadow-md"
            >
              Go to Dashboard
            </motion.button>
          </motion.div>
        )}
      </div>
    </main>
  );
};

export default History;
