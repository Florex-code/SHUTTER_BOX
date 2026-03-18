import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useFavorites } from "../context/FavoritesContext";
import { useTheme } from "../context/ThemeContext";
import ImageCard from "../components/ImageCard";
import Lightbox from "../components/Lightbox";
import CompanyFooter from "../components/CompanyFooter";

export default function Favorites() {
  const { favorites } = useFavorites();
  const { theme } = useTheme();

  // ✅ State for opening Lightbox
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handleOpen = (photo) => setSelectedPhoto(photo);
  const handleClose = () => setSelectedPhoto(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`min-h-screen transition-colors duration-700 ${
        theme === "dark"
          ? "bg-gradient-to-b from-[#0a0a0a] via-[#0d0d0f] to-[#141416] text-gray-100"
          : "bg-gradient-to-b from-[#fdfcfb] via-[#f5f5f5] to-[#e7e7e7] text-gray-900"
      }`}
    >
      {/* ✨ Elegant gradient header */}
      <header className="relative py-20 text-center overflow-hidden border-b border-gray-800 dark:border-gray-800 border-gray-200">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a2e] via-[#16213e] to-[#0f3460] dark:opacity-90 opacity-70"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,rgba(255,215,0,0.08)_0%,transparent_70%)]"></div>

        <motion.h1
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative flex justify-center items-center gap-3 text-4xl sm:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-rose-400 drop-shadow-[0_0_12px_rgba(255,215,0,0.25)]"
        >
          <Heart className="w-8 h-8 text-amber-400" />
          Your Favorite Photos
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative mt-3 text-gray-300 dark:text-gray-300 text-base sm:text-lg max-w-2xl mx-auto"
        >
          You’ve liked {favorites.length}{" "}
          {favorites.length === 1 ? "photo" : "photos"} so far.
        </motion.p>
      </header>

      {/* Gallery Section */}
      <main className="mt-10 mb-16 relative z-10 px-4">
        {favorites.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-400 dark:text-gray-400 text-lg mt-20"
          >
            No favorites yet. Go like some photos!
          </motion.p>
        ) : (
          <motion.div
            className="grid md:grid-cols-3 sm:grid-cols-2 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.08 },
              },
            }}
          >
            {favorites.map((photo, i) => (
              <motion.div
                key={photo.id}
                variants={{
                  hidden: { opacity: 0, scale: 0.95 },
                  visible: { opacity: 1, scale: 1 },
                }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                onClick={() => handleOpen(photo)} // ✅ Open Lightbox on click
                className="cursor-pointer"
              >
                <ImageCard photo={photo} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>

      {/* ✅ Lightbox for image details */}
      {selectedPhoto && (
        <Lightbox photo={selectedPhoto} onClose={handleClose} />
      )}

      {/* Optional Footer */}
      <CompanyFooter />
    </motion.div>
  );
}
