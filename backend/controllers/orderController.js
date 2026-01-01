import { v2 as cloudinary } from 'cloudinary'
import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js'
import returnModel from '../models/returnModel.js'
import Stripe from 'stripe'
import razorpay from 'razorpay'

//global variables
const currency = 'inr'
const deliveryCharge = 10

//gatway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

const userReturn = async (req, res) => {

    try {

        const { orderNumber, productId, email, contact, returnReason, refundOption, notes } = req.body

        const imageFile = req.files.imageFile && req.files.imageFile[0]

        let imageUrl = '';

        if (imageFile) {
            const uploadResult = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' });
            imageUrl = uploadResult.secure_url;
        }

        const returnProductData = {
            orderNumber,
            productId,
            email,
            contact,
            returnReason,
            refundOption,
            notes,
            imageFile: imageUrl,
            date: Date.now()
        }

        const orderData = await orderModel.findById(orderNumber)

        if (!orderData) {
            return res.json({ success: false, message: "Order not found" });
        }

        const productNo = orderData.items.find(item => item._id.toString() === productId.toString());

        if (!productNo) {
            return res.json({ success: false, message: "Product not found" });
        }

        const requiredTime = Date.now() - orderData.date

        if (orderData && productNo && requiredTime < (7 * 24 * 60 * 60 * 1000)) {
            const returnProduct = new returnModel(returnProductData);
            await returnProduct.save();

            res.json({ success: true, message: "Return Request Submitted" });
        } else {
            res.status(400).json({ success: false, message: "Return not allowed" });
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//Placing orders COD method
const placeOrder = async (req, res) => {

    try {

        const { userId, items, amount, address } = req.body

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()

        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, { cartData: {} })

        res.json({ success: true, message: "Order Placed" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

//Placing orders using Stripe method
const placeOrderStripe = async (req, res) => {

    try {

        const { userId, items, amount, address } = req.body
        const { origin } = req.headers

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now()

        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const line_items = items.map((item) => ({   
            price_data: {
                currency: currency,
                product_data: {
                    name: item.description
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: 'Delivery Charges'
                },
                unit_amount: deliveryCharge * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment',
        })

        res.json({ success: true, session_url: session.url })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//Verify Stripe
const verifyStripe = async (req, res) => {

    const { orderId, success, userId } = req.body

    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true })
            await userModel.findByIdAndUpdate(userId, { cartData: {} })
            res.json({ success: true })
        }
        else {
            await orderModel.findByIdAndDelete(orderId)
            res.json({ success: false })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//Placing orders using RazorPay method
const placeOrderRazorpay = async (req, res) => {

    try {

        const { userId, items, amount, address } = req.body

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "Razorpay",
            payment: false,
            date: Date.now()

        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const options = {
            amount: amount * 100,
            currency: currency.toUpperCase(),
            receipt: newOrder._id.toString()
        }

        await razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error)
                return res.json({ success: false, message: error })
            }

            res.json({ success: true, order })
        })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const verifyRazorpay = async (req, res) => {
    try {

        const { userId, razorpay_order_id } = req.body

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        if (orderInfo.status === "paid") {
            await orderModel.findByIdAndUpdate(orderInfo.receipt, { payment: true })
            await userModel.findByIdAndUpdate(userId, { cartData: {} })

            res.json({ success: true, message: "Payment Successful" })
        } else {
            res.json({ success: false, message: "Payment Failed" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//All Orders data for Admin panel
const allOrders = async (req, res) => {

    try {

        const orders = await orderModel.find({})
        res.json({ success: true, orders })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })

    }
}

//User Order data for Frontend
const userOrders = async (req, res) => {
    try {

        const { userId } = req.body

        const orders = await orderModel.find({ userId })
        res.json({ success: true, orders })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//Update Order status from Admin panel
const updateStatus = async (req, res) => {
    try {

        const { orderId, status } = req.body

        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({ success: true, message: "Status Updated" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

export { placeOrder, placeOrderStripe, userReturn, verifyStripe, placeOrderRazorpay, verifyRazorpay, allOrders, userOrders, updateStatus }