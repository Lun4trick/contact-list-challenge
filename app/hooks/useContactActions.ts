import React from 'react'
import { useContactsContext } from '../utils/ContactsContex'
import { deleteContactFromDB } from '../serverActions/contactActionsWithDB'

function useContactActions(id: string) {
  const { contacts, setContacts } = useContactsContext()
  const contactImage = contacts.find(contact => contact.id === id)?.pictureName
  const options = [
    {
      name: 'edit',
      icon: '/svgs/settings-icon.svg',
      onClick: () => console.log('edit clicked')
    },
    {
      name: 'favourite',
      icon: '/svgs/favourite-icon.svg',
      onClick: () => console.log('favourite clicked')
    },
    {
      name: 'delete',
      icon: '/svgs/trash-icon.svg',
      onClick: () => {
        if (!contactImage) {
          console.error('No contact image found')
          return
        }
        deleteContactFromDB(id, contactImage)
        setContacts(contacts.filter(contact => contact.id !== id))
      }
    }
  ]

  return options
}


export default useContactActions