import useSWR from "swr";
import { Link } from "react-router-dom";
import { getFetcher } from "../../api/fetcher";

const PostList = () => {
  const { data, error, isLoading } = useSWR("/posts", getFetcher);

  if (isLoading) {
    return <p style={{ padding: 20 }}>Loading posts...</p>;
  }

  if (error) {
    return <p style={{ padding: 20, color: "red" }}>Failed to load posts</p>;
  }

  if (!data || data.length === 0) {
    return <p style={{ padding: 20 }}>No posts found</p>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>All Blog Posts</h2>

      {data.map((post) => (
        <div
          key={post._id}
          style={{
            border: "1px solid #ddd",
            padding: 15,
            marginBottom: 15
          }}
        >
          <h3>{post.title}</h3>

          <p>
            By <b>{post.author?.name}</b>
          </p>

          <p>
            {post.content.length > 120
              ? post.content.slice(0, 120) + "..."
              : post.content}
          </p>

          <Link to={`/posts/${post._id}`}>Read More</Link>
        </div>
      ))}
    </div>
  );
};

export default PostList;
