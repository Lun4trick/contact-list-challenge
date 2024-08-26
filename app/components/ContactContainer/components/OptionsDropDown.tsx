import React, { useEffect, useRef } from 'react'
import Button from '../../Button'
import { motion } from 'framer-motion'
import useWatchMedia from '@/app/hooks/useMedia'
import useContactActions from '@/app/hooks/useContactActions'
import { useContactsContext } from '@/app/utils/ContactsContex'
import useContactContainerButtons from '@/app/hooks/useContactContainerButtons'

type Props = {
  contactId: string
  setIsOpen: (isOpen?: boolean) => void
  isOpen: boolean
  optionsButtonRef: React.RefObject<HTMLDivElement>
}

function OptionsDropDown({ setIsOpen, isOpen, optionsButtonRef, contactId }: Props) {
  const optionsMenuRef = useRef<HTMLDivElement>(null)
  const options = useContactActions(contactId)
  const containerButtonsOnMobile = useContactContainerButtons().filter(button => button.type !== 'OPTIONS')
  const isMobile = useWatchMedia('(min-width: 768px)')

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if ((optionsMenuRef.current && !optionsMenuRef.current.contains(event.target as Node)) && (
        optionsButtonRef.current && !optionsButtonRef.current.contains(event.target as Node))) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optionsButtonRef]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0}}
      animate={{opacity: isOpen ? 1 : 0, scale: isOpen ? 1 : 0, x: isMobile ? 0 : -100}}
      transition={{ duration: 0.2 }}
      ref={optionsMenuRef} 
      className='flex flex-col absolute z-20'>
      {options.map(option => (
        <div key={option.name} className='flex items-start'>
          <Button 
            buttonType='DROPDOWN' 
            iconSrc={option.icon} 
            iconAlt={option.name}
            onClick={() => {
              option.onClick()
              setIsOpen(false)
            }}>
            {option.name}
          </Button>
        </div>
      ))}
      {containerButtonsOnMobile.map(button => (
        // These buttons normally outside on the main page, but on mobile i put them here                     
        <div key={button.name} className='flex items-start sm:hidden'>
          <Button 
            buttonType='DROPDOWN' 
            iconSrc={button.icon} 
            iconAlt={button.name}
            onClick={button.onClick}>
            {button.name}
          </Button>
        </div>
      ))}
    </motion.div>
  )
}

export default OptionsDropDown