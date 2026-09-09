import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const apiKey = process.env.JOOBLE_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'Brak konfiguracji Jooble API.' }, { status: 503 })
  }

  const { searchParams } = new URL(request.url)
  const keywords = searchParams.get('keywords')?.trim() || 'praca'
  const location = searchParams.get('location')?.trim() || 'Polska'
  const page = searchParams.get('page') || '1'

  try {
    const response = await fetch(`https://jooble.org/api/${encodeURIComponent(apiKey)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ keywords, location, page }),
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
