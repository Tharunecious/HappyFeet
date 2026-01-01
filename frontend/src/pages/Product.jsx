import React, { useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { Icon } from '@blueprintjs/core';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {

  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  const fetchProductData = async () => {

    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        // console.log(item);
        setImage(item.image[0]);
        return null;
      }
    })
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProductData();
  }, [productId, products])

  return productData ? (
    <div className='border-t-2 sm:pt-10 pt-5 transition-opacity ease-in duration-500 opacity-100'>

      {/* Product Data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

        {/* Product Images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>

          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-evenly sm:justify-normal sm:w-[18.7%]'>
            {
              productData.image.map((item, index) => (
                <img onClick={() => setImage(item)} src={item} key={index} alt='Loading' className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer border-4 border-gray-100 rounded-3xl' />
              ))
            }
          </div>

          <div className="w-full sm:w-[80%] border-4 border-gray-100 h-[40vh] sm:h-[70vh] flex justify-center items-center overflow-hidden">
            <img className="w-full h-full object-contain" src={image} alt='Loading' />
          </div>

        </div>

        {/* Product info */}
        <div className='flex-1'>

          <div className='sm:block flex justify-between'>

            <h1 className='font-medium text-2xl mt-2'>{productData.brand}</h1>

            <div className='flex items-center gap-1 mt-2'>
              <Icon icon="star" size={20} color='#f97316' />
              <Icon icon="star" size={20} color='#f97316' />
              <Icon icon="star" size={20} color='#f97316' />
              <Icon icon="star" size={20} color='#f97316' />
              <Icon icon="star-empty" size={20} color='#f97316' />
              <p className='pl-2'>(122)</p>
            </div>
          </div>

          <p className='mt-2 sm:mt-5 text-3xl font-medium'>{currency}{productData.price}</p>

          <p className='mt-0 sm:mt-5 text-gray-500  md:w-4/5'>{productData.description}</p>

          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {
                productData.sizes.map((item, index) => (
                  <button onClick={() => setSize(item)} className={`border-2 py-2 px-4 bg-gray-100 ${item === size ? 'border-gray-900 bg-orange-500 text-white' : ''}`} key={index}>{item}</button>
                ))
              }
            </div>
          </div>

          <button
            onClick={() => {
              addToCart(productData._id, size);
              setSize('');
            }}
            className='bg-black text-white px-8 py-3 text-sm active:bg-gray-900'>ADD TO CART</button>

          <hr className='mt-8 sm:w-4/5' />

          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original Product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Display Related Products */}

      <RelatedProducts subCategory={productData.subCategory} productId={productData._id} />



    </div>
  ) : <div className='opacity-0'></div>
}

export default Product