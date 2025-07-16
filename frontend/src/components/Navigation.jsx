import { Link, useLocation } from "react-router-dom";
import { CiHeart, CiSearch } from "react-icons/ci";
import { FiCpu } from "react-icons/fi";
import { useState } from "react";
import Logo from "./Logo";
import { useWishlist } from "../hooks/useWishlist";
import AIRecommendations from "./AIRecommendations";

export default function Navigation() {
  const location = useLocation();
  const { wishlistStats } = useWishlist();
  const [showAIModal, setShowAIModal] = useState(false);

  const navItems = [
    { path: "/", label: "Trang chủ" },
    { path: "/about", label: "Giới thiệu" },
    { path: "/contact", label: "Liên hệ" },
    { path: "/ai-insights", label: "AI Insights" },
    { path: "/class", label: "Khóa học" },
    { path: "/teacher", label: "Giáo viên" },
    { path: "/community", label: "Cộng đồng" },
  ];

  return (
    <nav className=" shadow-md  bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo và Brand */}
          <Logo />

          {/* Navigation Menu */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    location.pathname === item.path
                      ? "text-green-600 "
                      : "text-gray-700 hover:text-green-600 "
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* AI Suggestions Button */}
            <button
              onClick={() => setShowAIModal(true)}
              className="flex items-center space-x-1 text-gray-700 hover:text-green-600 transition-colors bg-green-50 hover:bg-green-100 px-3 py-2 rounded-lg"
              title="Gợi ý khóa học phù hợp"
            >
              <FiCpu size={20} />
              <span className="hidden sm:block text-sm font-medium">
                AI Gợi ý
              </span>
            </button>

            {/* Wishlist Icon */}
            <Link
              to="/wishlist"
              className="relative text-gray-700 hover:text-green-600 transition-colors"
            >
              <CiHeart size={24} />
              {wishlistStats.totalItems > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs px-1 rounded-full min-w-[16px] h-4 flex items-center justify-center">
                  {wishlistStats.totalItems > 99
                    ? "99+"
                    : wishlistStats.totalItems}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-green-600 focus:outline-none focus:text-green-600">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* AI Recommendations Modal */}
      {showAIModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto relative">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <FiCpu className="text-green-600" />
                Gợi ý khóa học phù hợp với bạn
              </h2>
              <button
                onClick={() => setShowAIModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <AIRecommendations limit={6} />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
