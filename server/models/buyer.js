import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const BuyerSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"]
    },

    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        index: true,
    },

    password: {
        type: String,
        required: [true, "Please enter your password"],
        minlength: [8, "Password must be atleast 8 characters"],
    },

    address: {
        type: String,
    },

    wishlist: [
        String
    ],

    avatar: {
        type: String,
    },

    refreshToken: {
        type: String,
    },

    conversationList: {
        type: [Schema.Types.ObjectId], // Array of conversation IDs
        ref: "Conversation",
        default: [] // Initialize as an empty array
    }

}, { timestamps: true })

BuyerSchema.pre('save', async function (next) {
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
BuyerSchema.methods.comparePassword =  function (password) {
    return bcrypt.compareSync(password, this.password)
}

BuyerSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
} 

BuyerSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
} 

export default mongoose.models.Buyer || mongoose.model('Buyer', BuyerSchema);