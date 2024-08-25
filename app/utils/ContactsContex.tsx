import React, { createContext, useContext, useState } from 'react'

type Context = {
  contacts: ContactDetailsType[]
  isContactEditOpen: boolean,
  editableContactId: string,
  setIsContactEditOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setEditableContactId: React.Dispatch<React.SetStateAction<string>>,
  setContacts: React.Dispatch<React.SetStateAction<ContactDetailsType[]>>
}

const contacts = createContext<Context>({
  contacts: [],
  setIsContactEditOpen: () => null,
  setEditableContactId: () => null,
  editableContactId: '',
  isContactEditOpen: false,
  setContacts: () => {},
})

export function ContactsContex({ children }: Readonly<{ children: React.ReactNode }>) {
  const [contactsList, setContactsList] = useState<ContactDetailsType[]>([])
  const [isContactEditOpen, setIsContactEditOpen] = useState(false)
  const [editableContactId, setEditableContactId] = useState('')

  return (
    <contacts.Provider value={{
      editableContactId,
      contacts: contactsList, 
      setContacts: setContactsList, 
      isContactEditOpen,

      setIsContactEditOpen,
      setEditableContactId, 
    }}>
      {children}
    </contacts.Provider>
  )
}

export function useContactsContext() {
  return useContext(contacts)
}