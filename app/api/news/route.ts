import RSSParser from 'rss-parser';
import { NextResponse } from 'next/server';

const parser = new RSSParser<any>();


const feeds = [
  'https://www.clarin.com/rss/',
  'https://www.lanacion.com.ar/rss/',
  'https://www.infobae.com/feed',
  'https://www.tn.com.ar/rss.xml',
  'https://www.ambito.com/rss',
  'https://www.perfil.com/feed',
  'https://www.cronista.com/files/rss/home.xml',
  'https://www.pagina12.com.ar/rss/secciones/el-pais.xml',
  'https://www.minutouno.com/rss',
  'https://www.baenegocios.com/rss',
  'https://diariohoy.net/rss',
  'https://www.ambito.com/rss',
];




export async function GET() {
  let allArticles: any[] = [];

  for (const url of feeds) {
    try {
      const feed = await parser.parseURL(url);
      const items = feed.items.slice(0, 5).map(item => ({
        title: item.title,
        link: item.link,
        summary: item.contentSnippet || '',
        source: feed.title,
        date: item.pubDate,
      }));
      allArticles.push(...items);
    } catch (err: any) {
      console.error(`Error with ${url}:`, err.message);
    }
  }

  allArticles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return NextResponse.json(allArticles);
}
