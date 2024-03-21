import {Router} from 'express';

import { getChattedBuyers, getChattedSellers, getMessagesBuyer, getMessagesSeller, sendMessageBuyer, sendMessageSeller } from "../controllers/message.controller.js";
import { isAuthenticated } from "../middleware/auth-buyer.js";
import { isAuthenticated as isAuthBuyer } from "../middleware/auth.js";


const messageRouter = Router();

messageRouter.post('/sendMessageBuyer', isAuthenticated, sendMessageBuyer);
messageRouter.post('/sendMessageSeller', isAuthBuyer, sendMessageSeller);

messageRouter.post('/getMessagesBuyer', isAuthenticated, getMessagesBuyer);
messageRouter.post('/getMessagesSeller', isAuthBuyer, getMessagesSeller);

messageRouter.get('/getChattedSellers', isAuthenticated, getChattedSellers);
messageRouter.get('/getChattedBuyers', isAuthBuyer, getChattedBuyers);

export default messageRouter
