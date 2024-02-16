import mongoose, { Schema } from 'mongoose';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

dotenv.config();

const SellerSchema = new Schema({
    shopName: {
        type: String,
    },
    shopLocation: {
        type: String,
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true
    },
    password: {
        type: String,
        minlength: [8, "Password must be atleast 8 characters"],
    },
    products: [{
        name: {
            type: String,
        },
        price: {
            type: String,
        },
        category: {
            type: String
        },
        status:{
            type: String,
        },
        soldQuantity: {
            type: Number
        },
        tags: [String],
    }],
    avatar: {
        public_id: String,
        url: String,
    },
    upi: { 
        type: String 
    },
    phoneNumber:{
        type: String,
    }
    
},{timestamps:true})

SellerSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    try {
        this.password = await bcrypt.hash(this.password, 10);
        return next();
    } catch (err) {
        return next(err);
    }
});

// Compare password method
SellerSchema.methods.comparePassword = function (enteredPassword) {
    return bcrypt.compareSync(enteredPassword, this.password)
}

export default mongoose.models.Seller || mongoose.model('Seller', SellerSchema);
