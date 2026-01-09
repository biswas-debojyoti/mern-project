import express from "express";
import { getAllUsers, getDashboardStats, getTotalUsers } from "../controllers/admin.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import adminMiddleware from "../middleware/role.middleware.js";

const router = express.Router();

router.get("/dashboard", authMiddleware, adminMiddleware, getDashboardStats);

router.get(
  "/users/count",
  authMiddleware,
  adminMiddleware,
  getTotalUsers
);

router.get(
  "/users",
  authMiddleware,
  adminMiddleware,
  getAllUsers
);

export default router;
