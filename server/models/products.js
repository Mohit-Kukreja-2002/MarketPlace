import mongoose, { Schema } from 'mongoose';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

dotenv.config();

const ProductSchema = new Schema({
    productName: {
        type: String,
        required: [true, "Please enter the product name"]
    },
    price: {
        type: String,
        required: [true, "Please enter the price of product"]
    },
    category: {
        type: String,
    },
    status: {
        type: String,
        default: "In stock",
    },
    soldQuantity: {
        type: Number,
        default: 0,
    },
    discount: {
        type: Number,
        default: 0,
    },
    tags: {
        type: String
    },
    image: {
        public_id: String,
        url: String,
    },
    description: {
        type: String,
        required: [true, "Please specify a description for the product"]
    },
}, { timestamps: true })


export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
