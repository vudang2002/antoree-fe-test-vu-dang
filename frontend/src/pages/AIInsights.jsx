import React from "react";
import userBehaviorService from "../services/userBehaviorService";
import {
  FiTrendingUp,
  FiEye,
  FiSearch,
  FiHeart,
  FiSettings,
} from "react-icons/fi";

export default function AIInsights() {
  const analytics = userBehaviorService.getAnalytics();
  const preferences = userBehaviorService.getUserPreferences();

  const clearData = () => {
    if (
      window.confirm(
        "Bạn có chắc chắn muốn xóa toàn bộ dữ liệu hành vi? Điều này sẽ ảnh hưởng đến chất lượng gợi ý AI."
      )
    ) {
      userBehaviorService.clearBehavior();
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            AI Insights & Analytics
          </h1>
          <p className="text-gray-600">
            Thông tin chi tiết về hành vi học tập và sở thích của bạn
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FiTrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Tổng tương tác
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {analytics.totalInteractions}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <FiEye className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Sản phẩm đã xem
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {analytics.viewedProductsCount}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FiSearch className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Lần tìm kiếm
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {analytics.searchQueriesCount}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <FiHeart className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">7 ngày qua</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {analytics.last7DaysInteractions}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* User Preferences */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Sở thích được phân tích
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Danh mục yêu thích
                </label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {preferences.categories.length > 0 ? (
                    preferences.categories.map((category, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                      >
                        {category}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500 text-sm">
                      Chưa có dữ liệu
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">
                  Trình độ ưa thích
                </label>
                <div className="mt-2">
                  {preferences.level ? (
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {preferences.level}
                    </span>
                  ) : (
                    <span className="text-gray-500 text-sm">
                      Chưa có dữ liệu
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">
                  Khoảng giá ưa thích
                </label>
                <div className="mt-2">
                  {preferences.priceRange ? (
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                      {preferences.priceRange}
                    </span>
                  ) : (
                    <span className="text-gray-500 text-sm">
                      Chưa có dữ liệu
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Danh mục được quan tâm
            </h3>
            <div className="space-y-3">
              {Object.entries(analytics.favoriteCategories).length > 0 ? (
                Object.entries(analytics.favoriteCategories)
                  .sort(([, a], [, b]) => b - a)
                  .slice(0, 5)
                  .map(([category, count]) => (
                    <div
                      key={category}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm text-gray-700">{category}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{
                              width: `${Math.min(
                                (count /
                                  Math.max(
                                    ...Object.values(
                                      analytics.favoriteCategories
                                    )
                                  )) *
                                  100,
                                100
                              )}%`,
                            }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-500 w-8">
                          {count}
                        </span>
                      </div>
                    </div>
                  ))
              ) : (
                <p className="text-gray-500 text-sm">
                  Chưa có dữ liệu về danh mục
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Hoạt động gần đây
          </h3>
          <div className="space-y-3">
            {preferences.recentViews.length > 0 ? (
              preferences.recentViews.slice(0, 5).map((view, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 border border-gray-100 rounded-lg"
                >
                  <div className="p-2 bg-gray-100 rounded">
                    <FiEye className="h-4 w-4 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {view.product.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(view.timestamp).toLocaleDateString("vi-VN")}
                    </p>
                  </div>
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                    {view.product.category}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">Chưa có hoạt động nào</p>
            )}
          </div>
        </div>

        {/* Search History */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Lịch sử tìm kiếm
          </h3>
          <div className="space-y-2">
            {preferences.searchHistory.length > 0 ? (
              preferences.searchHistory.slice(0, 5).map((search, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 border border-gray-100 rounded"
                >
                  <span className="text-sm text-gray-700">
                    "{search.query}"
                  </span>
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <span>{search.resultsCount} kết quả</span>
                    <span>•</span>
                    <span>
                      {new Date(search.timestamp).toLocaleDateString("vi-VN")}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">Chưa có lịch sử tìm kiếm</p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <FiSettings className="h-5 w-5 mr-2" />
            Quản lý dữ liệu
          </h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={clearData}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Xóa toàn bộ dữ liệu
            </button>
            <div className="text-sm text-gray-600 flex items-center">
              <strong>Lưu ý:</strong> Dữ liệu này được lưu trữ trên trình duyệt
              của bạn và giúp cải thiện chất lượng gợi ý AI.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
