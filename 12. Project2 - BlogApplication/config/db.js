import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import dotenv from "dotenv";

dotenv.config();

const connectDb = asyncHandler( async() => {
  const connect = await mongoose.connect(process.env.MONGODB_URI);
  console.log(`DB Connected: ${connect.connection.host}`);
});

export default connectDb;