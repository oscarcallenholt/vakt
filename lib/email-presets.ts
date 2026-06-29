// Client-safe IMAP presets — NO Node.js imports
export const IMAP_PRESETS: Record<string, { host: string; port: number }> = {
  'gmail.com':        { host: 'imap.gmail.com',           port: 993 },
  'googlemail.com':   { host: 'imap.gmail.com',           port: 993 },
  'outlook.com':      { host: 'outlook.office365.com',    port: 993 },
  'hotmail.com':      { host: 'outlook.office365.com',    port: 993 },
  'live.com':         { host: 'outlook.office365.com',    port: 993 },
  'me.com':           { host: 'imap.mail.me.com',         port: 993 },
  'icloud.com':       { host: 'imap.mail.me.com',         port: 993 },
  'yahoo.com':        { host: 'imap.mail.yahoo.com',      port: 993 },
  'yahoo.se':         { host: 'imap.mail.yahoo.com',      port: 993 },
  'forssdigital.com': { host: 'imap.gmail.com',           port: 993 },
}

export function imapHostForEmail(email: string) {
  const domain = email.split('@')[1]?.toLowerCase() ?? ''
  return IMAP_PRESETS[domain] ?? { host: `imap.${domain}`, port: 993 }
}
