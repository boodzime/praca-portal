'use client'

import { useMemo, useState } from 'react'

const talents = [
  { name: 'Marta Nowak', role: 'Spawacz TIG / MAG', location: 'Katowice', skills: 'TIG, MAG, stal nierdzewna', match: 96 },
  { name: 'Jakub Dąbrowski', role: 'Senior Product Designer', location: 'Warszawa', skills: 'Figma, UX, design systems', match: 92 },
  { name: 'Natalia Zielińska', role: 'Frontend Developer', location: 'Zdalnie', skills: 'React, TypeScript, Next.js', match: 89 },
]

export default function RecruiterPage() {
  const [view, setView] = useState('CV kandydatów')
  const [query, setQuery] = useState('')
  const filteredTalents = useMemo(() => talents.filter((talent) => `${talent.name} ${talent.role} ${talent.location} ${talent.skills}`.toLowerCase().includes(query.toLowerCase())), [query])
  return <main className="dashboard-shell"><aside className="dashboard-sidebar"><a className="brand" href="/"><span className="brand-mark">✦</span><span>praca<span>flow</span></span></a><p className="dashboard-label">REKRUTER PRO</p>{['Przegląd', 'CV kandydatów', 'Moje ogłoszenia', 'Kandydaci', 'Analityka'].map((item) => <button key={item} className={view === item ? 'dashboard-nav active' : 'dashboard-nav'} onClick={() => setView(item)}>{item}</button>)}<p className="dashboard-label">FIRMA</p><button className="dashboard-nav">Ustawienia firmy</button><a className="dashboard-nav" href="/">Wróć do strony</a></aside><section className="dashboard-content"><header className="dashboard-header"><div><span className="section-kicker">NORTHSTAR LABS · RECRUITER PRO</span><h1>Znajdź właściwych ludzi.</h1><p>Baza talentów dopasowana do Twoich potrzeb.</p></div><a className="button" href="/rekruter/publikuj">+ Opublikuj ofertę</a></header><div className="dashboard-grid recruiter-metrics"><article className="dashboard-card stat-card"><span className="mini-label">AKTYWNE CV</span><strong>24 680</strong><p><mark>+12,4%</mark> w tym miesiącu</p></article><article className="dashboard-card stat-card"><span className="mini-label">TWOJE OGŁOSZENIA</span><strong>8</strong><p>3 wymagają Twojej uwagi</p></article><article className="dashboard-card stat-card"><span className="mini-label">ŚREDNIE DOPASOWANIE</span><strong>91<span>%</span></strong><p>na podstawie ostatnich rekrutacji</p></article></div><section className="dashboard-card talent-card"><div className="dashboard-section-head"><div><span className="section-kicker">BAZA TALENTÓW AI</span><h2>CV kandydatów</h2></div><label className="dashboard-search">⌕<input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Szukaj po umiejętnościach, lokalizacji..." aria-label="Szukaj kandydatów" /></label></div>{filteredTalents.map((talent) => <div className="talent-row" key={talent.name}><div className="talent-avatar">{talent.name.split(' ').map((part) => part[0]).join('')}</div><div><strong>{talent.name}</strong><p>{talent.role} · {talent.location}</p><small>{talent.skills}</small></div><div className="job-match"><strong>{talent.match}%</strong><span>dopasowanie</span></div><button className="button button-small" type="button">Otwórz CV ↗</button></div>)}</section></section></main>
}
