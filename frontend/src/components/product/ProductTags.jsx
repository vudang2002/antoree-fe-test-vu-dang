import React from "react";
import { CATEGORIES } from "../../constants/filterOptions";
import { Link } from "react-router-dom";

export default function ProductTags({ product }) {
  const { category } = product;

  const categoryInfo = category
    ? CATEGORIES.find((cat) => cat.id === category)
    : null;

  if (!categoryInfo) return null;

  const categoryColor = getCategoryColor(category);

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      <Link
        to={`/search?category=${category}`}
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryColor}`}
      >
        {categoryInfo.name}
      </Link>
    </div>
  );
}

// Helper function to get color classes based on category
function getCategoryColor(categoryId) {
  const colorMap = {
    frontend: "bg-blue-100 text-blue-800 hover:bg-blue-200",
    backend: "bg-green-100 text-green-800 hover:bg-green-200",
    fullstack: "bg-purple-100 text-purple-800 hover:bg-purple-200",
    tools: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
    "data-science": "bg-pink-100 text-pink-800 hover:bg-pink-200",
  };

  return colorMap[categoryId] || "bg-gray-100 text-gray-800 hover:bg-gray-200";
}
