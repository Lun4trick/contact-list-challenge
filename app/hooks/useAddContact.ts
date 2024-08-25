import { useState } from 'react'

type FormFieldsType = {
  emailField: EditContactFieldType
  phoneField: EditContactFieldType
  nameField: EditContactFieldType
}

function useAddContact(): {nameField: EditContactFieldType, emailField: EditContactFieldType, phoneField: EditContactFieldType} {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const formFields: FormFieldsType = {
    emailField: {
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
    },

    phoneField: {
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
    },

    nameField: {
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
  }

  return formFields
}

export default useAddContact