import TrendingTags from "./TrendingTags";
import StatsSection from "./StatsSection";
import { useNavigate } from "react-router-dom";

export default function HeroSection({
  search,
  onSearchChange,
  onTagClick,
  onSubmit,
}) {
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Navigate to search page with current search value
    if (search.trim()) {
      navigate(`/search?q=${encodeURIComponent(search.trim())}`);
    }

    // Also call parent's onSubmit if provided
    if (onSubmit) {
      onSubmit(e);
    }
  };

  return (
    <div className="relative bg-gradient-to-r from-blue-50 to-green-50 min-h-[500px] flex items-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        {/* Left geometric shapes */}
        <div className="absolute left-0 top-0 w-[30%] h-full">
          <img
            src="/images/left-panel-bg.png"
            alt="Left background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right geometric shapes */}
        <div className="absolute right-0 top-0 w-[30%] h-full">
          <img
            src="/images/right-panel-bg.png"
            alt="Right background"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
          Tìm giáo viên tiếng Anh tốt nhất
        </h1>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-8">
          trên toàn{" "}
          <span className="bg-green-400 text-white px-2 py-1 rounded">
            Thế Giới
          </span>{" "}
        </h2>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <form onSubmit={handleFormSubmit} className="relative" role="search">
            <label htmlFor="course-search" className="sr-only">
              Tìm kiếm khóa học
            </label>
            <input
              id="course-search"
              type="text"
              value={search}
              onChange={onSearchChange}
              placeholder="Nhập tên khóa học, giáo viên hoặc chủ đề bạn muốn học..."
              title="Tìm kiếm khóa học theo tên, giáo viên hoặc chủ đề"
              aria-label="Tìm kiếm khóa học"
              className="w-full px-6 py-4 pr-16 text-lg border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 shadow-lg transition-all duration-200"
            />
            <button
              type="submit"
              aria-label="Tìm kiếm"
              title="Tìm kiếm khóa học"
              className="absolute right-2 top-2 bg-orange-500 hover:bg-orange-600 focus:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300 text-white px-6 py-2 rounded-md transition-all duration-200"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </form>
        </div>

        {/* Trending Tags */}
        <TrendingTags onTagClick={onTagClick} currentSearch={search} />

        {/* Stats Section */}
        <StatsSection />
      </div>
    </div>
  );
}
