import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <Link href={'/'} className='font-bold text-3xl text-orange-600 hover:cursor-pointer'> Codeflix </Link>
  )
}

export default Logo