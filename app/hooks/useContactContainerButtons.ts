import { useState } from 'react'
import { ContactContainerButtonType } from '../types/contactContainerButtonType'
import toast from 'react-hot-toast'

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
        onClick: () => toast.loading('Coming soon!', {style: {background: '#333333', color: '#ffffff'}, duration: 1500})
      },

      {
        name: 'headphone',
        icon: '/svgs/headphone-icon.svg',
        type: 'HEADPHONE' as ContactContainerButtonType,
        onClick: () => toast.loading('Coming soon!', {style: {background: '#333333', color: '#ffffff'}, duration: 1500})
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