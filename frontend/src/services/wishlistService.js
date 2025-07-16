class WishlistService {
  constructor() {
    this.STORAGE_KEY = "user_wishlist";
  }

  // Lấy danh sách yêu thích từ localStorage
  getWishlist() {
    try {
      const wishlist = localStorage.getItem(this.STORAGE_KEY);
      const data = wishlist ? JSON.parse(wishlist) : [];

      // Validate và cleanup dữ liệu
      const validWishlist = data.filter((item) => {
        return item && item.id && item.name;
      });

      // Nếu dữ liệu đã được cleanup, lưu lại
      if (validWishlist.length !== data.length) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(validWishlist));
      }

      return validWishlist;
    } catch (error) {
      console.error("Error getting wishlist:", error);
      return [];
    }
  }

  // Thêm sản phẩm vào danh sách yêu thích
  addToWishlist(product) {
    try {
      const wishlist = this.getWishlist();
      const existingIndex = wishlist.findIndex(
        (item) => item.id === product.id
      );

      if (existingIndex === -1) {
        const wishlistItem = {
          id: product.id,
          name: product.name || "",
          price: product.price || 0,
          image: product.image || "",
          category: product.category || "",
          level: product.level || "",
          shortDescription: product.shortDescription || "",
          longDescription: product.longDescription || "",
          author: product.author || "",
          rating: product.rating || 0,
          students: product.students || 0,
          duration: product.duration || "",
          addedAt: new Date().toISOString(),
        };
        wishlist.push(wishlistItem);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(wishlist));
        return {
          success: true,
          message: "Đã thêm vào danh sách yêu thích",
          action: "added",
        };
      }
      return {
        success: false,
        message: "Sản phẩm đã có trong danh sách yêu thích",
      };
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      return {
        success: false,
        message: "Có lỗi xảy ra khi thêm vào danh sách yêu thích",
      };
    }
  }

  // Xóa sản phẩm khỏi danh sách yêu thích
  removeFromWishlist(productId) {
    try {
      const wishlist = this.getWishlist();
      const updatedWishlist = wishlist.filter((item) => item.id !== productId);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedWishlist));
      return { success: true, message: "Đã xóa khỏi danh sách yêu thích" };
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      return {
        success: false,
        message: "Có lỗi xảy ra khi xóa khỏi danh sách yêu thích",
      };
    }
  }

  // Kiểm tra sản phẩm có trong danh sách yêu thích không
  isInWishlist(productId) {
    const wishlist = this.getWishlist();
    return wishlist.some((item) => item.id === productId);
  }

  // Xóa toàn bộ danh sách yêu thích
  clearWishlist() {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
      return { success: true, message: "Đã xóa toàn bộ danh sách yêu thích" };
    } catch (error) {
      console.error("Error clearing wishlist:", error);
      return {
        success: false,
        message: "Có lỗi xảy ra khi xóa danh sách yêu thích",
      };
    }
  }

  // Lấy số lượng sản phẩm trong danh sách yêu thích
  getWishlistCount() {
    return this.getWishlist().length;
  }

  // Reset corrupted data - gọi khi có lỗi
  resetCorruptedData() {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
      console.log("Wishlist data has been reset due to corruption");
      return true;
    } catch (error) {
      console.error("Error resetting wishlist data:", error);
      return false;
    }
  }
}

export default new WishlistService();
