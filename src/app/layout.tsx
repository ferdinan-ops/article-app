import type { Metadata } from 'next'
import { QueryProvider } from '@/components/providers'
import { ClientLayout, DashboardLayout } from '@/components/layouts'

import './globals.css'

export const metadata: Metadata = {
  title: 'Article App',
  description: 'On article app, you can read and write articles that you like and share them to the world.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/Logo.svg" sizes="any" />
      </head>
      <body>
        <QueryProvider>
          <ClientLayout>
            <DashboardLayout>{children}</DashboardLayout>
          </ClientLayout>
        </QueryProvider>
      </body>
    </html>
  )
}
