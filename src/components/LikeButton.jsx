import React from 'react'
import { Heart } from 'lucide-react'
import { useFavorites } from '../context/FavoritesContext'
import { motion } from 'framer-motion'

export default function LikeButton({ photo }) {
  const { isFav, toggle } = useFavorites()
  const fav = isFav(photo.id)

  return (
    <button
      aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
      onClick={(e) => { e.stopPropagation(); toggle(photo) }}
      className="p-1 rounded-md shadow-sm hover:scale-105 transition-transform bg-black/30"
    >
      <motion.div initial={{ scale: 1 }} whileTap={{ scale: 0.9 }}>
        <Heart className={`w-5 h-5 ${fav ? 'text-rose-500' : 'text-gray-300'}`} />
      </motion.div>
    </button>
  )
}
