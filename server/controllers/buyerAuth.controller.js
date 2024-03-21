import { dirname } from 'path';
import { fileURLToPath } from "url";
import jwt from "jsonwebtoken";
import path from "path";
import ejs from "ejs";
import fs from "fs"
import ms from "ms"

import Buyer from "../models/buyer.js";
import sendMail from "../sendMail.js";
import generateTokenAndSetCookie from "../utils/generateTokenBuyer.js";
import { uploadBuyerImage } from "../utils/buyerImageUpload.js";

import dotenv from 'dotenv';
import { addBuyerImage } from '../services/BuyerImage.js';
dotenv.config();

const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development"
}

const accessTokenExpire = process.env.ACCESS_TOKEN_EXPIRY || '1d'
const refreshTokenExpire = process.env.REFRESH_TOKEN_EXPIRY || '10d'
const expiresInMs = ms(accessTokenExpire);
const expiresInMsRefresh = ms(refreshTokenExpire);

const accessTokenOptions = {
    expires: new Date(Date.now() + expiresInMs),
    maxAge: expiresInMs,
    httpOnly: true,
    sameSite: 'lax',
    secure: false
};
const refreshTokenOptions = {
    expires: new Date(Date.now() + expiresInMsRefresh),
    maxAge: expiresInMsRefresh,
    httpOnly: true,
    sameSite: 'lax',
    secure: false
};

const deleteFileFromLocal = async (filePath) => {
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error("Error deleting file:", err);
        }
    });
}

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const buyer = await Buyer.findById(userId)
        const accessToken = buyer.generateAccessToken()
        const refreshToken = buyer.generateRefreshToken();


        buyer.refreshToken = refreshToken
        await buyer.save({ validateBeforeSave: false })

        return { accessToken, refreshToken, success: true }

    } catch (error) {
        return { accessToken: "", refreshToken: "", success: false }
    }
}

export const registerBuyer = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if ([name, email, password].some((field) => field?.trim() === "")) {
            return res.status(200).json({
                success: false,
                error: "Please fill in all the fields"
            });
        }


        if (password.length < 8) {
            return res.status(200).json({
                success: false,
                error: "Password must be at least 8 characters"
            });
        }

        let buyer = await Buyer.findOne({ email });
        if (buyer) {
            return res.status(200).json({
                success: false,
                error: "This email is already registered with another account"
            })
        }

        // console.log(req.files)

        const avatar = req.files?.avatar[0] || req.files?.avatar;
        if (!avatar) {
            return res.status(200).json({
                success: false,
                error: "Avatar is required"
            })
        }

        // Define the destination directory where you want to save the uploaded file
        const uploadDirectory = './uploads/';

        // Check if the directory exists, if not, create it
        if (!fs.existsSync(uploadDirectory)) {
            fs.mkdirSync(uploadDirectory, { recursive: true });
        }

        // Move the uploaded file to the upload directory
        let localeFilePath = uploadDirectory + avatar.name
        await avatar.mv(uploadDirectory + avatar.name, function (err) {
            if (err) {
                console.log("Error uploading file:", err);
            }
        });

        const { public_id, url, success } = await addBuyerImage(localeFilePath)
        if (!success) {
            deleteFileFromLocal(localeFilePath)
            return res.status(200).json({
                success: false,
                error: "Issue setting avatar"
            })
        }

        buyer = ({
            name: name,
            email: email,
            password: password,
            avatar: url
        })

        deleteFileFromLocal(localeFilePath)

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
            // console.log(error.message)
            return res.status(200).json({
                success: false,
                error: "Error sending email",
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
            return res.status(200).json({
                success: false,
                error: "Incorrect activation code",
            });
        }

        const { email, password, name, avatar } = newBuyer.buyer;

        const existBuyer = await Buyer.findOne({ email });
        if (existBuyer) {
            return res.status(200).json({
                error: "This email is already registered with another account",
                success: false,
            });
        }

        const buyer = await Buyer.create({
            name,
            email,
            password,
            avatar
        });

        req.body = { email, password }
        // return res.status(200).json({
        //     success: true,
        //     buyer
        // })
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
            return res.status(200).json({
                error: "All the credentials are required"
            })
        }

        const buyer = await Buyer.findOne({ email }).select("+password");
        if (!buyer) {
            return res.status(200).json({ error: "Invalid credentials", success: false });
        }

        const isPasswordMatch = await buyer.comparePassword(password.trim());
        if (!isPasswordMatch) {
            return res.status(200).json({ error: "Invalid credentials", success: false });
        }

        const { accessToken, refreshToken, success } = await generateAccessAndRefreshTokens(buyer._id)
        if (!success) {
            return res.status(200).json({
                success: false,
                error: "Invalid credentials",
            })
        }

        const loggedInBuyer = await Buyer.findById(buyer._id).select("-password -refreshToken")

        // console.log(accessToken, refreshToken)

        res.cookie("accessToken", accessToken, accessTokenOptions)
        res.cookie("refreshToken", refreshToken, refreshTokenOptions)

        return res.status(200).json({
                user: loggedInBuyer,
                accessToken,
                refreshToken,
                message: "User logged In Successfully",
                success: true,
            })

    } catch (error) {
        console.log("Error in loginBuyer", error.message);
        return res.status(500).json({ error: "Internal Server Error", success: false });
    }
}

// export const logoutBuyer = async (req, res) => {
//     try {
//         res.cookie("jwt", "", { maxAge: 0 });
//         res.status(200).json({ message: "Logged out successfully" });
//     } catch (error) {
//         console.log("Error in logout controller", error.message);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// }

export const logoutBuyer = async (req, res) => {
    try {
        await Buyer.findByIdAndUpdate(req.user._id,
            {
                $unset: {
                    refreshToken: 1 // this removes the field from document
                }
            },
            {
                new: true
            }
        )

        return res.status(200).clearCookie("accessToken", accessTokenOptions)
            .clearCookie("refreshToken", refreshTokenOptions)
            .json({
                success: true,
                message: "Successfully logged out",
            })
    } catch (error) {
        console.log("Error in logout controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

// export const refreshAccessToken = async (req, res) => {
//     const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken


//     if (!incomingRefreshToken) {
//         return res.status(200).json({
//             success: false,
//             error: "unauthorized request"
//         })
//     }

//     try {

//         const decodedToken = jwt.verify(
//             incomingRefreshToken,
//             process.env.REFRESH_TOKEN_SECRET
//         )

//         const buyer = await Buyer.findById(decodedToken?._id)

//         if (!buyer) {
//             return res.status(200).json({
//                 success: false,
//                 error: "Invalid refresh token"
//             })
//         }

//         if (incomingRefreshToken !== buyer?.refreshToken) {
//             return res.status(200).json({
//                 success: false,
//                 error: "Invalid Refresh token"
//             })
//         }

//         const { accessToken, newRefreshToken } = await generateAccessAndRefreshTokens(buyer._id)

//         return res
//             .status(200)
//             .cookie("accessToken", accessToken, options)
//             .cookie("refreshToken", newRefreshToken, options)
//             .json({
//                 accessToken,
//                 refreshToken: newRefreshToken,
//                 "message": "Access token refreshed"
//             })
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             error:
//         })
//     }
// }

export const getBuyer = async (req,res) =>{
    try {
        const { user } = req;

        res.status(200).json({
            user,
            success:true,
        })
        
    } catch (error) {
        console.log("Error in getBuyer controller: " + error );
        res.status(500).json({
            success:false,
            error: "Internal Server Error",
        })
    }
}
