import { useState, useMemo } from "react";
import {
  CATEGORIES,
  LEVELS,
  PRICE_RANGES,
} from "../../constants/filterOptions";
import { products } from "../../data/product";

export default function SearchFilters({
  filters,
  onFiltersChange,
  resultCount,
}) {
  const [isExpanded, setIsExpanded] = useState({
    category: true,
    level: true,
    price: true,
    rating: false,
  });

  // Calculate counts for each filter option based on current filtered products
  const filterCounts = useMemo(() => {
    const counts = {
      categories: {},
      levels: {},
      priceRanges: {},
      ratings: {},
    };

    // Initialize counts
    CATEGORIES.forEach((cat) => (counts.categories[cat.id] = 0));
    LEVELS.forEach((level) => (counts.levels[level.name] = 0));
    PRICE_RANGES.forEach((range) => (counts.priceRanges[range.id] = 0));

    // Count products for each filter
    products.forEach((product) => {
      // Category counts
      if (product.category) {
        counts.categories[product.category]++;
      }

      // Level counts
      if (product.level) {
        counts.levels[product.level]++;
      }

      // Price range counts
      PRICE_RANGES.forEach((range) => {
        if (product.price >= range.min && product.price <= range.max) {
          counts.priceRanges[range.id]++;
        }
      });

      // Rating counts
      if (product.rating >= 4.5)
        counts.ratings["4.5"] = (counts.ratings["4.5"] || 0) + 1;
      if (product.rating >= 4.0)
        counts.ratings["4.0"] = (counts.ratings["4.0"] || 0) + 1;
      if (product.rating >= 3.5)
        counts.ratings["3.5"] = (counts.ratings["3.5"] || 0) + 1;
    });

    return counts;
  }, []);

  const categories = CATEGORIES.map((cat) => ({
    value: cat.id,
    label: cat.name,
    count: filterCounts.categories[cat.id] || 0,
  }));

  const levels = LEVELS.map((level) => ({
    value: level.name,
    label: level.name,
    count: filterCounts.levels[level.name] || 0,
  }));

  const priceRanges = PRICE_RANGES.map((range) => ({
    value: range.id,
    label: range.name,
    count: filterCounts.priceRanges[range.id] || 0,
  }));

  const ratings = [
    {
      value: "4.5",
      label: "4.5★ trở lên",
      count: filterCounts.ratings["4.5"] || 0,
    },
    {
      value: "4.0",
      label: "4.0★ trở lên",
      count: filterCounts.ratings["4.0"] || 0,
    },
    {
      value: "3.5",
      label: "3.5★ trở lên",
      count: filterCounts.ratings["3.5"] || 0,
    },
  ];

  const handleFilterChange = (filterType, value) => {
    const currentValue = filters[filterType];
    const newValue = currentValue === value ? "" : value;
    onFiltersChange({ [filterType]: newValue });
  };

  const toggleSection = (section) => {
    setIsExpanded((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const FilterSection = ({
    title,
    items,
    filterType,
    isExpanded,
    onToggle,
  }) => (
    <div className="border-b border-gray-200 pb-6 mb-6">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full py-2 text-left"
      >
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <svg
          className={`w-5 h-5 transition-transform ${
            isExpanded ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isExpanded && (
        <div className="mt-4 space-y-3">
          {items.map((item) => (
            <label
              key={item.value}
              className="flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center">
                <input
                  type="radio"
                  name={filterType}
                  value={item.value}
                  checked={filters[filterType] === item.value}
                  onChange={() => handleFilterChange(filterType, item.value)}
                  className="sr-only"
                />
                <div
                  className={`w-4 h-4 border-2 rounded-full mr-3 transition-colors ${
                    filters[filterType] === item.value
                      ? "border-primary bg-primary"
                      : "border-gray-300 group-hover:border-primary"
                  }`}
                >
                  {filters[filterType] === item.value && (
                    <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                  )}
                </div>
                <span
                  className={`text-sm ${
                    filters[filterType] === item.value
                      ? "text-primary font-medium"
                      : "text-gray-700"
                  }`}
                >
                  {item.label}
                </span>
              </div>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {item.count}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Bộ lọc</h2>
        <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
          {resultCount} kết quả
        </span>
      </div>

      {/* Category Filter */}
      <FilterSection
        title="Danh mục"
        items={categories}
        filterType="category"
        isExpanded={isExpanded.category}
        onToggle={() => toggleSection("category")}
      />

      {/* Level Filter */}
      <FilterSection
        title="Cấp độ"
        items={levels}
        filterType="level"
        isExpanded={isExpanded.level}
        onToggle={() => toggleSection("level")}
      />

      {/* Price Filter */}
      <FilterSection
        title="Khoảng giá"
        items={priceRanges}
        filterType="priceRange"
        isExpanded={isExpanded.price}
        onToggle={() => toggleSection("price")}
      />

      {/* Rating Filter */}
      <FilterSection
        title="Đánh giá"
        items={ratings}
        filterType="rating"
        isExpanded={isExpanded.rating}
        onToggle={() => toggleSection("rating")}
      />

      {/* Clear Filters Button */}
      <button
        onClick={() =>
          onFiltersChange({
            category: "",
            level: "",
            priceRange: "",
            rating: "",
          })
        }
        className="w-full mt-6 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
      >
        Xóa tất cả bộ lọc
      </button>
    </div>
  );
}
