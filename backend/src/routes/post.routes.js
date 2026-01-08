import express from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  updatePost,
} from "../controllers/post.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { getSinglePost } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createPost);
router.get("/", getAllPosts);
router.get("/:id", getSinglePost);
router.put("/:id", authMiddleware, updatePost);
router.delete("/:id", authMiddleware, deletePost);

export default router;
