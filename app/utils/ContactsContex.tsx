import React, { createContext, useContext } from 'react'

type Context = {
  contacts: ContactDetailsType[]
  setContacts: React.Dispatch<React.SetStateAction<ContactDetailsType[]>>
}

const contacts = createContext<Context>({
  contacts: [],
  setContacts: () => {},
})

export function ContactsContex({ children }: Readonly<{ children: React.ReactNode }>) {
  const [contactsList, setContactsList] = React.useState<ContactDetailsType[]>([])

  return (
    <contacts.Provider value={{contacts: contactsList, setContacts: setContactsList }}>
      {children}
    </contacts.Provider>
  )
}

export function useContactsContext() {
  return useContext(contacts)
}