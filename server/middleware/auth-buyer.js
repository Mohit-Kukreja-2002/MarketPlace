import jwt from 'jsonwebtoken';
import Buyer from '../models/buyer.js'
export const isAuthenticated = async (req, res, next) => {
    const access_token = req.cookies.accessToken;

    if (!access_token) {
        return res.status(200).json({
            error: "First login to proceed",
            success: false,
        });
    }

    try {
        const decoded = jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET);

        if (!decoded) {
            return res.status(200).json({
                error: "JWT token is not valid",
                success: false,
            });
        }

        // Check if the access token is expired
        if (decoded.exp && decoded.exp <= Date.now() / 1000) {
            return res.status(200).json({
                error: "JWT token has expired",
                success: false
            });
        } else {
            const buyer = await Buyer.findById(decoded._id).select("-password -refreshToken");

            if (!buyer) {
                return res.status(200).json({
                    error: "First login to proceed",
                    success: false,
                });
            }

            req.user = buyer;
            next();
        }
    } catch (error) {
        console.log("Error is IsAuthenticated", error)
        return res.status(500).json({
            error: "Internal Server Error",
            success: false,
        });
    }
};