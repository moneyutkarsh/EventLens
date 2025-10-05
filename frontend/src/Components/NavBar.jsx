import { useState, useEffect } from "react";
import { Menu, X, Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function Navbar({ notifications = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [animateBell, setAnimateBell] = useState(false);

  const navItems = [
    { name: "Home", href: "/events" },
    { name: "My Events", href: "/saved" },
    { name: "TechPulse", href: "/techpulse" },
  ];

  // 🔔 Show toast for new notifications
  useEffect(() => {
    if (notifications.length > 0) {
      const latest = notifications[notifications.length - 1];
      toast.success(latest, {
        duration: 4000,
        position: "top-right",
      });

      setAnimateBell(true);
      const timer = setTimeout(() => setAnimateBell(false), 800);
      return () => clearTimeout(timer);
    }
  }, [notifications]);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative text-white fixed w-full z-50 shadow-lg"
    >
      {/* 🔹 Gradient + dotted background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] to-[#1e293b] opacity-95" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      <Toaster />
      <div className="relative container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="text-2xl font-bold cursor-pointer">
          <Link to="/">
            <span className="text-purple-400">Event</span>
            <span className="text-white">Hub</span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 font-medium items-center">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.href}
                className="hover:text-purple-400 transition duration-300"
              >
                {item.name}
              </Link>
            </li>
          ))}

          {/* Create Event */}
          <li>
            <Link
              to="/create-event"
              className="px-3 py-1 bg-purple-600 rounded hover:bg-purple-700 transition"
            >
              Create Event
            </Link>
          </li>

          {/* Notification Bell */}
          <li>
            <motion.button
              animate={animateBell ? { rotate: [0, -20, 20, -10, 10, 0] } : {}}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <Bell size={24} />
              {notifications.length > 0 && (
                <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </motion.button>
          </li>

          {/* Auth Section */}
          <li className="flex space-x-2">
            <Link
              to="/login"
              className="px-4 py-2 rounded-lg border border-gray-500 hover:bg-gray-700 transition duration-300"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition duration-300"
            >
              Sign Up
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gray-900 bg-opacity-95 backdrop-blur-md px-6 py-4 space-y-4 rounded-b-2xl shadow-lg relative"
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block text-white hover:text-purple-400 transition duration-300"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            {/* Create Event */}
            <Link
              to="/create-event"
              className="block px-3 py-2 bg-purple-600 rounded hover:bg-purple-700 transition text-white"
              onClick={() => setIsOpen(false)}
            >
              Create Event
            </Link>

            {/* Notifications */}
            <motion.button
              animate={animateBell ? { rotate: [0, -20, 20, -10, 10, 0] } : {}}
              transition={{ duration: 0.8 }}
              className="flex items-center space-x-2 text-white"
            >
              <Bell size={20} />
              <span>Notifications</span>
            </motion.button>

            {/* Auth Section (Mobile) */}
            <div className="flex flex-col space-y-2 pt-4">
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg border border-gray-500 hover:bg-gray-700 transition duration-300"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition duration-300"
                onClick={() => setIsOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
