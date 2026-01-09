// import { useState } from "react";
// import useSWR from "swr";
// import { Link } from "react-router-dom";
// import { getFetcher } from "../../api/fetcher";

// const LIMIT = 5;

// const PostList = () => {
//   const [page, setPage] = useState(1);

//   const { data, error, isLoading } = useSWR(
//     `/posts?page=${page}&limit=${LIMIT}`,
//     getFetcher
//   );

//   if (isLoading) return <p style={{ padding: 20 }}>Loading posts...</p>;
//   if (error) return <p style={{ color: "red" }}>Failed to load posts</p>;

//   const { posts, pagination } = data;

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>All Blog Posts</h2>

//       {posts.map((post) => (
//         <div
//           key={post._id}
//           style={{
//             border: "1px solid #ddd",
//             padding: 15,
//             marginBottom: 15,
//           }}
//         >
//           <h3>{post.title}</h3>
//           <p>
//             By <b>{post.author?.name}</b>
//           </p>
//           <p>
//             {post.content.length > 120
//               ? post.content.slice(0, 120) + "..."
//               : post.content}
//           </p>
//           <Link to={`/posts/${post._id}`}>Read More</Link>
//         </div>
//       ))}

//       {/* Pagination Controls */}
//       <div style={{ marginTop: 20 }}>
//         <button disabled={page === 1} onClick={() => setPage(page - 1)}>
//           Prev
//         </button>

//         <span style={{ margin: "0 10px" }}>
//           Page {pagination.currentPage} of {pagination.totalPages}
//         </span>

//         <button
//           disabled={page === pagination.totalPages}
//           onClick={() => setPage(page + 1)}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PostList;

import { useState } from "react";
import useSWR from "swr";
import { Link } from "react-router-dom";
import { getFetcher } from "../../api/fetcher";
import { ArrowRight, BookOpen, Calendar, User } from "lucide-react";
import dayjs from "dayjs";

const LIMIT = 5;

const PostList = () => {
  const [page, setPage] = useState(1);

  const { data, error, isLoading } = useSWR(
    `/posts?page=${page}&limit=${LIMIT}`,
    getFetcher
  );

  if (isLoading) {
    return (
      <div className="flex bg-gray-900 h-screen justify-center items-center h-60 text-gray-400">
        Loading posts... 
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center mt-10">Failed to load posts</div>
    );
  }

  const { posts, pagination } = data;
  console.log("postsposts", posts);

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">All Blog Posts</h1>

        {/* GRID */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts?.map((post) => (
            <div
              key={post._id}
              className="border border-gray-700 rounded-lg bg-gray-800 hover:border-gray-500 transition overflow-hidden"
            >
              <div className="flex items-start gap-6 p-6">
                {/* Icon Section */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-blue-400" />
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-grow">
                  <div className="flex gap-4 text-sm text-gray-400 mb-3">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {post.author?.name}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {dayjs(post.createdAt).format("DD-MM-YYYY")}
                    </div>
                  </div>
                  <h2 className="text-xl font-semibold text-white mb-2">
                    {post.title}
                  </h2>

                  <p className="text-gray-300 mb-4">
                    {post.content.length > 120
                      ? post.content.slice(0, 120) + "..."
                      : post.content}
                  </p>

                  <a
                    href={`/posts/${post._id}`}
                    className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition"
                  >
                    Read More <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* PAGINATION */}
        <div className="flex justify-center items-center gap-4 mt-10">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 bg-gray-700 rounded disabled:opacity-40"
          >
            Prev
          </button>

          <span className="text-gray-400">
            Page {pagination?.currentPage} of {pagination?.totalPages}
          </span>

          <button
            disabled={page === pagination?.totalPages}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 bg-gray-700 rounded disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostList;
