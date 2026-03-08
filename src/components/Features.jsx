import { motion } from "framer-motion";
import { 
  Bell, 
  MapPin, 
  Users, 
  Shield, 
  ArrowRight,
  Zap,
  Navigation,
  Heart
} from "lucide-react";

const features = [
  {
    id: 1,
    title: "SOS Alerts",
    description: "Instant alerts sent to emergency contacts to ensure quick response during critical situations.",
    icon: Bell,
    color: "from-red-500 to-rose-600",
    bgColor: "bg-red-50",
    accentColor: "text-red-600"
  },
  {
    id: 2,
    title: "GPS Tracking",
    description: "Live location updates for you and your trusted network with real-time tracking capabilities.",
    icon: MapPin,
    color: "from-blue-500 to-cyan-600",
    bgColor: "bg-blue-50",
    accentColor: "text-blue-600"
  },
  {
    id: 3,
    title: "Community Support",
    description: "Connect with trained volunteers and nearby users ready to assist in emergencies.",
    icon: Users,
    color: "from-green-500 to-emerald-600",
    bgColor: "bg-green-50",
    accentColor: "text-green-600"
  },
  {
    id: 4,
    title: "Geo-Fencing",
    description: "Set safe zones and get instant notifications when you or loved ones enter or exit designated areas.",
    icon: Shield,
    color: "from-purple-500 to-violet-600",
    bgColor: "bg-purple-50",
    accentColor: "text-purple-600"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.9
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.6
    }
  },
  hover: {
    y: -8,
    scale: 1.02,
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
      duration: 0.3
    }
  }
};

const iconVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: { 
    scale: 1, 
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
      delay: 0.3
    }
  }
};

const FeatureCard = ({ feature, index }) => {
  const IconComponent = feature.icon;
  
  return (
    <motion.div
      className="group relative bg-white rounded-2xl p-8 shadow-lg border border-gray-100 overflow-hidden cursor-pointer"
      variants={cardVariants}
      whileHover="hover"
      initial="hidden"
      animate="visible"
    >
      {/* Gradient Background on Hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
      
      {/* Icon Container */}
      <motion.div 
        className={`relative ${feature.bgColor} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15,
          delay: index * 0.1 + 0.2
        }}
      >
        <IconComponent className={`w-8 h-8 ${feature.accentColor}`} />
        
        {/* Animated Ring */}
        <motion.div
          className={`absolute inset-0 rounded-2xl border-2 ${feature.accentColor} opacity-0 group-hover:opacity-100`}
          initial={{ scale: 1, opacity: 0 }}
          whileHover={{ 
            scale: 1.5, 
            opacity: 0,
            transition: { duration: 0.6 }
          }}
        />
      </motion.div>
      
      {/* Content */}
      <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 transition-all duration-300">
        {feature.title}
      </h3>
      
      <p className="text-gray-600 leading-relaxed mb-6">
        {feature.description}
      </p>
      
      {/* Learn More Link */}
      <motion.div 
        className="flex items-center gap-2 text-sm font-semibold text-gray-900"
        initial={{ x: -10, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5 + index * 0.1 }}
      >
        <span className="group-hover:underline decoration-2 underline-offset-4">
          Learn more
        </span>
        <motion.div
          initial={{ x: 0 }}
          whileHover={{ x: 5 }}
          transition={{ repeat: Infinity, repeatType: "reverse", duration: 0.3 }}
        >
          <ArrowRight className="w-4 h-4" />
        </motion.div>
      </motion.div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-transparent to-gray-50 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
};

const Features = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 200, 
              damping: 15, 
              delay: 0.2 
            }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-rose-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg"
          >
            <Zap className="w-4 h-4" />
            <span>Powerful Safety Features</span>
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            Your Safety, Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-600">
              Priority
            </span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive emergency response system designed to keep you and your loved ones safe, 24/7.
          </p>
        </motion.div>
        
        {/* Features Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {features.map((feature, index) => (
            <FeatureCard 
              key={feature.id} 
              feature={feature} 
              index={index}
            />
          ))}
        </motion.div>
        
        {/* CTA Section */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <div className="relative inline-block">
            {/* Animated Background Glow */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-red-500 to-rose-600 rounded-full blur-xl opacity-30"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <motion.button
              className="relative bg-gradient-to-r from-red-500 to-rose-600 text-white px-10 py-4 rounded-full font-bold text-lg shadow-2xl hover:shadow-red-500/50 transition-all duration-300 flex items-center gap-3 mx-auto"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(239, 68, 68, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Heart className="w-6 h-6" />
              <span>Get Started Now</span>
              <Navigation className="w-6 h-6" />
            </motion.button>
          </div>
          
          <motion.p 
            className="mt-6 text-gray-500 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            Join thousands of users who trust Suraksha for their safety
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
