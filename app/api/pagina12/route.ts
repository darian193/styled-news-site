import { NextResponse } from 'next/server'
import * as cheerio from 'cheerio'

export async function GET() {
  const res = await fetch('https://www.pagina12.com.ar/', {
    headers: {
      'User-Agent': 'Mozilla/5.0'
    }
  })

  const html = await res.text()
  const $ = cheerio.load(html)

  const articles = $('article')
    .map((i, el) => {
      const title = $(el).find('h2, h3').first().text().trim()
      const link = $(el).find('a').first().attr('href')
      const summary = $(el).find('p').first().text().trim()
      let img = $(el).find('img').first().attr('data-src') || $(el).find('img').first().attr('src')

      if (img && img.startsWith('//')) {
        img = 'https:' + img
      }

      return {
        title,
        summary,
        img,
        link: link?.startsWith('http') ? link : 'https://www.pagina12.com.ar' + link
      }
    })
    .get()
    .filter(item => item.title && item.link)

  return NextResponse.json(articles)
}
