// Filter options for search functionality

export const CATEGORIES = [
  {
    id: "frontend",
    name: "Frontend Development",
    description: "Phát triển giao diện người dùng",
    keywords: [
      "react",
      "vue",
      "angular",
      "html",
      "css",
      "javascript",
      "typescript",
    ],
  },
  {
    id: "backend",
    name: "Backend Development",
    description: "Phát triển server và API",
    keywords: ["nodejs", "python", "sql", "database"],
  },
  {
    id: "fullstack",
    name: "Fullstack Development",
    description: "Phát triển đầy đủ frontend và backend",
    keywords: ["nextjs", "fullstack"],
  },
  {
    id: "tools",
    name: "Development Tools",
    description: "Công cụ phát triển phần mềm",
    keywords: ["git", "github"],
  },
  {
    id: "data-science",
    name: "Data Science",
    description: "Khoa học dữ liệu và phân tích",
    keywords: ["python", "sql"],
  },
];

export const LEVELS = [
  {
    id: "beginner",
    name: "Mới bắt đầu",
    description: "Dành cho người chưa có kinh nghiệm",
    color: "green",
  },
  {
    id: "intermediate",
    name: "Trung cấp",
    description: "Đã có kiến thức cơ bản",
    color: "yellow",
  },
  {
    id: "advanced",
    name: "Nâng cao",
    description: "Dành cho lập trình viên có kinh nghiệm",
    color: "red",
  },
];

export const PRICE_RANGES = [
  {
    id: "0-500000",
    name: "Dưới 500.000đ",
    min: 0,
    max: 500000,
    description: "Khóa học giá rẻ",
  },
  {
    id: "500000-800000",
    name: "500.000đ - 800.000đ",
    min: 500000,
    max: 800000,
    description: "Mức giá trung bình",
  },
  {
    id: "800000-1000000",
    name: "800.000đ - 1.000.000đ",
    min: 800000,
    max: 1000000,
    description: "Khóa học chất lượng cao",
  },
  {
    id: "1000000-9999999",
    name: "Trên 1.000.000đ",
    min: 1000000,
    max: 9999999,
    description: "Khóa học premium",
  },
];

export const SORT_OPTIONS = [
  {
    id: "relevance",
    name: "Liên quan nhất",
    description: "Sắp xếp theo mức độ phù hợp",
  },
  {
    id: "newest",
    name: "Mới nhất",
    description: "Khóa học được tạo gần đây nhất",
  },
  {
    id: "rating",
    name: "Đánh giá cao",
    description: "Sắp xếp theo rating từ cao đến thấp",
  },
  {
    id: "price-low",
    name: "Giá thấp đến cao",
    description: "Sắp xếp theo giá tăng dần",
  },
  {
    id: "price-high",
    name: "Giá cao đến thấp",
    description: "Sắp xếp theo giá giảm dần",
  },
];

// Helper functions
export function getCategoryByKeyword(productName) {
  const lowerName = productName.toLowerCase();

  for (const category of CATEGORIES) {
    if (category.keywords.some((keyword) => lowerName.includes(keyword))) {
      return category.id;
    }
  }

  return "other";
}

export function getLevelId(levelName) {
  const levelMap = {
    "Mới bắt đầu": "beginner",
    "Trung cấp": "intermediate",
    "Nâng cao": "advanced",
  };

  return levelMap[levelName] || "beginner";
}

export function formatPrice(price) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
}

export function getPriceRangeId(price) {
  for (const range of PRICE_RANGES) {
    if (price >= range.min && price <= range.max) {
      return range.id;
    }
  }
  return PRICE_RANGES[0].id;
}

// Additional helper functions
export function getFilterDisplayInfo(filters) {
  const { category, level, priceRange, rating } = filters;

  const result = {
    hasFilters: !!(category || level || priceRange || rating),
    labels: [],
  };

  if (category) {
    const categoryObj = CATEGORIES.find((cat) => cat.id === category);
    result.labels.push({
      type: "category",
      label: `Danh mục: ${categoryObj?.name || category}`,
      value: category,
    });
  }

  if (level) {
    result.labels.push({
      type: "level",
      label: `Cấp độ: ${level}`,
      value: level,
    });
  }

  if (priceRange) {
    const rangeObj = PRICE_RANGES.find((range) => range.id === priceRange);
    result.labels.push({
      type: "priceRange",
      label: `Giá: ${rangeObj?.name || priceRange}`,
      value: priceRange,
    });
  }

  if (rating) {
    result.labels.push({
      type: "rating",
      label: `Đánh giá: ${rating}★ trở lên`,
      value: rating,
    });
  }

  return result;
}
