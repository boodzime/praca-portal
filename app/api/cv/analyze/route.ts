import { generateText } from 'ai'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  const { text } = await request.json().catch(() => ({})) as { text?: string }
  if (!text || text.trim().length < 40) return NextResponse.json({ error: 'CV text is too short' }, { status: 400 })
  const result = await generateText({
    model: 'openai/o4-mini',
    system: 'Jesteś ekspertem rekrutacji w Polsce. Analizujesz CV wyłącznie pod kątem zawodowym. Nie wnioskuj o cechach wrażliwych. Zwróć zwięzłą, praktyczną odpowiedź po polsku.',
    prompt: `Przeanalizuj poniższe CV. Zwróć sekcje: Profil zawodowy, 5 najważniejszych umiejętności, sugerowane stanowiska, sugerowane lokalizacje i 3 konkretne poprawki.\n\nCV:\n${text.slice(0, 20000)}`,
  })
  return NextResponse.json({ analysis: result.text })
}
