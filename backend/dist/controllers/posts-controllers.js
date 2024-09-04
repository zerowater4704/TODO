"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.getPost = exports.getPosts = exports.createPost = void 0;
const Post_1 = __importDefault(require("../models/Post"));
//post 作成
const createPost = async (req, res) => {
    const { title, description } = req.body;
    try {
        const newPost = new Post_1.default({
            title,
            description,
        });
        const savePost = await newPost.save();
        return res.status(201).json(savePost);
    }
    catch (err) {
        return res.status(500).send("サーバーエラー");
    }
};
exports.createPost = createPost;
//すべてのpost
const getPosts = async (req, res) => {
    try {
        const post = await Post_1.default.find();
        return res.status(201).json(post);
    }
    catch (err) {
        return res.status(500).send("タスクの取得に失敗しました。");
    }
};
exports.getPosts = getPosts;
//特定のpost
const getPost = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post_1.default.findById(postId);
        if (!post) {
            return res.status(404).send("タスクがありません。");
        }
        return res.status(201).json(post);
    }
    catch (err) {
        return res.status(500).send("タスクの取得に失敗しました。");
    }
};
exports.getPost = getPost;
//post update
const updatePost = async (req, res) => {
    const postId = req.params.id;
    const { title, description, isCompleted } = req.body;
    try {
        const updatePost = await Post_1.default.findByIdAndUpdate(postId, { title, description, isCompleted, updatedAt: Date.now() }, { new: true } //ライアントには最新の更新状態のデータを返す
        );
        if (!updatePost) {
            return res.status(404).send("タスクを見つかれません。");
        }
        return res.status(200).json(updatePost);
    }
    catch (err) {
        return res.status(500).send("更新に失敗しました。サーバーエラー");
    }
};
exports.updatePost = updatePost;
//post 削除
const deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post_1.default.findByIdAndDelete(postId);
        if (!post) {
            return res.status(404).send("タスクを見つかれません。");
        }
        return res.status(200).json({ message: "タスクを削除しました。" });
    }
    catch (err) {
        return res.status(500).send("タスク削除に失敗しました。サーバーエラー");
    }
};
exports.deletePost = deletePost;
