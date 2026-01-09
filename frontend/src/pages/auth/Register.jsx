import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { postFetcher } from "../../api/fetcher";
import {
  User,
  Mail,
  Lock,
  UserPlus,
  AlertCircle,
  Loader2,
  Eye,
  EyeOff,
  CheckCircle,
} from "lucide-react";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
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
      await postFetcher("/auth/register", form);
      navigate("/login");
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  // Password strength indicator
  const getPasswordStrength = () => {
    const password = form.password;
    if (!password) return { strength: 0, label: "", color: "" };

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    const levels = [
      { strength: 1, label: "Weak", color: "bg-red-500" },
      { strength: 2, label: "Fair", color: "bg-yellow-500" },
      { strength: 3, label: "Good", color: "bg-blue-500" },
      { strength: 4, label: "Strong", color: "bg-green-500" },
    ];

    return levels.find((l) => l.strength === strength) || levels[0];
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Logo/Brand Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-lg mb-4">
            <UserPlus className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Create Account
          </h2>
          <p className="text-gray-600">
            Join BlogHub and start sharing your stories
          </p>
        </div>

        {/* Register Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            {/* Error Alert */}
            {error && (
              <div className="mb-6 bg-red-50 border-l-4 border-red-500 rounded-lg p-4 flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-800 font-medium text-sm">
                    Registration Failed
                  </p>
                  <p className="text-red-600 text-sm mt-1">{error}</p>
                </div>
              </div>
            )}

            {/* Register Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
                  />
                </div>
              </div>

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
                    placeholder="Create a strong password"
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

                {/* Password Strength Indicator */}
                {form.password && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-600">
                        Password Strength
                      </span>
                      <span
                        className={`text-xs font-medium ${
                          passwordStrength.strength === 4
                            ? "text-green-600"
                            : passwordStrength.strength === 3
                            ? "text-blue-600"
                            : passwordStrength.strength === 2
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        {passwordStrength.label}
                      </span>
                    </div>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4].map((level) => (
                        <div
                          key={level}
                          className={`h-1.5 flex-1 rounded-full transition-all ${
                            level <= passwordStrength.strength
                              ? passwordStrength.color
                              : "bg-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}
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
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5" />
                    <span>Create Account</span>
                  </>
                )}
              </button>
            </form>

            {/* Features List */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-600 mb-3 font-medium">
                What you'll get:
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-xs text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>Create and share unlimited blog posts</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>Engage with the community through comments</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>Personalized profile and dashboard</span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="mt-6 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Already a member?
                </span>
              </div>
            </div>

            {/* Login Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 transition-all"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>

          {/* Bottom Accent */}
          <div className="h-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"></div>
        </div>

        {/* Footer Text */}
        <p className="mt-8 text-center text-sm text-gray-500">
          By creating an account, you agree to our Terms of Service and Privacy
          Policy
        </p>
      </div>
    </div>
  );
};

export default Register;
