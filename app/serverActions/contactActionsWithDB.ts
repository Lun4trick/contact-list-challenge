'use server'

import { checkIsEmailFormatCorrect } from "../utils/checkEmailFormat"
import prisma from "../utils/pisma"
import { deleteImage } from "../utils/requestFunctions/deleteImage"

export async function addContactToDB(contact: ContactDetailsType): Promise<void> {
  if (contact.name === '') {
    throw new Error('Name field cannot be empty')
  }

  if (contact.email && !checkIsEmailFormatCorrect(contact.email)) {
    throw new Error('Invalid email format')
  }
  try {
    await prisma.contact.create({
      data: {
        name: contact.name,
        email: contact.email || '',
        phone: contact.phone || '',
        picture: contact.picture,
        pictureName: contact.pictureName
      }
    })
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export async function deleteContactFromDB(id: string, imageName: string): Promise<void> {
  try {
    await deleteImage(imageName)
    await prisma.contact.delete({
      where: {
        id
      }
    })
  } catch (error) {
    console.error('Error deleting contact from DB:', error)
    throw new Error('Error deleting contact from DB')
  }
}

export async function editContactInDB(contact: ContactDetailsType, id: string): Promise<void> {
  try {
    if (contact.name === '') {
      throw new Error('Name field cannot be empty')
    }

    if (contact.email && !checkIsEmailFormatCorrect(contact.email)) {
      throw new Error('Invalid email format')
    }
    await prisma.contact.update({
      where: {
        id
      },
      data: {
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        picture: contact.picture,
        pictureName: contact.pictureName
      }
    })
  } catch (error: any) {
    throw new Error(error.message)
  }
}