import { useParams } from "react-router-dom";
import useSWR from "swr";
import { getFetcher } from "../../api/fetcher";
import { useEffect, useState } from "react";
import { postFetcher } from "../../api/fetcher";
import { mutate } from "swr";
import { useAuthStore } from "../../store/authStore";
import { deleteFetcher, putFetcher } from "../../api/fetcher";
import { useNavigate } from "react-router-dom";


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
        content: ""
    });
   
    const { id } = useParams();

    const {
        data: post,
        error: postError,
        isLoading: postLoading
    } = useSWR(id ? `/posts/${id}` : null, getFetcher);

    const {
        data: comments,
        error: commentError,
        isLoading: commentLoading
    } = useSWR(`/comments/post/${id}`, getFetcher);

    useEffect(() => {
        if (post) {
            setPostForm({
                title: post.title,
                content: post.content
            });
        }
    }, [post]);

    if (postLoading) {
        return <p style={{ padding: 20 }}>Loading post...</p>;
    }

    if (postError) {
        return <p style={{ padding: 20, color: "red" }}>Failed to load post</p>;
    }


    const handleAddComment = async (e) => {
        e.preventDefault();

        if (!commentText.trim()) return;

        try {
            setSubmitting(true);

            await postFetcher("/comments", {
                postId: id,
                content: commentText
            });

            setCommentText("");

            // refresh comments list
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
                content: editText
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
        <div style={{ padding: 20 }}>
            {isEditingPost ? (
  <>
    <input
      value={postForm.title}
      onChange={(e) =>
        setPostForm({ ...postForm, title: e.target.value })
      }
    />

    <br /><br />

    <textarea
      rows="6"
      value={postForm.content}
      onChange={(e) =>
        setPostForm({ ...postForm, content: e.target.value })
      }
    />

    <br />

    <button onClick={handleUpdatePost}>Save</button>
    <button onClick={() => setIsEditingPost(false)}>Cancel</button>
  </>
) : (
  <>
    <h2>{post.title}</h2>
    <p>{post.content}</p>
  </>
)}

{(isOwner || isAdmin) && !isEditingPost && (
  <div style={{ marginTop: 10 }}>
    <button onClick={() => setIsEditingPost(true)}>Edit Post</button>
    <button onClick={handleDeletePost} style={{ marginLeft: 5 }}>
      Delete Post
    </button>
  </div>
)}


            <hr />
<h3>Comments</h3>
           

            <form onSubmit={handleAddComment} style={{ marginBottom: 20 }}>
                <textarea
                    rows="3"
                    placeholder="Write a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    style={{ width: "100%", padding: 8 }}
                />

                <br />

                <button type="submit" disabled={submitting}>
                    {submitting ? "Posting..." : "Post Comment"}
                </button>
            </form>

            {commentLoading && <p>Loading comments...</p>}

            {commentError && (
                <p style={{ color: "red" }}>Failed to load comments</p>
            )}

            {comments && comments.length === 0 && <p>No comments yet</p>}

            {comments &&
                comments.map((comment) => {
                    const isOwner = comment.author?._id === user?.id;
                    const isAdmin = user?.role === "admin";

                    return (
                        <div
                            key={comment._id}
                            style={{
                                borderTop: "1px solid #ddd",
                                paddingTop: 10,
                                marginTop: 10
                            }}
                        >
                            <p>
                                <b>{comment.author?.name}</b>
                            </p>

                            {editingCommentId === comment._id ? (
                                <>
                                    <textarea
                                        value={editText}
                                        onChange={(e) => setEditText(e.target.value)}
                                        rows="3"
                                        style={{ width: "100%" }}
                                    />

                                    <button onClick={() => handleUpdateComment(comment._id)}>
                                        Save
                                    </button>
                                    <button onClick={() => setEditingCommentId(null)}>
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <p>{comment.content}</p>
                            )}

                            {(isOwner || isAdmin) && editingCommentId !== comment._id && (
                                <div style={{ marginTop: 5 }}>
                                    <button
                                        onClick={() => {
                                            setEditingCommentId(comment._id);
                                            setEditText(comment.content);
                                        }}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => handleDeleteComment(comment._id)}
                                        style={{ marginLeft: 5 }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    );
                })}


            {/* Comments will come next */}
        </div>
    );
};

export default PostDetails;

