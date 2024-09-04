import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGOSSE!);
    console.log("DBに接続中です。");
  } catch (err) {
    console.error("DB接続エラー", err);
  }
};

export default connectDB;
