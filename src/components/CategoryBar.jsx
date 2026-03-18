import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const categories = [
  "Featured",
  "Nature",
  "Film",
  "People",
  "Architecture",
  "Fashion",
  "Animals",
  "Experimental",
  "Travel",
  "Food",
];

export default function CategoryBar({ onSelectCategory, activeCategory }) {
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`w-full flex flex-wrap justify-center gap-4 py-3 border-b ${
        theme === "dark"
          ? "bg-[#0e0e0e]/90 border-gray-800 text-gray-200"
          : "bg-white/90 border-gray-200 text-gray-800"
      } backdrop-blur-md sticky top-[4rem] z-40`}
    >
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelectCategory(cat.toLowerCase())}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
            activeCategory === cat.toLowerCase()
              ? theme === "dark"
                ? "bg-amber-400 text-black"
                : "bg-gray-900 text-white"
              : theme === "dark"
              ? "hover:bg-amber-400/20 hover:text-amber-300"
              : "hover:bg-gray-100 hover:text-gray-900"
          }`}
        >
          {cat}
        </button>
      ))}
    </motion.div>
  );
}
