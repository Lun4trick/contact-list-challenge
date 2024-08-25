'use client'
import React, { useRef, useState } from 'react'
import Button from '../../Button'
import OptionsDropDown from './OptionsDropDown'
import cn from 'classnames'

type Props = {
  contactId: string
  contactPictureName: string
}

function ContactContainerButtons({ contactId }: Props) {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false)
  const optionsButtonRef = useRef(null)

  const handleOptionsClick = (state?: boolean) => {
    if (state !== undefined) {
      setIsOptionsOpen(state)
    } else {
      setIsOptionsOpen((prevState) => !prevState)
    }
  }

  const buttons = [
    {
      name: 'notifications',
      icon: '/svgs/notification-icon.svg',
      onClick: () => {}
    },
    {
      name: 'headphone',
      icon: '/svgs/headphone-icon.svg',
      onClick: () => {}
    },
    {
      name: 'options',
      icon: '/svgs/options-icon.svg',
      onClick: () => handleOptionsClick()
    }
  ]
  return (
    <div
      className={cn(
      'flex w-fit transition-opacity duration-300',
      {'opacity-100 pointer-events-auto': isOptionsOpen},
      {'opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto': !isOptionsOpen}
    )}>
      {buttons.map(button => (
        <div
          ref={button.name === 'options' ? optionsButtonRef : null}
          key={button.name}>
          <Button 
            buttonType='SECONDARY'
            iconSrc={button.icon}
            iconAlt={button.name}
            onClick={button.onClick}
            >
          </Button>
          {(button.name === 'options' 
            && isOptionsOpen) 
            && <OptionsDropDown
                  contactId={contactId}
                  isOpen={isOptionsOpen} 
                  setIsOpen={handleOptionsClick}
                  optionsButtonRef={optionsButtonRef}
                />}
        </div>
      ))}
    </div>
  )
}

export default ContactContainerButtons