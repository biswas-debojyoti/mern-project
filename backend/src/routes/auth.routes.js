import express from "express";
import { registerUser, loginUser } from "../controllers/auth.controller.js";
import { authLimiter } from "../middleware/rateLimiter.js";
import { activityLogger } from "../middleware/activityLogger.js";

const router = express.Router();

router.post("/register", authLimiter, registerUser);
router.post("/login", authLimiter, activityLogger("LOGIN", "AUTH"), loginUser);

export default router;
