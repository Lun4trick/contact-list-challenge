import React from 'react'
import { motion } from "framer-motion"

type Props = {
  currentHeight: string
  column: string
  row: string
}

function EmptyDesignBox({ currentHeight, column, row }: Props) {
  return (
    <motion.div 
    initial={{
      height: '0px'
    }}
    animate={{
        height: currentHeight
      }}
    className={`max-h-full border-x-[1px] border-base-60 ${column} ${row}`}/>
  )
}

export default EmptyDesignBox