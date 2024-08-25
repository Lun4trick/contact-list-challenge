import EditContactDetails from '@/app/components/AddContactForm/EditContactDetails'
import PopUpModal from '@/app/components/PopUpModal/PopUpModal'
import Image from 'next/image'
import React from 'react'

function AddNewButton() {
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false)
  return (
    <>
      <button onClick={() => setIsEditModalOpen(prev => !prev)} className="flex p-[1px] bg-gradient-to-b from-base-20/100 to-base-20/0 rounded-full">
      <div className="btn-apply whitespace-nowrap"
      >
        <div className='flex h-[24px] w-[24px] justify-center items-center'>
          <Image  src={'/svgs/plus-icon.svg'} height={14} width={14} alt='add-button-icon' />
        </div>
        <p className='hidden sm:flex text-center items-center'>Add new</p>
      </div>
      </button>
      {isEditModalOpen && (
        <PopUpModal closeModal={() => setIsEditModalOpen(prev => !prev)}>
          <EditContactDetails closeModal={() => setIsEditModalOpen(false)}/>
        </PopUpModal>
      )}
    </>
  )
}

export default AddNewButton