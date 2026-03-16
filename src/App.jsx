
import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import News from './News'

export default function App() {
  const [fetchPosts, setFetchPosts] = useState([])
  const [axiosPosts, setAxiosPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Axios client using env or proxy baseURL
  const api = useMemo(() => axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
    timeout: 10000
  }), [])

  // === Fetch demo ===
  useEffect(() => {
    const controller = new AbortController()
    const load = async () => {
      setLoading(true); setError(null)
      try {
        const base = import.meta.env.VITE_API_BASE_URL || ''
        const res = await fetch(`${base}/posts`, { signal: controller.signal })
        if (!res.ok) throw new Error(`Fetch failed: ${res.status} ${res.statusText}`)
        const data = await res.json()
        setFetchPosts(data)
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    load()
    return () => controller.abort()
  }, [])

  // === Axios demo ===
  useEffect(() => {
    const controller = new AbortController()
    const load = async () => {
      try {
        const { data } = await api.get('/posts', { signal: controller.signal })
        setAxiosPosts(data)
      } catch (err) {
        if (err.name !== 'CanceledError') setError(err.message)
      }
    }
    load()
    return () => controller.abort()
  }, [api])

  async function createPostFetch() {
    try {
      const base = import.meta.env.VITE_API_BASE_URL || ''
      const res = await fetch(`${base}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'New via Fetch', body: 'Hello from fetch' })
      })
      if (!res.ok) throw new Error(`Fetch POST failed: ${res.status}`)
      const data = await res.json()
      alert('Created (Fetch): ' + JSON.stringify(data))
      setFetchPosts(prev => [...prev, data])
    } catch (e) { alert(e.message) }
  }

  async function createPostAxios() {
    try {
      const { data } = await api.post('/posts', { title: 'New via Axios', body: 'Hello from axios' })
      alert('Created (Axios): ' + JSON.stringify(data))
      setAxiosPosts(prev => [...prev, data])
    } catch (e) { alert(e.message) }
  }

  return (
    <main className="container">
      <h1>React + Vite: Fetch vs Axios</h1>
      <p className="muted">A tiny e‑portfolio friendly scratch app demonstrating both approaches.</p>

      <div className="grid">
        <section>
          <h2>Fetch (GET /posts)</h2>
          {loading && <p>Loading...</p>}
          {error && <p className="error">{error}</p>}
          <ul>
            {fetchPosts.map(p => (
              <li key={p.id}><strong>{p.title}</strong> — {p.body}</li>
            ))}
          </ul>
          <button onClick={createPostFetch}>Create (Fetch)</button>
        </section>

        <section>
          <h2>Axios (GET /posts)</h2>
          <ul>
            {axiosPosts.map(p => (
              <li key={p.id}><strong>{p.title}</strong> — {p.body}</li>
            ))}
          </ul>
          <button onClick={createPostAxios}>Create (Axios)</button>
        </section>
      </div>

      <News />
    </main>
  )
}
