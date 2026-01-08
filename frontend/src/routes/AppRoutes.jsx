import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import PostList from "../pages/posts/PostList";
import PostDetails from "../pages/posts/PostDetails";
import Dashboard from "../pages/admin/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import CreatePost from "../pages/posts/CreatePost";

const AppRoutes = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <PostList />
                    </ProtectedRoute>
                }
            />      <Route path="/login" element={<Login />} />
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
        </Routes>
    );
};

export default AppRoutes;

