'use client'

import { useState } from 'react'

type CheckoutPlan = 'cv' | 'recruiter' | 'job' | 'gig' | 'featured'

export function CheckoutButton({ plan, children, className = 'button', metadata }: { plan: CheckoutPlan; children: React.ReactNode; className?: string; metadata?: Record<string, string> }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function startCheckout() {
    if (loading) return
    setLoading(true)
    setError('')
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan, metadata }),
      })
      const data = await response.json().catch(() => ({}))
      if (response.status === 401) {
        window.location.href = plan === 'recruiter' ? '/sign-in?redirectTo=/rekruter' : '/sign-in?redirectTo=/kreator-cv'
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

  return <div className="checkout-action">
    <button className={className} type="button" onClick={startCheckout} disabled={loading}>
      {loading ? 'Przekierowanie...' : children}
    </button>
    {error && <small className="checkout-error" role="alert">{error}</small>}
  </div>
}
