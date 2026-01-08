import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav style={{ padding: 10, borderBottom: "1px solid #ccc" }}>
            <Link to="/">Home</Link>

            <span style={{ float: "right" }}>
                {isAuthenticated ? (
                    <>
                        {user?.role === "admin" && (
                            <>
                                <Link to="/admin">Admin</Link>{" | "}
                            </>
                        )}
                        <Link to="/create-post">Create Post</Link>{" | "}

                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>{" | "}
                        <Link to="/register">Register</Link>
                    </>
                )}
            </span>

        </nav>
    );
};

export default Navbar;
