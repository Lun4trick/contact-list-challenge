'use server'

import prisma from "../utils/pisma"

export async function addContactToDB(contact: ContactDetailsType): Promise<void> {
  try {
    await prisma.contact.create({
      data: {
        name: contact.name,
        email: contact.email || '',
        phone: contact.phone || '',
        picture: contact.picture 
      }
    })
  } catch (error) {
    console.error('Error adding contact to DB:', error)
    throw new Error('Error adding contact to DB')
  }
}