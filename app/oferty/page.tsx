'use client'

import { useEffect, useMemo, useState } from 'react'
import { SaveJobButton } from '@/components/save-job-button'

const allJobs = [
  { slug: 'spawacz', title: 'Spawacz', company: 'MetalWorks Polska', location: 'Katowice', mode: 'Stacjonarnie', category: 'Produkcja', salary: '8 000–12 000 zł', match: 94 },
  { slug: 'senior-product-designer', title: 'Senior Product Designer', company: 'Northstar Labs', location: 'Warszawa', mode: 'Hybrydowo', category: 'Design', salary: '18 000–24 000 zł', match: 96 },
  { slug: 'specjalista-automatyzacji-ai', title: 'Specjalista ds. automatyzacji AI', company: 'Orbital Systems', location: 'Polska', mode: 'Zdalnie', category: 'AI / Tech', salary: '14 000–19 000 zł', match: 91 },
  { slug: 'koordynator-projektow', title: 'Koordynator projektów', company: 'Pracownia Forma', location: 'Kraków', mode: 'Stacjonarnie', category: 'Operacje', salary: '9 000–12 000 zł', match: 84 },
  { slug: 'frontend-engineer', title: 'Frontend Engineer', company: 'Bright Pixel', location: 'Gdańsk', mode: 'Zdalnie', category: 'AI / Tech', salary: '16 000–22 000 zł', match: 89 },
  { slug: 'content-strategist', title: 'Content Strategist', company: 'Mosaic Studio', location: 'Warszawa', mode: 'Hybrydowo', category: 'Marketing', salary: '11 000–15 000 zł', match: 82 },
  { slug: 'customer-success-manager', title: 'Customer Success Manager', company: 'Loopbase', location: 'Poznań', mode: 'Hybrydowo', category: 'Sprzedaż', salary: '10 000–14 000 zł', match: 78 },
  { slug: 'data-analyst', title: 'Data Analyst', company: 'Metric House', location: 'Wrocław', mode: 'Zdalnie', category: 'Finanse', salary: '13 000–18 000 zł', match: 87 },
  { slug: 'ux-researcher', title: 'UX Researcher', company: 'Human First', location: 'Łódź', mode: 'Hybrydowo', category: 'Design', salary: '12 000–17 000 zł', match: 85 },
  { slug: 'project-coordinator', title: 'Project Coordinator', company: 'Good Work Co.', location: 'Katowice', mode: 'Stacjonarnie', category: 'Operacje', salary: '8 000–11 000 zł', match: 76 },
]

export default function OffersPage() {
  const [query, setQuery] = useState('')
  const [mode, setMode] = useState('Wszystkie tryby')
  const [category, setCategory] = useState('Wszystkie kategorie')
  const [page, setPage] = useState(1)
  const perPage = 5
  const filtered = useMemo(() => allJobs.filter((job) => `${job.title} ${job.company} ${job.category} ${job.location} ${job.mode}`.toLowerCase().includes(query.toLowerCase()) && (mode === 'Wszystkie tryby' || job.mode === mode) && (category === 'Wszystkie kategorie' || job.category === category)), [query, mode, category])
  const pages = Math.max(1, Math.ceil(filtered.length / perPage))
  const visible = filtered.slice((page - 1) * perPage, page * perPage)

  useEffect(() => {
    const requestedPage = Number(new URLSearchParams(window.location.search).get('page'))
    if (Number.isInteger(requestedPage) && requestedPage > 0) setPage(Math.min(requestedPage, pages))
  }, [pages])

  useEffect(() => {
    if (page > pages) setPage(pages)
  }, [page, pages])

  const update = (setter: (value: string) => void, value: string) => { setter(value); setPage(1) }
  return <main className="offers-shell"><nav className="nav container"><a className="brand" href="/"><span className="brand-mark">✦</span><span>praca<span>flow</span></span></a><a className="button button-small" href="/">Strona główna <span>↗</span></a></nav><section className="offers-hero container"><span className="section-kicker">TABLICA MOŻLIWOŚCI</span><h1>Znajdź pracę,<br /><span>która pasuje.</span></h1><p>Przeglądaj oferty dopasowane do Twoich ambicji, doświadczenia i stylu pracy.</p></section><section className="offers-content container"><div className="offers-toolbar"><label className="offers-search"><span>⌕</span><input value={query} onChange={(event) => update(setQuery, event.target.value)} placeholder="Stanowisko, firma lub umiejętność" aria-label="Szukaj ofert" /></label><select value={mode} onChange={(event) => update(setMode, event.target.value)} aria-label="Tryb pracy"><option>Wszystkie tryby</option><option>Zdalnie</option><option>Hybrydowo</option><option>Stacjonarnie</option></select><select value={category} onChange={(event) => update(setCategory, event.target.value)} aria-label="Kategoria"><option>Wszystkie kategorie</option><option>Produkcja</option><option>Design</option><option>AI / Tech</option><option>Operacje</option><option>Marketing</option><option>Finanse</option><option>Sprzedaż</option></select></div><div className="offers-result-head"><span>{filtered.length} aktywnych ofert</span><span>Najlepsze dopasowanie</span></div><div className="offers-list">{visible.map((job) => <a className="offer-card" href={`/${job.slug}`} key={job.slug}><div className="company-badge">{job.company[0]}</div><div className="offer-main"><div className="offer-title-line"><h2>{job.title}</h2><span className="job-tag">{job.category}</span></div><p>{job.company} <span>·</span> {job.location} <span>·</span> {job.mode}</p><small>{job.salary} <span>miesięcznie</span></small></div><div className="offer-match"><strong>{job.match}%</strong><span>dopasowanie</span></div><SaveJobButton slug={job.slug} /><span className="arrow-button" aria-hidden="true">↗</span></a>)}</div>{visible.length === 0 && <div className="empty-state">Nie znaleźliśmy ofert dla tych filtrów. Spróbuj szerszego wyszukiwania.</div>}<nav className="pagination" aria-label="Paginacja ofert"><button onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={page === 1}>← Poprzednia</button>{Array.from({ length: pages }, (_, index) => index + 1).map((number) => <button className={page === number ? 'active' : ''} onClick={() => setPage(number)} key={number}>{number}</button>)}<button onClick={() => setPage((current) => Math.min(pages, current + 1))} disabled={page === pages}>Następna →</button></nav></section></main>
}
