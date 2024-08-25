import useAddContact from '@/app/hooks/useAddContact'
import React, { useEffect } from 'react'
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
}

function AddContactForm({ closeModal }: Props) {
  const formFields: AddContactFieldType[] = useAddContact()
  const { imageFile, imageLink } = useImageUpload()
  const { data: defaultImage } = useQuery('image', () => fetchImage())
  const [isUploading, setIsUploading] = React.useState(false)
  const { setContacts } = useContactsContext()

  useEffect(() => {
    if (defaultImage && !imageFile.value) {
      imageLink.set(defaultImage)
    }
  }, [defaultImage, imageFile.value])

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    closeModal()
  }

  const handleSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setIsUploading(true)
      const contactToAdd = {
        name: formFields.find(field => field.label === 'Name')?.value as string,
        email: formFields.find(field => field.label === 'Email address')?.value as string,
        phone: formFields.find(field => field.label === 'Phone number')?.value as string,
        picture: imageLink.value,
        pictureName: v4()
      }
      console.log(contactToAdd.pictureName)
      const signedImageLink = await handleImageUpload(imageFile.value as File, contactToAdd.pictureName)

      imageLink.set(signedImageLink)

      await addContactToDB(contactToAdd)
      
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
      <AddContactImageUpload imageFile={imageFile} imageLink={imageLink} />
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

export default AddContactForm
