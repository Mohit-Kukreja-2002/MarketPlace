import express from 'express';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
dotenv.config();

const dbUrl = process.env.DB_URL || '';
const connectDb = async()=>{
    try{
        // console.log(dbUrl)
        await mongoose.connect(dbUrl).then((data)=>{
            console.log(`Database connected with ${data.connection.host}`);
        })
    }catch(err){
        console.log(err.message);
        setTimeout(connectDb,5000);
    }
}
export default connectDb;