export type JobMode = 'Zdalnie' | 'Hybrydowo' | 'Stacjonarnie'

export type Job = {
  slug: string
  title: string
  company: string
  location: string
  mode: JobMode
  category: string
  salary: string
  match: number
  intro: string
}

export const jobs: Job[] = [
  { slug: 'spawacz', title: 'Spawacz TIG / MAG', company: 'MetalWorks Polska', location: 'Katowice', mode: 'Stacjonarnie', category: 'Produkcja', salary: '8 000–12 000 zł', match: 94, intro: 'Dołącz do zespołu fachowców tworzących trwałe konstrukcje dla przemysłu.' },
  { slug: 'senior-product-designer', title: 'Senior Product Designer', company: 'Northstar Labs', location: 'Warszawa', mode: 'Hybrydowo', category: 'Design', salary: '18 000–24 000 zł', match: 96, intro: 'Projektuj doświadczenia, które pomagają ludziom pracować mądrzej.' },
  { slug: 'specjalista-automatyzacji-ai', title: 'Specjalista ds. automatyzacji AI', company: 'Orbital Systems', location: 'Polska', mode: 'Zdalnie', category: 'AI / Tech', salary: '14 000–19 000 zł', match: 91, intro: 'Buduj automatyzacje, które zamieniają złożone procesy w prostą codzienność.' },
  { slug: 'koordynator-projektow', title: 'Koordynator projektów', company: 'Pracownia Forma', location: 'Kraków', mode: 'Stacjonarnie', category: 'Operacje', salary: '9 000–12 000 zł', match: 84, intro: 'Prowadź zespoły i projekty, które mają realny wpływ na otoczenie.' },
  { slug: 'frontend-engineer', title: 'Frontend Engineer', company: 'Bright Pixel', location: 'Gdańsk', mode: 'Zdalnie', category: 'AI / Tech', salary: '16 000–22 000 zł', match: 89, intro: 'Twórz szybkie, dostępne produkty dla milionów użytkowników.' },
  { slug: 'content-strategist', title: 'Content Strategist', company: 'Mosaic Studio', location: 'Warszawa', mode: 'Hybrydowo', category: 'Marketing', salary: '11 000–15 000 zł', match: 82, intro: 'Twórz treści, które budują markę i angażują właściwych odbiorców.' },
  { slug: 'customer-success-manager', title: 'Customer Success Manager', company: 'Loopbase', location: 'Poznań', mode: 'Hybrydowo', category: 'Sprzedaż', salary: '10 000–14 000 zł', match: 78, intro: 'Buduj długotrwałe relacje i pomagaj klientom osiągać ich cele.' },
  { slug: 'data-analyst', title: 'Data Analyst', company: 'Metric House', location: 'Wrocław', mode: 'Zdalnie', category: 'Finanse', salary: '13 000–18 000 zł', match: 87, intro: 'Zamieniaj dane w decyzje, które napędzają rozwój firmy.' },
  { slug: 'ux-researcher', title: 'UX Researcher', company: 'Human First', location: 'Łódź', mode: 'Hybrydowo', category: 'Design', salary: '12 000–17 000 zł', match: 85, intro: 'Odkrywaj potrzeby użytkowników i kształtuj lepsze produkty.' },
  { slug: 'project-coordinator', title: 'Project Coordinator', company: 'Good Work Co.', location: 'Katowice', mode: 'Stacjonarnie', category: 'Operacje', salary: '8 000–11 000 zł', match: 76, intro: 'Koordynuj projekty i dbaj, aby wszystko działało jak w zegarku.' },
]

export const jobBySlug: Record<string, Job> = Object.fromEntries(jobs.map((job) => [job.slug, job]))

export function jobPlace(job: Job): string {
  return job.mode === 'Zdalnie' ? `Zdalnie · ${job.location}` : `${job.location} · ${job.mode.toLowerCase()}`
}
