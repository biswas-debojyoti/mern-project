import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postFetcher } from "../../api/fetcher";
import { useAuthStore } from "../../store/authStore";
import {
  Mail,
  Lock,
  LogIn,
  AlertCircle,
  Loader2,
  Eye,
  EyeOff,
} from "lucide-react";

const Login = () => {
   const navigate = useNavigate();
  const { login, isAuthenticated, user } = useAuthStore();
  const loginStore = useAuthStore((state) => state.login);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await postFetcher("/auth/login", form);
      loginStore(data.token);
      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  
useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [isAuthenticated, user, navigate]);


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Logo/Brand Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-lg mb-4">
            <LogIn className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-600">Sign in to continue to BlogHub</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            {/* Error Alert */}
            {error && (
              <div className="mb-6 bg-red-50 border-l-4 border-red-500 rounded-lg p-4 flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-800 font-medium text-sm">
                    Login Failed
                  </p>
                  <p className="text-red-600 text-sm mt-1">{error}</p>
                </div>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Logging in...</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    <span>Sign In</span>
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="mt-6 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  New to BlogHub?
                </span>
              </div>
            </div>

            {/* Register Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 transition-all"
                >
                  Create one now
                </Link>
              </p>
            </div>
          </div>

          {/* Bottom Accent */}
          <div className="h-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"></div>
        </div>

        {/* Footer Text */}
        <p className="mt-8 text-center text-sm text-gray-500">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Login;
