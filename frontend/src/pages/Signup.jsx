import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FaGithub, FaLinkedin, FaApple, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../api/axios"; // ✅ Axios instance

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  // handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("❌ Passwords do not match!");
      return;
    }

    try {
      // send signup request
      const res = await API.post("/users", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      // ✅ Save token in localStorage
      localStorage.setItem("token", res.data.token);

      alert("✅ Account created successfully!");
      navigate("/dashboard"); // redirect after signup
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "❌ Signup failed!");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* ✅ Banner Section */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-700 items-center justify-center text-center p-10 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10"
        >
          <h1 className="text-5xl font-extrabold text-white drop-shadow-lg">
            Join EventLens 🚀
          </h1>
          <p className="text-gray-200 mt-4 text-lg max-w-md mx-auto">
            Create your account and never miss{" "}
            <span className="text-yellow-300 font-semibold">
              hackathons, workshops, and tech events!
            </span>
          </p>
        </motion.div>
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      {/* ✅ Signup Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black px-6">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8">
          <h2 className="text-3xl font-bold text-center text-white mb-2">
            Create Account
          </h2>
          <p className="text-gray-400 text-center mb-6 text-sm">
            Join <span className="font-semibold text-indigo-400">EventLens</span>{" "}
            and explore amazing events 🚀
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Full Name */}
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white"
              >
                {showPassword ? <AiFillEyeInvisible size={22} /> : <AiFillEye size={22} />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white"
              >
                {showConfirmPassword ? <AiFillEyeInvisible size={22} /> : <AiFillEye size={22} />}
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-lg hover:from-indigo-600 hover:to-purple-700 transition"
            >
              Sign Up
            </button>
          </form>

          {/* OR Divider */}
          <div className="flex items-center gap-2 my-6">
            <div className="h-px flex-1 bg-white/20"></div>
            <span className="text-gray-400 text-sm">OR</span>
            <div className="h-px flex-1 bg-white/20"></div>
          </div>

          {/* Social Signup */}
          <div className="flex gap-4 justify-center">
            <button className="p-3 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition">
              <FaGoogle className="text-red-500" size={22} />
            </button>
            <button className="p-3 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition">
              <FaGithub className="text-white" size={22} />
            </button>
            <button className="p-3 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition">
              <FaLinkedin className="text-blue-400" size={22} />
            </button>
            <button className="p-3 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition">
              <FaApple className="text-white" size={22} />
            </button>
          </div>

          {/* Already have an account? */}
          <p className="text-center text-gray-400 mt-6 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-400 font-semibold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
