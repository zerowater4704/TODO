import { Router } from "express";
import {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
} from "../controllers/posts-controllers";
import { authenticateToken } from "../middlewares/authenticaeToken/authenticateToken";

const router = Router();

router.post("/", authenticateToken, createPost);
router.get("/", authenticateToken, getPosts);
router.get("/:id", authenticateToken, getPost);
router.put("/:id", authenticateToken, updatePost);
router.delete("/:id", authenticateToken, deletePost);

export default router;
