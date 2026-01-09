import express from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  updatePost,
} from "../controllers/post.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { getSinglePost } from "../controllers/auth.controller.js";
import { activityLogger } from "../middleware/activityLogger.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  activityLogger("CREATE_POST", "POST"),
  createPost
);
router.get("/", getAllPosts);
router.get("/:id", getSinglePost);
router.put("/:id", authMiddleware, updatePost);
router.delete(
  "/:id",
  authMiddleware,
  activityLogger("DELETE_POST", "POST"),
  deletePost
);

export default router;
