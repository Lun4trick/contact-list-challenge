'use client'
import { useEffect } from "react";
import ContactContainer from "./components/ContactContainer/ContactContainer";
import { useContactsContext } from "./utils/ContactsContex";
import { getContactDetails } from "./serverActions/getContactDetails";

export default function Home() {
  const { contacts, setContacts } = useContactsContext();

  useEffect(() => {
    getContactDetails().then(contacts => {
      setContacts(contacts)
    }).catch(error => {
      console.error('Error fetching contacts:', error)
    })
  }, [])

  return (
    <main className="col-span-1 px-[24px] py-[12px] col-start-2 border-x-[1px] border-base-60 row-start-3">
      {contacts.map(contact => (
        <ContactContainer key={contact.name} contactDetails={contact} />
      ))}
    </main>
  );
}
