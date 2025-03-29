import puppeteer from 'puppeteer'
import { NextResponse } from 'next/server'

export async function GET() {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()

  await page.goto('https://www.infobae.com/?noredirect', {
    waitUntil: 'domcontentloaded',
    timeout: 0
  })

  await page.waitForSelector('a[href*="/"] h2', { timeout: 10000 }).catch(() => null)

  const articles = await page.evaluate(() => {
    const anchors = Array.from(document.querySelectorAll('a[href*="/"] h2')).slice(0, 30)

    return anchors.map(h2 => {
      const title = h2.textContent?.trim() || ''
      const a = h2.closest('a')
      const link = a?.href || ''
      const img = a?.querySelector('img')?.src || ''
      const summary = a?.querySelector('p')?.textContent?.trim() || ''
      return { title, summary, img, link }
    }).filter(item => item.title && item.link)
  })

  await browser.close()
  return NextResponse.json(articles)
}
