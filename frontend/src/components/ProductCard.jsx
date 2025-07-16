import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiHeart, FiEye } from "react-icons/fi";
import ProductTags from "./product/ProductTags";
import ProductModal from "./ProductModal";
import { useWishlist } from "../hooks/useWishlist";
import userBehaviorService from "../services/userBehaviorService";
import { toast } from "react-toastify";

export default function ProductCard({ product }) {
  const [showModal, setShowModal] = useState(false);
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);

  // Single validation check for product
  if (!product || typeof product !== "object" || !product.id) {
    console.warn("ProductCard: Invalid product data", product);
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600 text-sm">Dữ liệu sản phẩm không hợp lệ</p>
      </div>
    );
  }

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlistLoading(true);

    try {
      const result = toggleWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        level: product.level,
        shortDescription: product.shortDescription,
        longDescription: product.longDescription,
        author: product.author,
        rating: product.rating,
        students: product.students,
        duration: product.duration,
      });

      if (result.success) {
        // Track wishlist behavior
        if (result.action === "added") {
          userBehaviorService.trackWishlistAdd(product.id, product);
        }
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Wishlist toggle error:", error);
      toast.error("Có lỗi xảy ra");
    } finally {
      setIsWishlistLoading(false);
    }
  };

  const handleShowModal = (e) => {
    e.preventDefault();
    // Track product view
    userBehaviorService.trackProductView(product.id, product);
    setShowModal(true);
  };

  const isProductInWishlist = isInWishlist(product.id);
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Course Image */}
      <div className="relative group">
        <img
          src={product.image || "images/default.jpg"}
          alt={product.name || "Khóa học"}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.src = "images/default.jpg";
          }}
        />

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          disabled={isWishlistLoading}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
            isProductInWishlist
              ? "bg-red-100 text-red-600 hover:bg-red-200"
              : "bg-white/80 text-gray-600 hover:bg-white hover:text-red-600"
          } opacity-0 group-hover:opacity-100 disabled:opacity-50`}
          title={
            isProductInWishlist ? "Xóa khỏi yêu thích" : "Thêm vào yêu thích"
          }
        >
          <FiHeart
            size={16}
            className={isProductInWishlist ? "fill-current" : ""}
          />
        </button>

        {/* Duration Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-medium text-gray-700">
            {product.time}
          </span>
        </div>

        {/* Level Badge */}
        <div className="absolute bottom-3 left-3">
          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-xs font-medium">
            {product.level || "Chưa xác định"}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 space-y-3">
        {/* Course Title */}
        <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 leading-tight">
          {product.name || "Tên khóa học"}
        </h3>

        {/* Course Description */}
        <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
          {product.longDescription ||
            product.shortDescription ||
            "Mô tả khóa học"}
        </p>

        {/* Category Tags */}
        <ProductTags product={product} />

        {/* Author Info */}
        <div className="flex items-center space-x-2 pt-2">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-xs font-medium text-gray-600">
              {product.author && typeof product.author === "string"
                ? product.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                : "A"}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              By {product.author || "Tác giả"}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {product.authorDescription || ""}
            </p>
          </div>
        </div>

        {/* Rating and Stats */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating || 0)
                      ? "text-yellow-400"
                      : "text-gray-200"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm font-medium text-gray-700">
              {product.rating || 0}
            </span>
          </div>

          {/* Price */}
          <div className="text-right">
            <p className="text-lg font-bold text-gray-900">
              {(product.price || 0).toLocaleString()}đ
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-3 flex space-x-2">
          <button
            onClick={handleShowModal}
            className="flex-1 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200"
          >
            <FiEye className="mr-2" size={16} />
            Xem chi tiết
          </button>
          <Link
            to={`/product/${product.id}`}
            className="flex-1 block bg-orange-500 hover:bg-orange-600 text-white font-medium py-2.5 px-4 rounded-lg text-center transition-colors duration-200"
          >
            Đăng ký
          </Link>
        </div>
      </div>

      {/* Product Modal */}
      <ProductModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        product={product}
      />
    </div>
  );
}
