import express from "express";
import {
  createComment,
  deleteComment,
  getCommentsByPost,
  updateComment,
} from "../controllers/comment.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createComment);
router.get("/post/:postId", getCommentsByPost);
router.put("/:id", authMiddleware, updateComment);
router.delete("/:id", authMiddleware, deleteComment);

export default router;
