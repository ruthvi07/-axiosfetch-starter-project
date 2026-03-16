
# React + Vite: Axios & Fetch Starter (E‑Portfolio Friendly)

A tiny scratch app that demonstrates **both Fetch and Axios** in a clean React + Vite setup. Includes a mock API (json‑server), Vite proxy to avoid CORS in dev, and a minimal UI you can showcase in your e‑portfolio.

---

## ✨ What you get
- React 18 + Vite 5
- **Both** Fetch and Axios examples (GET & POST)
- **AbortController** cancellation
- **json-server** mock API with `/posts` and `/news`
- Vite **dev proxy** (`/api → http://localhost:5000`)
- Optional `.env` with `VITE_API_BASE_URL`

---

## 🚀 Quick start

```bash
# 1) Install deps
npm install

# 2) Start mock API (port 5000)
npm run serve:api
# db.json provides /posts and /news endpoints

# 3) In another terminal, start the app (port 5173)
npm run dev
```

- Open the app at **http://localhost:5173**
- The UI loads posts using **Fetch** and **Axios** side by side
- Use the **Create** buttons to POST and append a new item
- Scroll to the **News** section to see **Fetch** against `/news` and add a news item

---

## 🔌 API endpoints (json-server)
- `GET http://localhost:5000/posts`
- `POST http://localhost:5000/posts`
- `GET http://localhost:5000/news`
- `POST http://localhost:5000/news`

You can edit `db.json` to change seed data.

---

## 🔁 Proxy vs .env

This project works in two ways:

1. **Vite proxy (default in dev)**
   - We call `/api/...` from the browser
   - Vite proxies to `http://localhost:5000/...` (see `vite.config.js`)

2. **Direct base URL via .env**
   - Copy `.env.example` → `.env`
   - Set `VITE_API_BASE_URL=http://localhost:5000`
   - The app will call `${VITE_API_BASE_URL}/...`

Use **one** approach at a time for clarity.

---

## 🧩 File structure

```
react-vite-axios-fetch-starter/
├─ public/
├─ src/
│  ├─ App.jsx        # Fetch & Axios demos (GET/POST for /posts)
│  ├─ News.jsx       # Fetch demo for /news (list + add)
│  ├─ newsApi.js     # tiny fetch-based service
│  ├─ main.jsx       # React entry
│  └─ styles.css     # Minimal styling
├─ db.json           # json-server mock data (posts, news)
├─ index.html
├─ package.json
├─ vite.config.js    # Dev proxy to /api
├─ .env.example
└─ README.md
```

---

## 🛡️ Error handling & cancellation

- **Fetch**: check `res.ok` and throw for non‑2xx; use `AbortController` to cancel on unmount
- **Axios**: try/catch around `api.get/post`; also supports `signal` for abort

---

## 🧪 Extend for your e‑portfolio

Ideas to showcase:
- Add **PUT/PATCH/DELETE** for both `/posts/:id` and `/news/:id`
- Create a **service layer** (`src/api.js`) with Axios interceptors
- Add **form validation** (React Hook Form + Zod)
- Persist to a real backend later
- Deploy to Vercel/Netlify; keep `json-server` as a separate service or replace with real API
