import Buyer from "../models/buyer.js";
import dotenv from 'dotenv';
import { dirname } from 'path';
import { fileURLToPath } from "url";
import jwt from "jsonwebtoken";
import path from "path";
import ejs from "ejs";
import sendMail from "../sendMail.js";
import generateTokenAndSetCookie from "../utils/generateTokenBuyer.js";
dotenv.config();

export const registerBuyer = async (req, res) => {
    try {
        const { name,email, password } = req.body;

        if (password.length < 8) {
            return res.status(400).json({
                error: "Password must be at least 8 characters"
            });
        }

        let buyer = await Buyer.findOne({ email });
        if (buyer) {
            return res.status(400).json({ 
                success: false,
                error: "This email is already registered with another account" 
            })
        }

        buyer = ({
            name:name,
            email: email,
            password: password,
        })

        const activationToken = createActivationToken(buyer);

        const activationCode = activationToken.activationCode;
        const data = { activationCode };

        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);

        // console.log(path.join(__dirname, "../mails/activation-mail.ejs"));
        const html = await ejs.renderFile(
            path.join(__dirname, "../mails/activation-mail-buyer.ejs"),
            data
        );
        try {
            await sendMail({
                email: buyer.email,
                subject: "Account Activation Mail",
                template: "activation-mail-buyer.ejs",
                data,
            });
            res.status(200).json({
                success: true,
                message: `Please check your email: ${buyer.email} to activate your account`,
                activationToken: activationToken.token,
            });
        } catch (error) {
            console.log(error.message)
            // success:false,
            return res.status(400).json({ 
                error: "Error sending email" ,
                success: false,
            });
        }

    } catch (error) {
        console.log("error in signup controller: ", error);
        res.status(500).json({ 
            error: "Internal Server error",
            success: false,
        });
    }
}

export const createActivationToken = (buyer) => {
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
    const token = jwt.sign(
        {
            buyer,
            activationCode,
        },
        process.env.ACTIVATION_SECRET,
        {
            expiresIn: "5m",
        }
    );
    return { token, activationCode };
};

export const activateBuyer = async (req, res) => {
    try {
        const { activation_token, activation_code } = req.body;
        const newBuyer = jwt.verify(
            activation_token,
            process.env.ACTIVATION_SECRET,
        )
        if (newBuyer.activationCode !== activation_code) {
            return res.status(400).json({ 
                error: "Incorrect activation code",
                success:false,
            });
        }

        const { email, password, name } = newBuyer.buyer;
        const existBuyer = await Buyer.findOne({ email });
        if (existBuyer) {
            return res.status(400).json({ 
                error: "This email is already registered with another account",
                success:false,
            });
        }

        const buyer = await Buyer.create({
            name,
            email,
            password,
        });

        req.body = { email, password, name }
        await loginBuyer(req, res);
    }
    catch (error) {
        console.log("Error in activateBuyer", error.message);
        return res.status(500).json({ error: "Internal Server Error", success: false });
    }

}

export const loginBuyer = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                error: "All the credentials are required"
            })
        }
        const buyer = await Buyer.findOne({ email }).select("+password");
        if (!buyer) {
            return res.status(400).json({ error: "Invalid credentials", success: false });
        }

        const isPasswordMatch = await buyer.comparePassword(password.trim());
        if (!isPasswordMatch) {
            return res.status(400).json({ error: "Invalid credentials", success: false });
        }

        generateTokenAndSetCookie(buyer._id, res);

        await buyer.save();
        res.status(200).json({
            success: true,
            buyer
        });

    } catch (error) {
        console.log("Error in loginBuyer", error.message);
        return res.status(500).json({ error: "Internal Server Error", success: false });
    }
}

export const logoutBuyer = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}