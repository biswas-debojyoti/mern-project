import { useParams } from "react-router-dom";
import useSWR from "swr";
import { getFetcher } from "../../api/fetcher";
import { useEffect, useState } from "react";
import { postFetcher } from "../../api/fetcher";
import { mutate } from "swr";
import { useAuthStore } from "../../store/authStore";
import { deleteFetcher, putFetcher } from "../../api/fetcher";
import { useNavigate } from "react-router-dom";
import {
  Edit2,
  Trash2,
  Save,
  X,
  MessageSquare,
  User,
  Calendar,
  Loader2,
  ArrowLeft,
} from "lucide-react";

const PostDetails = () => {
  const user = useAuthStore((state) => state.user);

  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editText, setEditText] = useState("");

  const [commentText, setCommentText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  const [isEditingPost, setIsEditingPost] = useState(false);
  const [postForm, setPostForm] = useState({
    title: "",
    content: "",
  });

  const { id } = useParams();

  const {
    data: post,
    error: postError,
    isLoading: postLoading,
  } = useSWR(id ? `/posts/${id}` : null, getFetcher);

  const {
    data: comments,
    error: commentError,
    isLoading: commentLoading,
  } = useSWR(`/comments/post/${id}`, getFetcher);

  useEffect(() => {
    if (post) {
      setPostForm({
        title: post.title,
        content: post.content,
      });
    }
  }, [post]);

  if (postLoading) {
    return (
      <div className="flex bg-gray-900 items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading post...</p>
        </div>
      </div>
    );
  }

  if (postError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6 max-w-md">
            <p className="text-red-600 font-semibold text-lg">
              Failed to load post
            </p>
            <p className="text-red-500 text-sm mt-2">Please try again later</p>
          </div>
        </div>
      </div>
    );
  }

  const handleAddComment = async (e) => {
    e.preventDefault();

    if (!commentText.trim()) return;

    try {
      setSubmitting(true);

      await postFetcher("/comments", {
        postId: id,
        content: commentText,
      });

      setCommentText("");
      mutate(`/comments/post/${id}`);
    } catch (err) {
      alert("Failed to add comment");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!confirm("Delete this comment?")) return;

    try {
      await deleteFetcher(`/comments/${commentId}`);
      mutate(`/comments/post/${id}`);
    } catch (err) {
      alert("Failed to delete comment");
    }
  };

  const handleUpdateComment = async (commentId) => {
    if (!editText.trim()) return;

    try {
      await putFetcher(`/comments/${commentId}`, {
        content: editText,
      });

      setEditingCommentId(null);
      setEditText("");
      mutate(`/comments/post/${id}`);
    } catch (err) {
      alert("Failed to update comment");
    }
  };

  const isOwner = post?.author?._id === user?.id;
  const isAdmin = user?.role === "admin";

  const handleUpdatePost = async () => {
    try {
      await putFetcher(`/posts/${id}`, postForm);
      setIsEditingPost(false);
      mutate(`/posts/${id}`);
      mutate("/posts");
    } catch {
      alert("Failed to update post");
    }
  };

  const handleDeletePost = async () => {
    if (!confirm("Delete this post?")) return;

    try {
      await deleteFetcher(`/posts/${id}`);
      mutate("/posts");
      navigate("/");
    } catch {
      alert("Failed to delete post");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 text-gray-200 hover:text-gray-300 transition mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
        {/* Post Card */}
        <div className="bg-gray-700 text-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="p-6 sm:p-8">
            {isEditingPost ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium  mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={postForm.title}
                    onChange={(e) =>
                      setPostForm({ ...postForm, title: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg font-semibold"
                    placeholder="Post title..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content
                  </label>
                  <textarea
                    rows="8"
                    value={postForm.content}
                    onChange={(e) =>
                      setPostForm({ ...postForm, content: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    placeholder="Write your content..."
                  />
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={handleUpdatePost}
                    className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all font-medium shadow-sm"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </button>
                  <button
                    onClick={() => setIsEditingPost(false)}
                    className="flex items-center space-x-2 px-5 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all font-medium"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h1 className="text-3xl sm:text-4xl font-bold  mb-4">
                  {post.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-200 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span className="font-medium">
                      {post.author?.name || "Anonymous"}
                    </span>
                  </div>
                  {post.createdAt && (
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>

                <div className="prose max-w-none">
                  <p className="text-gray-200 text-lg leading-relaxed whitespace-pre-wrap">
                    {post.content}
                  </p>
                </div>
              </>
            )}

            {(isOwner || isAdmin) && !isEditingPost && (
              <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setIsEditingPost(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors font-medium"
                >
                  <Edit2 className="w-4 h-4" />
                  <span>Edit Post</span>
                </button>
                <button
                  onClick={handleDeletePost}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors font-medium"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete Post</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-gray-700 text-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex items-center space-x-2 mb-6">
              <MessageSquare className="w-6 h-6 " />
              <h3 className="text-2xl font-bold ">
                Comments {comments && `(${comments.length})`}
              </h3>
            </div>

            {/* Add Comment Form */}
            <form onSubmit={handleAddComment} className="mb-8">
              <textarea
                rows="4"
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              />

              <button
                type="submit"
                disabled={submitting}
                className="mt-3 flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all font-medium shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Posting...</span>
                  </>
                ) : (
                  <>
                    <MessageSquare className="w-4 h-4" />
                    <span>Post Comment</span>
                  </>
                )}
              </button>
            </form>

            {/* Comments List */}
            {commentLoading && (
              <div className="text-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-2" />
                <p className="text-gray-600">Loading comments...</p>
              </div>
            )}

            {commentError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                <p className="text-red-600 font-medium">
                  Failed to load comments
                </p>
              </div>
            )}

            {comments && comments.length === 0 && (
              <div className="text-center py-12">
                <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No comments yet</p>
                <p className="text-gray-400 text-sm mt-1">
                  Be the first to comment!
                </p>
              </div>
            )}

            {comments && comments?.length > 0 && (
              <div className="space-y-4">
                {comments?.map((comment) => {
                  const isCommentOwner = comment.author?._id === user?.id;
                  const isCommentAdmin = user?.role === "admin";

                  return (
                    <div
                      key={comment._id}
                      className="border-l-4 border-blue-500 bg-gray-800 rounded-r-lg p-4 hover:bg-gray-900 text-gray-50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <span className=" font-semibold text-sm">
                              {comment.author?.name?.[0]?.toUpperCase() || "?"}
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold ">
                              {comment.author?.name || "Anonymous"}
                            </p>
                            {comment.createdAt && (
                              <p className="text-xs text-gray-400">
                                {new Date(
                                  comment.createdAt
                                ).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {editingCommentId === comment._id ? (
                        <div className="space-y-3">
                          <textarea
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            rows="3"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                          />

                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleUpdateComment(comment._id)}
                              className="flex items-center space-x-1 px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                            >
                              <Save className="w-3.5 h-3.5" />
                              <span>Save</span>
                            </button>
                            <button
                              onClick={() => setEditingCommentId(null)}
                              className="flex items-center space-x-1 px-3 py-1.5 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors text-sm font-medium"
                            >
                              <X className="w-3.5 h-3.5" />
                              <span>Cancel</span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <p className="text-gray-300 mb-3 whitespace-pre-wrap">
                           - {comment.content}
                          </p>

                          {(isCommentOwner || isCommentAdmin) && (
                            <div className="flex space-x-2">
                              <button
                                onClick={() => {
                                  setEditingCommentId(comment._id);
                                  setEditText(comment.content);
                                }}
                                className="flex items-center space-x-1 px-3 py-1 text-blue-600 hover:bg-blue-50 bg-blue-200 rounded-lg transition-colors text-sm font-medium"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                                <span>Edit</span>
                              </button>

                              <button
                                onClick={() => handleDeleteComment(comment._id)}
                                className="flex items-center space-x-1 px-3 py-1 text-red-600 hover:bg-red-50 bg-red-200  rounded-lg transition-colors text-sm font-medium"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Delete</span>
                              </button>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
