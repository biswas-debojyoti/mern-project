import Post from "../models/Post.model.js";

// "create post "
export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    const post = await Post.create({
      title,
      content,
      author: req.user.id,
    });

    res.status(201).json({
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// " get post for admin and user feed "

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({ isDeleted: false })
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// update post
export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const post = await Post.findById(id);

    if (!post || post.isDeleted) {
      return res.status(404).json({ message: "Post not found" });
    }

    // OWNER or ADMIN check
    if (post.author.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    post.title = title || post.title;
    post.content = content || post.content;

    await post.save();

    res.json({
      message: "Post updated successfully",
      post,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// delete post

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);

    if (!post || post.isDeleted) {
      return res.status(404).json({ message: "Post not found" });
    }

    // OWNER or ADMIN check
    if (post.author.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    post.isDeleted = true;
    await post.save();

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
