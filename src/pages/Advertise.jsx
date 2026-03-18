import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

export default function Advertise() {
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`min-h-screen py-20 transition-colors duration-500 ${
        theme === "dark"
          ? "bg-[#0f172a] text-gray-100"
          : "bg-[#f8fafc] text-gray-900"
      }`}
    >
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-4 text-amber-400">Advertise with Us</h1>
        <p className="text-lg text-gray-400 mb-10">
          Connect your brand with millions of photography enthusiasts.
        </p>
        <div className="text-left px-6 md:px-12">
          <ul className="list-disc space-y-4">
            <li>Showcase your photography gear, lenses, or editing software.</li>
            <li>Collaborate on sponsored collections with top creators.</li>
            <li>Reach a global creative audience with banner placements.</li>
          </ul>
          <p className="mt-8 text-center text-amber-400">
            📧 Contact us: advertise@shutterbox.com
          </p>
        </div>
      </div>
    </motion.div>
  );
}
