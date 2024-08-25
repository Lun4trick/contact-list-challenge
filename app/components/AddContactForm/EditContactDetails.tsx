import useAddContact from '@/app/hooks/useAddContact'
import React, { useEffect, useState } from 'react'
import AddContactInputField from './components/AddContactInputField'
import AddContactImageUpload from './components/AddContactImageUpload'
import { useQuery } from 'react-query'
import fetchImage from '@/app/utils/requestFunctions/fetchImage'
import useImageUpload from '@/app/hooks/useImageChange'
import Button from '../Button'
import { addContactToDB } from '@/app/serverActions/contactActionsWithDB'
import { useContactsContext } from '@/app/utils/ContactsContex'
import handleImageUpload from '@/app/utils/requestFunctions/handleImageUpload'
import { motion } from 'framer-motion'
import { getContactDetails } from '@/app/serverActions/getContactDetails'
import { v4 } from 'uuid'

type Props = {
  closeModal: () => void
  idToEdit?: string
}

function EditContactDetails({ closeModal, idToEdit }: Props) {
  const formFields: AddContactFieldType[] = useAddContact()
  const { imageFile, imageLink } = useImageUpload()
  const { data: defaultImage } = useQuery('image', () => fetchImage())
  const [isUploading, setIsUploading] = useState(false)
  const { contacts, setContacts } = useContactsContext()
  const isImageDefault = defaultImage === imageLink.value

  useEffect(() => {
    if (idToEdit) {
      const contact = contacts.find(contact => contact.id === idToEdit)
      if (contact) {
        console.log(contact)
        imageLink.set(contact?.picture)
        formFields.forEach((field) => {
          if (field.label === 'Email address') {
            field.onChange(undefined, contact.email)
          }

          if (field.label === 'Name') {
            field.onChange(undefined, contact.name)
          }

          if (field.label === 'Phone number') {
            field.onChange(undefined, contact.phone)
          }
        }) 
      }
    }
  }, [idToEdit])

  useEffect(() => {
    if (defaultImage && !imageFile.value && !idToEdit) {
      imageLink.set(defaultImage)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultImage, imageFile.value])

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    closeModal()
  }

  const handleSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setIsUploading(true)
      const newContactDetails = {
        name: formFields.find(field => field.label === 'Name')?.value as string,
        email: formFields.find(field => field.label === 'Email address')?.value as string,
        phone: formFields.find(field => field.label === 'Phone number')?.value as string,
        picture: imageLink.value,
        pictureName: v4()
      }
      console.log(newContactDetails.pictureName)
      const signedImageLink = await handleImageUpload(imageFile.value as File, newContactDetails.pictureName)

      imageLink.set(signedImageLink)

      await addContactToDB(newContactDetails)
      
      const newContacts = await getContactDetails()
      setContacts(newContacts)
    } catch (error) {
      console.error('Error adding contact:', error)
    }
     finally {
      setIsUploading(false)
      closeModal()
     }
}

  return (
    <form className='w-full flex flex-col gap-6'>
      <h2 className='text-left w-full'>
        Add contact
      </h2>
      <AddContactImageUpload isImageDefault={isImageDefault} imageFile={imageFile} imageLink={imageLink} />
      {formFields.map(field => (
        <AddContactInputField key={field.label} field={field} />
      ))}
      <div className='flex self-end'>
        <Button buttonType='SECONDARY' onClick={handleCancel}>
          <p>Cancel</p>
        </Button>
        <Button buttonType='PRIMARY' onClick={handleSumbit} isDisabled={isUploading}>
          <motion.p
            transition={{ 
              opacity: isUploading 
                ? { duration: 1, repeat: Infinity, repeatType: 'reverse' } 
                : {}
              }}
            animate={{ 
              opacity: isUploading 
                ? [0, 1] 
                : [] 
              }}
          >Done
          </motion.p>
        </Button>
      </div>
    </form>
  )
}

export default EditContactDetails
