import { Request, Response } from "express";
import User from "../models/User";

//新規登録
export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: "会員登録にエラーがあります。" });
  }
};

//ログイン
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("ユーザーが見つかりません。");
    }

    const validPassword = password === user.password;
    if (!validPassword) {
      return res.status(404).send("パスワードが間違っています。");
    }

    return res.status(200).send("ログイン成功");
  } catch (err) {
    return res.status(500).send("サーバーエラー");
  }
};

//ユーザー削除
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: "ユーザーを見つかれません。" });
    }

    return res.status(200).send("削除できました。");
  } catch (err) {
    return res.status(500).send("サーバーエラー");
  }
};
