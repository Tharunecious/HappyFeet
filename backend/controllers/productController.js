import { v2 as cloudinary } from 'cloudinary'
import productModel from '../models/productModel.js'


//function for add product
const addProduct = async (req, res) => {

    try {

        const { brand, description, price, category, subCategory, bestSeller } = req.body

        let sizes = req.body.sizes;

        if (typeof sizes === "string") {
            sizes = JSON.parse(sizes);
        }

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]

        const images = [image1, image2].filter((item) => item !== undefined)

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' })
                return result.secure_url
            })
        )

        const timestamp = Date.now()
        const date = new Date(timestamp)
        const indiaTime = date.toLocaleString('en-IN', {
            timeZone: 'Asia/Kolkata',
        });

        if (!Array.isArray(sizes) || sizes.length === 0) {
            return res.json({ success: false, message: "Select Product Size" });
        }

        const productData = {
            brand,
            description,
            price: Number(price),
            category,
            subCategory,
            sizes,
            bestSeller: bestSeller === "true" ? true : false,
            image: imagesUrl,
            date: indiaTime
        }

        const product = new productModel(productData)
        await product.save()

        // console.log(productData)
        res.json({ success: true, message: "Product Added Successfully" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

//function for list products
const listProducts = async (req, res) => {

    try {

        const products = await productModel.find({})
        res.json({ success: true, products })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//function for remove product
const removeProduct = async (req, res) => {

    try {

        await productModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Product Deleted Successfully" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//function for single product info
const singleProduct = async (req, res) => {

    try {

        const { productId } = req.body
        const product = await productModel.findById(productId)
        res.json({ success: true, product })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { addProduct, listProducts, removeProduct, singleProduct }