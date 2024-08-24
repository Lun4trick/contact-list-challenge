import Image from 'next/image'
import React from 'react'
import ContactContainerButtons from './components/ContactContainerButtons'
import { motion } from 'framer-motion'

type Props = {
  contactDetails: ContactDetailsType
}

function ContactContainer({ contactDetails }: Props) {
  const { name, phone, picture } = contactDetails
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='flex w-full justify-between py-3 group'
    >
      <div className='flex gap-2'>
        <Image className='flex aspect-square max-w-fit max-h-fit rounded-full' src={picture} alt={`${name}'s profile pic`} height={40} width={40}/>
        <div>
          <p>{name}</p>
          <p>{phone}</p>
        </div>
      </div>
      <ContactContainerButtons />
    </motion.div>
  )
}

export default ContactContainer