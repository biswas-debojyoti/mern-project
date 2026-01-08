import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postFetcher } from "../../api/fetcher";
import { mutate } from "swr";

const CreatePost = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    content: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await postFetcher("/posts", form);

      mutate("/posts"); // refresh list
      navigate("/");
    } catch (err) {
      alert("Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Create Post</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Post title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <br /><br />

        <textarea
          name="content"
          placeholder="Post content"
          rows="6"
          value={form.content}
          onChange={handleChange}
          required
        />

        <br /><br />

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
