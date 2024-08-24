'use server'

import { PutObjectCommand } from "@aws-sdk/client-s3"
import s3 from "../utils/s3Bucket"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

const ACCEPTED_TYPES = ['image/png', 'image/jpeg', 'image/jpg']
const MAX_SIZE = 1024 * 1024 * 10

type ReturnType = {
  success?: string,
  failure?: string,
}

export async function getSignedUrlForImgUpload(name: string, type: string, size: number): Promise<ReturnType> {
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: name,
    ContentType: type,
    ContentLength: size,
  })

  if (!ACCEPTED_TYPES.includes(type)) {
    return { failure: 'Invalid file type' }
  }

  if (size > MAX_SIZE) {
    return { failure: 'File size too large' }
  }

  const signedUrl = await getSignedUrl(s3, command, {expiresIn: 60})

  return { success: signedUrl }
}