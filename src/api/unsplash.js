import axios from 'axios'

const TOKEN = import.meta.env.VITE_UNSPLASH_TOKEN || import.meta.env.REACT_APP_UNSPLASH_TOKEN
if (!TOKEN) console.warn('VITE_UNSPLASH_TOKEN is not defined — Unsplash requests will fail.')

const api = axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
   Authorization: `Client-ID ${TOKEN}`

  }
})

export async function searchPhotos(query, page = 1, per_page = 12) {
  const res = await api.get('/search/photos', { params: { query, page, per_page } })
  return { results: res.data.results, total: res.data.total }
}

export async function listPhotos(page = 1, per_page = 12) {
  const res = await api.get('/photos', { params: { page, per_page } })
  return res.data
}

// Optional: trigger download tracking
export async function triggerDownload(url) {
  try {
    if (!url) return;
    await fetch(url);
  } catch (e) {
    console.error("Download trigger failed:", e);
  }
}
