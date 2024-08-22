import Image from 'next/image'
import React from 'react'

function AddNewButton() {
  return (
    <button className="flex p-[1px] bg-gradient-to-b from-base-20/100 to-base-20/0 rounded-full">
    <div className="btn-apply"
    >
      <div className='flex h-[24px] w-[24px] justify-center items-center'>
        <Image  src={'/svgs/plus-icon.svg'} height={14} width={14} alt='add-button-icon' />
      </div>
      <p className='flex text-center items-center'>Add new</p>
    </div>
  </button>
  )
}

export default AddNewButton