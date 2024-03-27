import Products from "../models/products.js";
import Seller from "../models/seller.js";
import dotenv from 'dotenv';
import { redis } from "../utils/redis.js";
dotenv.config();

export const getSellerInfo = async (req, res) => {
    try {
        const sellerId = req.seller?._id;

        const seller = await Seller.findById(sellerId).select('-password');;

        res.status(200).json({
            success: true,
            seller,
        });
    } catch (error) {
        console.log("Error in getSellerInfo: " + error.message);
        return res.status(500).json({
            error: "Internal Server Error",
        })
    }
}

export const updateSellerInfo = async (req, res) => {
    try {
        const sellerId = req.seller?._id;
        const { data } = req.body;
        // console.log(data)
        const updatedSeller = await Seller.findByIdAndUpdate(
            sellerId,
            {
                $set: data
            }, // Update the seller document with the data object
            { new: true } // Return the modified document rather than the original
        );

        // console.log(updatedSeller)

        if (updatedSeller.shopName && updatedSeller.shopOwner && updatedSeller.shopLocation && updatedSeller.upi &&
            updatedSeller.phoneNumber) {
            // console.log("here")
            updatedSeller.profileCompleted = true;
            await updatedSeller.save();
        }

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            seller: updatedSeller,
        });
    } catch (error) {
        console.log("Error in updateSellerInfo: " + error.message);
        return res.status(500).json({
            error: "Internal Server Error",
        })
    }
}

export const addProduct = async (req, res) => {
    try {
        const {data} = req.body;

        const sellerId = req.seller?._id;
        const seller = await Seller.findById(sellerId);
        
        // console.log(data)
        data.creator = seller._id

        try {
            const product = await Products.create(data);
            if (product) seller.products.push(product._id);
            await seller.save();
            // console.log(product)

            // Delete cached data in Redis
            await Promise.all([
                redis.del("categorised_products"),
                redis.del("clothes"),
                redis.del("footwears"),
                redis.del("accessories"),
                redis.del("featuredProducts"),
                redis.del("categories"),
            ]);
            

            res.status(200).json({
                success: true,
                message: "Product added successfully",
                product,
            });
        } catch (error) {
            console.log("Error adding product: ",error);
            res.status(400).send({
                success: false,
                error: error.message
            });
        }
    } catch (error) {
        console.log("Error in addProduct: " + error.message);
        return res.status(500).json({
            success: false,
            error: "Internal Server Error",
        })
    }
}

export const editProduct = async (req, res) => {
    try {

        const { data } = req.body;

        const productId = req.params.id;

        const sellerId = req.seller?._id;
        const seller = await Seller.findById(sellerId);

        let productFound = false;
        for (let i = 0; i < seller.products.length; i++) {
            if (seller.products[i] === productId) {
                productFound = true;
            }
        }

        if (!productFound) {
            return res.status(400).json({
                success: false,
                error: "You are not authorized to edit this product"
            })
        }

        const product = await Products.findByIdAndUpdate(
            productId,
            {
                $set: data,
            },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            product,
        });

    } catch (error) {
        console.log("Error in editProduct: " + error.message);
        return res.status(500).json({
            success: true,
            error: "Internal Server Error",
        })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        const sellerId = req.seller?._id;
        const seller = await Seller.findById(sellerId);

        let productFound = false, productIndex;
        for (let i = 0; i < seller.products.length; i++) {
            if (seller.products[i] === productId) {
                productFound = true;
                productIndex = i;
            }
        }

        if (!productFound) {
            return res.status(400).json({
                success: false,
                error: "You are not authorized to delete this product"
            });
        }

        await Products.findByIdAndDelete(productId)

        // Remove the product from the seller's products array
        seller.products.splice(productIndex, 1);

        // Save the updated seller document
        await seller.save();

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });
    } catch (error) {
        console.log("Error in deleteProduct: " + error.message);
        return res.status(500).json({
            success: false,
            error: "Internal Server Error",
        })
    }
}

export const getSellerProducts = async (req, res) => {
    try {
        const sellerId = req.seller?._id;
        const seller = await Seller.findById(sellerId);

        const sellerProducts = await Products.find(
            {
                _id: {
                    $in: seller.products
                }
            }
        );

        return res.status(200).json({
            success: true,
            sellerProducts
        });

    } catch (error) {
        console.log("Error in getSellerProducts: " + error.message);
        return res.status(500).json({
            error: "Internal Server Error",
        })
    }
}

export const getSellerProductsByCategory = async (req, res) => {
    try {
        const sellerId = req.seller?._id;

        // Find the seller by ID
        const seller = await Seller.findById(sellerId);

        // If seller not found, return an error response
        if (!seller) {
            return res.status(404).json({ success: false, error: "Seller not found" });
        }

        // Get all products associated with the seller
        const sellerProducts = await Products.find({
            _id: { $in: seller.products }
        });

        // Group products by category
        const productsByCategory = {};

        sellerProducts.forEach(product => {
            const { category } = product;
            if (!productsByCategory[category]) {
                productsByCategory[category] = [];
            }
            productsByCategory[category].push(product);
        });

        return res.status(200).json({
            success: true,
            productsByCategory
        });
    } catch (error) {
        console.log("Error in getSellerProductsByCategory: " + error.message);
        return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};


export const getSellerInfoById = async (req, res) => {
    try {
        const sellerId = req.body.id;

        // Find the seller by ID
        const seller = await Seller.findById(sellerId);


        // If seller not found, return an error response
        if (!seller) {
            // console.log("inside")
            return res.status(200).json({ success: false, error: "Seller not found" });
        }

        let user = {
            shopName: seller.shopName,
            shopOwner: seller.shopOwner,
            avatar: seller.avatar,
            upi: seller.upi,
        }

        return res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        console.log("Error in getSellerInfoById: " + error.message);
        return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
}