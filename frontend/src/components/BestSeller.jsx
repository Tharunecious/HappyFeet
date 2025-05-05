import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {

    const { products } = useContext(ShopContext);

    const [bestSeller, setBestSeller] = useState([]);

    useEffect(() => {
        const bestProducts = products.filter((item) => (item.bestSeller)); 

        setBestSeller(bestProducts.slice(0,10));
    },[products])
  return (
    <div className='my-10'>
        <div className='text-center text-3xl py-8'>
            <Title text1={"BEST"} text2={"SELLER"}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
            Best seller products offer exceptional quality, customer satisfaction, and great value, making them highly recommended.
            </p>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 gap-y-6 pt-10'>
            {
                bestSeller.map((item,index) => (
                    <ProductItem key={index} brand={item.brand} id={item._id} image={item.image} description={item.description} price={item.price}/>
                ))
            }
        </div>
    </div>
  )
}

export default BestSeller