'use client'
import { useEffect } from "react";
import ContactContainer from "./components/ContactContainer/ContactContainer";
import { useContactsContext } from "./utils/ContactsContex";
import { getContactDetails } from "./serverActions/getContactDetails";
import PopUpModal from "./components/PopUpModal/PopUpModal";
import EditContactDetails from "./components/AddContactForm/EditContactDetails";

export default function Home() {
  const { contacts, setContacts, isContactEditOpen, setIsContactEditOpen, editableContactId} = useContactsContext();

  useEffect(() => {
    getContactDetails().then(contacts => {
      setContacts(contacts.sort((a, b) => a.name.localeCompare(b.name)))
    }).catch(error => {
      console.error('Error fetching contacts:', error)
    })
  }, [])

  return (
    <main className="col-span-1 px-[24px] py-[12px] col-start-2 border-x-[1px] border-base-60 row-start-3">
      {contacts.map(contact => (
        <ContactContainer key={contact.name} contactDetails={contact} />
      ))}
      { isContactEditOpen &&
        <PopUpModal closeModal={() => setIsContactEditOpen(prev => !prev)}>
          <EditContactDetails idToEdit={editableContactId} closeModal={() => setIsContactEditOpen(false)} />
        </PopUpModal>}
    </main>
  );
}
