import express from "express";
import connectDB from "./db";
import userRouter from "./routes/user";
import postRouter from "./routes/post";
import cors from "cors";
const app = express();

app.use(cors());
// DB
connectDB();

//ミドルウェア
app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);

app.listen(3000, () => console.log("サーバーが起動しています。"));
