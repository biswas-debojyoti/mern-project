import useSWR from "swr";
import { getFetcher } from "../../api/fetcher";

const Dashboard = () => {
  const { data, error, isLoading } = useSWR(
    "/admin/dashboard",
    getFetcher
  );

  if (isLoading) {
    return <p style={{ padding: 20 }}>Loading dashboard...</p>;
  }

  if (error) {
    return (
      <p style={{ padding: 20, color: "red" }}>
        Failed to load dashboard
      </p>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin Dashboard</h2>

      <div
        style={{
          display: "flex",
          gap: 20,
          marginTop: 20
        }}
      >
        <div style={cardStyle}>
          <h3>Total Users</h3>
          <p>{data.users}</p>
        </div>

        <div style={cardStyle}>
          <h3>Total Posts</h3>
          <p>{data.posts}</p>
        </div>

        <div style={cardStyle}>
          <h3>Total Comments</h3>
          <p>{data.comments}</p>
        </div>
      </div>
    </div>
  );
};

const cardStyle = {
  border: "1px solid #ddd",
  padding: 20,
  width: 200,
  textAlign: "center"
};

export default Dashboard;
