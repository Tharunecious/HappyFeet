import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Add = ({ token }) => {

  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)

  const [brand, setBrand] = useState("Nike")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("Men")
  const [subCategory, setSubCategory] = useState("Sneakers")
  const [price, setPrice] = useState("")
  const [sizes, setSizes] = useState([])
  const [bestSeller, setBestSeller] = useState(false)

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    try {

      const formData = new FormData()

      formData.append("brand", brand)
      formData.append("description", description)
      formData.append("category", category)
      formData.append("subCategory", subCategory)
      formData.append("price", price)
      formData.append("sizes", JSON.stringify(sizes))
      formData.append("bestSeller", bestSeller)

      image1 && formData.append("image1", image1)
      image2 && formData.append("image2", image2)

      const response = await axios.post(backendUrl + "/api/product/add", formData, { headers: { token } })

      if (response.data.success) {
        toast.success(response.data.message, { autoClose: 1500 })
        setBrand('Nike')
        setDescription('')
        setCategory('Men')
        setSubCategory('Sneakers')
        setPrice('')
        setSizes([])
        setImage1(false)
        setImage2(false)
      } else {
        toast.error(response.data.message, { autoClose: 1500 })
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message, { autoClose: 1500 })
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      <div>
        <p className='mb-2'>Upload Image</p>

        <div className='flex gap-5 '>
          <label htmlFor="image1" className="block sm:w-40 w-30 h-40  items-center justify-center overflow-hidden cursor-pointer">
            <img className='w-40 object-contain h-full' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="Loading" />
            <input onChange={(e) => setImage1(e.target.files[0])} type='file' id='image1' hidden required />
          </label>

          <label htmlFor="image2" className="block sm:w-40 w-30 h-40   items-center justify-center overflow-hidden cursor-pointer">
            <img className='w-40 object-contain  h-full' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="Loading" />
            <input onChange={(e) => setImage2(e.target.files[0])} type='file' id='image2' hidden required />
          </label>
        </div>
      </div>

      <div className='w-full'>
        <div>
          <p>Select Brand</p>
          <select onChange={(e) => setBrand(e.target.value)} value={brand} className='sm:w-1/4 w-full px-3 py-2'>
            <option value="Nike">Nike</option>
            <option value="Adidas">Adidas</option>
            <option value="Puma">Puma</option>
            <option value="Reebok">Reebok</option>
            <option value="Skechers">Skechers</option>
            <option value="Clark">Clark</option>
          </select>
        </div>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product Description</p>
        <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' type='text' placeholder='Enter product description' required />
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>

        <div>
          <p className='mb-2'>Product Category</p>
          <select onChange={(e) => setCategory(e.target.value)} value={category} className='w-full px-3 py-2' >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>Sub-Category</p>
          <select onChange={(e) => setSubCategory(e.target.value)} value={subCategory} className='w-full px-3 py-2'>
            <option value="Sneakers">Sneakers</option>
            <option value="Loafers">Loafers</option>
            <option value="Sandals">Sandals</option>
            <option value="Boots">Boots</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>Product Price</p>
          <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[180px]' type='Number' min={0} placeholder='Enter product price' required />
        </div>

      </div>

      <div>
        <p className='mb-2'>Product Size</p>
        <div className='flex gap-5 text-black'>
          <div onClick={() => setSizes(prev => prev.includes("5") ? prev.filter(item => item !== "5") : [...prev, "5"])}>
            <p className={`${sizes.includes("5") ? "bg-[#cacaca] border-1 border-black" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>5</p>
          </div>

          <div onClick={() => setSizes(prev => prev.includes("6") ? prev.filter(item => item !== "6") : [...prev, "6"])}>
            <p className={`${sizes.includes("6") ? "bg-[#cacaca] border-1 border-black" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>6</p>
          </div>

          <div onClick={() => setSizes(prev => prev.includes("7") ? prev.filter(item => item !== "7") : [...prev, "7"])}>
            <p className={`${sizes.includes("7") ? "bg-[#cacaca] border-1 border-black" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>7</p>
          </div>

          <div onClick={() => setSizes(prev => prev.includes("8") ? prev.filter(item => item !== "8") : [...prev, "8"])}>
            <p className={`${sizes.includes("8") ? "bg-[#cacaca] border-1 border-black" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>8</p>
          </div>

          <div onClick={() => setSizes(prev => prev.includes("9") ? prev.filter(item => item !== "9") : [...prev, "9"])}>
            <p className={`${sizes.includes("9") ? "bg-[#cacaca] border-1 border-black" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>9</p>
          </div>

          <div onClick={() => setSizes(prev => prev.includes("10") ? prev.filter(item => item !== "10") : [...prev, "10"])}>
            <p className={`${sizes.includes("10") ? "bg-[#cacaca] border-1 border-black" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>10</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("11") ? prev.filter(item => item !== "11") : [...prev, "11"])}>
            <p className={`${sizes.includes("11") ? "bg-[#cacaca] border-1 border-black" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>11</p>
          </div>
        </div>
      </div>

      <div className='flex gap-2 mt-2'>
        <input onChange={() => setBestSeller(prev => !prev)} checked={bestSeller} type="checkbox" id="bestseller" />
        <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
      </div>

      <button onClick={(e) => {
        e.target.classList.replace("bg-slate-950", "bg-slate-500");
        setTimeout(() => {
          e.target.classList.replace("bg-slate-500", "bg-slate-950");
        }, 200);
      }} type='submit' className='w-28 py-3 mt-4 bg-slate-950 font-bold text-white rounded-2xl cursor-pointer'>ADD</button>


    </form>
  )
}

export default Add