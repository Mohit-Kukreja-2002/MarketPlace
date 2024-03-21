import express from 'express';
import { isAuthenticated } from '../middleware/auth.js';
import { addProduct,getSellerInfoById, deleteProduct, editProduct, getSellerInfo, getSellerProducts, getSellerProductsByCategory, updateSellerInfo } from '../controllers/sellerFeature.controller.js';
import { addProductImage, deleteProductImage } from '../services/ProductImage.js';

const sellerFeatureRouter = express.Router();

sellerFeatureRouter.get('/me',isAuthenticated,getSellerInfo)
sellerFeatureRouter.get('/getSellerProducts',isAuthenticated,getSellerProducts)
sellerFeatureRouter.get('/getSellerProductsByCategory',isAuthenticated,getSellerProductsByCategory)

sellerFeatureRouter.put('/updateSellerInfo',isAuthenticated,updateSellerInfo)
sellerFeatureRouter.put('/editProduct/:id',isAuthenticated,editProduct)

sellerFeatureRouter.delete('/deleteProduct/:id',isAuthenticated,deleteProduct)

sellerFeatureRouter.post('/addProduct',isAuthenticated,addProduct)
sellerFeatureRouter.post('/addProductImage',addProductImage)
sellerFeatureRouter.post('/deleteProductImage',deleteProductImage)
sellerFeatureRouter.post('/getSellerInfoById',getSellerInfoById)

export default sellerFeatureRouter;