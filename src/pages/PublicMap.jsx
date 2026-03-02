import { motion } from 'framer-motion';
import {
  MapPin,
  Search,
  Filter,
  Shield,
  AlertTriangle,
  Users,
  Navigation,
  Plus,
  ZoomIn,
  ZoomOut,
  X
} from 'lucide-react';
import { useState } from 'react';

const PublicMap = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchResult, setSearchResult] = useState(null);
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const safetyZones = [
    { id: 1, name: 'Connaught Place', type: 'safe', volunteers: 45, incidents: 2, lat: 28.6315, lng: 77.2167, keywords: ['cp', 'connaught', 'place', 'central'] },
    { id: 2, name: 'Karol Bagh', type: 'moderate', volunteers: 28, incidents: 8, lat: 28.6519, lng: 77.1909, keywords: ['karol', 'bagh', 'west'] },
    { id: 3, name: 'Lajpat Nagar', type: 'safe', volunteers: 52, incidents: 1, lat: 28.5677, lng: 77.2436, keywords: ['lajpat', 'nagar', 'south', 'market'] },
    { id: 4, name: 'Chandni Chowk', type: 'caution', volunteers: 15, incidents: 12, lat: 28.6506, lng: 77.2303, keywords: ['chandni', 'chowk', 'old', 'delhi', 'crowded'] },
    { id: 5, name: 'Saket', type: 'safe', volunteers: 67, incidents: 0, lat: 28.5244, lng: 77.2066, keywords: ['saket', 'south', 'mall', 'select'] },
    { id: 6, name: 'Rohini', type: 'moderate', volunteers: 34, incidents: 5, lat: 28.7495, lng: 77.0610, keywords: ['rohini', 'north', 'west'] },
  ];

  // Nearby localities mapped to nearest safety zone
  const nearbyLocalities = [
    { name: 'Rajiv Chowk', nearestZone: 1, distance: '0.5 km' },
    { name: 'Janpath', nearestZone: 1, distance: '0.8 km' },
    { name: 'Barakhamba', nearestZone: 1, distance: '1.2 km' },
    { name: 'Paharganj', nearestZone: 2, distance: '1.5 km' },
    { name: 'Rajendra Place', nearestZone: 2, distance: '2.0 km' },
    { name: 'Greater Kailash', nearestZone: 3, distance: '1.8 km' },
    { name: 'Defence Colony', nearestZone: 3, distance: '2.2 km' },
    { name: 'Hauz Khas', nearestZone: 3, distance: '3.0 km' },
    { name: 'Red Fort', nearestZone: 4, distance: '1.0 km' },
    { name: 'Jama Masjid', nearestZone: 4, distance: '0.8 km' },
    { name: 'Kashmere Gate', nearestZone: 4, distance: '1.5 km' },
    { name: 'Vasant Kunj', nearestZone: 5, distance: '2.5 km' },
    { name: 'Mehrauli', nearestZone: 5, distance: '3.2 km' },
    { name: 'Pitampura', nearestZone: 6, distance: '2.0 km' },
    { name: 'Shalimar Bagh', nearestZone: 6, distance: '1.8 km' },
    { name: 'Dwarka', nearestZone: 6, distance: '4.5 km' },
    { name: 'Noida', nearestZone: 6, distance: '8.0 km' },
    { name: 'Gurgaon', nearestZone: 5, distance: '6.5 km' },
    { name: 'Delhi', nearestZone: 1, distance: '0 km' },
    { name: 'New Delhi', nearestZone: 1, distance: '2 km' },
    { name: 'India Gate', nearestZone: 1, distance: '2.5 km' },
    { name: 'Connaught Circus', nearestZone: 1, distance: '0.3 km' },
    { name: 'Khan Market', nearestZone: 1, distance: '3.0 km' },
    { name: 'Lodhi Road', nearestZone: 1, distance: '3.5 km' },
    { name: 'RK Puram', nearestZone: 5, distance: '4.0 km' },
    { name: 'Vasant Vihar', nearestZone: 5, distance: '3.8 km' },
    { name: 'Lajpat', nearestZone: 3, distance: '0.5 km' },
    { name: 'Nagar', nearestZone: 3, distance: '0.5 km' },
    { name: 'Saket', nearestZone: 5, distance: '0 km' },
    { name: 'Karol', nearestZone: 2, distance: '0.5 km' },
    { name: 'Bagh', nearestZone: 2, distance: '0.5 km' },
    { name: 'Chandni', nearestZone: 4, distance: '0.5 km' },
    { name: 'Chowk', nearestZone: 4, distance: '0.5 km' },
    { name: 'Rohini', nearestZone: 6, distance: '0 km' },
  ];

  const recentIncidents = [
    { id: 1, location: 'Near Metro Station, Dwarka', type: 'emergency', time: '5 min ago', status: 'resolved' },
    { id: 2, location: 'Sector 18, Noida', type: 'alert', time: '15 min ago', status: 'active' },
    { id: 3, location: 'MG Road, Gurgaon', type: 'emergency', time: '1 hour ago', status: 'resolved' },
  ];

  const filters = [
    { id: 'all', label: 'All Areas' },
    { id: 'safe', label: 'Safe Zones' },
    { id: 'moderate', label: 'Moderate Risk' },
    { id: 'caution', label: 'High Caution' },
  ];

  const getTypeColor = (type) => {
    switch (type) {
      case 'safe': return 'bg-green-100 text-green-700 border-green-300';
      case 'moderate': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'caution': return 'bg-red-100 text-red-700 border-red-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const filteredZones = safetyZones.filter(zone => {
    if (selectedFilter === 'all') return true;
    return zone.type === selectedFilter;
  });

  const handleMapClick = (zone) => {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${zone.lat},${zone.lng}`;
    window.open(googleMapsUrl, '_blank');
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setSearchResult(null);
      setShowSearchResult(false);
      return;
    }
    
    const queryLower = query.toLowerCase().trim();
    
    // First, search in safety zones by name or keywords
    let found = safetyZones.find(zone => 
      zone.name.toLowerCase().includes(queryLower) ||
      zone.keywords?.some(keyword => keyword.includes(queryLower)) ||
      queryLower.includes(zone.name.toLowerCase().split(' ')[0])
    );
    
    if (found) {
      setSearchResult({
        ...found,
        isExactMatch: true,
        distance: '0 km'
      });
      setShowSearchResult(true);
      return;
    }
    
    // Second, search in nearby localities
    const nearbyMatch = nearbyLocalities.find(locality =>
      locality.name.toLowerCase().includes(queryLower) ||
      queryLower.includes(locality.name.toLowerCase())
    );
    
    if (nearbyMatch) {
      const zone = safetyZones.find(z => z.id === nearbyMatch.nearestZone);
      setSearchResult({
        ...zone,
        isExactMatch: false,
        nearbyLocality: nearbyMatch.name,
        distance: nearbyMatch.distance
      });
      setShowSearchResult(true);
      return;
    }
    
    // Third, check if any keyword matches
    const keywordMatch = safetyZones.find(zone =>
      zone.keywords?.some(keyword => queryLower.includes(keyword))
    );
    
    if (keywordMatch) {
      setSearchResult({
        ...keywordMatch,
        isExactMatch: false,
        distance: '~2-5 km'
      });
      setShowSearchResult(true);
      return;
    }
    
    // Not found
    setSearchResult(null);
    setShowSearchResult(true);
  };

  const getZoneTypeColor = (type) => {
    switch (type) {
      case 'safe': return 'bg-green-500';
      case 'moderate': return 'bg-yellow-500';
      case 'caution': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getZoneTypeLabel = (type) => {
    switch (type) {
      case 'safe': return 'Safe Zone';
      case 'moderate': return 'Moderate Risk';
      case 'caution': return 'High Caution';
      default: return 'Unknown';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Public Safety Map
          </h1>
          <p className="text-gray-600">
            Real-time safety information and incident tracking in your area
          </p>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg p-4 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search location (e.g., Connaught Place, Karol Bagh)..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
              />
              {/* Search Result Dropdown */}
              {showSearchResult && searchQuery.trim() !== '' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-10"
                >
                  {searchResult ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${getZoneTypeColor(searchResult.type)}`} />
                        <div>
                          <p className="font-semibold text-gray-900">
                            {searchResult.isExactMatch ? searchResult.name : searchResult.nearbyLocality || searchResult.name}
                          </p>
                          <p className={`text-sm ${
                            searchResult.type === 'safe' ? 'text-green-600' :
                            searchResult.type === 'moderate' ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {getZoneTypeLabel(searchResult.type)}
                            {!searchResult.isExactMatch && searchResult.nearbyLocality && (
                              <span className="ml-2 text-gray-500">
                                • Near {searchResult.name} ({searchResult.distance})
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">
                          {searchResult.volunteers} volunteers
                        </span>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleMapClick(searchResult)}
                          className="px-3 py-1 bg-primary-600 text-white text-xs rounded-lg hover:bg-primary-700 transition-colors"
                        >
                          View on Map
                        </motion.button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2 text-gray-500">
                      <AlertTriangle className="h-5 w-5" />
                      <div>
                        <p className="font-medium">Location not found in our database</p>
                        <p className="text-sm">Try searching for Delhi NCR areas like Dwarka, Noida, Gurgaon, etc.</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2 flex-wrap">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    selectedFilter === filter.id
                      ? 'bg-primary-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Add Report Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-all shadow-md"
            >
              <Plus className="h-5 w-5" />
              <span>Report</span>
            </motion.button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Area */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Map Placeholder */}
              <div className="relative h-96 md:h-[500px] bg-gradient-to-br from-blue-50 to-green-50">
                {/* Search Result Highlight */}
                {searchResult && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-lg shadow-lg z-20 flex items-center space-x-2"
                  >
                    <div className={`w-3 h-3 rounded-full ${getZoneTypeColor(searchResult.type)}`} />
                    <span className="font-semibold text-gray-900">
                      {searchResult.isExactMatch ? searchResult.name : searchResult.nearbyLocality || searchResult.name}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      searchResult.type === 'safe' ? 'bg-green-100 text-green-700' :
                      searchResult.type === 'moderate' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {getZoneTypeLabel(searchResult.type)}
                    </span>
                    {!searchResult.isExactMatch && searchResult.nearbyLocality && (
                      <span className="text-xs text-gray-500">
                        • Near {searchResult.name}
                      </span>
                    )}
                    <button
                      onClick={() => {
                        setSearchResult(null);
                        setSearchQuery('');
                        setShowSearchResult(false);
                      }}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </motion.div>
                )}

                {/* Simulated Map Markers */}
                {filteredZones.map((zone, index) => (
                  <motion.div
                    key={zone.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1, type: 'spring' }}
                    whileHover={{ scale: 1.2, zIndex: 10 }}
                    onClick={() => handleMapClick(zone)}
                    className={`absolute cursor-pointer group ${
                      zone.type === 'safe' ? 'text-green-600' :
                      zone.type === 'moderate' ? 'text-yellow-600' : 'text-red-600'
                    }`}
                    style={{
                      top: `${20 + (index * 15) % 60}%`,
                      left: `${15 + (index * 20) % 70}%`,
                    }}
                  >
                    <div className="relative">
                      <MapPin className="h-8 w-8 drop-shadow-lg" />
                      <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full ${
                        zone.type === 'safe' ? 'bg-green-500' :
                        zone.type === 'moderate' ? 'bg-yellow-500' : 'bg-red-500'
                      } border-2 border-white`} />
                      {/* Tooltip on hover */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        {zone.name}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                          <div className="border-4 border-transparent border-t-gray-900" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Map Controls */}
                <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50"
                  >
                    <ZoomIn className="h-5 w-5 text-gray-700" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50"
                  >
                    <ZoomOut className="h-5 w-5 text-gray-700" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50"
                  >
                    <Navigation className="h-5 w-5 text-primary-600" />
                  </motion.button>
                </div>

                {/* Legend */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">Legend</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                      <span>Safe Zone</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <span>Moderate Risk</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <span>High Caution</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Safety Zones List */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-primary-600" />
                  <span>Safety Zones</span>
                </h3>
                <span className="text-sm text-gray-500">{filteredZones.length} areas</span>
              </div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-3"
              >
                {filteredZones.map((zone) => (
                  <motion.div
                    key={zone.id}
                    variants={itemVariants}
                    whileHover={{ x: 5, backgroundColor: 'rgba(0,0,0,0.02)' }}
                    onClick={() => handleMapClick(zone)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${getTypeColor(zone.type)}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">{zone.name}</h4>
                      <span className="text-xs px-2 py-1 rounded-full bg-white/50 capitalize">
                        {zone.type}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{zone.volunteers} volunteers</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <AlertTriangle className="h-4 w-4" />
                        <span>{zone.incidents} incidents</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Recent Incidents */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <span>Recent Incidents</span>
                </h3>
              </div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-3"
              >
                {recentIncidents.map((incident, index) => (
                  <motion.div
                    key={incident.id}
                    variants={itemVariants}
                    whileHover={{ x: 5 }}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer transition-all"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {incident.type === 'emergency' ? (
                          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-yellow-500" />
                        )}
                        <span className="font-medium text-gray-900 text-sm">
                          {incident.location}
                        </span>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        incident.status === 'active'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {incident.status}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">{incident.time}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default PublicMap;
