import { useEffect, useState } from 'react'
import { ImageFileUploadType, ImageLinkType } from '../types/imageUploadTypes'

function useImageUpload(): {
  imageFile: ImageFileUploadType, 
  imageLink: ImageLinkType
  setToDefault: () => void
} {
  const [imageFileValue, setImageFileValue] = useState<File | null>(null)
  const [imageLinkValue, setImageLinkValue] = useState<string>('')

  useEffect(() => {
    if (imageFileValue) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImageLinkValue(reader.result as string)
      }

      reader.readAsDataURL(imageFileValue)
    }
  }, [imageFileValue])

  const imageFile = {
    value: imageFileValue,
    set: setImageFileValue,
  }

  const imageLink = {
    value: imageLinkValue,
    set: setImageLinkValue,
  }

  const setToDefault = () => {
    setImageFileValue(null)
  }

  return { imageFile, imageLink, setToDefault }
}

export default useImageUpload