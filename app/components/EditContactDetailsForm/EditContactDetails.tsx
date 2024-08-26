import useAddContact from '@/app/hooks/useEditContact'
import React, { useEffect, useState } from 'react'
import AddContactInputField from './components/EditContactInputField'
import AddContactImageUpload from './components/EditContactImageUpload'
import { useQuery } from 'react-query'
import fetchImage from '@/app/utils/requestFunctions/fetchImage'
import useImageUpload from '@/app/hooks/useImageChange'
import Button from '../Button'
import { addContactToDB, editContactInDB } from '@/app/serverActions/contactActionsWithDB'
import { useContactsContext } from '@/app/utils/ContactsContex'
import handleImageUpload from '@/app/utils/requestFunctions/handleImageUpload'
import { motion } from 'framer-motion'
import { getContactDetails } from '@/app/serverActions/getContactDetails'
import { v4 } from 'uuid'
import toast from 'react-hot-toast'
import { checkIsEmailFormatCorrect } from '@/app/utils/checkEmailFormat'

type Props = {
  closeModal: () => void
  idToEdit?: string
}

function EditContactDetails({ closeModal, idToEdit }: Props) {
  const {emailField, nameField, phoneField} = useAddContact()
  const formFields = [nameField, emailField, phoneField]
  const { imageFile, imageLink } = useImageUpload()
  const [isUploading, setIsUploading] = useState(false)
  const { contacts, setContacts } = useContactsContext()
  const { data: defaultImage } = useQuery('image', () => fetchImage())

  useEffect(() => {
    const contactToEdit = contacts.find(contact => contact.id === idToEdit)
    const getEditableImage = async () => {
      const image = await fetchImage(contactToEdit?.pictureName)
      return image
    }
    try {
      if (contactToEdit) {
        getEditableImage().then(image => {
          imageLink.set(image)
        })
      }
    } finally {
      if (contactToEdit) {
        emailField.onChange(undefined, contactToEdit.email)
        nameField.onChange(undefined, contactToEdit.name)
        phoneField.onChange(undefined, contactToEdit.phone)
    }
    }
  }, [idToEdit])

  useEffect(() => {
    if (defaultImage && !imageFile.value && !imageLink.value) {
      imageLink.set(defaultImage)
    }
  }, [defaultImage, imageFile.value, imageLink.value])

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    closeModal()
  }

  const handleSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (nameField?.value === '') {
      toast.error('Name field cannot be empty', {style: {backgroundColor: '#333333', color: '#ffffff'}})
      return
    }

    if (!checkIsEmailFormatCorrect(emailField.value)) {
      toast.error('Invalid email format', {style: {backgroundColor: '#333333', color: '#ffffff'}})
      return
    }
    try {
      const contactToEdit = contacts.find(contact => contact.id === idToEdit)
      setIsUploading(true)
      const pictureName = imageFile.value ? v4() : contactToEdit?.pictureName 
      if (imageFile.value && pictureName) {
        await handleImageUpload(imageFile.value as File, pictureName)
      }

      const newContactDetails = {
        name: nameField.value,
        email: emailField.value,
        phone: phoneField.value,
        pictureName: pictureName || ''
      }

      if (!idToEdit) {
        await addContactToDB(newContactDetails)
      } else {
        await editContactInDB(newContactDetails, idToEdit)
      }

      
      const newContacts = await getContactDetails()
      closeModal()
      setContacts(newContacts.sort((a, b) => a.createdAt! <= b.createdAt! ? -1 : 1))
    } catch (error: any) {
      toast.error(error.message as string, {style: {backgroundColor: '#333333', color: '#ffffff'}})
    }
     finally {
      setIsUploading(false)
     }
}

  return (
    <form action='POST' className='w-full flex flex-col gap-6'>
      <h2 className='text-left w-full'>
        {idToEdit ? 'Edit contact' : 'Add contact'}
      </h2>
      <AddContactImageUpload
        defaultImage={defaultImage} 
        imageFile={imageFile} 
        imageLink={imageLink}
        />
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
            >
              Done
          </motion.p>
        </Button>
      </div>
    </form>
  )
}

export default EditContactDetails
