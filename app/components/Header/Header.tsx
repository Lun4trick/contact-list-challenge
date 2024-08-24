import React from 'react'
import Navbar from './components/Navbar/Navbar'
import HeaderSideButton from './components/HeaderSideButton'
import Image from 'next/image'

function Header() {
  return (
    <header className='grid grid-cols-subgrid col-span-3 max-w-[768px]'>
      <HeaderSideButton position='LEFT'>
        <Image src={"/svgs/back-button-icon.svg"} alt="back-button" height={24} width={24} />
      </HeaderSideButton>
      <Navbar />
      <HeaderSideButton position='RIGHT'>
        <Image src={"/svgs/theme-change-icon.svg"} alt="back-button" height={24} width={24} />
      </HeaderSideButton>
    </header>
  )
}

export default Header