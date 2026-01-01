import React from 'react'
import {assets} from '../assets/assets.js'

const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
        <img className='sm:w-[max(10%,80px)] lg:w-[max(5%,100px)] w-[max(1%,120px)] sm-h-30' src={assets.logo} alt="" />
        <button onClick={()=>setToken('')} className='bg-[#cacaca] border-2 border-black text-black font-bold px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>LOGOUT</button>
    </div>
  )
}

export default Navbar