import useAddContact from '@/app/hooks/useAddContact'
import React, { useEffect } from 'react'
import AddContactInputField from './components/AddContactInputField'
import AddContactImageUpload from './components/AddContactImageUpload'
import { useQuery } from 'react-query'
import fetchImage from '@/app/utils/requestFunctions/fetchImage'
import useImageUpload from '@/app/hooks/useImageChange'
import Button from '../Button'
import { getSignedUrlForImgUpload } from '@/app/serverActions/getSignedUrlForImgUpload'
import { uploadImage } from '@/app/utils/requestFunctions/uploadImage'
import { v4 } from 'uuid'
import { addContactToDB } from '@/app/serverActions/addContactToDB'
import { useContactsContext } from '@/app/utils/ContactsContex'
import { getContactDetails } from '@/app/utils/getContactDetails'
import { fetchContacts } from '@/app/utils/requestFunctions/fetchContacts'

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

  const handleImageUpload = async (file: File) => {
    try {
      const fileName = v4()
      const url = await getSignedUrlForImgUpload(fileName, file.type, file.size)

      if (url.failure) {
        throw new Error(url.failure)
      } else if(url.success) {
        await uploadImage(file, url.success)
        const signedUrlOfImage = await fetchImage(`${fileName}`)
        console.log(signedUrlOfImage)
        imageLink.set(signedUrlOfImage)
      }
    } catch (error) {
      console.error('Error uploading image:', error)
    }
  }

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    closeModal()
  }

  const handleSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      setIsUploading(true)
      await handleImageUpload(imageFile.value as File)
      await addContactToDB({
        name: formFields.find(field => field.label === 'Name')?.value as string,
        email: formFields.find(field => field.label === 'Email address')?.value as string,
        phone: formFields.find(field => field.label === 'Phone number')?.value as string,
        picture: imageLink.value,
      })
      const newContacts = await fetchContacts()
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
          <p>Done</p>
        </Button>
      </div>
    </form>
  )
}

export default AddContactForm