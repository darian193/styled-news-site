'use client'

import { useEffect, useState } from 'react'

type Article = {
  title: string
  summary: string
  img: string
  link: string
}

export default function InfobaePage() {
  const [news, setNews] = useState<Article[]>([])

  useEffect(() => {
    fetch('/api/infobae')
      .then(res => res.json())
      .then(setNews)
  }, [])

  return (
    <main className="bg-gray-100 min-h-screen p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {news.map((item, index) => (
        <div key={index} className="bg-white p-4 rounded-xl shadow hover:shadow-md transition">
          {item.img && (
            <img src={item.img} alt={item.title} className="rounded mb-2 h-40 w-full object-cover" />
          )}
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
        </div>
      ))}
    </main>
  )
}
