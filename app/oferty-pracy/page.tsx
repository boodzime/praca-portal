'use client'

import { useState } from 'react'

interface Job {
  title?: string
  company?: string
  location?: string
  salary?: string
  type?: string
  snippet?: string
  link?: string
}

export default function OfertyPracyPage() {
  const [query, setQuery] = useState('')
  const [location, setLocation] = useState('Polska')
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [error, setError] = useState('')

  async function searchJobs(event: React.FormEvent) {
    event.preventDefault()
    setLoading(true)
    setError('')
    try {
      const params = new URLSearchParams({ keywords: query.trim() || 'praca', location: location.trim() || 'Polska' })
      const response = await fetch(`/api/jobs?${params}`)
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Nie udało się pobrać ofert.')
      setJobs(data.jobs || [])
      setSearched(true)
    } catch (searchError) {
      setError(searchError instanceof Error ? searchError.message : 'Wyszukiwanie jest chwilowo niedostępne.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="site-shell page-shell">
      <nav className="nav container"><a className="brand" href="/" aria-label="PracaFlow strona główna"><span className="brand-mark">✦</span><span>praca<span>flow</span></span></a><div className="nav-links"><a href="/">Strona główna</a><a href="/zlecenia">Zlecenia</a><a href="/kreator-cv">Kreator CV</a><a href="/rekruter">Dla rekruterów</a></div><a className="button button-small" href="/rejestracja">Załóż konto <span>↗</span></a></nav>
      <section className="inner-hero container"><span className="section-kicker">BAZA AKTUALNYCH OFERT</span><h1>Znajdź pracę,<br /><em>która pasuje.</em></h1><p>Przeszukaj tysiące ofert z całej Polski — od kelnera i kucharza po spawacza, fryzjera, specjalistę i menedżera.</p><form className="wide-search" onSubmit={searchJobs}><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Zawód, stanowisko lub firma" aria-label="Zawód, stanowisko lub firma" /><input value={location} onChange={(event) => setLocation(event.target.value)} placeholder="Lokalizacja" aria-label="Lokalizacja" /><button className="button" type="submit" disabled={loading}>{loading ? 'Szukam…' : 'Szukaj ofert'} <span>↗</span></button></form></section>
      <section className="jobs-section"><div className="container"><div className="section-heading"><div><span className="section-kicker">WYNIKI WYSZUKIWANIA</span><h2>{searched ? `${jobs.length} znalezionych ofert` : 'Popularne stanowiska'}</h2></div><a className="text-link" href="/">Wróć na stronę główną <span>←</span></a></div>{error && <p className="search-error" role="alert">{error}</p>}{!searched && <div className="category-grid">{['Kelner', 'Kucharz', 'Spawacz', 'Fryzjer', 'Magazynier', 'Opiekun', 'Sprzedawca', 'Kierowca'].map((category) => <button key={category} className="category-card" onClick={() => { setQuery(category); void searchJobs({ preventDefault: () => {} } as React.FormEvent) }}>{category}<span>↗</span></button>)}</div>}{searched && jobs.length === 0 && <p className="empty-state">Nie znaleźliśmy ofert dla tego wyszukiwania. Spróbuj innego zawodu lub lokalizacji.</p>}<div className="job-list">{jobs.map((job, index) => <article className="job-row" key={`${job.title}-${index}`}><div className="company-badge">{(job.company || 'P').slice(0, 1)}</div><div className="job-main"><div className="job-title-row"><h3>{job.title || 'Oferta pracy'}</h3><span className="job-tag">{job.type || 'Oferta'}</span></div><p>{job.company || 'Pracodawca'} <span>·</span> {job.location || location}</p><small>{job.salary || 'Wynagrodzenie w ogłoszeniu'}</small></div>{job.link && <a className="job-arrow" href={job.link} target="_blank" rel="noreferrer" aria-label={`Otwórz ofertę ${job.title || 'pracy'}`}>↗</a>}</article>)}</div></div></section>
      <footer className="footer"><div className="container"><div className="footer-bottom"><span>© 2026 pracaflow. Wszystkie prawa zastrzeżone.</span><a href="/kontakt">Kontakt</a><a href="/faq">FAQ</a></div></div></footer>
    </main>
  )
}
