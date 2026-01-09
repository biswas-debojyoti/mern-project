import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import PostList from "../pages/posts/PostList";
import PostDetails from "../pages/posts/PostDetails";
import Dashboard from "../pages/admin/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import CreatePost from "../pages/posts/CreatePost";
import { useAuthStore } from "../store/authStore";
import Users from "../pages/admin/Users";

const AppRoutes = () => {   
    const { isAuthenticated, user, logout } = useAuthStore();
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <PostList />
                    </ProtectedRoute>
                }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
                path="/admin"
                element={
                    <AdminRoute>
                        <Dashboard />
                    </AdminRoute>
                }
            />
            <Route
                path="/create-post"
                element={
                    <ProtectedRoute>
                        <CreatePost />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/posts/:id"
                element={
                    <ProtectedRoute>
                        <PostDetails />
                    </ProtectedRoute>
                }
            />
            <Route
  path="/users"
  element={
    <AdminRoute>
      <Users />
    </AdminRoute>
  }
/>
        </Routes>
    );
};

export default AppRoutes;

