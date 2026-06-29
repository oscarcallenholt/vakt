import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })

export interface ExtractedSubscription {
  vendor: string
  name: string
  cost_per_month: number
  billing_cycle: 'monthly' | 'quarterly' | 'yearly'
  next_renewal: string | null
  category: 'software' | 'telephony' | 'insurance' | 'marketing' | 'other'
  confidence: number
}

export async function extractSubscriptionFromEmail(
  from: string,
  subject: string,
  body: string,
): Promise<ExtractedSubscription | null> {
  const prompt = `Du är en AI som analyserar e-postmeddelanden för att hitta abonnemang och återkommande kostnader.

E-post:
Från: ${from}
Ämne: ${subject}
Innehåll (max 2000 tecken):
${body.slice(0, 2000)}

Extrahera abonnemangsinformation om detta är ett kvitto, faktura, bekräftelse eller förnyelse av ett abonnemang/återkommande tjänst.

Svara EXAKT med giltig JSON i detta format, eller svara med null om det inte är ett abonnemang:
{
  "vendor": "Leverantörens företagsnamn",
  "name": "Tjänstens namn",
  "cost_per_month": 99.00,
  "billing_cycle": "monthly",
  "next_renewal": "2026-08-01",
  "category": "software",
  "confidence": 85
}

Regler:
- cost_per_month: alltid månadsbelopp i SEK (konvertera om årsbelopp dividera med 12)
- billing_cycle: monthly | quarterly | yearly
- category: software | telephony | insurance | marketing | other
- confidence: 0-100, hur säker du är på att det är ett abonnemang
- next_renewal: nästa förnyelsedatum YYYY-MM-DD eller null
- Ignorera engångsköp, orderbekräftelser för fysiska varor, nyhetsbrev utan kostnad`

  try {
    const msg = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 400,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = (msg.content[0] as { type: string; text: string }).text.trim()
    if (text === 'null' || !text.startsWith('{')) return null

    const parsed = JSON.parse(text) as ExtractedSubscription
    if (!parsed.name || !parsed.cost_per_month || parsed.confidence < 40) return null

    return parsed
  } catch {
    return null
  }
}
