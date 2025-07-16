import { useNavigate } from "react-router-dom";

export default function TrendingTags({ onTagClick, currentSearch }) {
  const navigate = useNavigate();
  const trendingTopics = [
    "ReactJS",
    "NodeJS",
    "JavaScript",
    "Python",
    "HTML CSS",
    "TypeScript",
    "Angular",
    "VueJS",
    "Git Github",
  ];

  const handleTagClick = (tag) => {
    // Navigate to search page with tag as query
    navigate(`/search?q=${encodeURIComponent(tag)}`);

    // Also call the parent callback if provided
    if (onTagClick) {
      onTagClick(tag);
    }
  };

  return (
    <div
      className="flex flex-wrap justify-center gap-2 mb-8"
      role="group"
      aria-label="Trending topics"
    >
      <span className="text-sm text-gray-600 mr-2 flex items-center">
        📈 <span className="ml-1">Trending:</span>
      </span>
      {trendingTopics.map((tag) => {
        const isActive = currentSearch?.toLowerCase() === tag.toLowerCase();
        return (
          <button
            key={tag}
            onClick={() => handleTagClick(tag)}
            aria-label={`Tìm kiếm khóa học ${tag}`}
            className={`px-3 py-1 rounded-full text-sm shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border ${
              isActive
                ? "bg-orange-100 text-orange-700 border-orange-300 shadow-md"
                : "bg-white text-gray-700 border-gray-200 hover:bg-orange-50 hover:border-orange-200"
            }`}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}
