import express from "express";
import connectDB from "./db";
import userRouter from "./routes/user";
const app = express();

// DB
connectDB();

//ミドルウェア
app.use(express.json());
app.use("/api/user", userRouter);

app.listen(3000, () => console.log("サーバーが起動しています。"));
