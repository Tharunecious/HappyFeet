import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { Icon } from "@blueprintjs/core";
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {

  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext)

  const logout = () => {
    navigate('/login')
    localStorage.removeItem('token')
    setToken('')
    setCartItems({})
  }

  return (
    <div className='flex items-center justify-between pb-5 font-medium '>

      <Link to='/'>
        <img src={assets.logo} className='w-28' alt="Logo" />
      </Link>

      <ul className='hidden sm:flex gap-5 text-sm text-gray-700 '>

        <NavLink to='/' className='flex flex-col items-center gap-1'>
          <p>HOME</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>

        <NavLink to='/collection' className='flex flex-col items-center gap-1'>
          <p>COLLECTION</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>

        <NavLink to='/about' className='flex flex-col items-center gap-1'>
          <p>ABOUT</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>

        <NavLink to='/contact' className='flex flex-col items-center gap-1'>
          <p>CONTACT</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>

      </ul>

      <div className='flex items-center gap-6'>
        <Icon onClick={() => setShowSearch(true)} icon="search" size={20} color="black" className='cursor-pointer' />

        <div className='group relative'>
          <Icon onClick={() => token ? null : navigate('/login')} icon="user" size={20} color="black" className='cursor-pointer' />
            
          {/* Dropdown Menu */}
          { token && <div className='group-hover:block hidden absolute right-0 pt-4'>
            <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
              <p className='cursor-pointer hover:text-black'>My Profile</p>
              <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
              <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
            </div>

          </div> }
          
        </div>

        <Link to='/cart' className='relative'>
          <Icon icon="shopping-cart" size={20} color="black" className='cursor-pointer' />
          <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white rounded-full text-[8px]'>{getCartCount()}</p>
        </Link>

        <Icon onClick={() => setVisible(true)} icon="menu" size={20} color="black" className='cursor-pointer sm:hidden' />
      </div>


      {/* Sidebar menu for smaller screen */}
      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all z-1 ${visible ? 'w-full h-full' : 'w-0'}`}>
        <div className='flex flex-col text-gray-600'>
          <div onClick={() => setVisible(false)} className='flex items-center gap-1 p-3 cursor-pointer'>
            <Icon icon="redo" size={15} color='black' className='h-4 rotate-180' />
            <p>Back</p>
          </div>

          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/collection'>COLLECTION</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/about'>ABOUT</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/contact'>CONTACT</NavLink>

        </div>
      </div>
    </div>
  );
};

export default Navbar;
