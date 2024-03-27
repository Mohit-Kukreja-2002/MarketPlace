import express from 'express';
import { activateBuyer, getBuyer, loginBuyer, logoutBuyer, registerBuyer } from '../controllers/buyerAuth.controller.js';
import { isAuthenticated } from '../middleware/auth-buyer.js';
import { upload } from '../middleware/multer.js';

const buyerAuthRouter = express.Router();

buyerAuthRouter.post("/registerBuyer",registerBuyer)
buyerAuthRouter.post('/activateBuyer', activateBuyer);
buyerAuthRouter.post('/loginBuyer', loginBuyer);

buyerAuthRouter.get('/logoutBuyer', isAuthenticated, logoutBuyer);
buyerAuthRouter.get('/buyerInfo', isAuthenticated, getBuyer);

export default buyerAuthRouter