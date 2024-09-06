"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.loginUser = exports.createUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
//新規登録
const createUser = async (req, res) => {
    try {
        const newUser = new User_1.default(req.body);
        await newUser.save();
        const token = jsonwebtoken_1.default.sign({ id: newUser._id }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "1h",
        });
        res.status(201).json({ token });
    }
    catch (err) {
        res.status(400).json({ message: "会員登録にエラーがあります。" });
    }
};
exports.createUser = createUser;
//ログイン
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User_1.default.findOne({ email });
        if (!user) {
            return res.status(404).send("ユーザーが見つかりません。");
        }
        const validPassword = password === user.password;
        if (!validPassword) {
            return res.status(404).send("パスワードが間違っています。");
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "1h",
        });
        return res.status(200).send({ token });
    }
    catch (err) {
        return res.status(500).send("サーバーエラー");
    }
};
exports.loginUser = loginUser;
//ユーザー削除
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User_1.default.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ message: "ユーザーを見つかれません。" });
        }
        return res.status(200).send("削除できました。");
    }
    catch (err) {
        return res.status(500).send("サーバーエラー");
    }
};
exports.deleteUser = deleteUser;
