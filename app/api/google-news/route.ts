import puppeteer from 'puppeteer'
import { NextResponse } from 'next/server'

export async function GET() {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()

  await page.goto('https://news.google.com/topstories?hl=es-419&gl=AR&ceid=AR:es-419', {
    waitUntil: 'domcontentloaded',
    timeout: 0,
  })

  await page.waitForSelector('main h3', { timeout: 10000 }).catch(() => null)

  const articles = await page.evaluate(() => {
    const results: any[] = []
    const cards = Array.from(document.querySelectorAll('main h3')).slice(0, 15)

    cards.forEach(h3 => {
      const title = h3.textContent?.trim() || ''
      const a = h3.closest('a')
      const link = a?.href ? `https://news.google.com${a.href.replace(/^.*\/articles\//, '/articles/')}` : ''
      const container = a?.closest('article') || a?.parentElement
      const img = container?.querySelector('img')?.src || ''
      const summary = container?.querySelector('span')?.textContent?.trim() || ''
      if (title && link) results.push({ title, summary, img, link })
    })

    return results
  })

  await browser.close()
  return NextResponse.json(articles)
}
