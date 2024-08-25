import { useState } from 'react'

function useAddContact(): AddContactFieldType[] {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const nameField: AddContactFieldType = {
    label: 'Name',
    placeholder: 'Jamie Wright',
    value: name,
    onChange: (e?: React.ChangeEvent<HTMLInputElement>, value?: string) => {
      if (value) {
        setName(value)
      }

      if (e) {
        setName(e.target.value)
      }
    },
  }

  const emailField: AddContactFieldType = {
    label: 'Email address',
    placeholder: 'jamie.wright@mail.com',
    value: email,
    onChange: (e?: React.ChangeEvent<HTMLInputElement>, value?: string) => {
      if (value) {
        setEmail(value)
      }

      if (e) {
        setEmail(e.target.value)
      }
    },
  }

  const phoneField: AddContactFieldType = {
    label: 'Phone number',
    placeholder: '+01 234 5678',
    value: phone,
    onChange: (e?: React.ChangeEvent<HTMLInputElement>, value?: string) => {
      if (value) {
        setPhone(value)
      }

      if (e) {
        setPhone(e.target.value)
      }
    },
  }

  return [nameField, emailField, phoneField]
}

export default useAddContact