import useSWR from "swr";
import { getFetcher } from "../../api/fetcher";
import {
  Users,
  FileText,
  MessageSquare,
  TrendingUp,
  Shield,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { data, error, isLoading } = useSWR("/admin/dashboard", getFetcher);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="text-center">
          <Loader2 className="w-16 h-16 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 text-lg font-medium">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="text-center">
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-8 max-w-md">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-red-600" />
            </div>
            <p className="text-red-600 font-semibold text-xl mb-2">
              Failed to load dashboard
            </p>
            <p className="text-red-500 text-sm">
              Please check your permissions and try again
            </p>
          </div>
        </div>
      </div>
    );
  }

  const stats = [
    {
      title: "Total Users",
      value: data.users,
      icon: Users,
      url: "/users",
      gradient: "from-blue-500 to-blue-600",
      bgGradient: "from-blue-50 to-blue-100",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Total Posts",
      value: data.posts,
      icon: FileText,
      url: "/",
      gradient: "from-purple-500 to-purple-600",
      bgGradient: "from-purple-50 to-purple-100",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      title: "Total Comments",
      value: data.comments,
      icon: MessageSquare,
      url: "/#",
      gradient: "from-pink-500 to-pink-600",
      bgGradient: "from-pink-50 to-pink-100",
      iconBg: "bg-pink-100",
      iconColor: "text-pink-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-700 to-pink-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-800 transition mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-100 via-purple-600 to-pink-600 ">
                Admin Dashboard
              </h1>
              <p className="text-gray-200 mt-1">
                Overview of your platform statistics
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="group relative bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                {/* Gradient Background */}
                <div
                  className={`absolute inset-0 bg-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />

                {/* Content */}
                <Link to={stat.url}>
                  <div className="relative p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`w-14 h-14 ${stat.iconBg} rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon className={`w-7 h-7 ${stat.iconColor}`} />
                      </div>
                      <div className="flex items-center space-x-1 text-green-600">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-xs font-semibold">Live</span>
                      </div>
                    </div>

                    <h3 className="text-gray-600 text-sm font-medium mb-2 group-hover:text-gray-700">
                      {stat.title}
                    </h3>

                    <div className="flex items-end justify-between">
                      <p
                        className={`text-4xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}
                      >
                        {stat.value.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </Link>

                {/* Bottom Accent Line */}
                <div className={`h-1.5 bg-gradient-to-r ${stat.gradient}`} />
              </div>
            );
          })}
        </div>


        {/* Additional Info Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Activity Summary Card */}
          <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl shadow-lg p-6 text-white">
            <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>Admin Summary</span>
            </h3>
            <div className="space-y-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <p className="text-sm opacity-90 mb-1">Total Content Items</p>
                <p className="text-3xl font-bold">
                  {(data.posts + data.comments).toLocaleString()}
                </p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <p className="text-sm opacity-90 mb-1">Community Size</p>
                <p className="text-3xl font-bold">
                  {data.users.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
