import express from 'express';
import { activateSeller, loginSeller, logoutSeller, registerSeller } from '../controllers/sellerAuth.controller.js';
import { isAuthenticated } from '../middleware/auth.js';

const sellerAuthRouter = express.Router();

sellerAuthRouter.post('/registerSeller',registerSeller);
sellerAuthRouter.post('/activateSeller',activateSeller);
sellerAuthRouter.post('/loginSeller',loginSeller);
sellerAuthRouter.get('/logoutSeller',isAuthenticated,logoutSeller);

export default sellerAuthRouter