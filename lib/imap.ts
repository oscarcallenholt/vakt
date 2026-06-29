// SERVER-ONLY — never import this in client components
import { ImapFlow } from 'imapflow'
import { simpleParser } from 'mailparser'
export { IMAP_PRESETS, imapHostForEmail } from './email-presets'

const SUBSCRIPTION_KEYWORDS = [
  'faktura', 'kvitto', 'betalning', 'abonnemang', 'prenumeration', 'förnyelse',
  'månadsavgift', 'årsavgift', 'autogiro', 'debitering',
  'invoice', 'receipt', 'subscription', 'billing', 'renewal', 'charged',
  'monthly', 'annual plan', 'auto-renewal', 'payment confirmation',
  'your plan', 'your subscription', 'renewed', 'thank you for your payment',
]

export interface ScannedEmail {
  from: string
  subject: string
  body: string
  date: Date
}

export async function scanInbox(
  email: string,
  password: string,
  imapHost: string,
  imapPort: number,
  maxEmails = 80,
): Promise<ScannedEmail[]> {
  const client = new ImapFlow({
    host: imapHost,
    port: imapPort,
    secure: true,
    auth: { user: email, pass: password },
    logger: false,
    tls: { rejectUnauthorized: false },
  })

  await client.connect()

  const results: ScannedEmail[] = []

  try {
    await client.mailboxOpen('INBOX')

    const since = new Date()
    since.setFullYear(since.getFullYear() - 1)

    const messages = client.fetch(
      { since },
      { source: true, envelope: true },
    )

    let count = 0
    for await (const msg of messages) {
      if (count >= maxEmails) break
      if (!msg.source) continue

      const parsed = await simpleParser(msg.source as Buffer)
      const subject = parsed.subject ?? ''
      const from    = parsed.from?.text ?? ''
      const bodyTxt = parsed.text ?? (parsed.html as string | undefined)?.replace(/<[^>]+>/g, ' ') ?? ''

      const haystack = (subject + ' ' + bodyTxt).toLowerCase()
      const isRelevant = SUBSCRIPTION_KEYWORDS.some(kw => haystack.includes(kw))

      if (isRelevant) {
        results.push({
          from,
          subject,
          body: bodyTxt,
          date: (parsed as any).date ?? new Date(),
        })
        count++
      }
    }
  } finally {
    await client.logout()
  }

  return results
}
