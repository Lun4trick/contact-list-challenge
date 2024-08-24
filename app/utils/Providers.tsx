'use client'

import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ContactsContex } from './ContactsContex'

function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
  const queryClient = new QueryClient()
  return (
    <ContactsContex>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </ContactsContex>
  )
}

export default Providers