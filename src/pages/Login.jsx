import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { theme } = useTheme();
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }
    login(email);
    navigate("/"); // Redirect to homepage
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col items-center justify-center min-h-screen px-4 transition-colors duration-700 ${
        theme === "dark"
          ? "bg-gradient-to-b from-[#0a0a0a] via-[#0d0d0f] to-[#141416] text-gray-100"
          : "bg-gradient-to-b from-[#fafafa] via-[#f5f5f5] to-[#eeeeee] text-gray-900"
      }`}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={`w-full max-w-md p-8 rounded-2xl shadow-xl ${
          theme === "dark"
            ? "bg-black/40 border border-gray-800"
            : "bg-white border border-gray-200"
        }`}
      >
        <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
          SHUTTER_BOX
        </h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full mt-1 p-3 rounded-lg outline-none transition ${
                theme === "dark"
                  ? "bg-neutral-900 border border-gray-700 focus:border-amber-400"
                  : "bg-gray-50 border border-gray-300 focus:border-yellow-500"
              }`}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full mt-1 p-3 rounded-lg outline-none transition ${
                theme === "dark"
                  ? "bg-neutral-900 border border-gray-700 focus:border-amber-400"
                  : "bg-gray-50 border border-gray-300 focus:border-yellow-500"
              }`}
              required
            />
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.02 }}
            type="submit"
            className="w-full mt-4 py-3 rounded-lg font-semibold text-black bg-gradient-to-r from-amber-400 to-yellow-300 shadow-md hover:shadow-lg transition"
          >
            Login
          </motion.button>
        </form>

        <p className="text-center mt-5 text-sm">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-amber-400 hover:text-amber-300 font-semibold"
          >
            Sign up
          </Link>
        </p>
      </motion.div>
    </motion.div>
  );
}
