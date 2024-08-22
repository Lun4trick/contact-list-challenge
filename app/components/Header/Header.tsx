'use client'
import React from 'react'
import Navbar from './components/Navbar/Navbar'
import HeaderSideButton from './components/HeaderSideButton'
import Image from 'next/image'
import EmptyDesignBox from './components/EmptyDesignBox'

function Header() {
  const [navHeight, setNavHeight] = React.useState(0)
  const handleNavHeightChange = (height: number) => setNavHeight(height)
  return (
    <header className='grid grid-cols-subgrid col-span-3'>
      <EmptyDesignBox currentHeight={`${navHeight}px`} column='col-start-2' row='row-start-1' />
      <HeaderSideButton position='LEFT'>
        <Image src={"/svgs/back-button-icon.svg"} alt="back-button" height={24} width={24} />
      </HeaderSideButton>
      <Navbar handleNavHeightChange={handleNavHeightChange}/>
      <HeaderSideButton position='RIGHT'>
        <Image src={"/svgs/theme-change-icon.svg"} alt="back-button" height={24} width={24} />
      </HeaderSideButton>
    </header>
  )
}

export default Header