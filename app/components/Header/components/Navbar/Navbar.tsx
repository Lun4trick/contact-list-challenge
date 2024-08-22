'use client'
import Link from 'next/link'
import React, { useEffect, useRef } from 'react'
import NavButtons from './components/NavButtons'

type Props = {
  handleNavHeightChange: (height: number) => void
}

function Navbar({ handleNavHeightChange }: Props) {
  const navBarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (navBarRef.current) {
      const height = navBarRef.current.clientHeight
      handleNavHeightChange(height)
    }
  }, [navBarRef.current?.clientHeight])

  return (
    <div className='max-w-[768px] col-start-2 col-span-1 row-start-2 border-[1px] border-base-60'>
      <nav ref={navBarRef} className='w-full flex justify-between max-w-[768px] sm:p-8 p-4'>
        <Link href='/' className='flex justify-center items-center'>
          <h1>
            Contacts
          </h1>
        </Link>
        <NavButtons />
      </nav>
    </div>
  )
}

export default Navbar