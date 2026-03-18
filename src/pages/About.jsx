import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";


export default function About() {
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`min-h-screen transition-colors duration-500 ${
        theme === "dark"
          ? "bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a] text-gray-100"
          : "bg-gradient-to-b from-[#ffffff] via-[#f8fafc] to-[#e2e8f0] text-gray-900"
      }`}
    >
      <header className="text-center py-20 border-b border-gray-700 relative">
        <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-yellow-300">
          About SHUTTER_BOX
        </h1>
        <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
          SHUTTER_BOX is a next-generation photo discovery platform powered by
          the Unsplash API. We bring professional photography to your fingertips —
          curated, elegant, and effortlessly browsable.
        </p>
      </header>

      <section className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-semibold mb-3 text-amber-400">Our Mission</h2>
          <p className="leading-relaxed opacity-90">
            We believe that photography is more than art — it's emotion, culture,
            and perspective. SHUTTER_BOX was built to connect creators and dreamers,
            giving users access to breathtaking imagery from talented photographers
            worldwide.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-3 text-amber-400">Our Vision</h2>
          <p className="leading-relaxed opacity-90">
            To redefine digital photography discovery with innovation, aesthetics,
            and accessibility — making the beauty of visuals available to everyone.
          </p>
        </div>
      </section>

      <section className="text-center py-16 bg-amber-400 text-gray-900">
        <h2 className="text-3xl font-bold mb-3">Join the Movement</h2>
        <p className="max-w-xl mx-auto">
          Whether you’re a photographer, designer, or dreamer — SHUTTER_BOX is your
          home for visual inspiration.
        </p>
      </section>
    </motion.div>
  );
}
