'use client'
import Link from 'next/link'
import React, { useEffect, useRef } from 'react'
import NavButtons from './components/NavButtons'
import EmptyDesignBox from '../EmptyDesignBox'


function Navbar() {
  const navBarRef = useRef<HTMLDivElement>(null)
  const [navHeight, setNavHeight] = React.useState(0)

  useEffect(() => {
    if (navBarRef.current) {
      const height = navBarRef.current.clientHeight
      setNavHeight(height)
    }
  }, [navBarRef.current?.clientHeight])

  return (
    <>
    <EmptyDesignBox currentHeight={`${navHeight}px`} column='col-start-2' row='row-start-1' />
    <div className='col-start-2 col-span-1 row-start-2 border-[1px] border-base-60'>
      <nav ref={navBarRef} className='w-full flex justify-between sm:p-8 p-4'>
        <Link href='/' className='flex justify-center items-center'>
          <h1>
            Contacts
          </h1>
        </Link>
        <NavButtons />
      </nav>
    </div>
    </>
  )
}

export default Navbar