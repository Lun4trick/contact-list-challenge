import { useState } from 'react'
import { ContactContainerButtonType } from '../types/contactContainerButtonType'

function useContactContainerButtons() {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false)

  const handleOptionsClick = (state?: boolean) => {
    if (state !== undefined) {
      setIsOptionsOpen(state)
    } else {
      setIsOptionsOpen((prevState) => !prevState)
    }
  }

  const contactContainerButtons = [
      {
        name: 'notifications',
        icon: '/svgs/notification-icon.svg',
        type: 'NOTIFICATIONS' as ContactContainerButtonType,
        onClick: () => console.log('notifications')
      },

      {
        name: 'headphone',
        icon: '/svgs/headphone-icon.svg',
        type: 'HEADPHONE' as ContactContainerButtonType,
        onClick: () => console.log('headphone')
      },
      {
        name: 'options',
        icon: '/svgs/options-icon.svg',
        type: 'OPTIONS' as ContactContainerButtonType,
        isOptionsOpen,
        onClick: () => handleOptionsClick()
      },
    ]

    return contactContainerButtons
  }

export default useContactContainerButtons