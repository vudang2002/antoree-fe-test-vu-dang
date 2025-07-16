import { products } from "../data/product";
import { useSearch } from "../hooks/useSearch";
import { useNavigate } from "react-router-dom";
import HeroSection from "../components/home/HeroSection";
import OffersSection from "../components/home/OffersSection";
import PopularCourses from "../components/home/PopularCourses";
import AIRecommendations from "../components/AIRecommendations";

export default function Home() {
  const navigate = useNavigate();
  const { search, filtered, handleSearch, handleSubmit } = useSearch(
    products,
    ["name", "shortDescription", "longDescription", "author"],
    { enableNavigation: true }
  );

  const handleTagClick = (tag) => {
    // Navigate to search results with the tag as query
    navigate(`/search?q=${encodeURIComponent(tag)}`);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Search & Stats */}
      <HeroSection
        search={search}
        onSearchChange={handleSearch}
        onTagClick={handleTagClick}
        onSubmit={handleSubmit}
      />

      {/* What We Offer Section */}
      <OffersSection />

      {/* Popular Courses Section */}
      <PopularCourses courses={filtered} searchTerm={search} />

      {/* AI Recommendations Section - Temporarily disabled to debug */}
      {/* 
      <section className="py-16 bg-gradient-to-br from-primary-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AIRecommendations limit={4} />
        </div>
      </section>
      */}
    </div>
  );
}
