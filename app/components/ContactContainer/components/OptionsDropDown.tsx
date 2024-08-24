import React, { useEffect, useRef } from 'react'
import Button from '../../Button'
import { motion } from 'framer-motion'

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
    onClick: () => console.log('delete clicked')
  }
]

type Props = {
  setIsOpen: (isOpen?: boolean) => void
  isOpen: boolean
  optionsButtonRef: React.RefObject<HTMLDivElement>
}

function OptionsDropDown({ setIsOpen, isOpen, optionsButtonRef }: Props) {
  const optionsMenuRef = useRef<HTMLDivElement>(null)

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
  }, [optionsButtonRef]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0}}
      animate={{opacity: isOpen ? 1 : 0, scale: isOpen ? 1 : 0}}
      transition={{ duration: 0.2 }}
      ref={optionsMenuRef} 
      className='flex flex-col absolute z-20'>
      {options.map(option => (
        <div key={option.name} className='flex items-start'>
          <Button buttonType='DROPDOWN' iconSrc={option.icon} iconAlt={option.name}>
            {option.name}
          </Button>
        </div>
      ))}
    </motion.div>
  )
}

export default OptionsDropDown