import { NextResponse } from "next/server"

export async function uploadImage(file: File, signedUrl: string): Promise<NextResponse> {
  try {
    const res = await fetch(signedUrl, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type,
      },
    })

    if (!res.ok) {
      throw new Error('Failed to upload image')
    } else {
      return new NextResponse('Image uploaded successfully')
    }
  } catch (error) {
    console.error('Error uploading image:', error)
    throw new Error('Error uploading image')
  }
}