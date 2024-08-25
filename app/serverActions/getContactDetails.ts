'use server'
import prisma from "../utils/pisma";

export async function getContactDetails() {
  const contacts = await prisma.contact.findMany()
  const transformedContacts: ContactDetailsType[] = contacts.map(contact => ({
    id: contact.id,
    name: contact.name,
    phone: contact.phone,
    email: contact.email,
    isFavourite: contact.isFavourite,
    isSilenced: contact.isSilenced,
    picture: contact.picture,
    pictureName: contact.pictureName,
  }))

  return transformedContacts
}