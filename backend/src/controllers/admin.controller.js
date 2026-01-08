import User from "../models/User.model.js";
import Post from "../models/Post.model.js";
import Comment from "../models/Comment.model.js";

export const getDashboardStats = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const posts = await Post.countDocuments({ isDeleted: false });
    const comments = await Comment.countDocuments();

    res.json({
      users,
      posts,
      comments,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
