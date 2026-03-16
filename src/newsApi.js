
// Simple service layer for the mock news endpoints
export const NEWS_BASE = import.meta.env.VITE_API_BASE_URL || ''

export async function getNews(signal) {
  const res = await fetch(`${NEWS_BASE}/news`, { signal })
  if (!res.ok) throw new Error(`News fetch failed: ${res.status}`)
  return res.json()
}

export async function addNews(item) {
  const res = await fetch(`${NEWS_BASE}/news`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item)
  })
  if (!res.ok) throw new Error(`News create failed: ${res.status}`)
  return res.json()
}
