import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../common/Breadcrumbs";

export default function SearchHeader({
  query,
  resultCount,
  totalCount,
  onSearchChange,
  onClearFilters,
}) {
  const [searchValue, setSearchValue] = useState(query);

  // Sync search value when query prop changes
  useEffect(() => {
    setSearchValue(query);
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchChange(searchValue);
  };

  const handleClearSearch = () => {
    setSearchValue("");
    onSearchChange("");
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
      {/* Breadcrumb */}
      <div className="mb-4">
        <Breadcrumbs />
      </div>

      {/* Search Form */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="relative">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Tìm kiếm khóa học, giáo viên..."
            className="w-full px-4 py-3 pr-24 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          {searchValue && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="absolute right-16 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <svg
                className="w-5 h-5"
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
          )}
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-600 transition-colors"
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </form>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {query && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Tìm kiếm cho:</span>
              <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                "{query}"
              </span>
            </div>
          )}

          <div className="text-sm text-gray-600">
            Hiển thị{" "}
            <span className="font-medium text-gray-900">{resultCount}</span>{" "}
            trong tổng số{" "}
            <span className="font-medium text-gray-900">{totalCount}</span> khóa
            học
          </div>
        </div>

        {(query || resultCount < totalCount) && (
          <button
            onClick={onClearFilters}
            className="text-sm text-primary hover:text-primary-600 font-medium transition-colors"
          >
            Xóa tất cả bộ lọc
          </button>
        )}
      </div>
    </div>
  );
}
