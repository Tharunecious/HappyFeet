import React, { useState, useContext } from 'react';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';

const Return = () => {
    const [orderNumber, setOrderNumber] = useState('');
    const [productId, setProductId] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [returnReason, setReturnReason] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [refundOption, setRefundOption] = useState('');
    const [notes, setNotes] = useState('');

    const { backendUrl, token } = useContext(ShopContext);

    const onSubmitHandler = async (e) => {
        e.preventDefault();


        try {
            const formData = new FormData();
            formData.append("orderNumber", orderNumber);
            formData.append("productId", productId);
            formData.append("email", email);
            formData.append("contact", contact);
            formData.append("returnReason", returnReason);
            formData.append("imageFile", imageFile);
            formData.append("refundOption", refundOption);
            formData.append("notes", notes);

            const response = await axios.post(backendUrl + '/api/order/userReturn', formData, {headers: {token}});
            if(response.data.success){
                setOrderNumber('')
                setProductId('')
                setEmail('')
                setContact('')
                setReturnReason('')
                setImageFile('')
                setRefundOption('')
                setNotes('')

                toast.success(response.data.message)
            }else{
                toast.error(response.data.message)
            }

           
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className="w-full max-w-3xl mx-auto bg-white p-8 shadow-md rounded-xl text-lg space-y-6">
            <h2 className="text-2xl font-bold text-center text-gray-800">Return Product</h2>

            <div className="space-y-4">
                <input type="text" value={orderNumber} onChange={e => setOrderNumber(e.target.value)} placeholder="Order Number" className="w-full border border-gray-300 rounded-md p-3" required />
                <input type="text" value={productId} onChange={e => setProductId(e.target.value)} placeholder="Product ID" className="w-full border border-gray-300 rounded-md p-3" required />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Your Email" className="w-full border border-gray-300 rounded-md p-3" required />
                <input type="tel" value={contact} onChange={e => setContact(e.target.value)} placeholder="Contact Number" className="w-full border border-gray-300 rounded-md p-3" required />
            </div>

            <div>
                <label className="block mb-1 font-medium text-gray-700">Return Reason</label>
                <select value={returnReason} onChange={e => setReturnReason(e.target.value)} className="w-full border border-gray-300 rounded-md p-3" required>
                    <option value="">Select a reason</option>
                    <option value="damaged">Damaged product</option>
                    <option value="wrong-item">Wrong item received</option>
                    <option value="size-issue">Size issue</option>
                    <option value="changed-mind">Changed my mind</option>
                    <option value="other">Other</option>
                </select>
            </div>

            <div>
                <label className="block mb-1 font-medium text-gray-700">Upload a photo</label>
                <input type="file" onChange={e => setImageFile(e.target.files[0])} accept="image/*" className="w-full border border-gray-300 rounded-md p-3" required />
            </div>

            <div>
                <label className="block mb-2 font-medium text-gray-700">Choose Refund Method</label>
                <div className="flex gap-6">
                    <label className="flex items-center gap-2">
                        <input type="radio" checked={refundOption === "refund"} onChange={e => setRefundOption(e.target.value)} name="method" value="refund" className="accent-black" required />
                        Refund
                    </label>
                    <label className="flex items-center gap-2">
                        <input type="radio" checked={refundOption === "replacement"} onChange={e => setRefundOption(e.target.value)} name="method" value="replacement" className="accent-black" />
                        Replacement
                    </label>
                </div>
            </div>

            <div>
                <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Additional notes" className="w-full border border-gray-300 rounded-md p-3 h-24 resize-none" required />
            </div>

            <div className="text-center">
                <button type="submit" className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-900">
                    Submit Return Request
                </button>
            </div>

            <p className="text-sm text-gray-500 text-center mt-4">
                Refunds are processed within 5-7 business days. Returns accepted within 15 days of delivery.
            </p>
        </form>
    );
};

export default Return;
