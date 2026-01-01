import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Icon } from '@blueprintjs/core';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem'

const Collection = () => {

  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [brands, setBrands] = useState([]); 
  const [type, setType] = useState([]); 
  const [category, setCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  const toggleBrand = (e) => {

    if (brands.includes(e.target.value)) {
      setBrands(prev => prev.filter(item => item !== e.target.value))
    }
    else {
      setBrands(prev => [...prev, e.target.value])
    }
  }

  const toggleType = (e) => {

    if (type.includes(e.target.value)) {
      setType(prev => prev.filter(item => item !== e.target.value))
    }
    else {
      setType(prev => [...prev, e.target.value])
    }
  }

  const toggleCategory = (e) => {

    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value))
    }
    else {
      setCategory(prev => [...prev, e.target.value])
    }
  }

  const applyFilter = () => {

    let productsCopy = products.slice();

    if(showSearch && search){
      productsCopy = productsCopy.filter(item => item.description.toLowerCase().includes(search.toLowerCase()) || item.brand.toLowerCase().includes(search.toLowerCase()));
    }

    if(brands.length > 0){
      productsCopy = productsCopy.filter(item => brands.includes(item.brand));
    }

    if(type.length > 0){
      productsCopy = productsCopy.filter(item => type.includes(item.subCategory));
    }

    if(category.length > 0){
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    setFilterProducts(productsCopy)
  }

  const sortProduct = () => {
    
    let fpCopy = filterProducts.slice();

    switch(sortType){
      case 'low-high' :
        setFilterProducts(fpCopy.sort((a , b) => (a.price - b.price)));
        break;

      case 'high-low' :
        setFilterProducts(fpCopy.sort((a , b) => (b.price - a.price)));
        break;

      default:
        applyFilter();
        break;
    }
  }

  useEffect(() => {
    setFilterProducts(products)
  }, [])

  useEffect(() => {
    applyFilter();
  },[brands, type, category, search, showSearch, products])

  useEffect(() => {
    sortProduct();
  },[sortType])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

      {/* Filter Options */}
      <div className="min-w-60 sm:sticky sm:top-0 sm:h-screen overflow-y-auto scrollbar-none">

        <p className='my-2 text-xl flex items-center cursor-pointer gap-0 ' onClick={() => setShowFilter(!showFilter)}>FILTERS
          <Icon className={` sm:hidden  ${showFilter ? 'rotate-90' : ''}`} icon='chevron-right' size={18} color='gray' />
        </p>

        {/* Brand Filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>BRANDS</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Nike'}  onChange={toggleBrand} /> Nike
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Adidas'} onChange={toggleBrand} /> Adidas
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Puma'} onChange={toggleBrand} /> Puma
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Reebok'} onChange={toggleBrand} /> Reebok
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Skechers'} onChange={toggleBrand} /> Skechers
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Clark'} onChange={toggleBrand} /> Clark
            </p>
          </div>
        </div>

        {/* Type Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Sneakers'} onChange={toggleType} /> Sneakers
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Loafers'} onChange={toggleType} /> Loafers
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Sandals'} onChange={toggleType} /> Sandals
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Boots'} onChange={toggleType} /> Boots
            </p>
          </div>
        </div>  

        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Men'} onChange={toggleCategory} /> Men
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Women'} onChange={toggleCategory} /> Women
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Kids'} onChange={toggleCategory} /> Kids
            </p>
          </div>
        </div>

      </div>

      {/* Right Side */}
      <div className="flex-1">

        <div className="flex flex-col sm:flex-row justify-between text-base sm:text-2xl mb-4 pt-5 sm:pt-0">
          <Title text1={'ALL'} text2={'COLLECTIONS'} />

          {/* Product Sort */}
          <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
            <option value="relevant">Sort by : Relevant</option>
            <option value="low-high">Sort by : Low to High</option>
            <option value="high-low">Sort by : High to Low</option>
          </select>
        </div>

        {/* Map Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 pt-5">
          {
            filterProducts.map((item, index) => (
              <ProductItem key={index} brand={item.brand} id={item._id} image={item.image} description={item.description} price={item.price} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Collection;
