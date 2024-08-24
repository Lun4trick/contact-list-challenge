import prisma from "./pisma";

export async function getContactDetails() {
  const contacts = await prisma.contact.findMany()
  const transformedContacts: ContactDetailsType[] = contacts.map(contact => ({
    name: contact.name,
    phone: contact.phone,
    picture: contact.picture
  }))

  return transformedContacts
}