import Image from 'next/image'
import React from 'react'
import AddNewButton from './AddNewButton'

function NavButtons() {
  return (
    <div className='gap-6 items-center sm:flex hidden'>
      <div className='flex gap-2'>
        <button className='p-2'>
          <Image src={'/svgs/settings-icon.svg'} alt='settings-icon' height={24} width={24} />
        </button>
        <button className='p-2'>
          <Image src={'/svgs/profile-pic.svg'} alt='profile-pic' height={24} width={24} />
        </button>
      </div>
      <AddNewButton />
    </div>
  )
}

export default NavButtons