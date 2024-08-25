'use client'

import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ContactsContex } from './ContactsContex'

function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <ContactsContex>
          {children}
      </ContactsContex>
    </QueryClientProvider>
  )
}

export default Providers