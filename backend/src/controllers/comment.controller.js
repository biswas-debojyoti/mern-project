

import Comment from "../models/Comment.model.js";
import Post from "../models/Post.model.js";
import {
  createCommentService,
  updateCommentService,
  deleteCommentService,
} from "../services/comment.service.js";

/**
 * Create Comment
 */
export const createComment = async (req, res) => {
  try {
    const { postId, content } = req.body;

    // Check post existence
    const post = await Post.findById(postId);
    if (!post || post.isDeleted) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comment = await createCommentService({
      content,
      userId: req.user.id,
      postId,
    });

    res.status(201).json({
      message: "Comment created successfully",
      comment,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Get Comments By Post
 */
export const getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.find({ post: postId })
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Update Comment
 */
export const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // OWNER or ADMIN
    if (
      comment.author.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updatedComment = await updateCommentService({
      comment,
      content,
    });

    res.json({
      message: "Comment updated successfully",
      comment: updatedComment,
    });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Delete Comment
 */
export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // OWNER or ADMIN
    if (
      comment.author.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await deleteCommentService(comment);

    res.json({ message: "Comment deleted successfully" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};
