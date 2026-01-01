import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'

const List = ({token}) => {

  const [list,setList] = useState([])

  const fetchList = async() => {

    try {
      
      const response = await axios.get(backendUrl + "/api/product/list")

      if(response.data.success){
        setList(response.data.products)
      }

      else{
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message, {autoClose:1500})
    }
  }

  const removeProduct = async (id) => {
    try {
      
      const response = await axios.post(backendUrl + "/api/product/remove", {id}, {headers:{token}})

      if(response.data.success){
        toast.success(response.data.message, {autoClose:1500})
        await fetchList()
      }
      else{
        toast.error(response.data.message, {autoClose:1500})
      }
      
    } catch (error) {
      console.log(error)
      toast.error(error.message, {autoClose:1500})
    }
  }

  useEffect(()=>{
    fetchList()
  },[])

  return (
    <>
        <p className='mb-2'>All Products List</p>
        <div className='flex flex-col gap-2'>

          {/* ----List Table Title---- */}

          <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] item-center py-1 px-2 border bg-gray-300 text-sm text-black'>
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b className='text-center'>Action</b>
          </div>

          {/* ----Product List---- */}

          {
            list.reverse().map((item, index) => (

              <div className='grid grid-cols-[1fr_1fr_1fr_1fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm text-left' key={index}>
                <img className='sm:w-22 w-12 sm:h-16 h-8' src={item.image[0]} alt="Loading" />
                <p>{item.description}</p>
                <p>{item.subCategory} ({item.category})</p>
                <p>{currency} {item.price}</p>
                <p onClick={() => removeProduct(item._id)} className='text-right sm:text-center cursor-pointer text-lg'>X</p>
              </div>
            ))
          }
        </div>
    </>
  )
}

export default List