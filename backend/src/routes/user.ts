import { Router } from "express";
import { createUser, loginUser } from "../controllers/users-controllers";

const router = Router();

router.post("/auth", createUser);
router.post("/login", loginUser);

export default router;
