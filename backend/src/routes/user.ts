import { Router } from "express";
import {
  createUser,
  deleteUser,
  loginUser,
} from "../controllers/users-controllers";

const router = Router();

router.post("/auth", createUser);
router.post("/login", loginUser);
router.delete("/:id", deleteUser);

export default router;
