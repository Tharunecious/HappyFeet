import React, { useEffect } from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const Verify = () => {

    const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext)
    const [searchparams, setSearchParams] = useSearchParams()

    const success = searchparams.get('success')
    const orderId = searchparams.get('orderId')
    console.log(success, orderId)

    const verifyPayment = async () => {
        try {
            if(!token){
                return null
            }

            const response = await axios.post(backendUrl + '/api/order/verifyStripe',{success, orderId}, {headers: {token}})

            if(response.data.success){
                setCartItems({})
                toast.success('Order Placed')
                navigate('/orders')
            }
            else{
                navigate('/cart')
            }
        } catch (error) {
            console.log(error)
            toast.error(error.messge)
        }
    }

    useEffect(() => {
        verifyPayment()
    },[token])

  return (
    <div>
        

    </div>
  )
}

export default Verify