import { Router } from "express";
import { dealOfDay, featuredProducts, getCategories, getCategorisedProducts, newArrivalProducts } from "../controllers/product.controller.js";

const productRouter = Router();

productRouter.get('/categorisedProducts', getCategorisedProducts);
productRouter.get('/categories', getCategories);
productRouter.get('/newArrival', newArrivalProducts);
productRouter.get('/dealOfDay', dealOfDay);
productRouter.get('/featuredProducts', featuredProducts);

export default productRouter;