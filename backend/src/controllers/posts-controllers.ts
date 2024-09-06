import { Request, Response } from "express";
import Post from "../models/Post";

//post 作成
export const createPost = async (req: Request, res: Response) => {
  const { title, description } = req.body;
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(400).json({ message: "ユーザーIDが見つかりません。" });
    }
    const newPost = new Post({
      title,
      description,
      userId,
    });

    const savePost = await newPost.save();

    return res.status(201).json(savePost);
  } catch (err) {
    console.error("エラー詳細:", err);
    return res.status(500).send("サーバーエラー");
  }
};

//すべてのpost
export const getPosts = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const post = await Post.find({ userId });
    return res.status(200).json(post);
  } catch (err) {
    return res.status(500).send("タスクの取得に失敗しました。");
  }
};

//特定のpost
export const getPost = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;
    const userId = req.user?.id;

    console.log("postId:", postId);
    console.log("userId:", userId);
    const post = await Post.findOne({ _id: postId, userId: userId });
    if (!post) {
      return res.status(404).send("タスクがありません。");
    }

    return res.status(200).json(post);
  } catch (err) {
    return res.status(500).send("タスクの取得に失敗しました。");
  }
};

//post update
export const updatePost = async (req: Request, res: Response) => {
  const postId = req.params.id;
  const { title, description, isCompleted } = req.body;
  try {
    const updatePost = await Post.findByIdAndUpdate(
      postId,
      { title, description, isCompleted, updatedAt: Date.now() },
      { new: true } //ライアントには最新の更新状態のデータを返す
    );

    if (!updatePost) {
      return res.status(404).send("タスクを見つかれません。");
    }

    return res.status(200).json(updatePost);
  } catch (err) {
    return res.status(500).send("更新に失敗しました。サーバーエラー");
  }
};

//post 削除
export const deletePost = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;
    const userId = req.user?.id;

    const post = await Post.findByIdAndDelete({ _id: postId, userId: userId });
    if (!post) {
      return res.status(404).send("タスクを見つかれません。");
    }

    return res.status(200).json({ message: "タスクを削除しました。" });
  } catch (err) {
    return res.status(500).send("タスク削除に失敗しました。サーバーエラー");
  }
};
