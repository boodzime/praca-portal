import { put } from '@vercel/blob'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
const allowed = new Set(['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/png', 'image/jpeg'])

export async function POST(request: Request) {
  const form = await request.formData()
  const file = form.get('file')
  if (!(file instanceof File)) return NextResponse.json({ error: 'File is required' }, { status: 400 })
  if (!allowed.has(file.type)) return NextResponse.json({ error: 'Unsupported file type' }, { status: 415 })
  if (file.size > 8 * 1024 * 1024) return NextResponse.json({ error: 'File is larger than 8 MB' }, { status: 413 })
  const blob = await put(`cv/${crypto.randomUUID()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '-')}`, file, { access: 'private', addRandomSuffix: false })
  return NextResponse.json({ pathname: blob.pathname, contentType: file.type })
}
