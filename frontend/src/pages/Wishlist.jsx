import React from "react";
import { useWishlist } from "../hooks/useWishlist";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiTrash2, FiShoppingCart } from "react-icons/fi";
import { toast } from "react-toastify";

export default function Wishlist() {
  const {
    wishlist,
    removeFromWishlist,
    clearWishlist,
    isLoading,
    wishlistStats,
  } = useWishlist();

  const handleRemoveItem = (productId) => {
    const result = removeFromWishlist(productId);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  const handleClearAll = () => {
    if (
      window.confirm("Bạn có chắc chắn muốn xóa toàn bộ danh sách yêu thích?")
    ) {
      const result = clearWishlist();
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
            >
              <FiArrowLeft size={20} className="mr-2" />
              Quay lại
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Danh sách yêu thích
              </h1>
              <p className="text-gray-600 mt-1">
                {wishlistStats.totalItems} sản phẩm đã lưu
              </p>
            </div>
          </div>

          {wishlist.length > 0 && (
            <button
              onClick={handleClearAll}
              disabled={isLoading}
              className="flex items-center px-4 py-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
            >
              <FiTrash2 size={16} className="mr-2" />
              Xóa tất cả
            </button>
          )}
        </div>

        {/* Categories Summary */}
        {wishlistStats.categories.length > 0 && (
          <div className="mb-8 p-4 bg-white rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Danh mục yêu thích:
            </h3>
            <div className="flex flex-wrap gap-2">
              {wishlistStats.categories.map((category, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Content */}
        {wishlist.length === 0 ? (
          // Empty state
          <div className="text-center py-16">
            <div className="mb-6">
              <FiShoppingCart size={64} className="mx-auto text-gray-300" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Chưa có sản phẩm yêu thích nào
            </h3>
            <p className="text-gray-500 mb-6">
              Hãy khám phá và thêm những sản phẩm bạn quan tâm vào danh sách yêu
              thích
            </p>
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
            >
              Khám phá sản phẩm
            </Link>
          </div>
        ) : (
          // Products grid
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.map((product) => (
              <div key={product.id} className="relative group">
                <ProductCard product={product} />

                {/* Remove button overlay */}
                <button
                  onClick={() => handleRemoveItem(product.id)}
                  disabled={isLoading}
                  className="absolute top-2 right-2 p-2 bg-white/90 hover:bg-white text-red-600 hover:text-red-800 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-200 disabled:opacity-50"
                  title="Xóa khỏi danh sách yêu thích"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Recently Added */}
        {wishlistStats.recentlyAdded.length > 0 && wishlist.length > 0 && (
          <div className="mt-12 p-6 bg-white rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Đã thêm gần đây
            </h3>
            <div className="space-y-3">
              {wishlistStats.recentlyAdded.map((product, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 text-sm"
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">{product.name}</span>
                  <span className="text-gray-500">
                    {new Date(product.addedAt).toLocaleDateString("vi-VN")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
