import jwt from 'jsonwebtoken';
import Seller from '../models/seller.js';

export const isAuthenticated = async (req, res, next) => {
    const access_token = req.cookies.jwt;

    if (!access_token) {
        return res.status(400).json({
            error: "First login to proceed"
        });
    }

    try {
        const decoded = jwt.verify(access_token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(400).json({
                error: "JWT token is not valid",
            });
        }

        // Check if the access token is expired
        if (decoded.exp && decoded.exp <= Date.now() / 1000) {
            return res.status(400).json({
                error: "JWT token has expired",
            });
        } else {
            const seller = await Seller.findById(decoded.sellerId);

            if (!seller) {
                return res.status(400).json({
                    error: "First login to proceed"
                });
            }

            req.seller = seller;
            next();
        }
    } catch (error) {
        return res.status(500).json({
            error: "Internal Server Error"
        });
    }
};
