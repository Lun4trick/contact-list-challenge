import Image from 'next/image'
import React from 'react'
import cn from 'classnames'

type ButtonType = 'PRIMARY' | 'SECONDARY' | 'DROPDOWN'

type Props = {
  onClick?: (func: any) => void
  children?: React.ReactNode
  iconSrc?: string
  iconAlt?: string
  buttonType: ButtonType
  isDisabled?: boolean
}

function Button({ onClick, children, iconSrc, iconAlt, buttonType, isDisabled }: Props) {
  return (
    <button 
      onClick={onClick}
      disabled={isDisabled}
      className={cn(
        {'bg-base-60 justify-center rounded-lg hover:bg-base-50 active:bg-base-40': buttonType === 'PRIMARY'},
        {'hover:bg-base-90 justify-center rounded-lg active:bg-base-80': buttonType === 'SECONDARY'},
        {'py-[12px] px-[10px] bg-base-80 hover:bg-base-70 active:bg-base-60 w-[200px]': buttonType === 'DROPDOWN'},
        {'p-2': !children && iconSrc},
        {'px-4 py-2': children && buttonType !== 'DROPDOWN'},
        {'disabled:opacity-50 pointer-events-none cursor-not-allowed': isDisabled},
        'flex flex-grow items-center gap-2'
      )}
    >
      {(iconSrc && iconAlt) && (
          <Image className={cn(
            'aspect-square max-w-[18px] sm:max-w-[24px]',
            {'h-[20px] w-[20px] opacity-medium': buttonType === 'DROPDOWN'},
          )} src={iconSrc} height={24} width={24} alt={iconAlt}/>
        )}
      {children}
    </button>
  )
}

export default Button