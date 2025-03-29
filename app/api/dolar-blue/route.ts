import puppeteer from 'puppeteer'
import { NextResponse } from 'next/server'

export async function GET() {
  const browser = await puppeteer.launch({ headless: 'new' })
  const page = await browser.newPage()

  await page.goto('https://dolarhoy.com/', {
    waitUntil: 'domcontentloaded',
    timeout: 0
  })

  const result = await page.evaluate(() => {
    const compra = document.querySelector('.home .compra .val')?.textContent?.trim()
    const venta = document.querySelector('.home .venta .val')?.textContent?.trim()
    return { compra, venta }
  })

  await browser.close()
  return NextResponse.json(result)
}
