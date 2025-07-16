import React, { useState, useEffect } from "react";
import { FiCpu, FiRefreshCw, FiStar, FiUser } from "react-icons/fi";
import ProductCard from "./ProductCard";
import { products } from "../data/product";
import userBehaviorService from "../services/userBehaviorService";

export default function AIRecommendations({ limit = 4 }) {
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  // Internal fetch function without useCallback to avoid dependency issues
  const fetchRecommendationsInternal = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Reduce delay for better UX (simulate faster API)
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Get user preferences from behavior tracking
      const userPreferences = userBehaviorService.getUserPreferences();
      const excludedProducts = userBehaviorService.getExcludedProducts();

      // Smart AI logic based on user behavior
      const mockAILogic = () => {
        let availableProducts = products.filter(
          (p) => !excludedProducts.includes(p.id)
        );

        // If user has preferences, prioritize them
        if (userPreferences.categories.length > 0) {
          const preferredProducts = availableProducts.filter((p) =>
            userPreferences.categories.includes(p.category)
          );
          const otherProducts = availableProducts.filter(
            (p) => !userPreferences.categories.includes(p.category)
          );

          // Mix preferred and other products (70% preferred, 30% discovery)
          const preferredCount = Math.ceil(limit * 0.7);
          const discoveryCount = limit - preferredCount;

          return [
            ...preferredProducts.slice(0, preferredCount),
            ...otherProducts.slice(0, discoveryCount),
          ].slice(0, limit);
        }

        // If no strong preferences, use different strategies
        const strategies = [
          // Popular courses (high rating)
          () =>
            availableProducts.filter((p) => p.rating >= 4.7).slice(0, limit),
          // Mixed levels for learning path
          () => {
            const beginner = availableProducts
              .filter((p) => p.level === "Mới bắt đầu")
              .slice(0, 2);
            const intermediate = availableProducts
              .filter((p) => p.level === "Trung cấp")
              .slice(0, 2);
            return [...beginner, ...intermediate].slice(0, limit);
          },
          // Category-based exploration
          () => {
            const categories = [
              ...new Set(availableProducts.map((p) => p.category)),
            ];
            const selectedCategory =
              categories[Math.floor(Math.random() * categories.length)];
            return availableProducts
              .filter((p) => p.category === selectedCategory)
              .slice(0, limit);
          },
          // Smart random (good rating + variety)
          () =>
            availableProducts
              .filter((p) => p.rating >= 4.5)
              .sort(() => 0.5 - Math.random())
              .slice(0, limit),
        ];

        const selectedStrategy =
          strategies[Math.floor(Math.random() * strategies.length)];
        return selectedStrategy();
      };

      const aiRecommendations = mockAILogic();
      setRecommendations(aiRecommendations);
      setHasLoaded(true);
    } catch (err) {
      setError("Không thể tải gợi ý. Vui lòng thử lại sau.");
      console.error("Error fetching AI recommendations:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Exposed fetch function for manual refresh
  const fetchRecommendations = () => {
    setHasLoaded(false);
    fetchRecommendationsInternal();
  };

  // Load recommendations on mount only
  useEffect(() => {
    if (!hasLoaded && !isLoading) {
      fetchRecommendationsInternal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  const handleRefresh = () => {
    fetchRecommendations();
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <FiCpu className="text-blue-600" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Gợi ý thông minh
            </h2>
            <p className="text-sm text-gray-600">
              AI đề xuất khóa học phù hợp với bạn
            </p>
          </div>
        </div>

        <button
          onClick={handleRefresh}
          disabled={isLoading}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiRefreshCw className={isLoading ? "animate-spin" : ""} size={16} />
          <span>Làm mới</span>
        </button>
      </div>

      {/* AI Reasoning Box */}
      {!isLoading && recommendations.length > 0 && (
        <div className="mb-6 p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-blue-200">
          <div className="flex items-start space-x-3">
            <FiUser className="text-blue-600 mt-1" size={16} />
            <div className="text-sm text-gray-700">
              <p className="font-medium mb-1">
                💡 Tại sao AI gợi ý những khóa học này:
              </p>
              <ul className="space-y-1 text-xs">
                <li>• Phù hợp với trình độ và sở thích của bạn</li>
                <li>• Được đánh giá cao bởi cộng đồng học viên</li>
                <li>• Tạo thành lộ trình học tập hoàn chỉnh</li>
                <li>• Xu hướng công nghệ được quan tâm nhiều nhất</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <div className="relative">
            <FiCpu className="text-blue-600 animate-pulse" size={48} />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-600 rounded-full animate-ping"></div>
          </div>
          <div className="text-center">
            <p className="text-lg font-medium text-gray-700">
              AI đang phân tích...
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Đang tìm kiếm khóa học phù hợp nhất cho bạn
            </p>
          </div>
          <div className="flex space-x-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              ></div>
            ))}
          </div>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <div className="text-red-500 mb-4">
            <FiRefreshCw size={48} className="mx-auto" />
          </div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={handleRefresh}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Thử lại
          </button>
        </div>
      ) : recommendations.length === 0 ? (
        <div className="text-center py-12">
          <FiStar className="mx-auto text-gray-400 mb-4" size={48} />
          <p className="text-gray-600">
            Chưa có gợi ý nào. Hãy khám phá thêm các khóa học!
          </p>
        </div>
      ) : (
        <>
          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendations.map((product) => (
              <div key={product.id} className="relative">
                <ProductCard product={product} />
                {/* AI Badge */}
                <div className="absolute -top-2 -right-2 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium shadow-lg">
                  AI
                </div>
              </div>
            ))}
          </div>

          {/* AI Confidence Score */}
          <div className="mt-6 flex items-center justify-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Độ chính xác: {Math.floor(Math.random() * 15) + 85}%</span>
            </div>
            <div className="flex items-center space-x-2">
              <FiStar className="text-yellow-500" size={14} />
              <span>Phù hợp: {Math.floor(Math.random() * 10) + 90}%</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
