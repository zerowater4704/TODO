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

router.post("/", createPost);
router.get("/", getPosts);
router.get("/:id", authenticateToken, getPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
