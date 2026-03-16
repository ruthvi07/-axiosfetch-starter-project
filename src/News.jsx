
import { useEffect, useState } from 'react'
import { getNews, addNews } from './newsApi'

export default function News() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true); setError(null)
    getNews(controller.signal)
      .then(setItems)
      .catch(e => { if (e.name !== 'AbortError') setError(e.message) })
      .finally(() => setLoading(false))
    return () => controller.abort()
  }, [])

  async function handleAdd(e) {
    e.preventDefault()
    try {
      const created = await addNews({ title, excerpt, source: 'User' })
      setItems(prev => [...prev, created])
      setTitle(''); setExcerpt('')
    } catch (e) { alert(e.message) }
  }

  return (
    <section>
      <h2>News (Fetch, mock /news)</h2>
      {loading && <p>Loading…</p>}
      {error && <p className="error">{error}</p>}
      <ul>
        {items.map(n => (
          <li key={n.id}>
            <strong>{n.title}</strong> — {n.excerpt} <em style={{color:'var(--muted)'}}>({n.source})</em>
          </li>
        ))}
      </ul>

      <form onSubmit={handleAdd} style={{marginTop:12, display:'grid', gap:8}}>
        <input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} required />
        <input placeholder="Excerpt" value={excerpt} onChange={e=>setExcerpt(e.target.value)} required />
        <button type="submit">Add News</button>
      </form>
    </section>
  )
}
