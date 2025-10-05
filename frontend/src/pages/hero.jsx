import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate("/events");
  };

  return (
    <section className="relative bg-gray-900 text-white h-screen flex flex-col justify-center items-center overflow-hidden">
      {/* ✅ Top Navbar */}
      <div className="absolute top-0 left-0 w-full flex items-center justify-between px-8 py-4 z-20">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Event Hub
        </h1>
        <div className="flex space-x-4">
          <button
            onClick={() => navigate("/login")}
            className="px-5 py-2 border border-gray-400 text-gray-200 font-semibold rounded-lg hover:bg-gray-800 transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="px-5 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transition transform"
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* Background glowing shapes */}
      <div className="absolute top-0 left-0 w-full h-full">
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute w-72 h-72 bg-purple-700 rounded-full opacity-20 -top-16 -left-16 blur-3xl"
        />
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute w-96 h-96 bg-indigo-600 rounded-full opacity-15 -bottom-20 -right-32 blur-3xl"
        />
      </div>

      {/* ✅ Centered Hero Content */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-6 max-w-3xl">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400"
        >
          Discover Amazing Tech Events
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-lg md:text-xl text-gray-300"
        >
          Find hackathons, workshops, and conferences near you. Stay updated and never miss an opportunity.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex space-x-4"
        >
          <button
            onClick={handleExploreClick}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transition transform"
          >
            Explore Events
          </button>
          <a
            href="#subscribe"
            className="px-6 py-3 border border-gray-400 text-gray-200 font-semibold rounded-lg hover:bg-gray-700 hover:border-gray-300 transition"
          >
            Watch Demo
          </a>
        </motion.div>
      </div>

      {/* ✅ Companies/Platforms Section */}
      <div className="absolute bottom-6 w-full px-8">
        <p className="text-center text-gray-400 mb-4">Events from top platforms</p>
        <div className="flex flex-wrap justify-center gap-8 opacity-80">
          <img src="https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png" alt="LeetCode" className="h-10" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/e/e0/HackerRank_Icon-1000px.png" alt="HackerRank" className="h-10" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React" className="h-10" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Kaggle_logo.png" alt="Kaggle" className="h-10" />
          <img src="https://jsnation.com/images/logo-jsnation.png" alt="JSNation" className="h-10" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" alt="AWS" className="h-10" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg" alt="Google Cloud" className="h-10" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="Microsoft" className="h-8" />
          <img src="https://i.ibb.co/fC1QfJ7/blackhat-logo.png" alt="Black Hat USA" className="h-10" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" alt="LinkedIn" className="h-10" />
        </div>
      </div>
    </section>
  );
}