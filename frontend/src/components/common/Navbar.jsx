

import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { PenSquare, Home, ShieldCheck, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <Link
            to="/"
            className="flex items-center space-x-2 text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 transition-all"
          >
            <Home className="w-6 h-6 text-blue-600" />
            <span>BlogHub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {isAuthenticated ? (
              <>
                {user?.role === "admin" && (
                  <>
                  <Link
                    to="/admin"
                    className="flex items-center space-x-1 px-4 py-2 rounded-lg text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors font-medium"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Admin Dashboard</span>
                  </Link>
                  </>

                )}
                <Link
                  to="/create-post"
                  className="flex items-center space-x-1 px-4 py-2 rounded-lg text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all font-medium shadow-sm"
                >
                  <PenSquare className="w-4 h-4" />
                  <span>Create Post</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-4 py-2 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors font-medium ml-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-lg text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all font-medium shadow-sm"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-2">
              {isAuthenticated ? (
                <>
                  {user?.role === "admin" && (
                    <Link
                      to="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center space-x-2 px-4 py-3 rounded-lg text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors font-medium"
                    >
                      <ShieldCheck className="w-5 h-5" />
                      <span>Admin Dashboard</span>
                    </Link>
                  )}
                  <Link
                    to="/create-post"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center space-x-2 px-4 py-3 rounded-lg text-white bg-gradient-to-r from-blue-600 to-blue-700 transition-all font-medium"
                  >
                    <PenSquare className="w-5 h-5" />
                    <span>Create Post</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-4 py-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors font-medium text-left"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-3 rounded-lg text-white bg-gradient-to-r from-blue-600 to-blue-700 transition-all font-medium text-center"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
