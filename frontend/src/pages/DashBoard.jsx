import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FaGithub, FaLinkedin, FaApple, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("isLoggedIn", "true");
    navigate("/dashboard"); // redirect to dashboard
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black px-4 sm:px-6">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 p-8 sm:p-10">
        
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-white tracking-tight">
          Welcome Back 👋
        </h2>
        <p className="text-gray-400 text-center mt-3 text-sm sm:text-base">
          Log in to <span className="font-semibold text-indigo-400">EventLens</span> and continue your journey ✨
        </p>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5 mt-8">
          {/* Email */}
          <input
            type="email"
            placeholder="Email Address"
            required
            className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white 
                       placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white 
                         placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white"
            >
              {showPassword ? (
                <AiFillEyeInvisible size={22} />
              ) : (
                <AiFillEye size={22} />
              )}
            </button>
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between text-sm text-gray-400">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="accent-indigo-500" />
              Remember Me
            </label>
            <a href="#" className="hover:underline text-indigo-400">
              Forgot Password?
            </a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 
                       text-white font-semibold shadow-lg hover:from-indigo-600 hover:to-purple-700 
                       transition-all duration-300 transform hover:scale-[1.02]"
          >
            Log In
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-2 my-6">
          <div className="h-px flex-1 bg-white/20"></div>
          <span className="text-gray-400 text-sm">OR</span>
          <div className="h-px flex-1 bg-white/20"></div>
        </div>

        {/* Social Login */}
        <div className="flex gap-4 justify-center">
          {[
            { icon: <FaGoogle className="text-red-500" size={22} />, label: "Google" },
            { icon: <FaGithub className="text-white" size={22} />, label: "GitHub" },
            { icon: <FaLinkedin className="text-blue-400" size={22} />, label: "LinkedIn" },
            { icon: <FaApple className="text-white" size={22} />, label: "Apple" },
          ].map((btn, i) => (
            <button
              key={i}
              className="p-3 rounded-full bg-white/10 border border-white/20 
                         hover:bg-white/20 transition-all duration-300"
              aria-label={btn.label}
            >
              {btn.icon}
            </button>
          ))}
        </div>

        {/* Signup Redirect */}
        <p className="text-gray-400 text-center mt-6 text-sm">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-indigo-400 font-semibold hover:underline"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}
