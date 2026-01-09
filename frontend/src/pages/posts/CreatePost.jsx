import { useState } from "react";
import { FileText, ArrowLeft } from "lucide-react";
import { postFetcher } from "../../api/fetcher";
import { mutate } from "swr";
const CreatePost = () => {
  const [form, setForm] = useState({
    title: "",
    content: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      await postFetcher("/posts", form);
      mutate("/posts");

      // Simulating API call
      setTimeout(() => {
        alert("Post created successfully!");
        setForm({ title: "", content: "" });
      }, 1000);
    } catch (err) {
      setError("Failed to create post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-400" />
            </div>
            <h1 className="text-3xl font-bold text-white">Create Post</h1>
          </div>
          <p className="text-gray-400 ml-13">Share your thoughts and ideas</p>
        </div>

        {/* Form Card */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-2xl p-8">
          <div onSubmit={handleSubmit} className="space-y-6">
            {/* Title Input */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Post Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Enter an engaging title..."
                value={form.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition outline-none"
              />
            </div>

            {/* Content Input */}
            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Post Content
              </label>
              <textarea
                id="content"
                name="content"
                placeholder="Write your post content here..."
                rows="8"
                value={form.content}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition outline-none resize-none"
              />
              <p className="text-xs text-gray-400 mt-2">
                {form.content.length} characters
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Button Group */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={handleSubmit}
                disabled={loading || !form.title.trim() || !form.content.trim()}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Creating...
                  </>
                ) : (
                  "Create Post"
                )}
              </button>

              <button
                onClick={() => setForm({ title: "", content: "" })}
                type="button"
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-gray-300 font-semibold rounded-lg transition"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-blue-300 text-sm">
            💡 Tip: Write clear, engaging titles and detailed content to get
            more readers!
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
