'use client'

import * as React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            retry: 1,
            staleTime: 30 * 60 * 1000 // 30 minutes
          }
        }
      })
  )

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
