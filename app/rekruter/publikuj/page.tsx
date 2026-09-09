'use client'

import { useEffect, useState } from 'react'

type ListingPlan = 'job' | 'gig'

type FormState = {
  title: string
  company: string
  location: string
  category: string
  description: string
}

const emptyForm: FormState = { title: '', company: '', location: '', category: 'Produkcja', description: '' }

export default function PublishPage() {
  const [form, setForm] = useState<FormState>(emptyForm)
  const [plan, setPlan] = useState<ListingPlan>('job')
  const [featured, setFeatured] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const type = params.get('type')
    if (type === 'zlecenia') setPlan('gig')
    if (params.get('featured') === 'true') setFeatured(true)
    setReady(true)
  }, [])

  const total = 999 + (featured ? 2999 : 0)
  const update = (key: keyof FormState, value: string) => setForm((current) => ({ ...current, [key]: value }))

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!form.title || !form.company || !form.location || !form.description) {
      setError('Uzupełnij wszystkie wymagane pola przed płatnością.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan,
          featured,
          metadata: { ...form, kind: plan === 'gig' ? 'zlecenie' : 'ogłoszenie' },
        }),
      })
      const data = await response.json().catch(() => ({}))
      if (response.status === 401) {
        window.location.href = '/sign-in?redirectTo=/rekruter/publikuj'
        return
      }
      if (!response.ok || !data.url) {
        setError(data.error || 'Nie udało się uruchomić płatności.')
        return
      }
      window.location.assign(data.url)
    } catch {
      setError('Sprawdź połączenie i spróbuj ponownie.')
    } finally {
      setLoading(false)
    }
  }

  return <main className="form-page container">
    <a className="back-link" href="/rekruter">← Wróć do panelu rekrutera</a>
    <span className="section-kicker">REKRUTER PRO · PUBLIKACJA</span>
    <h1>Opublikuj ofertę.</h1>
    <p>Wybierz typ publikacji, uzupełnij szczegóły i opłać ogłoszenie bezpośrednio przez Stripe.</p>
    <form className="publish-form" onSubmit={submit}>
      <fieldset>
        <legend>Typ publikacji</legend>
        <div className="publish-plan-grid">
          <label className={plan === 'job' ? 'publish-plan selected' : 'publish-plan'}><input type="radio" name="plan" checked={plan === 'job'} onChange={() => setPlan('job')} /><strong>Ogłoszenie o pracę</strong><span>Publikacja oferty etatowej</span><b>9,99 zł</b></label>
          <label className={plan === 'gig' ? 'publish-plan selected' : 'publish-plan'}><input type="radio" name="plan" checked={plan === 'gig'} onChange={() => setPlan('gig')} /><strong>Zlecenie</strong><span>Publikacja projektu lub usługi</span><b>9,99 zł</b></label>
        </div>
        <label className="featured-toggle"><input type="checkbox" checked={featured} onChange={(event) => setFeatured(event.target.checked)} /><span><strong>Wyróżnij publikację</strong><small>Większa widoczność na tablicy możliwości · +29,99 zł</small></span></label>
      </fieldset>
      <fieldset>
        <legend>Szczegóły publikacji</legend>
        <label>Stanowisko lub nazwa zlecenia<input required value={form.title} onChange={(event) => update('title', event.target.value)} placeholder="np. Product Designer" /></label>
        <label>Firma<input required value={form.company} onChange={(event) => update('company', event.target.value)} placeholder="Nazwa firmy" /></label>
        <label>Lokalizacja<input required value={form.location} onChange={(event) => update('location', event.target.value)} placeholder="np. Katowice lub zdalnie" /></label>
        <label>Kategoria<select value={form.category} onChange={(event) => update('category', event.target.value)}><option>Produkcja</option><option>AI / Tech</option><option>Design</option><option>Marketing</option><option>Sprzedaż</option><option>Operacje</option></select></label>
        <label>Opis<textarea required value={form.description} onChange={(event) => update('description', event.target.value)} placeholder="Opisz rolę, zakres odpowiedzialności i oczekiwania" rows={6} /></label>
      </fieldset>
      {error && <p className="form-error" role="alert">{error}</p>}
      <div className="publish-submit"><div><span>Do zapłaty</span><strong>{(total / 100).toFixed(2).replace('.', ',')} zł</strong></div><button className="button" type="submit" disabled={loading || !ready}>{loading ? 'Przekierowanie...' : 'Przejdź do płatności'} <span>↗</span></button></div>
    </form>
  </main>
}
