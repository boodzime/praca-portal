import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { eq, and } from 'drizzle-orm'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { savedJob } from '@/lib/db/schema'

export async function GET() { const session = await auth.api.getSession({ headers: await headers() }); if (!session?.user) return NextResponse.json({ saved: [] }); const rows = await db.select({ jobSlug: savedJob.jobSlug }).from(savedJob).where(eq(savedJob.userId, session.user.id)); return NextResponse.json({ saved: rows.map((row) => row.jobSlug) }) }
export async function POST(request: Request) { const session = await auth.api.getSession({ headers: await headers() }); if (!session?.user) return NextResponse.json({ error: 'UNAUTHORIZED' }, { status: 401 }); const { jobSlug } = await request.json(); if (typeof jobSlug !== 'string' || !jobSlug) return NextResponse.json({ error: 'INVALID' }, { status: 400 }); const existing = await db.select({ id: savedJob.id }).from(savedJob).where(and(eq(savedJob.userId, session.user.id), eq(savedJob.jobSlug, jobSlug))); if (existing[0]) await db.delete(savedJob).where(eq(savedJob.id, existing[0].id)); else await db.insert(savedJob).values({ id: crypto.randomUUID(), userId: session.user.id, jobSlug, createdAt: new Date() }); return NextResponse.json({ saved: !existing[0] }) }
