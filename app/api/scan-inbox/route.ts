import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { scanInbox } from '@/lib/imap'
import { extractSubscriptionFromEmail } from '@/lib/ai'

const COMPANY_ID = '11111111-0000-0000-0000-000000000001'

export async function POST(req: Request) {
  try {
    const { connectionId } = await req.json() as { connectionId: string }
    const supabase = createAdminClient()

    // Fetch connection details
    const { data: conn, error: connErr } = await supabase
      .from('email_connections')
      .select('*')
      .eq('id', connectionId)
      .eq('company_id', COMPANY_ID)
      .single()

    if (connErr || !conn) {
      return NextResponse.json({ error: 'Anslutning hittades inte' }, { status: 404 })
    }

    // Scan inbox
    const emails = await scanInbox(
      conn.email,
      conn.imap_password,
      conn.imap_host,
      conn.imap_port,
    )

    // Delete old pending results for this connection
    await supabase
      .from('discovered_subscriptions')
      .delete()
      .eq('company_id', COMPANY_ID)
      .eq('status', 'pending')

    // Process each email with Claude AI
    const results = []
    for (const email of emails) {
      const extracted = await extractSubscriptionFromEmail(
        email.from,
        email.subject,
        email.body,
      )
      if (!extracted) continue

      const { data } = await supabase.from('discovered_subscriptions').insert({
        company_id:     COMPANY_ID,
        vendor:         extracted.vendor,
        name:           extracted.name,
        cost_per_month: extracted.cost_per_month,
        billing_cycle:  extracted.billing_cycle,
        next_renewal:   extracted.next_renewal,
        category:       extracted.category,
        source_email:   email.subject,
        source_sender:  email.from,
        confidence:     extracted.confidence,
        status:         'pending',
        raw_preview:    email.body.slice(0, 400),
      }).select().single()

      if (data) results.push(data)
    }

    // Update last_scanned_at
    await supabase
      .from('email_connections')
      .update({ last_scanned_at: new Date().toISOString() })
      .eq('id', connectionId)

    return NextResponse.json({
      scanned: emails.length,
      found: results.length,
    })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Okänt fel'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
