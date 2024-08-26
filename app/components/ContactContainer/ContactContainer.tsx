import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import ContactContainerButtons from './components/ContactContainerButtons'
import { motion } from 'framer-motion'
import { useQuery } from 'react-query'
import fetchImage from '@/app/utils/requestFunctions/fetchImage'

type Props = {
  contactDetails: ContactDetailsType
}

function ContactContainer({ contactDetails }: Props) {
  const { id, name, phone, pictureName } = contactDetails
  const { data: contactPicture } = useQuery('contactPicture', () => fetchImage(pictureName))
  console.log(contactPicture)

  useEffect(() => {

  }, [])
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='flex w-full justify-between py-3 group'
    >
      <div className='flex gap-2'>
        {contactPicture && (
          <Image 
          className='flex aspect-square max-w-[40px] max-h-[40px] rounded-full' 
          src={contactPicture} 
          alt={`${name}'s profile pic`}
          style={{ objectFit: 'cover' }}
          height={40} 
          width={40}/>
        )}
        <div>
          <p>{name}</p>
          <p className='opacity-medium'>{phone}</p>
        </div>
      </div>
      <ContactContainerButtons contactId={id!} contactPictureName={pictureName} />
    </motion.div>
  )
}

export default ContactContainer