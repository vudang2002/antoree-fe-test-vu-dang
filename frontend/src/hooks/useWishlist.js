import { useState, useEffect, useCallback } from "react";
import wishlistService from "../services/wishlistService";

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load wishlist on mount
  useEffect(() => {
    const loadWishlist = () => {
      const items = wishlistService.getWishlist();
      setWishlist(items);
    };
    loadWishlist();

    // Listen for wishlist changes from other tabs/windows
    const handleStorageChange = (e) => {
      if (e.key === "user_wishlist") {
        loadWishlist();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Thêm sản phẩm vào wishlist
  const addToWishlist = useCallback((product) => {
    setIsLoading(true);
    try {
      const result = wishlistService.addToWishlist(product);
      if (result.success) {
        const updatedWishlist = wishlistService.getWishlist();
        setWishlist(updatedWishlist);
      }
      return result;
    } catch (error) {
      console.error("Error in addToWishlist hook:", error);
      return { success: false, message: "Có lỗi xảy ra" };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Xóa sản phẩm khỏi wishlist
  const removeFromWishlist = useCallback((productId) => {
    setIsLoading(true);
    try {
      const result = wishlistService.removeFromWishlist(productId);
      if (result.success) {
        const updatedWishlist = wishlistService.getWishlist();
        setWishlist(updatedWishlist);
      }
      return result;
    } catch (error) {
      console.error("Error in removeFromWishlist hook:", error);
      return { success: false, message: "Có lỗi xảy ra" };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Toggle wishlist (thêm nếu chưa có, xóa nếu đã có)
  const toggleWishlist = useCallback(
    (product) => {
      const isInList = wishlistService.isInWishlist(product.id);
      if (isInList) {
        return removeFromWishlist(product.id);
      } else {
        return addToWishlist(product);
      }
    },
    [addToWishlist, removeFromWishlist]
  );

  // Kiểm tra sản phẩm có trong wishlist không
  const isInWishlist = useCallback((productId) => {
    return wishlistService.isInWishlist(productId);
  }, []);

  // Xóa toàn bộ wishlist
  const clearWishlist = useCallback(() => {
    setIsLoading(true);
    try {
      const result = wishlistService.clearWishlist();
      if (result.success) {
        setWishlist([]);
      }
      return result;
    } catch (error) {
      console.error("Error in clearWishlist hook:", error);
      return { success: false, message: "Có lỗi xảy ra" };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Thống kê wishlist
  const wishlistStats = {
    totalItems: wishlist.length,
    categories: [...new Set(wishlist.map((item) => item.category))],
    recentlyAdded: wishlist
      .sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt))
      .slice(0, 5),
  };

  return {
    wishlist,
    isLoading,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    clearWishlist,
    wishlistStats,
  };
};

export default useWishlist;
