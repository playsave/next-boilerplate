import { i18n, Locale } from '@/utils/configs/i18n'
import { ChildrenType } from '@/utils/models/core-model'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/app/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Next Boilerplate',
  description: 'Generated by create next app'
}

export default function RootLayout({ children, params }: ChildrenType & { params: { lang: Locale } }) {
  const direction = i18n.langDirection[params.lang]

  return (
    <html id='__next' lang={params.lang} dir={direction}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
