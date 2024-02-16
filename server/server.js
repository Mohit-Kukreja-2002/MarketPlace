import {app} from './app.js'
import connectDb from './utils/db.js'
import dotenv from 'dotenv'
import {v2 as cloudinary} from 'cloudinary'
dotenv.config();

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_SECRET_KEY,
});

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
    connectDb();
})