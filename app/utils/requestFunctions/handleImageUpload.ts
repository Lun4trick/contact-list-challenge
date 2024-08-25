import { getSignedUrlForImgUpload } from "@/app/serverActions/getSignedUrlForImgUpload"
import fetchImage from "./fetchImage"
import { uploadImage } from "./uploadImage"

/* This function returns the signed url of the uploaded image, 
not the signed url what we use for uploading the image */

const handleImageUpload = async (file: File, fileName: string) => {
  try {
    const url = await getSignedUrlForImgUpload(fileName, file.type, file.size)

    if (url.failure) {
      throw new Error(url.failure)
    }
    await uploadImage(file, url.success!)
    const signedUrlOfImage = await fetchImage(`${fileName}`)
    
    return signedUrlOfImage
  } catch (error) {
    console.error('Error uploading image:', error)
    throw new Error('Error uploading image')
  }
}

export default handleImageUpload