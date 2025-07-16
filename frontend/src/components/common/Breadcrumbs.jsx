import React from "react";
import { Link, useLocation } from "react-router-dom";
import { CATEGORIES } from "../../constants/filterOptions";

export default function Breadcrumbs() {
  const location = useLocation();
  const paths = location.pathname.split("/").filter((path) => path);

  // Get search params
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("category");
  const query = searchParams.get("q");

  // Get category name if available
  const categoryName = category
    ? CATEGORIES.find((cat) => cat.id === category)?.name || category
    : "";

  return (
    <nav className="flex items-center space-x-1 text-sm text-gray-500">
      <Link to="/" className="hover:text-primary transition-colors">
        Trang chủ
      </Link>

      {paths.map((path, i) => (
        <React.Fragment key={i}>
          <span aria-hidden="true">›</span>
          {path === "search" ? (
            <span className="text-gray-900 font-medium">
              {query ? `Tìm kiếm: "${query}"` : "Tìm kiếm"}
            </span>
          ) : (
            <Link
              to={`/${paths.slice(0, i + 1).join("/")}`}
              className="hover:text-primary transition-colors"
            >
              {path.charAt(0).toUpperCase() + path.slice(1)}
            </Link>
          )}
        </React.Fragment>
      ))}

      {category && (
        <>
          <span aria-hidden="true">›</span>
          <span className="text-gray-900 font-medium">{categoryName}</span>
        </>
      )}
    </nav>
  );
}
