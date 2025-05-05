import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <div>
            <div className='flex flex-col sm:grid grid-cols-[2fr_1fr_1fr] gap-14 my-5 mt-20  text-sm'>
                <div >
                    <img src={assets.logo} alt="" className=' w-32' />
                    <p className='w-full md:w-2/3 text-gray-600 text-justify'>
                        HappyFeet offers stylish, high-quality footwear that combines fashion and comfort. We provide a seamless shopping experience with trendy designs and durable materials, ensuring every step you take is confident and comfortable
                    </p>
                </div>

                <div>
                    <p className='text-xl font-medium mb-8'>COMPANY</p>
                    <ul className='flex flex-col text-gray-600  gap-3'>
                        <li className='hover:text-gray-950'>Home</li>
                        <li className='hover:text-gray-950'>About us</li>
                        <li className='hover:text-gray-950'>Delivery</li>
                        <li className='hover:text-gray-950'>Privacy policy</li>
                    </ul>
                </div>

                <div>
                    <p className='text-xl font-medium mb-8'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-3 text-gray-600'>
                        <li className='hover:text-gray-950'>+91 63740 32815</li>
                        <li className='hover:text-gray-950'>happyfeet@gmail.com</li>
                    </ul>
                </div>
            </div>

            <div>
                <hr />
                <p className='py-5 text-sm text-center'>Copyright 2025 happyfeet@gmail.com - All Right Reserved.</p>
            </div>


        </div>
    )
}

export default Footer