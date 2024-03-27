import { accessTokenOptions, generateAccessAndRefreshTokens, refreshTokenOptions } from '../controllers/buyerAuth.controller.js';
import Buyer from '../models/buyer.js'
import jwt from 'jsonwebtoken';


export const refreshingTokens = async (req, res, next) => {
    try {
        const refresh_token = req.cookies.refreshToken;
        const decoded = jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET)
        if (!decoded) {
            return res.status(200).json({
                error: "JWT token is not valid",
                success: false,
            });
        }

        if (decoded.exp && decoded.exp <= Date.now() / 1000) {
            return res.status(200).json({
                error: "JWT token has expired",
                success: false
            });
        } else {
            let buyer = await Buyer.findById(decoded._id).select("-password");
            
            if (!buyer) {
                return res.status(200).json({
                    error: "First login to proceed",
                    success: false,
                });
            }
            
            if (refresh_token !== buyer?.refreshToken) {
                return res.status(200).json({
                    success: false,
                    error: "Invalid Refresh token"
                })
            }

            
            const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(buyer._id)

            if (accessToken && refreshToken) {
                res.cookie("accessToken", accessToken, accessTokenOptions)
                res.cookie("refreshToken", refreshToken, refreshTokenOptions)
            } else {
                return res.status(200).json({
                    success: false,
                    error: "Tokens cant be refreshed at this moment"
                })
            }

            
            buyer = await Buyer.findById(decoded._id).select("-password -refreshToken");
            req.user = buyer
            next()
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Internal Server Error",
        })
    }
}