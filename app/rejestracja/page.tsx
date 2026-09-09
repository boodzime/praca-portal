import Link from 'next/link'

export default function RegistrationChoice() {
  return <main className="auth-shell"><Link className="brand" href="/"><span className="brand-mark">✦</span><span>praca<span>flow</span></span></Link><section className="auth-card registration-choice"><span className="section-kicker">DOŁĄCZ DO PRACAflow</span><h1>Wybierz swój panel.</h1><p>Jedno konto dla kandydatów, osobne narzędzia dla firm.</p><div className="choice-grid"><Link className="choice-card" href="/sign-up?role=candidate"><strong>Znajdę pracę</strong><span>Przeglądaj oferty, zapisz CV i buduj swoją ścieżkę.</span><b>Załóż konto użytkownika ↗</b></Link><Link className="choice-card recruiter-choice" href="/sign-up?role=recruiter"><strong>Zatrudniam</strong><span>Przeszukuj bazę CV i publikuj ogłoszenia.</span><b>Załóż konto rekrutera ↗</b></Link></div><p className="auth-switch">Masz już konto? <Link href="/sign-in">Zaloguj się</Link></p></section></main>
}
