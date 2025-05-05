import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {

    const { products } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(() => {
        setLatestProducts(products.reverse().slice(0,10));
    },[products]);

    
  return (
    <div className='my-10'>
        <div className='text-center py-0 text-3xl'>
            <Title text1={'LATEST'} text2={'COLLECTIONS'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
            Explore our latest collections of trendy and versatile products, crafted for style, comfort, and quality.
            </p>
        </div>

        {/* Rendering products */}
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 gap-y-6 pt-10'>
            {
                
                latestProducts.map((item, index) => (
                    <ProductItem key={index} brand={item.brand} id={item._id} image={item.image} description={item.description} price={item.price}/>
                ))
                
            }
        </div>
    </div>
  )
}

export default LatestCollection;