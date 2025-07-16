import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { products } from "../data/product";
import ProductCard from "../components/ProductCard";
import SearchFilters from "../components/search/SearchFilters";
import SearchHeader from "../components/search/SearchHeader";
import ActiveFilters from "../components/search/ActiveFilters";
import AIRecommendations from "../components/AIRecommendations";
import userBehaviorService from "../services/userBehaviorService";

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Get search query from URL
  const query = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";
  const level = searchParams.get("level") || "";
  const priceRange = searchParams.get("priceRange") || "";
  const rating = searchParams.get("rating") || "";
  const sortBy = searchParams.get("sortBy") || "relevance";

  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isLoading, setIsLoading] = useState(false);

  // Apply filters and search
  useEffect(() => {
    setIsLoading(true);

    let filtered = [...products];

    // Search filter
    if (query.trim()) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.shortDescription
            .toLowerCase()
            .includes(query.toLowerCase()) ||
          product.longDescription.toLowerCase().includes(query.toLowerCase()) ||
          product.author.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Category filter
    if (category) {
      filtered = filtered.filter((product) => product.category === category);
    }

    // Level filter
    if (level) {
      filtered = filtered.filter((product) => product.level === level);
    }

    // Price range filter
    if (priceRange) {
      const [min, max] = priceRange.split("-").map(Number);
      filtered = filtered.filter(
        (product) => product.price >= min && product.price <= max
      );
    }

    // Rating filter
    if (rating) {
      const minRating = parseFloat(rating);
      filtered = filtered.filter((product) => product.rating >= minRating);
    }

    // Sort results
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filtered.sort((a, b) => b.id - a.id);
        break;
      default:
        // relevance - keep original order
        break;
    }

    // Simulate loading delay
    setTimeout(() => {
      setFilteredProducts(filtered);
      setIsLoading(false);
    }, 300);
  }, [query, category, level, priceRange, rating, sortBy]);

  const updateFilters = (newFilters) => {
    const newParams = new URLSearchParams(searchParams);

    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });

    // Track filter usage
    const activeFilters = {
      category: newParams.get("category"),
      level: newParams.get("level"),
      priceRange: newParams.get("priceRange"),
      rating: newParams.get("rating"),
      sortBy: newParams.get("sortBy"),
    };

    // Only track if there are actual filters applied
    const hasFilters = Object.values(activeFilters).some((value) => value);
    if (hasFilters) {
      userBehaviorService.trackFilterUsage(activeFilters);
    }

    setSearchParams(newParams);
  };

  const removeFilter = (filterName) => {
    updateFilters({ [filterName]: "" });
  };

  const clearAllFilters = () => {
    setSearchParams({ q: query });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <SearchHeader
          query={query}
          resultCount={filteredProducts.length}
          totalCount={products.length}
          onSearchChange={(newQuery) => updateFilters({ q: newQuery })}
          onClearFilters={clearAllFilters}
        />

        {/* Active Filters */}
        <ActiveFilters
          filters={{ category, level, priceRange, rating }}
          onRemoveFilter={removeFilter}
        />

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 flex-shrink-0">
            <SearchFilters
              filters={{
                category,
                level,
                priceRange,
                rating,
                sortBy,
              }}
              onFiltersChange={updateFilters}
              resultCount={filteredProducts.length}
            />
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  {query ? `Kết quả cho "${query}"` : "Tất cả khóa học"}
                </h2>
                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                  {filteredProducts.length} khóa học
                </span>
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sắp xếp:</span>
                <select
                  value={sortBy}
                  onChange={(e) => updateFilters({ sortBy: e.target.value })}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="relevance">Liên quan nhất</option>
                  <option value="newest">Mới nhất</option>
                  <option value="rating">Đánh giá cao</option>
                  <option value="price-low">Giá thấp đến cao</option>
                  <option value="price-high">Giá cao đến thấp</option>
                </select>
              </div>
            </div>

            {/* Loading State */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-lg shadow animate-pulse"
                  >
                    <div className="w-full h-48 bg-gray-200 rounded-t-lg"></div>
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Results Grid */
              <>
                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  /* Empty State with AI Recommendations */
                  <div className="space-y-8">
                    <div className="text-center py-16">
                      <div className="text-gray-300 text-8xl mb-6">🔍</div>
                      <h3 className="text-2xl font-medium text-gray-900 mb-4">
                        Không tìm thấy kết quả
                      </h3>
                      <p className="text-gray-600 mb-8 max-w-md mx-auto">
                        Không có khóa học nào phù hợp với tiêu chí tìm kiếm của
                        bạn. Hãy thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                          onClick={clearAllFilters}
                          className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors"
                        >
                          Xóa bộ lọc
                        </button>
                        <button
                          onClick={() => navigate("/")}
                          className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                        >
                          Về trang chủ
                        </button>
                      </div>
                    </div>

                    {/* AI Recommendations for empty results - Temporarily disabled */}
                    {/* 
                    <div className="bg-white rounded-lg shadow-sm p-6">
                      <AIRecommendations limit={6} />
                    </div>
                    */}
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
