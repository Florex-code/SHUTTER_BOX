import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { X, ArrowLeft, ArrowRight, Download } from 'lucide-react'
import { triggerDownload } from '../api/unsplash'

export default function Lightbox({ photo, onClose, onPrev, onNext }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev?.()
      if (e.key === 'ArrowRight') onNext?.()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, onPrev, onNext])

  if (!photo) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/70" onClick={onClose}></div>
      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="relative max-w-6xl w-full max-h-full bg-neutral-900 rounded-lg overflow-hidden shadow-2xl border border-gray-800">
        <div className="p-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={photo.user?.profile_image?.small} alt="u" className="w-8 h-8 rounded-full" />
            <div>
              <div className="font-semibold">{photo.user?.name}</div>
              <div className="text-xs text-gray-400">@{photo.user?.username}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => { triggerDownload(photo.links?.download_location || photo.links?.download) }} className="p-2 rounded-md hover:bg-gray-800">
              <Download className="w-4 h-4" />
            </button>
            <button onClick={onClose} className="p-2 rounded-md hover:bg-gray-800"><X className="w-4 h-4" /></button>
          </div>
        </div>
        <div className="flex items-center justify-center p-4 bg-black">
          <img src={photo.urls.regular} alt={photo.alt_description} className="max-h-[70vh] object-contain" />
        </div>
        <div className="p-4 flex items-center justify-between">
          <div className="text-sm text-gray-300">{photo.description || photo.alt_description || ''}</div>
          <div className="flex items-center gap-2">
            <button onClick={onPrev} className="p-2 rounded hover:bg-gray-800"><ArrowLeft className="w-4 h-4"/></button>
            <button onClick={onNext} className="p-2 rounded hover:bg-gray-800"><ArrowRight className="w-4 h-4"/></button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
