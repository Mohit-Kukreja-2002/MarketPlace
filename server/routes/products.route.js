import { Router } from "express";
import { dealOfDay, addToWishlist, removeFromWishlist, likedProducts, featuredProducts, getProductBySearch, getCategories, getCategorisedProducts, getProductById, newArrivalProducts } from "../controllers/product.controller.js";
import { isAuthenticated } from "../middleware/auth-buyer.js";

const productRouter = Router();

productRouter.get('/categorisedProducts', getCategorisedProducts);
productRouter.get('/categories', getCategories);
productRouter.get('/newArrival', newArrivalProducts);
productRouter.get('/dealOfDay', dealOfDay);
productRouter.get('/featuredProducts', featuredProducts);
productRouter.get('/product/:id', getProductById);
productRouter.get('/search/:query/:page', getProductBySearch);
productRouter.get('/likedProducts', isAuthenticated, likedProducts);

productRouter.post('/addToWishlist', isAuthenticated, addToWishlist);
productRouter.post('/removeFromWishlist', isAuthenticated, removeFromWishlist);

export default productRouter;