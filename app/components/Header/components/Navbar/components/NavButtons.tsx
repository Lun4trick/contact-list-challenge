'use client'
import Image from 'next/image'
import React from 'react'
import AddNewButton from './AddNewButton'

function NavButtons() {
  return (
    <div className='gap-1 sm:gap-4 lg:gap-6 items-center flex'>
      <div className='flex gap-1 lg:gap-2'>
        <button className='lg:p-2 p-1'>
          <Image src={'/svgs/settings-icon.svg'} alt='settings-icon' height={24} width={24} />
        </button>
        <button className='lg:p-2 p-1'>
          <Image src={'/svgs/profile-pic.svg'} alt='profile-pic' height={24} width={24} />
        </button>
      </div>
      <AddNewButton />
    </div>
  )
}

export default NavButtons