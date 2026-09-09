import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const apiKey = process.env.JOOBLE_API_KEY?.trim()
  if (!apiKey) {
    return NextResponse.json({ error: 'Brak konfiguracji Jooble API.' }, { status: 503 })
  }

  const { searchParams } = new URL(request.url)
  const keywords = searchParams.get('keywords')?.trim() || 'praca'
  const location = searchParams.get('location')?.trim() || 'Polska'
  const page = searchParams.get('page')?.trim() || '1'
  const salary = searchParams.get('salary')?.trim() || ''
  const contract = searchParams.get('contract')?.trim() || ''
  const remote = searchParams.get('remote')?.trim() || ''

  if (keywords.length > 160 || location.length > 100 || !/^\d+$/.test(page)) {
    return NextResponse.json({ error: 'Nieprawidłowe parametry wyszukiwania.' }, { status: 400 })
  }

  // Jooble najlepiej interpretuje zawód jako główne słowo kluczowe. Filtry dodatkowe
  // nie są doklejane do keywords, bo mogłyby zawęzić wyniki do zera.
  const normalizedKeywords = [keywords, remote === 'true' ? 'praca zdalna' : ''].filter(Boolean).join(' ')

  try {
    const response = await fetch(`https://pl.jooble.org/api/${encodeURIComponent(apiKey)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ keywords: normalizedKeywords, location, page }),
      next: { revalidate: 300 },
    })

    if (!response.ok) {
      return NextResponse.json({ error: 'Jooble chwilowo nie odpowiada.' }, { status: 502 })
    }

    const data = await response.json()
    return NextResponse.json({ jobs: data.jobs ?? [], total: data.totalJobs ?? 0 })
  } catch {
    return NextResponse.json({ error: 'Nie udało się pobrać ofert pracy.' }, { status: 502 })
  }
}
