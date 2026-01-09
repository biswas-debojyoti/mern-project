import Post from "../models/Post.model.js";
import {
  createPostService,
  getPaginatedPostsService,
  updatePostService,
  deletePostService,
} from "../services/post.service.js";

export const createPost = async (req, res) => {
  try {
    const post = await createPostService({
      title: req.body.title,
      content: req.body.content,
      userId: req.user.id,
    });

    res.status(201).json({ message: "Post created", post });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const data = await getPaginatedPostsService(page, limit);
    res.json(data);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export const updatePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post || post.isDeleted)
    return res.status(404).json({ message: "Post not found" });

  if (post.author.toString() !== req.user.id && req.user.role !== "admin") {
    return res.status(403).json({ message: "Not authorized" });
  }

  const updated = await updatePostService({
    post,
    title: req.body.title,
    content: req.body.content,
  });

  res.json({ message: "Post updated", post: updated });
};

export const deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post || post.isDeleted)
    return res.status(404).json({ message: "Post not found" });

  if (post.author.toString() !== req.user.id && req.user.role !== "admin") {
    return res.status(403).json({ message: "Not authorized" });
  }

  await deletePostService(post);
  res.json({ message: "Post deleted" });
};
