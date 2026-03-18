import React, { useState, useRef } from "react";
import Gallery from "../components/Gallery";
import { motion } from "framer-motion";
import Lightbox from "../components/Lightbox";
import CategoryBar from "../components/CategoryBar";
import { useTheme } from "../context/ThemeContext";

export default function Home() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(null);
  const [category, setCategory] = useState("featured");
  const photosRef = useRef([]);
const { theme } = useTheme(); // ✅ detect theme
  const onOpen = (photo) => setOpen(photo);
  const onClose = () => setOpen(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`min-h-screen transition-colors duration-700 ${
        theme === "dark"
          ? "bg-gradient-to-b from-[#0a0a0a] via-[#0d0d0f] to-[#141416] text-gray-100"
          : "bg-gradient-to-b from-[#f5f5f5] via-[#f9f9f9] to-[#eaeaea] text-gray-900"
      }`}
    >
    
      {/* ✨ Elegant gradient header */}
      <header className="relative py-20 text-center overflow-hidden border-b border-gray-800">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a2e] via-[#16213e] to-[#0f3460] opacity-90"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,rgba(255,215,0,0.08)_0%,transparent_70%)]"></div>

        <motion.h1
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-rose-400 drop-shadow-[0_0_12px_rgba(255,215,0,0.25)]"
        >
          SHUTTER_BOX
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative mt-3 text-gray-300 max-w-xl mx-auto"
        >
          Discover world-class photography with a luxury-grade interface.
          Explore, like, and get inspired.
        </motion.p>

        {/* Search Input */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="relative mt-8 flex justify-center z-20"
        >
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search photos (e.g. luxury, cars, fashion)"
            className="w-full max-w-lg p-3 rounded-lg bg-neutral-900/60 border border-amber-500/20 text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all shadow-[0_0_20px_rgba(255,215,0,0.1)]"
          />
        </motion.div>
      </header>

      {/* ✅ Category Bar below search */}
      <CategoryBar
        onSelectCategory={(cat) => {
          setCategory(cat);
          setQuery(cat); // Optional: automatically search by category
        }}
        activeCategory={category}
      />

      {/* Gallery Section */}
      <main className="mt-10 mb-16 relative z-10 px-4">
        <Gallery query={query || category} onOpen={onOpen} />
      </main>

      {/* Lightbox */}
      {open && <Lightbox photo={open} onClose={onClose} />}
    </motion.div>
  );
}
