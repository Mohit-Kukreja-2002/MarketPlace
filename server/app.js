import express from 'express';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import sellerAuthRouter from './routes/sellerAuth.route.js';
import sellerFeatureRouter from './routes/sellerFeature.route.js';
import fileUpload from 'express-fileupload';
import bodyParser from 'body-parser';
import buyerAuthRouter from './routes/buyerAuth.route.js';
import productRouter from './routes/products.route.js';

export const app = express();
dotenv.config()

app.use(fileUpload());
app.use(express.json({limit : "50mb"}));
app.use(cookieParser());
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/",sellerAuthRouter,sellerFeatureRouter)
app.use("/api/v1/",buyerAuthRouter);
app.use("/api/v1/",productRouter);

app.get("/test", (req, res) => {
    res.status(200).json({
        success: "true",
        message: "Api is working",
    });
});
