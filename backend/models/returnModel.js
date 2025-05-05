import mongoose from "mongoose";

const returnProductSchema = new mongoose.Schema({
    orderNumber: { type: String, required: true },
    productId: { type: String, required: true }, 
    email: { type: String, required: true },
    contact: { type: Number, required: true },  
    returnReason: { type: String, required: true },
    imageFile: { type: String, required: true }, 
    refundOption: { type: String, required: true },
    notes: { type: String, required: true },
    date: { type: String, required: true, default: () => new Date().toISOString() }
});

const returnModel = mongoose.models.returnProduct || mongoose.model("returnProduct", returnProductSchema);

export default returnModel;
