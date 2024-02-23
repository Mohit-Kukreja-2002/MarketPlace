import express from 'express';
import { activateSeller, authStatus, loginSeller, logoutSeller, registerSeller } from '../controllers/sellerAuth.controller.js';
import { isAuthenticated } from '../middleware/auth.js';
import { addSellerImage, deleteSellerImage } from '../services/SellerImage.js';

const sellerAuthRouter = express.Router();

sellerAuthRouter.post('/registerSeller', registerSeller);
sellerAuthRouter.post('/activateSeller', activateSeller);
sellerAuthRouter.post('/loginSeller', loginSeller);
sellerAuthRouter.get('/logoutSeller', isAuthenticated, logoutSeller);
sellerAuthRouter.get('/isLoggedIn', authStatus);

sellerAuthRouter.post('/addSellerImage', addSellerImage)
sellerAuthRouter.post('/deleteSellerImage', deleteSellerImage)

export default sellerAuthRouter