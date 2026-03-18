import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

export default function JoinTeam() {
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`min-h-screen py-20 ${
        theme === "dark"
          ? "bg-[#0a0a0a] text-gray-100"
          : "bg-[#f8fafc] text-gray-900"
      }`}
    >
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-4 text-amber-400">Join the Team</h1>
        <p className="text-lg mb-8 text-gray-400">
          Passionate about design, photography, or frontend development? We’d
          love to have you on board.
        </p>
        <p>📩 Send your portfolio to: careers@shutterbox.com</p>
      </div>
    </motion.div>
  );
}
