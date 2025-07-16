import ProductCard from "../ProductCard";

export default function PopularCourses({ courses, searchTerm }) {
  const isEmpty = courses.length === 0;
  const hasSearchTerm = searchTerm && searchTerm.trim().length > 0;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-primary">
          {hasSearchTerm
            ? `Kết quả tìm kiếm "${searchTerm}"`
            : "Khóa học phổ biến"}
        </h3>
        {hasSearchTerm && !isEmpty && (
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {courses.length} khóa học
          </span>
        )}
      </div>

      {isEmpty ? (
        <div className="text-center py-16">
          <div className="text-gray-300 text-8xl mb-6">🔍</div>
          <h4 className="text-gray-600 text-xl font-medium mb-2">
            {hasSearchTerm
              ? `Không tìm thấy khóa học cho "${searchTerm}"`
              : "Không có khóa học nào"}
          </h4>
          <p className="text-gray-400 text-base mb-6 max-w-md mx-auto">
            {hasSearchTerm
              ? "Hãy thử tìm kiếm với từ khóa khác hoặc kiểm tra lại chính tả"
              : "Hiện tại chưa có khóa học nào được tải lên"}
          </p>
          {hasSearchTerm && (
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              <span className="text-sm text-gray-500">Gợi ý:</span>
              {["ReactJS", "JavaScript", "Python", "HTML CSS"].map(
                (suggestion) => (
                  <button
                    key={suggestion}
                    className="text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
                    onClick={() => window.location.reload()} // Simple suggestion - could be improved
                  >
                    {suggestion}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
