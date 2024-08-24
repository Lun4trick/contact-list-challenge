'use client'
import { useEffect } from "react";
import ContactContainer from "./components/ContactContainer/ContactContainer";
import { useContactsContext } from "./utils/ContactsContex";
import { useQuery } from "react-query";
import { fetchContacts } from "./utils/requestFunctions/fetchContacts";

export default function Home() {
  const { contacts, setContacts } = useContactsContext();
  const {data, error} = useQuery("contacts", fetchContacts)
  console.log(data)

  useEffect(() => {
    if (data) {
      setContacts(data)
    }
  }, [data, setContacts])

  return (
    <main className="col-span-1 px-[24px] py-[12px] col-start-2 border-x-[1px] border-base-60 row-start-3">
      {contacts.map(contact => (
        <ContactContainer key={contact.name} contactDetails={contact} />
      ))}
    </main>
  );
}
