import React, { useCallback, useEffect, useState } from 'react'
import ImageCard from './ImageCard'
import { listPhotos, searchPhotos } from '../api/unsplash'
import useInfiniteScroll from '../hooks/useInfiniteScroll'

export default function Gallery({ query, onOpen }) {
  const [photos, setPhotos] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const load = useCallback(async () => {
    if (loading) return
    setLoading(true)
    try {
      const nextPage = page + 1
      let fetched
      if (query) {
        const { results } = await searchPhotos(query, nextPage, 12)
        fetched = results
      } else {
        fetched = await listPhotos(nextPage, 12)
      }
      if (!fetched || fetched.length === 0) setHasMore(false)
      setPhotos(prev => [...prev, ...fetched])
      setPage(nextPage)
    } catch (e) {
      console.error(e)
    } finally { setLoading(false) }
  }, [page, query, loading])

  useInfiniteScroll(load, hasMore)

  useEffect(() => {
    (async () => {
      setLoading(true)
      try {
        setPage(1)
        const p = 1
        if (query) {
          const { results } = await searchPhotos(query, p, 12)
          setPhotos(results)
          setHasMore(results.length >= 12)
        } else {
          const results = await listPhotos(p, 12)
          setPhotos(results)
          setHasMore(results.length >= 12)
        }
      } catch (e) { console.error(e) }
      finally { setLoading(false) }
    })()
  }, [query])

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
        {photos.map(photo => (
          <ImageCard key={photo.id} photo={photo} onOpen={onOpen} />
        ))}
      </div>
      {loading && <div className="text-center py-6">Loading...</div>}
      {!hasMore && <div className="text-center text-gray-500 py-6">No more photos.</div>}
    </div>
  )
}
