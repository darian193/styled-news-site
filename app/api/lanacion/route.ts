import puppeteer from 'puppeteer'
import { NextResponse } from 'next/server'

export async function GET() {
  const browser = await puppeteer.launch({ headless: 'new' })
  const page = await browser.newPage()

  await page.goto('https://www.lanacion.com.ar/', {
    waitUntil: 'networkidle2',
  })

  const articles = await page.evaluate(() => {
    const items = Array.from(document.querySelectorAll('article')).slice(0, 30)

    return items.map(article => {
      const title = article.querySelector('h2, h3')?.textContent?.trim() || ''
      const img = article.querySelector('img')?.getAttribute('src') || ''
      const summary = article.querySelector('p')?.textContent?.trim() || ''
      const link = article.querySelector('a')?.href || ''
      return { title, summary, img, link }
    }).filter(item => item.title && item.img)
  })

  await browser.close()
  return NextResponse.json(articles)
}
