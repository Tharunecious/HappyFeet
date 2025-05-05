  import React, { useContext } from 'react'
  import { ShopContext } from '../context/ShopContext'
  import { Link } from 'react-router-dom';

  const ProductItem = ({id,brand,image,description,price}) => {

      const {currency} = useContext(ShopContext);

    return (
      <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
          <div className=''>
              <img className='hover:scale-105 transition ease-in-out duration-500 h-40 sm:h-48 z-0' src={image[0]} alt="Loading" />
          </div>
          <p className='pt-3 text-xl font-bold'>{brand}</p>
          <p className='pb-1 text-sm'>{description}</p>
          <p className='text-sm font-medium'>{currency}{price}</p>
      </Link>
    )
  }

  export default ProductItem