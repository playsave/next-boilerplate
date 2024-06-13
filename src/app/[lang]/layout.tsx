import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Next Boilerplate',
  description: 'Generated by create next app'
}

export default function RootLayout({ children, params }: ChildrenType & { params: { lang: Locale } }) {
  return (
    <html lang='en'>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
