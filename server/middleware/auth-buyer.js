import jwt from 'jsonwebtoken';
import Buyer from '../models/buyer.js'
import { refreshingTokens } from './refreshTokenHelper.js';

export const isAuthenticated = async (req, res, next) => {
    const access_token = req.cookies.accessToken;
    const refresh_token = req.cookies.refreshToken;

    // console.log(access_token, refresh_token)

    if (!access_token) {
        if (!refresh_token) {
            return res.status(200).json({
                error: "First login to proceed",
                success: false,
            });
        } else {
            return refreshingTokens(req, res, next);
        }
    }

    try {
        const decoded = jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET);

        if (!decoded) {
            if(!refresh_token){
                return res.status(200).json({
                    error: "JWT token is not valid",
                    success: false,
                });
            }else{
                return refreshingTokens(req, res, next);
            }
        }

        // Check if the access token is expired
        if (decoded.exp && decoded.exp <= Date.now() / 1000) {
            if(!refresh_token){
                return res.status(200).json({
                    error: "JWT token has expired",
                    success: false
                });
            }else{
                return refreshingTokens(req, res, next);
            }
        } else {
            const buyer = await Buyer.findById(decoded._id).select("-password -refreshToken");

            if (!buyer) {
                if(!refresh_token){
                    return res.status(200).json({
                        error: "First login to proceed",
                        success: false,
                    });
                }else{
                    return refreshingTokens(req, res, next);
                }
            }

            req.user = buyer;
            next();
        }
    } catch (error) {
        console.log("Error in IsAuthenticated Buyer", error)
        return res.status(500).json({
            error: "Internal Server Error",
            success: false,
        });
    }
};