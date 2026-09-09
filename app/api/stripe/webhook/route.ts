import { createHmac, timingSafeEqual } from 'node:crypto'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

function verifyStripeSignature(payload: string, signature: string, secret: string) {
  const timestamp = signature.split(',').find((part) => part.startsWith('t='))?.slice(2)
  const signatures = signature.split(',').filter((part) => part.startsWith('v1=')).map((part) => part.slice(3))
  if (!timestamp || signatures.length === 0 || Math.abs(Date.now() / 1000 - Number(timestamp)) > 300) return false
  const expected = createHmac('sha256', secret).update(timestamp + '.' + payload).digest('hex')
  return signatures.some((candidate) => {
    const left = Buffer.from(candidate, 'utf8')
    const right = Buffer.from(expected, 'utf8')
    return left.length === right.length && timingSafeEqual(left, right)
  })
}

export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  const signature = request.headers.get('stripe-signature')
  const rawBody = await request.text()
  if (!secret || !signature || !verifyStripeSignature(rawBody, signature, secret)) {
    return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 })
  }

  const event = JSON.parse(rawBody) as { type: string; data?: { object?: { id?: string; metadata?: { plan?: string; userId?: string } } } }
  if (event.type === 'checkout.session.completed' || event.type === 'checkout.session.async_payment_succeeded') {
    console.info('Stripe payment completed', {
      sessionId: event.data?.object?.id,
      userId: event.data?.object?.metadata?.userId,
      plan: event.data?.object?.metadata?.plan,
      title: event.data?.object?.metadata?.title,
      company: event.data?.object?.metadata?.company,
    })
  }
  return NextResponse.json({ received: true })
}
