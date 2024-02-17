import mongoose, { Schema } from 'mongoose';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

dotenv.config();

const ProductSchema = new Schema({
    name: {
        type: String,
    },
    price: {
        type: String,
    },
    category: {
        type: String
    },
    status: {
        type: String,
        default: "In stock",
    },
    soldQuantity: {
        type: Number,
        default: 0,
    },
    tags: [String],
    image: {
        public_id: String,
        url: String,
    }
}, { timestamps: true })


export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
