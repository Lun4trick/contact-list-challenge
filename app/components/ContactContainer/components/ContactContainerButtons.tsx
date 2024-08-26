'use client'
import React, { useRef } from 'react'
import Button from '../../Button'
import OptionsDropDown from './OptionsDropDown'
import cn from 'classnames'
import useContactContainerButtons from '@/app/hooks/useContactContainerButtons'

type Props = {
  contactId: string
  contactPictureName: string
}

function ContactContainerButtons({ contactId }: Props) {
  const containerButtons = useContactContainerButtons()
  const [_notifications, _headphone, options] = containerButtons
  const optionsButtonRef = useRef(null)

  return (
    <div
      className={cn(
      'flex w-fit transition-opacity duration-300',
      {'opacity-100 pointer-events-auto': options.isOptionsOpen},
      {'opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto': !options.isOptionsOpen}
    )}>
      {containerButtons.map(button => (
        <div
          className={cn(
            {'hidden sm:block': button.type !== 'OPTIONS'},
          )}
          ref={button.type === 'OPTIONS' ? optionsButtonRef : null}
          key={button.name}>
          <Button 
            buttonType='SECONDARY'
            iconSrc={button.icon}
            iconAlt={button.name}
            onClick={button.onClick}
            >
          </Button>
          {(button.type === 'OPTIONS' 
            && options.isOptionsOpen) 
            && <OptionsDropDown
                  contactId={contactId}
                  isOpen={options.isOptionsOpen} 
                  setIsOpen={options.onClick}
                  optionsButtonRef={optionsButtonRef}
                />}
        </div>
      ))}
    </div>
  )
}

export default ContactContainerButtons