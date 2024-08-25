import React from 'react'

type Props = {
  field: EditContactFieldType
}

function AddContactInputField({ field }: Props) {
  return (
    <div className='flex flex-col gap-1 w-full z-20'>
      <p className='opacity-medium'>
        {field.label}
      </p>
      <input
        className='px-3 py-2 border-[1px] border-base-60 rounded-md bg-base-80 placeholder:opacity-low'
        type='text'
        placeholder={field.placeholder}
        value={field.value}
        onChange={field.onChange}
      />
    </div>
  )
}

export default AddContactInputField