import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config()

const generateTokenAndSetCookie = (sellerId, res) => {
    const token = jwt.sign({ sellerId }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // ms
        httpOnly: true, 
        sameSite: "strict", 
        secure: process.env.NODE_ENV !== "development",
    });
};

export default generateTokenAndSetCookie;