import React, { useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ImageFileUploadType, ImageLinkType } from '@/app/types/imageUploadTypes'
import cn from 'classnames'
import Button from '../../Button'
type Props = {
  imageFile: ImageFileUploadType
  imageLink: ImageLinkType
}

function AddContactImageUpload({ imageFile, imageLink }: Props) {
  const fileUploadRef = useRef<HTMLInputElement>(null)
  const isImageSetted = imageFile.value !== null
  const uploadButtonIcon = isImageSetted ? '/svgs/update-icon.svg' : '/svgs/plus-icon.svg'

  const handleFileUpload = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    fileUploadRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      imageFile.set(file)
    }
  }

  const handleResetToDefault = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    imageFile.set(null)
  }

  return (
    <motion.div
    initial={{
      opacity: 0,
    }}
    animate={{
      opacity: 1,
    }}
    transition={{
      duration: 1.5
    }}
    className='flex gap-4 items-center overflow-hidden'
    >
      <input 
        ref={fileUploadRef} 
        className='hidden' 
        accept='img/*' 
        type='file' 
        onChange={handleFileChange} />
      {imageLink.value.length !== 0 && (
        <Image
          src={imageLink.value}
          alt='contact-image'
          width={88}
          height={88}
          className='rounded-full'
        />
      )}
      <div className='flex gap-2 overflow-hidden'>
        <Button buttonType='PRIMARY' iconSrc={uploadButtonIcon} iconAlt='plus-icon' onClick={handleFileUpload}>
            <motion.p
              className={cn(
                {'invisible w-0 h-0': isImageSetted},
                'relative'
              )}
              initial={{
                top: -100,
              }}
              animate={{
                top: !isImageSetted ? 0 : -100,
              }}
              transition={{
                duration: 0.5
              }}
            >
              Add image
            </motion.p>
            <motion.p
              className={cn(
                {'invisible w-0 h-0': !isImageSetted},
                'relative'
              )}
              initial={{
                bottom: -100,
              }}
              animate={{
                bottom: isImageSetted ? 0 : -100,
              }}
              transition={{
                duration: 0.5
              }}
            >
              Change Image
            </motion.p>
        </Button>
        <div
          className={cn(
          {'invisible pointer-events-none': !isImageSetted},
        )}>
          <Button buttonType='PRIMARY' iconSrc='/svgs/trash-icon.svg' iconAlt='delete-icon' onClick={handleResetToDefault} />
        </div>
      </div>
    </motion.div>
  )
}

export default AddContactImageUpload