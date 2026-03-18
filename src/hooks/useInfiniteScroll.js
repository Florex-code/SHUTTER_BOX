import { useEffect, useRef } from 'react'

export default function useInfiniteScroll(callback, canLoad = true) {
  const loadingRef = useRef(false)

  useEffect(() => {
    const handle = async () => {
      if (!canLoad || loadingRef.current) return
      if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 700)) {
        loadingRef.current = true
        try { await callback() } catch (e) { /* ignore */ }
        loadingRef.current = false
      }
    }
    window.addEventListener('scroll', handle)
    return () => window.removeEventListener('scroll', handle)
  }, [callback, canLoad])
}
