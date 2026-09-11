import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

type JoobleJob = { id?: string; title?: string; company?: string; location?: string; type?: string; salary?: string; snippet?: string; link?: string }

export async function POST(request: Request) {
  const apiKey = process.env.JOOBLE_API_KEY
  if (!apiKey) return NextResponse.json({ error: 'JOOBLE_API_KEY is not configured' }, { status: 503 })
  const body = await request.json().catch(() => ({})) as { keywords?: string; location?: string; page?: number }
  const keywords = typeof body.keywords === 'string' ? body.keywords.trim().slice(0, 120) : ''
  const location = typeof body.location === 'string' ? body.location.trim().slice(0, 80) : 'Polska'
  if (!keywords) return NextResponse.json({ error: 'keywords is required' }, { status: 400 })
  const response = await fetch(`https://jooble.org/api/${encodeURIComponent(apiKey)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ keywords, location, page: Math.max(1, body.page ?? 1) }),
    cache: 'no-store',
  })
  if (!response.ok) return NextResponse.json({ error: 'Jooble request failed' }, { status: response.status })
  const data = await response.json() as { jobs?: JoobleJob[]; totalCount?: number }
  const jobs = (data.jobs ?? []).map((job, index) => ({
    id: job.id ?? `${job.title ?? 'job'}-${index}`,
    title: job.title ?? 'Oferta pracy',
    company: job.company ?? 'Pracodawca nieujawniony',
    location: job.location ?? location,
    type: job.type ?? 'Oferta pracy',
    salary: job.salary ?? 'Wynagrodzenie do ustalenia',
    description: job.snippet ?? '',
    url: job.link ?? null,
    source: 'Jooble',
  }))
  return NextResponse.json({ jobs, totalCount: data.totalCount ?? jobs.length })
}
