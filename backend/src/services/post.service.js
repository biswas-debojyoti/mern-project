import Post from "../models/Post.model.js";

export const createPostService = async ({ title, content, userId }) => {
  return await Post.create({
    title,
    content,
    author: userId,
  });
};

export const getPaginatedPostsService = async (page, limit) => {
  const skip = (page - 1) * limit;

  const totalPosts = await Post.countDocuments({ isDeleted: false });

  const posts = await Post.find({ isDeleted: false })
    .populate("author", "name email")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  return {
    posts,
    pagination: {
      totalPosts,
      currentPage: page,
      totalPages: Math.ceil(totalPosts / limit),
      limit,
    },
  };
};

export const updatePostService = async ({ post, title, content }) => {
  post.title = title ?? post.title;
  post.content = content ?? post.content;
  return await post.save();
};

export const deletePostService = async (post) => {
  post.isDeleted = true;
  return await post.save();
};
