import express from "express";
import { getDashboardStats } from "../controllers/admin.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import adminMiddleware from "../middleware/role.middleware.js";

const router = express.Router();

router.get("/dashboard", authMiddleware, adminMiddleware, getDashboardStats);

export default router;
