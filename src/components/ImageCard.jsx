import React from "react";
import { motion } from "framer-motion";
import { Heart, Download } from "lucide-react";
import { useFavorites } from "../context/FavoritesContext";
import { useTheme } from "../context/ThemeContext";

export default function ImageCard({ photo, onOpen }) {
  const { favorites, toggleFavorite } = useFavorites();
  const { theme } = useTheme();

  const isFavorite = favorites.some((f) => f.id === photo.id);

  const handleDownload = async () => {
    try {
      if (photo.links.download_location) {
        await fetch(
          `${photo.links.download_location}?client_id=${
            import.meta.env.VITE_UNSPLASH_TOKEN
          }`
        );
      }

      const link = document.createElement("a");
      link.href = photo.urls.full;
      link.download = `${photo.id}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Error downloading:", err);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      onClick={() => onOpen(photo)} // ✅ Restored Lightbox click handler
      className={`relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer ${
        theme === "dark"
          ? "bg-neutral-900/70 border border-neutral-800"
          : "bg-white border border-gray-200"
      }`}
    >
      {/* IMAGE */}
      <img
        src={photo.urls.regular}
        alt={photo.alt_description || "Unsplash photo"}
        className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />

      {/* LIKE BUTTON ❤️ */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // ✅ prevents Lightbox trigger
          toggleFavorite(photo);
        }}
        className={`absolute top-3 left-3 p-2 rounded-full transition-all shadow-md ${
          isFavorite
            ? "bg-red-500 text-white hover:bg-red-600"
            : "bg-black/60 hover:bg-black/80 text-white"
        }`}
        title={isFavorite ? "Unlike" : "Like"}
      >
        <Heart
          size={18}
          className={isFavorite ? "fill-white text-white" : ""}
        />
      </button>

      {/* DOWNLOAD BUTTON ⬇️ */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // ✅ prevents Lightbox trigger
          handleDownload();
        }}
        className="absolute top-3 right-3 p-2 rounded-full bg-yellow-400/90 text-gray-900 hover:bg-yellow-300 transition-all shadow-md"
        title="Download"
      >
        <Download size={18} />
      </button>

      {/* PHOTO INFO */}
      <div
        className={`absolute bottom-0 w-full px-4 py-3 flex justify-between items-center backdrop-blur-md ${
          theme === "dark" ? "bg-black/60" : "bg-white/70"
        }`}
      >
        <div className="flex items-center gap-2">
          <img
            src={photo.user.profile_image.small}
            alt={photo.user.name}
            className="w-6 h-6 rounded-full"
          />
          <div>
            <p className="font-medium text-sm">{photo.user.name}</p>
            <p className="text-xs opacity-70">@{photo.user.username}</p>
          </div>
        </div>

        <div className="flex items-center gap-1 text-sm text-gray-400">
          <Heart size={14} className="text-red-400" />
          <span>{photo.likes}</span>
        </div>
      </div>
    </motion.div>
  );
}
