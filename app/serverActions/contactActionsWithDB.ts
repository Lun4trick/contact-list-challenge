'use server'

import prisma from "../utils/pisma"
import { deleteImage } from "../utils/requestFunctions/deleteImage"

export async function addContactToDB(contact: ContactDetailsType): Promise<void> {
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
  } catch (error) {
    console.error('Error adding contact to DB:', error)
    throw new Error('Error adding contact to DB')
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
  } catch (error) {
    console.error('Error editing contact in DB:', error)
    throw new Error('Error editing contact in DB')
  }
}