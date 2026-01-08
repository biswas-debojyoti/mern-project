import Comment from "../models/Comment.model.js";
import Post from "../models/Post.model.js";

export const createComment = async (req, res) => {
  try {
    const { postId, content } = req.body;

    // Check post exists
    const post = await Post.findById(postId);
    if (!post || post.isDeleted) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comment = await Comment.create({
      content,
      author: req.user.id,
      post: postId,
    });

    res.status(201).json({
      message: "Comment added successfully",
      comment,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// getCommentsByPost

export const getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.find({ post: postId })
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// update comment
export const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // OWNER or ADMIN check
    if (
      comment.author.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    comment.content = content || comment.content;
    await comment.save();

    res.json({
      message: "Comment updated successfully",
      comment,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// delete comment

export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // OWNER or ADMIN check
    if (
      comment.author.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await comment.deleteOne();

    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
