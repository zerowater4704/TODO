"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controllers_1 = require("../controllers/users-controllers");
const router = (0, express_1.Router)();
router.post("/auth", users_controllers_1.createUser);
router.post("/login", users_controllers_1.loginUser);
router.delete("/:id", users_controllers_1.deleteUser);
exports.default = router;
