import { Icon } from '@blueprintjs/core'
import React from 'react'

const OurPolicy = () => {
    return (
        <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-10 sm-py-20 text-xs sm:text-sm md:text-base text-gray-700'>
            <div className='flex flex-col items-center'>
                <Icon icon="swap-vertical" size={30} color='black' className='mb-5' />
                <p className='font-semibold'>Easy Exchange Policy</p>
                <p className='text-gray-400'>We offer hassle free exchange policy</p>
            </div>

            <div className='flex flex-col items-center'>
                <Icon icon="endorsed" size={30} color='black' className='mb-5' />
                <p className='font-semibold'>7 Days Return Policy</p>
                <p className='text-gray-400'>We provide 7 days free return policy</p>
            </div>

            <div className='flex flex-col items-center'>
                <Icon icon="headset" size={30} color='black' className='mb-5' />
                <p className='font-semibold'>Best Customer Support</p>
                <p className='text-gray-400'>We provide 24/7 customer support</p>
            </div>
        </div>

        
    )
}

export default OurPolicy