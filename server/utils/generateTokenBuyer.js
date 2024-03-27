import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config()

const generateTokenAndSetCookie = (buyerId, res) => {
    const token = jwt.sign({ buyerId }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // ms
        httpOnly: true, 
        sameSite: "strict", 
        secure: true,
    });
};

export default generateTokenAndSetCookie;