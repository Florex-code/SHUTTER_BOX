import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

export default function Blog() {
  const { theme } = useTheme();

  const articles = [
    {
      title: "Mastering Light in Photography",
      date: "October 22, 2025",
      excerpt:
        "Discover how professional photographers use natural and artificial light to create stunning visuals.",
    },
    {
      title: "The Evolution of Digital Artistry",
      date: "September 30, 2025",
      excerpt:
        "From film to pixels, explore how technology reshaped visual storytelling for creators around the world.",
    },
    {
      title: "Why Minimalism Works in Photography",
      date: "August 18, 2025",
      excerpt:
        "Less is more — uncover why simplicity continues to dominate the world of visual design and photography.",
    },
  ];

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
          The Shutter Blog
        </h1>
        <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
          Insights, tutorials, and stories for visual creators and photography
          lovers.
        </p>
      </header>

      <section className="max-w-5xl mx-auto py-16 px-6 grid md:grid-cols-3 gap-8">
        {articles.map((article, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.03 }}
            className={`rounded-xl p-6 shadow-lg transition ${
              theme === "dark"
                ? "bg-[#111827] hover:bg-[#1e293b]"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            <h3 className="text-xl font-semibold mb-2 text-amber-400">
              {article.title}
            </h3>
            <p className="text-sm opacity-60 mb-3">{article.date}</p>
            <p className="text-sm opacity-90">{article.excerpt}</p>
            <button
              className={`mt-4 px-4 py-2 rounded-md font-medium ${
                theme === "dark"
                  ? "bg-amber-400 text-gray-900 hover:bg-amber-300"
                  : "bg-gray-900 text-amber-400 hover:bg-gray-800"
              }`}
            >
              Read More
            </button>
          </motion.div>
        ))}
      </section>
    </motion.div>
  );
}
