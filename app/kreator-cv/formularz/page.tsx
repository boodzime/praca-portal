'use client'

import { useState } from 'react'

export default function CvFormPage() {
  const [saved, setSaved] = useState(false)
  return <main className="form-page container"><a className="back-link" href="/kreator-cv">← Wróć do kreatora CV</a><span className="section-kicker">KREATOR CV</span><h1>Uzupełnij swoje CV.</h1><p>Dodaj najważniejsze informacje. W każdej chwili możesz je później edytować.</p>{saved ? <section className="success-state"><h2>CV zostało zapisane.</h2><p>Twój profil jest gotowy do pokazania rekruterom.</p><a className="button" href="/panel">Przejdź do panelu <span>↗</span></a></section> : <form className="publish-form" onSubmit={(event) => { event.preventDefault(); setSaved(true) }}><label>Imię i nazwisko<input required name="name" placeholder="np. Jan Kowalski" /></label><label>Stanowisko<input required name="role" placeholder="np. Spawacz TIG / MAG" /></label><label>Lokalizacja<input required name="location" placeholder="np. Katowice lub zdalnie" /></label><label>Umiejętności<textarea required name="skills" placeholder="np. TIG, MAG, stal nierdzewna" rows={4} /></label><label>O mnie<textarea name="summary" placeholder="Krótko opisz swoje doświadczenie" rows={5} /></label><button className="button" type="submit">Zapisz CV <span>↗</span></button></form>}</main>
}
