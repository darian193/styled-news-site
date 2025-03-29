'use client'

import { useEffect, useState } from 'react'

type Article = {
  title: string
  summary: string
  img: string
  link: string
}

type Size = 'xs' | 'sm' | 'medium' | 'large' | 'xl'

export default function LanacionPage() {
  const [news, setNews] = useState<Article[]>([])
  const [tileSize, setTileSize] = useState<Size>('medium')

  useEffect(() => {
    fetch('/api/lanacion')
      .then(res => res.json())
      .then(setNews)
  }, [])

  const sizeConfig = {
    xs: {
      img: 'h-16',
      text: 'text-[10px]',
      padding: 'p-1',
      gap: 'gap-1',
      columns: 'grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8',
    },
    sm: {
      img: 'h-20',
      text: 'text-xs',
      padding: 'p-2',
      gap: 'gap-2',
      columns: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6',
    },
    medium: {
      img: 'h-32',
      text: 'text-sm',
      padding: 'p-3',
      gap: 'gap-3',
      columns: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
    },
    large: {
      img: 'h-40',
      text: 'text-base',
      padding: 'p-4',
      gap: 'gap-4',
      columns: 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    },
    xl: {
      img: 'h-56',
      text: 'text-lg',
      padding: 'p-5',
      gap: 'gap-5',
      columns: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3',
    },
  }[tileSize]

  return (
    <>
      <div className="flex gap-2 p-2 flex-wrap">
        {(['xs', 'sm', 'medium', 'large', 'xl'] as Size[]).map(size => (
          <button
            key={size}
            onClick={() => setTileSize(size)}
            className={`px-2 py-1 border rounded text-xs ${tileSize === size ? 'bg-blue-200' : ''}`}
          >
            {size.toUpperCase()}
          </button>
        ))}
      </div>

      <main className={`bg-gray-100 min-h-screen p-2 grid ${sizeConfig.columns} ${sizeConfig.gap}`}>
        {news.map((item, index) => (
          <div key={index} className={`bg-white ${sizeConfig.padding} rounded-md shadow-sm hover:shadow transition`}>
            {item.img && (
              <img
                src={item.img}
                alt={item.title}
                className={`rounded mb-1 w-full object-cover ${sizeConfig.img}`}
              />
            )}
            <h2 className={`font-semibold mb-1 leading-tight ${sizeConfig.text}`}>{item.title}</h2>
            <p className={`text-gray-600 line-clamp-3 ${sizeConfig.text}`}>{item.summary}</p>
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-blue-500 mt-1 inline-block ${sizeConfig.text}`}
            >
              Leer más →
            </a>
          </div>
        ))}
      </main>
    </>
  )
}
