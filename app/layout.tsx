import './globals.css'
import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'

const manrope = Manrope({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Moody.Ai',
  description: 'A Journal with Mood Tracker using AI',
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={manrope.className}>{children}</body>
      </html>
    </ClerkProvider>
  )
}
