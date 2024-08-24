import React from 'react'
import cn from 'classnames'
import { HeaderSideButtonPositionType } from '@/app/types/HeaderSideButtonPositionType'

type Props = {
  position: HeaderSideButtonPositionType
  children: React.ReactNode
}

function HeaderSideButton({position, children}: Props) {
  return (
    <div className={cn(
      'col-span-1 flex border-base-60 border-y-[1px] row-start-2',
      {'col-start-1 justify-end': position === 'LEFT'},
      {'col-start-3': position === 'RIGHT'},
    )}>
      <div className='flex w-fit h-full sm:px-[20px] px-[8px]  items-center'>
        <button
          className={cn(
            'h-fit p-2 max-w-[35px] min-w-[25px] sm:max-w-fit',
            {'ml-auto': position === 'LEFT'}
          )}>
          {children}
        </button>
      </div>
    </div>
  )
}

export default HeaderSideButton