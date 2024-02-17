import Products from "../models/products.js";
import Seller from "../models/seller.js";
import dotenv from 'dotenv';
dotenv.config();

export const getSellerInfo = async (req, res) => {
    try {
        const sellerId = req.seller?._id;

        const seller = await Seller.findById(sellerId);

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
        const seller = await Seller.findById(sellerId);

        const { shopName, shopLocation, phoneNumber, upi } = req.body;

        if (shopName) seller.shopName = shopName;
        if (shopLocation) seller.shopLocation = shopLocation;
        if (phoneNumber) seller.phoneNumber = phoneNumber;
        if (upi) seller.upi = upi;

        await seller.save();

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            seller,
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
        const data = req.body;

        const sellerId = req.seller?._id;
        const seller = await Seller.findById(sellerId);

        const product = await Products.create(data);
        if (product) seller.products.push(product._id);

        await seller.save();

        res.status(200).json({
            success: true,
            message: "Product added successfully",
            product,
        });
    } catch (error) {
        console.log("Error in addProduct: " + error.message);
        return res.status(500).json({
            error: "Internal Server Error",
        })
    }
}

export const editProduct = async (req, res) => {
    try {

        const data = req.body;

        // const image = data.image;

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
                error: "You are not authorized to edit this product"
            })
        }

        // const productData = await Products.findById(productId);

        // if (image && !image.startsWith("https")) {
        //     await cloudinary.v2.uploader.destroy(fundraiserData.coverImg.public_id);

        //     const myCloud = await cloudinary.v2.uploader.upload(coverImg, {
        //         folder: "Product",
        //     });

        //     data.image = {
        //         public_id: myCloud.public_id,
        //         url: myCloud.secure_url,
        //     };
        // }

        // if (coverImg && coverImg.startsWith("https")) {
        //     data.coverImg = {
        //         public_id: fundraiserData?.coverImg.public_id,
        //         url: fundraiserData?.coverImg.url,
        //     };
        // }

        const product = await Products.findByIdAndUpdate(
            productId,
            {
                $set: data,
            },
            { new: true }
        );

        // await redis.set(fundId, JSON.stringify(fund)); // update course in redis

        res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            product,
        });

    } catch (error) {
        console.log("Error in editProduct: " + error.message);
        return res.status(500).json({
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
            return res.status(404).json({ error: "Seller not found" });
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
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
