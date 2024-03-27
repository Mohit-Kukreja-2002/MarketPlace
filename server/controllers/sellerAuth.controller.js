import Seller from "../models/seller.js";
import dotenv from 'dotenv';
import { dirname } from 'path';
import { fileURLToPath } from "url";
import jwt from "jsonwebtoken";
import path from "path";
import ejs from "ejs";
import sendMail from "../sendMail.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";
dotenv.config();

export const registerSeller = async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body;

        if (password.length < 8) {
            return res.status(400).json({ error: "Password must be at least 8 characters" });
        }

        if(password!==confirmPassword) {
            return res.status(400).json({ error: "Password mismatch" });
        }

        let seller = await Seller.findOne({ email });
        if (seller) {
            return res.status(400).json({ error: "This email is already registered with another account" })
        }

        seller = ({
            email: email,
            password: password,
        })

        const activationToken = createActivationToken(seller);

        const activationCode = activationToken.activationCode;
        const data = { activationCode };

        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);

        // console.log(path.join(__dirname, "../mails/activation-mail.ejs"));
        const html = await ejs.renderFile(
            path.join(__dirname, "../mails/activation-mail.ejs"),
            data
        );
        try {
            await sendMail({
                email: seller.email,
                subject: "Account Activation Mail",
                template: "activation-mail.ejs",
                data,
            });
            res.status(200).json({
                success: true,
                message: `Please check your email: ${seller.email} to activate your account`,
                activationToken: activationToken.token,
            });
        } catch (error) {
            console.log(error.message)
            return res.status(400).json({ 
                success: false,
                error: "Error sending email" 
            });
        }

    } catch (error) {
        console.log("error in signup controller: ", error);
        res.status(500).json({ error: "Internal Server error" });
    }
}

export const createActivationToken = (seller) => {
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
    const token = jwt.sign(
        {
            seller,
            activationCode,
        },
        process.env.ACTIVATION_SECRET,
        {
            expiresIn: "5m",
        }
    );
    return { token, activationCode };
};

export const activateSeller = async (req, res) => {
    try {
        const { activation_token, activation_code } = req.body;
        const newSeller = jwt.verify(
            activation_token,
            process.env.ACTIVATION_SECRET,
        )
        if (newSeller.activationCode !== activation_code) {
            return res.status(400).json({ error: "Incorrect activation code" });
        }

        const { email, password } = newSeller.seller;
        const existSeller = await Seller.findOne({ email });
        if (existSeller) {
            return res.status(400).json({ error: "This email is already registered with another account" });
        }

        const seller = await Seller.create({
            email,
            password,
        });

        req.body = { email, password }
        await loginSeller(req, res);
    }
    catch (error) {
        console.log("Error in activateSeller", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }

}

export const loginSeller = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                error: "All the credentials are required"
            })
        }
        const seller = await Seller.findOne({ email }).select("+password");
        if (!seller) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const isPasswordMatch = await seller.comparePassword(password.trim());
        if (!isPasswordMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        generateTokenAndSetCookie(seller._id, res);

        await seller.save();
        res.status(200).json({
            success: true,
            seller
        });

    } catch (error) {
        console.log("Error in loginSeller", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export const logoutSeller = async (req, res, next) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({success:true, message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({success:false, error: "Internal Server Error" });
    }
}

export const authStatus = async(req,res) =>{
    // console.log("inside");
    const access_token = req.cookies.jwt;

    if (!access_token) {
        return res.status(400).json({
            verified: false,
            error: "First login to proceed"
        });
    }

    try {
        const decoded = jwt.verify(access_token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(400).json({
                verified: false,
                error: "JWT token is not valid",
            });
        }

        // Check if the access token is expired
        if (decoded.exp && decoded.exp <= Date.now() / 1000) {
            return res.status(400).json({
                verified: false,
                error: "JWT token has expired",
            });
        } else {
            const seller = await Seller.findById(decoded.sellerId).select('-password');

            if (!seller) {
                return res.status(400).json({
                    verified: false,
                    error: "First login to proceed"
                });
            }

            return res.status(200).json({
                verified: true,
                seller
            });
        }
    } catch (error) {
        return res.status(500).json({
            verified: false,
            error: "Internal Server Error"
        });
    }
}