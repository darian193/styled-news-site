'use client'

import { useEffect, useRef, useState } from 'react'

type Article = {
  title: string
  summary: string
  img: string
  link: string
}

type Diario = 'lanacion' | 'infobae' | 'pagina12'
const diarios: Diario[] = ['lanacion', 'infobae', 'pagina12']

export default function HomePage() {
  const [data, setData] = useState<Record<string, Article[]>>({})
  const containerRef = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    diarios.forEach(d => {
      fetch(`/api/${d}`)
        .then(res => res.json())
        .then(news => {
          setData(prev => ({ ...prev, [d]: news }))
        })
    })
  }, [])

  useEffect(() => {
    if (paused) return

    const interval = setInterval(() => {
      setCurrent(prev => {
        const next = (prev + 1) % diarios.length
        containerRef.current?.children[next]?.scrollIntoView({ behavior: 'smooth', inline: 'start' })
        return next
      })
    }, 6000)

    return () => clearInterval(interval)
  }, [paused])

  const scrollTo = (index: number) => {
    setCurrent(index)
    containerRef.current?.children[index]?.scrollIntoView({ behavior: 'smooth', inline: 'start' })
  }

  const scrollLeft = () => {
    const prev = current === 0 ? diarios.length - 1 : current - 1
    scrollTo(prev)
  }

  const scrollRight = () => {
    const next = (current + 1) % diarios.length
    scrollTo(next)
  }

  return (
    <div className="relative" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow rounded-full p-2"
      >
        ◀
      </button>
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow rounded-full p-2"
      >
        ▶
      </button>

      <main
        ref={containerRef}
        className="overflow-x-auto whitespace-nowrap p-4 flex gap-6 snap-x snap-mandatory scroll-smooth scrollbar-hide"
      >
        {diarios.map((d, i) => {
          const news = data[d]
          if (!news || news.length < 5) return null

          const big = news[0]
          const small = news.slice(1, 5)

          return (
            <section
              key={d}
              className="inline-block align-top min-w-[700px] max-w-[700px] bg-white rounded-xl shadow overflow-hidden snap-start"
            >
              <h2 className="text-xl font-bold px-4 pt-4 pb-2 capitalize">{d}</h2>

              <div className="flex flex-row h-[420px] px-4 pb-4 gap-4">
                <a
                  href={big.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-1/2 bg-gray-100 rounded-xl overflow-hidden hover:shadow flex flex-col"
                >
                  {big.img && (
                    <img src={big.img} alt={big.title} className="w-full h-52 object-cover" />
                  )}
                  <div className="p-3">
                    <h3 className="text-xl font-bold mb-2 leading-tight whitespace-normal break-words">
                      {big.title}
                    </h3>
                    <p className="text-base text-gray-700 whitespace-normal break-words">
                      {big.summary}
                    </p>
                  </div>
                </a>

                <div className="w-1/2 flex flex-col justify-between gap-2">
                  {small.map((item, index) => (
                    <a
                      key={index}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 rounded p-2 h-1/4"
                    >
                      {item.img && (
                        <img
                          src={item.img}
                          alt={item.title}
                          className="w-16 h-16 object-cover rounded"
                        />
                      )}
                      <p className="text-xs font-medium whitespace-normal break-words">
                        {item.title}
                      </p>
                    </a>
                  ))}
                </div>
              </div>
            </section>
          )
        })}
      </main>

      <div className="flex justify-center gap-2 py-4">
        {diarios.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className={`w-3 h-3 rounded-full ${i === current ? 'bg-blue-500' : 'bg-gray-300'}`}
          />
        ))}
      </div>
    </div>
  )
}
