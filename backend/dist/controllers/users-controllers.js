"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.createUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const createUser = async (req, res) => {
    try {
        const newUser = new User_1.default(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    }
    catch (err) {
        res.status(400).json({ message: "会員登録にエラーがあります。" });
    }
};
exports.createUser = createUser;
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
        return res.status(200).send("ログイン成功");
    }
    catch (err) {
        return res.status(500).send("サーバーエラー");
    }
};
exports.loginUser = loginUser;
