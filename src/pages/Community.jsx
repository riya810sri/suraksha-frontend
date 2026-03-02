import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Search,
  MessageSquare,
  Heart,
  Share2,
  Award,
  Shield,
  Star,
  TrendingUp,
  Filter,
  Plus,
  X
} from 'lucide-react';
import { useState } from 'react';

const Community = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: 'tips'
  });

  const discussions = [
    { id: 1, title: 'Best safety practices for late night travel?', author: 'Priya S.', replies: 45, likes: 128, category: 'tips', pinned: true },
    { id: 2, title: 'How to use the SOS feature effectively?', author: 'Rahul M.', replies: 32, likes: 95, category: 'help', pinned: true },
    { id: 3, title: 'Community meet-up in Delhi this weekend', author: 'Amit K.', replies: 67, likes: 234, category: 'event', pinned: false },
    { id: 4, title: 'Success story: Suraksha helped me reach home safely', author: 'Neha G.', replies: 89, likes: 456, category: 'story', pinned: false },
    { id: 5, title: 'New features request: Voice-activated SOS', author: 'Karan P.', replies: 23, likes: 78, category: 'feedback', pinned: false },
  ];

  const volunteers = [
    { id: 1, name: 'Dr. Anjali Mehta', specialty: 'Medical Professional', rating: 4.9, helped: 234, location: 'Delhi', available: true, image: 'https://i.pravatar.cc/150?img=1' },
    { id: 2, name: 'Vikram Singh', specialty: 'Self Defense Trainer', rating: 4.8, helped: 189, location: 'Gurgaon', available: true, image: 'https://i.pravatar.cc/150?img=11' },
    { id: 3, name: 'Sneha Reddy', specialty: 'Counselor', rating: 4.9, helped: 312, location: 'Bangalore', available: false, image: 'https://i.pravatar.cc/150?img=5' },
    { id: 4, name: 'Arjun Kapoor', specialty: 'First Aid Expert', rating: 4.7, helped: 156, location: 'Mumbai', available: true, image: 'https://i.pravatar.cc/150?img=12' },
    { id: 5, name: 'Kavita Desai', specialty: 'Legal Advisor', rating: 4.8, helped: 201, location: 'Pune', available: true, image: 'https://i.pravatar.cc/150?img=9' },
    { id: 6, name: 'Rohan Malhotra', specialty: 'Security Expert', rating: 4.9, helped: 278, location: 'Delhi', available: false, image: 'https://i.pravatar.cc/150?img=13' },
  ];

  const stats = [
    { icon: Users, value: '10K+', label: 'Community Members' },
    { icon: Heart, value: '5K+', label: 'Volunteers' },
    { icon: MessageSquare, value: '50K+', label: 'Discussions' },
    { icon: Award, value: '1K+', label: 'Success Stories' },
  ];

  const categories = [
    { id: 'all', label: 'All Posts' },
    { id: 'tips', label: 'Safety Tips' },
    { id: 'help', label: 'Help & Support' },
    { id: 'event', label: 'Events' },
    { id: 'story', label: 'Success Stories' },
    { id: 'feedback', label: 'Feedback' },
  ];

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPost.title || !newPost.content) {
      alert('Please fill in all fields');
      return;
    }
    alert('Post created successfully! ✅ (Demo mode)');
    setShowCreatePost(false);
    setNewPost({ title: '', content: '', category: 'tips' });
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
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Community Hub
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with volunteers, share experiences, and learn from the community
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-lg p-6 text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full mb-3">
                <stat.icon className="h-6 w-6 text-primary-600" />
              </div>
              <div className="text-3xl font-bold text-primary-600 mb-1">{stat.value}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Search and Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-lg p-4"
            >
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search discussions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowCreatePost(true)}
                  className="flex items-center justify-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-all shadow-md"
                >
                  <Plus className="h-5 w-5" />
                  <span>New Post</span>
                </motion.button>
              </div>
            </motion.div>

            {/* Category Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex gap-2 overflow-x-auto pb-2"
            >
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all duration-300 ${
                    activeTab === category.id
                      ? 'bg-primary-600 text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </motion.div>

            {/* Discussions List */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {discussions.filter(d => {
                const matchesSearch = d.title.toLowerCase().includes(searchQuery.toLowerCase());
                const matchesCategory = activeTab === 'all' || d.category === activeTab;
                return matchesSearch && matchesCategory;
              }).map((discussion, index) => (
                <motion.div
                  key={discussion.id}
                  variants={itemVariants}
                  whileHover={{ y: -3, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                  className="bg-white rounded-xl shadow-lg p-6 cursor-pointer transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      {discussion.pinned && (
                        <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs font-semibold rounded-full flex items-center space-x-1">
                          <TrendingUp className="h-3 w-3" />
                          <span>Pinned</span>
                        </span>
                      )}
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        discussion.category === 'tips' ? 'bg-green-100 text-green-700' :
                        discussion.category === 'help' ? 'bg-blue-100 text-blue-700' :
                        discussion.category === 'event' ? 'bg-purple-100 text-purple-700' :
                        discussion.category === 'story' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {discussion.category}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-2 hover:text-primary-600 transition-colors">
                    {discussion.title}
                  </h3>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full" />
                      <span className="text-sm text-gray-600">by {discussion.author}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>{discussion.replies}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="h-4 w-4" />
                        <span>{discussion.likes}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-6"
          >
            {/* Top Volunteers */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-primary-600" />
                  <span>Top Volunteers</span>
                </h3>
                <button className="text-primary-600 text-sm font-medium hover:underline">
                  View All
                </button>
              </div>

              <div className="space-y-4">
                {volunteers.slice(0, 4).map((volunteer, index) => (
                  <motion.div
                    key={volunteer.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 5 }}
                    className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg cursor-pointer transition-all"
                  >
                    <div className="relative">
                      <img
                        src={volunteer.image}
                        alt={volunteer.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      {volunteer.available && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 text-sm">{volunteer.name}</h4>
                      <p className="text-xs text-gray-500">{volunteer.specialty}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-medium">{volunteer.rating}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Become a Volunteer */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl shadow-lg p-6 text-white"
            >
              <Shield className="h-12 w-12 mb-4" />
              <h3 className="text-xl font-bold mb-2">Become a Volunteer</h3>
              <p className="text-primary-100 mb-4">
                Join our community of safety champions and help make a difference.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-white text-primary-600 font-semibold py-3 rounded-lg hover:bg-primary-50 transition-colors"
              >
                Apply Now
              </motion.button>
            </motion.div>

            {/* Safety Tips */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <Award className="h-5 w-5 text-primary-600" />
                <span>Quick Safety Tips</span>
              </h3>
              <ul className="space-y-3">
                {[
                  'Always share your live location with trusted contacts',
                  'Keep emergency numbers on speed dial',
                  'Trust your instincts - if something feels wrong, leave',
                  'Use well-lit and populated routes at night',
                ].map((tip, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-2 text-sm text-gray-600"
                  >
                    <div className="w-5 h-5 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary-600 text-xs font-bold">{index + 1}</span>
                    </div>
                    <span>{tip}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Create Post Modal */}
      <AnimatePresence>
        {showCreatePost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowCreatePost(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                  <MessageSquare className="h-6 w-6 text-primary-600" />
                  <span>Create New Post</span>
                </h3>
                <button
                  onClick={() => setShowCreatePost(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleCreatePost} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    placeholder="What's on your mind?"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={newPost.category}
                    onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  >
                    <option value="tips">Safety Tips</option>
                    <option value="help">Help & Support</option>
                    <option value="event">Events</option>
                    <option value="story">Success Stories</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Content <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    placeholder="Share your thoughts, experiences, or questions..."
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all resize-none"
                    required
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowCreatePost(false)}
                    className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 px-4 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors shadow-md"
                  >
                    Post
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Community;
