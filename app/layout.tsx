import './globals.css'
import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'

const inter = Manrope({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Moody.Ai',
  description: 'A Journal with Mood Tracker using AI',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
