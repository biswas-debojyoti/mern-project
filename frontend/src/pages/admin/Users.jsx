import useSWR from "swr";
import { getFetcher } from "../../api/fetcher";

const Users = () => {
  const { data, error, isLoading } = useSWR(
    "/admin/users",
    getFetcher
  );

  if (isLoading) {
    return <p className="p-6">Loading users...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-500">Failed to load users</p>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          All Users ({data.length})
        </h1>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-700">
            <thead className="bg-gray-800">
              <tr>
                <th className="p-3 border border-gray-700">Name</th>
                <th className="p-3 border border-gray-700">Email</th>
                <th className="p-3 border border-gray-700">Role</th>
                <th className="p-3 border border-gray-700">Created At</th>
              </tr>
            </thead>

            <tbody>
              {data.map((user) => (
                <tr
                  key={user._id}
                  className="text-center hover:bg-gray-800"
                >
                  <td className="p-3 border border-gray-700">
                    {user.name}
                  </td>
                  <td className="p-3 border border-gray-700">
                    {user.email}
                  </td>
                  <td className="p-3 border border-gray-700 capitalize">
                    {user.role}
                  </td>
                  <td className="p-3 border border-gray-700">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;


