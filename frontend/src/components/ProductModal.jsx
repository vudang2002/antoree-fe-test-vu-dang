import React, { useState } from "react";
import { FiX, FiHeart, FiShoppingCart, FiShare2 } from "react-icons/fi";
import { useWishlist } from "../hooks/useWishlist";
import { toast } from "react-toastify";

export default function ProductModal({ isOpen, onClose, product }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);

  if (!isOpen || !product) return null;

  const handleWishlistToggle = async () => {
    setIsWishlistLoading(true);
    try {
      const result = await toggleWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        level: product.level,
      });

      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("Có lỗi xảy ra");
    } finally {
      setIsWishlistLoading(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const isProductInWishlist = isInWishlist(product.id);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            Chi tiết sản phẩm
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={product.images?.[selectedImage] || product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnail Images */}
              {product.images && product.images.length > 1 && (
                <div className="flex space-x-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === idx
                          ? "border-green-500"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Title and Category */}
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    {product.category}
                  </span>
                  {product.level && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      {product.level}
                    </span>
                  )}
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>
                {product.instructor && (
                  <p className="text-gray-600">
                    Giảng viên: {product.instructor}
                  </p>
                )}
              </div>

              {/* Price */}
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-green-600">
                  {product.price?.toLocaleString("vi-VN")}đ
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-500 line-through">
                    {product.originalPrice.toLocaleString("vi-VN")}đ
                  </span>
                )}
              </div>

              {/* Description */}
              {product.description && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Mô tả
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              )}

              {/* Features */}
              {product.features && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Nội dung khóa học
                  </h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">
                    {product.students || Math.floor(Math.random() * 1000)}
                  </div>
                  <div className="text-sm text-gray-600">Học viên</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900">
                    {product.duration ||
                      `${Math.floor(Math.random() * 50) + 10}h`}
                  </div>
                  <div className="text-sm text-gray-600">Thời lượng</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                  <FiShoppingCart className="inline mr-2" />
                  Đăng ký khóa học
                </button>

                <div className="flex space-x-3">
                  <button
                    onClick={handleWishlistToggle}
                    disabled={isWishlistLoading}
                    className={`flex-1 flex items-center justify-center py-2 px-4 rounded-lg font-medium transition-colors ${
                      isProductInWishlist
                        ? "bg-red-100 text-red-600 hover:bg-red-200"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    } disabled:opacity-50`}
                  >
                    <FiHeart
                      className={`mr-2 ${
                        isProductInWishlist ? "fill-current" : ""
                      }`}
                      size={16}
                    />
                    {isProductInWishlist ? "Đã yêu thích" : "Yêu thích"}
                  </button>

                  <button className="flex-1 flex items-center justify-center py-2 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                    <FiShare2 className="mr-2" size={16} />
                    Chia sẻ
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
