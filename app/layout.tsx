import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Vakt — Koll på varje krona',
  description: 'Automatisk kostnadskoll för svenska småföretag. Hitta svinn, bevaka abonnemang och säg upp direkt.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <body>{children}</body>
    </html>
  )
}
