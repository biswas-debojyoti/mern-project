import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postFetcher } from "../../api/fetcher";
import { useAuthStore } from "../../store/authStore";

const Login = () => {
    const loginStore = useAuthStore((state) => state.login);

    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const data = await postFetcher("/auth/login", form);

            loginStore(data.token); // Zustand login

            navigate("/");
        } catch (err) {
            setError(err?.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: "50px auto" }}>
            <h2>Login</h2>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <button type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
            <p style={{ marginTop: 10 }}>
                Don’t have an account?{" "}
                <Link to="/register">Register here</Link>
            </p>
        </div>
    );
};

export default Login;

