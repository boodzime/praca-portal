import { notFound } from 'next/navigation'

const jobs: Record<string, { title: string; company: string; place: string; salary: string; tag: string; match: number; intro: string }> = {
  'senior-product-designer': { title: 'Senior Product Designer', company: 'Northstar Labs', place: 'Warszawa · hybrydowo', salary: '18 000–24 000 zł', tag: 'Design', match: 96, intro: 'Projektuj doświadczenia, które pomagają ludziom pracować mądrzej.' },
  'specjalista-automatyzacji-ai': { title: 'Specjalista ds. automatyzacji AI', company: 'Orbital Systems', place: 'Zdalnie · Polska', salary: '14 000–19 000 zł', tag: 'AI / Tech', match: 91, intro: 'Buduj automatyzacje, które zamieniają złożone procesy w prostą codzienność.' },
  'koordynator-projektow': { title: 'Koordynator projektów', company: 'Pracownia Forma', place: 'Kraków · stacjonarnie', salary: '9 000–12 000 zł', tag: 'Operacje', match: 84, intro: 'Prowadź zespoły i projekty, które mają realny wpływ na otoczenie.' },
  'frontend-engineer': { title: 'Frontend Engineer', company: 'Bright Pixel', place: 'Gdańsk · zdalnie', salary: '16 000–22 000 zł', tag: 'AI / Tech', match: 89, intro: 'Twórz szybkie, dostępne produkty dla milionów użytkowników.' },
}

export default async function JobPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const job = jobs[slug]
  if (!job) notFound()
  return <main className="offers-shell"><nav className="nav container"><a className="brand" href="/"><span className="brand-mark">✦</span><span>praca<span>flow</span></span></a><a className="button button-small" href="/oferty">Wszystkie oferty <span>↗</span></a></nav><article className="job-detail container"><a className="back-link" href="/oferty">← Wróć do listy ofert</a><div className="job-detail-head"><div><span className="section-kicker">{job.tag} · {job.match}% DOPASOWANIA</span><h1>{job.title}</h1><p className="job-detail-company">{job.company} <span>·</span> {job.place}</p></div><div className="detail-badge">{job.company[0]}</div></div><div className="job-detail-grid"><div><p className="detail-intro">{job.intro}</p><h2>O stanowisku</h2><p>Dołącz do zespołu, który łączy ambicję z odpowiedzialnym podejściem do pracy. Będziesz współpracować z osobami z różnych dziedzin, rozwijać produkt i mieć wpływ na jego kierunek.</p><h2>Co oferujemy</h2><ul><li>Elastyczny model pracy dopasowany do Twoich potrzeb</li><li>Budżet rozwojowy i przestrzeń na eksperymenty</li><li>Zespół, który ufa kompetencjom i inicjatywie</li></ul></div><aside className="job-detail-aside"><div><span className="mini-label">WYNAGRODZENIE</span><strong>{job.salary}</strong><span>miesięcznie</span></div><a className="button" href="/panel">Aplikuj na ofertę <span>↗</span></a><p>Odpowiemy na każde zgłoszenie.</p></aside></div></article></main>
}
