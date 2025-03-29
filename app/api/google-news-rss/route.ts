import { NextResponse } from 'next/server'
import Parser from 'rss-parser'

type Item = {
  title: string
  link: string
  contentSnippet: string
  pubDate: string
  isoDate: string
}

const parser = new Parser<Item>()

export async function GET() {
  const feed = await parser.parseURL(
    'https://news.google.com/rss?hl=es-419&gl=AR&ceid=AR:es-419'
  )

  const items = feed.items.map(item => ({
    title: item.title,
    link: item.link,
    summary: item.contentSnippet,
    date: item.pubDate,
    source: 'Google News RSS',
  }))

  return NextResponse.json(items)
}

