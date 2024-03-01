import express from 'express';
import { activateBuyer, loginBuyer, logoutBuyer, registerBuyer } from '../controllers/buyerAuth.controller.js';
import { isAuthenticated } from '../middleware/auth-buyer.js';

const buyerAuthRouter = express.Router();

buyerAuthRouter.post('/registerBuyer',registerBuyer);
buyerAuthRouter.post('/activateBuyer',activateBuyer);
buyerAuthRouter.post('/loginBuyer',loginBuyer);
buyerAuthRouter.get('/logoutBuyer',isAuthenticated,logoutBuyer);
export default buyerAuthRouter