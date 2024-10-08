import { useCallback, useEffect, useState } from 'react'
import { formatToPhoneNumber } from '../utils/formatToPhoneNumber'

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
          const formatedValue = formatToPhoneNumber(value)
            setPhone(formatedValue)
        }
  
        if (e) {
          const formatedValue = formatToPhoneNumber(e.target.value)
          setPhone(formatedValue)
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