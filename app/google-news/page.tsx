'use client'

import { useEffect, useState } from 'react'

type Article = {
  title: string
  summary: string
  link: string
  date: string
  source: string
}

export default function GoogleNewsRssPage() {
  const [news, setNews] = useState<Article[]>([])

  useEffect(() => {
    fetch('/api/google-news-rss')
      .then(res => res.json())
      .then(setNews)
  }, [])

  return (
    <main className="bg-gray-100 min-h-screen p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {news.map((item, index) => (
        <div key={index} className="bg-white p-4 rounded-xl shadow hover:shadow-md transition">
          <h2 className="text-lg font-bold mb-2">{item.title}</h2>
          <p className="text-sm text-gray-700">{item.summary}</p>
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 text-sm mt-2 inline-block"
          >
            Leer más →
          </a>
          <div className="text-xs text-gray-400 mt-1">{item.source}</div>
        </div>
      ))}
    </main>
  )
}
