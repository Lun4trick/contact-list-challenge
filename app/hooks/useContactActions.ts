import { useContactsContext } from '../utils/ContactsContex'
import { deleteContactFromDB } from '../serverActions/contactActionsWithDB'
import toast from 'react-hot-toast'

function useContactActions(id: string) {
  const { contacts, setContacts, setIsContactEditOpen, setEditableContactId } = useContactsContext()
  const contactImage = contacts.find(contact => contact.id === id)?.pictureName
  const options = [
    {
      name: 'edit',
      icon: '/svgs/settings-icon.svg',
      onClick: () => {
        setEditableContactId(id)
        setIsContactEditOpen(prev => !prev)
      }
    },
    {
      name: 'favourite',
      icon: '/svgs/favourite-icon.svg',
      onClick: () => toast.loading('Coming soon!', {
        style: {background: '#333333', color: '#ffffff'},
        duration: 1500,
      })
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