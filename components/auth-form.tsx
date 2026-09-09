'use client'

import { FormEvent, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { authClient } from '@/lib/auth-client'

type AccountRole = 'candidate' | 'recruiter'

const accountOptions: Array<{ role: AccountRole; label: string; description: string; points: string[] }> = [
  { role: 'candidate', label: 'Szukam pracy', description: 'Zbuduj profil, twórz CV i zapisuj najlepiej dopasowane oferty.', points: ['Kreator CV z oceną umiejętności', 'Dopasowane oferty pracy', 'Jedno miejsce na zapisane oferty'] },
  { role: 'recruiter', label: 'Zatrudniam', description: 'Znajdź właściwe osoby, przeglądaj CV i publikuj ogłoszenia.', points: ['Baza profili kandydatów', 'Publikowanie ogłoszeń', 'Panel do zarządzania rekrutacją'] },
]

export function AuthForm({ mode }: { mode: 'sign-in' | 'sign-up' }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirectTo')
  const [role, setRole] = useState<AccountRole>(searchParams.get('role') === 'recruiter' ? 'recruiter' : 'candidate')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError('')
    const data = new FormData(event.currentTarget)
    const email = String(data.get('email') || '')
    const password = String(data.get('password') || '')
    const name = String(data.get('name') || '')
    const result = mode === 'sign-up'
      ? await authClient.signUp.email({ email, password, name })
      : await authClient.signIn.email({ email, password })
    if (result.error) {
      setError('Nie udało się wykonać operacji. Sprawdź dane i spróbuj ponownie.')
    } else {
      router.push(redirectTo?.startsWith('/') ? redirectTo : role === 'recruiter' ? '/rekruter' : '/panel')
      router.refresh()
    }
    setLoading(false)
  }

  const isSignUp = mode === 'sign-up'
  return <main className="auth-shell">
    <a className="brand" href="/"><span className="brand-mark">✦</span><span>praca<span>flow</span></span></a>
    <section className={`auth-card ${isSignUp ? 'auth-card-wide' : ''}`}>
      <span className="section-kicker">{isSignUp ? 'NOWY PROFIL' : 'WITAJ PONOWNIE'}</span>
      <h1>{isSignUp ? 'Utwórz konto.' : 'Zaloguj się.'}</h1>
      <p>{isSignUp ? 'Wybierz sposób korzystania z pracaFlow, a my dopasujemy panel do Twoich celów.' : 'Wróć do swoich ofert, CV i zapisanych możliwości.'}</p>
      <form onSubmit={submit}>
        {isSignUp && <fieldset className="account-choice">
          <legend>Wybierz swój panel</legend>
          <div className="account-options">
            {accountOptions.map((option) => <label key={option.role} className={`account-option ${role === option.role ? 'selected' : ''}`}>
              <input type="radio" name="role" value={option.role} checked={role === option.role} onChange={() => setRole(option.role)} />
              <span className="account-option-top"><span className="account-radio" aria-hidden="true" /> <strong>{option.label}</strong></span>
              <span className="account-description">{option.description}</span>
              <span className="account-points">{option.points.map((point) => <span key={point}>✓ {point}</span>)}</span>
            </label>)}
          </div>
        </fieldset>}
        {isSignUp && <label>Imię i nazwisko<input name="name" required /></label>}
        <label>E-mail<input name="email" type="email" required /></label>
        <label>Hasło<input name="password" type="password" minLength={8} required /></label>
        {error && <p className="form-error">{error}</p>}
        <button className="button" disabled={loading}>{loading ? 'Chwila...' : isSignUp ? 'Zarejestruj się' : 'Zaloguj się'} <span>↗</span></button>
      </form>
      <p className="auth-switch">{isSignUp ? 'Masz już konto?' : 'Nie masz jeszcze konta?'} <a href={isSignUp ? '/sign-in' : '/sign-up'}>{isSignUp ? 'Zaloguj się' : 'Zarejestruj się'}</a></p>
    </section>
  </main>
}
