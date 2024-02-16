import Seller from "../models/seller.js";
import dotenv from 'dotenv';
dotenv.config();

export const getSellerInfo = async (req, res, next) => {
    try {
        const sellerId = req.seller?._id;

        const seller = await Seller.findById(sellerId);

        res.status(201).json({
            success: true,
            seller,
        });
    } catch (error) {
        console.log("Error in ")
        return res.status(500).json({
            error: "Internal Server Error",
        })
    }
}