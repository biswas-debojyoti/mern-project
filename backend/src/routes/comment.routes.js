import express from "express";
import {
  createComment,
  deleteComment,
  getCommentsByPost,
  updateComment,
} from "../controllers/comment.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { activityLogger } from "../middleware/activityLogger.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  activityLogger("CREATE_COMMENT", "COMMENT"),
  createComment
);
router.get("/post/:postId", getCommentsByPost);
router.put("/:id", authMiddleware, updateComment);
router.delete(
  "/:id",
  authMiddleware,
  activityLogger("CREATE_COMMENT", "COMMENT"),
  deleteComment
);

export default router;
