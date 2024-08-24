import React from 'react'
import { motion } from 'framer-motion'

type Props = {
  children?: React.ReactNode
  closeModal: () => void
}

function PopUpModal({children, closeModal}: Props) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.40 }}
        onClick={() => closeModal()} 
        className='absolute left-0 top-0 bg-black justify-center items-center h-screen w-screen z-10' 
      />
        <div className='absolute top-0 left-0 flex justify-center items-center h-screen w-screen'>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className='z-20 bg-base-100 rounded-md p-6'
          >
            {children}
          </motion.div>
        </div>
    </>
  )
}

export default PopUpModal