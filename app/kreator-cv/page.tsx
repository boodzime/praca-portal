'use client'

import { useState } from 'react'

const templates = [
  { id: 'editorial', name: 'Editorial', tone: 'Klasyczny', color: 'cv-ink' },
  { id: 'minimal', name: 'Minimal', tone: 'Nowoczesny', color: 'cv-blue' },
  { id: 'signal', name: 'Signal', tone: 'Odważny', color: 'cv-lime' },
]

export default function KreatorCvPage() {
  const [selected, setSelected] = useState('editorial')
  const [analyzing, setAnalyzing] = useState(false)
  const [analyzed, setAnalyzed] = useState(false)
  const [publicCv, setPublicCv] = useState(true)

  function analyzeCv() {
    setAnalyzing(true)
    setAnalyzed(false)
    window.setTimeout(() => { setAnalyzing(false); setAnalyzed(true) }, 900)
  }

  return <main className="product-page"><header className="product-nav"><a className="brand" href="/"><span className="brand-mark">✦</span><span>praca<span>flow</span></span></a><div className="product-nav-links"><a href="/baza-cv">Baza CV</a><a href="/faq">FAQ</a><a href="/blog">Blog</a></div><a className="button button-small" href="/">Wróć na start <span>↗</span></a></header><section className="product-hero container"><span className="section-kicker">KREATOR CV</span><h1>CV, które mówi<br /><span>Twoim głosem.</span></h1><p>Wybierz wzór, uzupełnij najważniejsze informacje i zobacz gotowy dokument w podglądzie A4. Wszystko bez zbędnych komplikacji.</p></section><section className="builder-layout container"><aside className="builder-sidebar"><div className="builder-step active"><b>01</b><span>Dane i doświadczenie<small>Uzupełnij profil</small></span></div><div className="builder-step"><b>02</b><span>Wybierz wzór<small>3 profesjonalne szablony</small></span></div><div className="builder-step"><b>03</b><span>Analiza CV<small>Wskazówki od AI</small></span></div><div className="visibility-box"><span className="section-kicker">BAZA CV</span><h3>Reklamuj się rekruterom</h3><p>Twoje CV będzie widoczne tylko dla zweryfikowanych firm. W każdej chwili możesz wycofać zgodę.</p><label className="switch-line"><input type="checkbox" checked={publicCv} onChange={(event) => setPublicCv(event.target.checked)} /><span className="fake-switch" />{publicCv ? 'CV widoczne w bazie' : 'CV prywatne'}</label></div></aside><div className="builder-main"><div className="builder-toolbar"><div><span className="section-kicker">WYBIERZ WZÓR</span><h2>Profesjonalny od pierwszego spojrzenia.</h2></div><button className="button button-outline" onClick={analyzeCv}>{analyzing ? 'Analizuję…' : 'Analizuj CV przez AI <span>✦</span>'}</button></div><div className="template-picker">{templates.map((template) => <button key={template.id} className={`template-choice ${selected === template.id ? 'selected' : ''}`} onClick={() => setSelected(template.id)}><div className={`template-thumb ${template.color}`}><div className="thumb-name">Anna Kowalska</div><div className="thumb-lines" /><div className="thumb-lines short" /><div className="thumb-columns"><i /><i /></div></div><strong>{template.name}</strong><small>{template.tone}</small></button>)}</div>{analyzed && <div className="ai-result"><strong>Analiza demonstracyjna: 82/100</strong><span>Dodaj mierzalny efekt przy doświadczeniu i skróć podsumowanie do 3 zdań.</span></div>}<div className={`cv-paper ${selected}`}><div className="cv-paper-header"><div><h2>Anna Kowalska</h2><p>Senior Product Designer</p></div><div className="cv-contact">Warszawa, Polska<br />anna.kowalska@email.com<br />+48 555 222 111</div></div><div className="cv-paper-body"><div><h3>Profil</h3><p>Projektantka produktu z 7-letnim doświadczeniem w tworzeniu cyfrowych doświadczeń, które łączą potrzeby ludzi z celami biznesowymi.</p><h3>Doświadczenie</h3><h4>Senior Product Designer <span>2021 — obecnie</span></h4><p>Northstar Labs · Warszawa</p><ul><li>Prowadzenie procesu projektowego dla platformy B2B.</li><li>Wzrost aktywacji użytkowników o 32%.</li></ul><h4>Product Designer <span>2018 — 2021</span></h4><p>Studio Forma · Kraków</p><h3>Edukacja</h3><p><strong>ASP w Krakowie</strong><br />Projektowanie komunikacji wizualnej, 2014–2018</p></div><aside><h3>Umiejętności</h3><p>Figma<br />Design systems<br />User research<br />Prototypowanie<br />Strategia produktu</p><h3>Języki</h3><p>Polski — ojczysty<br />Angielski — C1</p><h3>Linki</h3><p>linkedin.com/in/annakowalska<br />annakowalska.design</p></aside></div></div><div className="builder-footer"><span>Ostatnia zmiana: przed chwilą</span><button className="button" onClick={() => window.print()}>Podgląd i drukuj <span>↗</span></button></div></div></section></main>
}

// UI-only prototype: AI scoring will be connected to a server-side model in the next integration step.
