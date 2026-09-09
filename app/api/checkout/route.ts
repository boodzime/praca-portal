import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'

const plans = {
  cv: {
    name: 'Kreator CV — pracaFlow',
    amount: 1499,
    mode: 'payment',
    description: 'Jednorazowy dostęp do kreatora CV',
  },
  recruiter: {
    name: 'Recruiter Pro — pracaFlow',
    amount: 19900,
    mode: 'subscription',
    description: 'Miesięczny dostęp do narzędzi rekrutera',
  },
} as const

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) return NextResponse.json({ error: 'UNAUTHORIZED' }, { status: 401 })

  const secretKey = process.env.STRIPE_SECRET_KEY
  if (!secretKey) return NextResponse.json({ error: 'Stripe nie jest jeszcze skonfigurowany.' }, { status: 503 })

  const payload = await request.json().catch(() => null)
  const plan = payload?.plan as keyof typeof plans
  if (!plan || !plans[plan]) return NextResponse.json({ error: 'Nieprawidłowy plan.' }, { status: 400 })

  const selected = plans[plan]
  const requestHeaders = await headers()
  const host = requestHeaders.get('x-forwarded-host') || requestHeaders.get('host') || 'localhost:3000'
  const protocol = requestHeaders.get('x-forwarded-proto') || (host.startsWith('localhost') ? 'http' : 'https')
  const origin = process.env.NEXT_PUBLIC_APP_URL || protocol + '://' + host
  const params = new URLSearchParams()
  params.set('mode', selected.mode)
  params.set('line_items[0][price_data][currency]', 'pln')
  params.set('line_items[0][price_data][unit_amount]', String(selected.amount))
  params.set('line_items[0][price_data][product_data][name]', selected.name)
  params.set('line_items[0][price_data][product_data][description]', selected.description)
  if (selected.mode === 'subscription') params.set('line_items[0][price_data][recurring][interval]', 'month')
  params.set('line_items[0][quantity]', '1')
  params.set('success_url', origin + '/platnosc/sukces?session_id={CHECKOUT_SESSION_ID}')
  params.set('cancel_url', origin + '/platnosc/anulowana')
  params.set('client_reference_id', session.user.id)
  params.set('customer_email', session.user.email)
  params.set('metadata[userId]', session.user.id)
  params.set('metadata[plan]', plan)

  const stripeResponse = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + secretKey, 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
    cache: 'no-store',
  })
  const stripeBody = await stripeResponse.json().catch(() => ({}))
  if (!stripeResponse.ok || !stripeBody.url) {
    console.error('Stripe Checkout error', stripeBody)
    return NextResponse.json({ error: 'Stripe odrzucił próbę utworzenia płatności.' }, { status: 502 })
  }
  return NextResponse.json({ url: stripeBody.url })
}
