import './globals.css'
import Link from 'next/link'
import DolarBlue from './components/DolarBlue'

export const metadata = {
  title: 'Noticias Argentinas',
  description: 'Agregador de noticias en tiempo real',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="bg-gray-100">
        <header className="bg-white shadow p-4 flex flex-wrap gap-4 items-center justify-between sticky top-0 z-10">
          <div className="flex gap-4 items-center">
            <h1 className="text-xl font-bold">📰 News</h1>
            <nav className="flex gap-4 text-sm">
              <Link href="/" className="text-blue-600 hover:underline">Noticias RSS</Link>
              <Link href="/google-news" className="text-blue-600 hover:underline">Google News</Link>
              <Link href="/lanacion" className="text-blue-600 hover:underline">La Nación</Link>
              <Link href="/infobae" className="text-blue-600 hover:underline">Infobae</Link>
			    <Link href="/pagina12" className="text-blue-600 hover:underline">Página/12</Link>
            </nav>
          </div>

          <DolarBlue />
        </header>

        <main>{children}</main>
      </body>
    </html>
  )
}
