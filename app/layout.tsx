import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'pracaflow — Praca, która pasuje do Ciebie',
  description: 'Nowoczesna platforma pracy, zleceń, CV i rekrutacji napędzana przez AI.',
  generator: 'v0.app',
}

export const viewport: Viewport = { width: 'device-width', initialScale: 1, maximumScale: 1, themeColor: '#071012' }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pl" className="bg-[#071012]"><body className="antialiased">{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
