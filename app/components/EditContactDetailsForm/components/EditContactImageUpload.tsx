import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ImageFileUploadType, ImageLinkType } from '@/app/types/imageUploadTypes'
import cn from 'classnames'
import Button from '../../Button'
import fetchImage from '@/app/utils/requestFunctions/fetchImage'
import classNames from 'classnames'
type Props = {
  imageFile: ImageFileUploadType
  imageLink: ImageLinkType
  defaultImage: string | undefined
}

function AddContactImageUpload({ imageFile, imageLink, defaultImage }: Props) {
  const fileUploadRef = useRef<HTMLInputElement>(null)
  const [isImageDefault, setIsImageDefault] = useState<boolean>(imageLink.value === defaultImage)
  const uploadButtonIcon = isImageDefault ? '/svgs/plus-icon.svg' : '/svgs/update-icon.svg'

  useEffect(() => {
    const isDEfault = imageLink.value.includes('Default.png')
    setIsImageDefault(isDEfault)
  }, [imageLink])

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

  const handleResetToDefault = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    imageFile.set(null)
    imageLink.set(await fetchImage())
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
        <motion.div
          initial={{
            scale: 0,
          }}
          animate={{
            scale: 1,
          }}
          transition={{
            duration: 0.2
          }}
          className='rounded-full max-w-[88px] max-h-[88px]'
        >
          <Image
            src={imageLink.value}
            alt='contact-image'
            style={{ objectFit: 'cover' }}
            width={88}
            height={88}
            className='rounded-full max-w-[88px] max-h-[88px]'
          />
        </motion.div>
      )}
      <div className='flex gap-2 overflow-hidden'>
        <Button buttonType='PRIMARY' iconSrc={uploadButtonIcon} iconAlt='plus-icon' onClick={handleFileUpload}>
            <motion.p
              className={cn(
                {'invisible w-0 h-0': !isImageDefault},
                'relative'
              )}
              initial={{
                top: -100,
              }}
              animate={{
                top: isImageDefault ? 0 : -100,
              }}
              transition={{
                duration: 0.5
              }}
            >
              Add image
            </motion.p>
            <motion.p
              className={cn(
                {'invisible w-0 h-0': isImageDefault},
                'relative'
              )}
              initial={{
                bottom: -100,
              }}
              animate={{
                bottom: !isImageDefault ? 0 : -100,
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
          {'invisible pointer-events-none': isImageDefault},
        )}>
          <Button buttonType='PRIMARY' iconSrc='/svgs/trash-icon.svg' iconAlt='delete-icon' onClick={handleResetToDefault} />
        </div>
      </div>
    </motion.div>
  )
}

export default AddContactImageUpload