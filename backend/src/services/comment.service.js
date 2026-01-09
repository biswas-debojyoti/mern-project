import Comment from "../models/Comment.model.js";

export const createCommentService = async ({ content, userId, postId }) => {
  return await Comment.create({
    content,
    author: userId,
    post: postId,
  });
};

export const updateCommentService = async ({ comment, content }) => {
  comment.content = content;
  return await comment.save();
};

export const deleteCommentService = async (comment) => {
  return await comment.deleteOne();
};
