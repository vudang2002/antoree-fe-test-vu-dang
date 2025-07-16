import React from "react";
import {
  CATEGORIES,
  LEVELS,
  PRICE_RANGES,
} from "../../constants/filterOptions";

export default function ActiveFilters({ filters, onRemoveFilter }) {
  const { category, level, priceRange, rating } = filters;

  // Helper function to get display name from ID
  const getCategoryName = (id) => {
    const foundCategory = CATEGORIES.find((cat) => cat.id === id);
    return foundCategory ? foundCategory.name : id;
  };

  const getLevelName = (levelName) => {
    return levelName; // Level name is already human-readable
  };

  const getPriceRangeName = (id) => {
    const foundRange = PRICE_RANGES.find((range) => range.id === id);
    return foundRange ? foundRange.name : id;
  };

  const getRatingDisplay = (rating) => {
    return `${rating}★ trở lên`;
  };

  // Check if there are any active filters
  const hasActiveFilters = category || level || priceRange || rating;

  if (!hasActiveFilters) return null;

  return (
    <div className="mt-4 mb-6">
      <div className="flex flex-wrap gap-2">
        {category && (
          <FilterTag
            label={`Danh mục: ${getCategoryName(category)}`}
            onRemove={() => onRemoveFilter("category")}
          />
        )}

        {level && (
          <FilterTag
            label={`Cấp độ: ${getLevelName(level)}`}
            onRemove={() => onRemoveFilter("level")}
          />
        )}

        {priceRange && (
          <FilterTag
            label={`Giá: ${getPriceRangeName(priceRange)}`}
            onRemove={() => onRemoveFilter("priceRange")}
          />
        )}

        {rating && (
          <FilterTag
            label={`Đánh giá: ${getRatingDisplay(rating)}`}
            onRemove={() => onRemoveFilter("rating")}
          />
        )}
      </div>
    </div>
  );
}

function FilterTag({ label, onRemove }) {
  return (
    <div className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm text-gray-600">
      <span>{label}</span>
      <button
        onClick={onRemove}
        className="ml-2 text-gray-500 hover:text-gray-700"
        title="Xóa bộ lọc này"
        aria-label={`Xóa bộ lọc ${label}`}
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}
