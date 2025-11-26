import React from 'react'

export default function Navbar() {
  return (
    <>
    <div className='max-w-screen-2xl mx-auto container px-6 md:px-40 shadow-lg h-16 fixed'>
    <div className='flex justify-between items-center p-4'>
      <h1 className='text-2xl cursor-pointer font-bold'>Word<span className='text-3xl text-green-600'>To</span>PDF</h1>
      <h1 className='text-2xl cursor-pointer font-bold hover:scale-120 duration-200'>Home</h1>
    </div>

    </div>
    
    </>
  )
}
