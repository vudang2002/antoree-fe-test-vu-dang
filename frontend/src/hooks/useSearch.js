import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import userBehaviorService from "../services/userBehaviorService";

export function useSearch(
  initialData,
  searchFields = ["name"],
  { enableNavigation = false } = {}
) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Memoize initialData to prevent unnecessary re-renders
  const memoizedInitialData = useMemo(() => initialData, [initialData]);
  const [filtered, setFiltered] = useState(memoizedInitialData);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);

    if (!value.trim()) {
      setFiltered(memoizedInitialData);
      return;
    }

    const filteredData = memoizedInitialData.filter((item) =>
      searchFields.some((field) => item[field]?.toLowerCase().includes(value))
    );

    setFiltered(filteredData);
  };

  const searchByTag = (tag) => {
    const value = tag.toLowerCase();
    setSearch(tag);

    const filteredData = memoizedInitialData.filter((item) =>
      searchFields.some((field) => item[field]?.toLowerCase().includes(value))
    );

    setFiltered(filteredData);
  };

  const searchByValue = (value) => {
    setSearch(value);

    if (!value.trim()) {
      setFiltered(memoizedInitialData);
      return;
    }

    const lowerValue = value.toLowerCase();
    const filteredData = memoizedInitialData.filter((item) =>
      searchFields.some((field) =>
        item[field]?.toLowerCase().includes(lowerValue)
      )
    );

    setFiltered(filteredData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Track search behavior
    if (search.trim()) {
      userBehaviorService.trackSearch(search.trim(), filtered);
    }
    // If navigation is enabled and search has value, navigate to search results
    if (enableNavigation && search.trim()) {
      navigate(`/search?q=${encodeURIComponent(search.trim())}`);
    }
  };

  // Reset when initial data changes - use memoized data to prevent infinite loop
  useEffect(() => {
    setFiltered(memoizedInitialData);
  }, [memoizedInitialData]);

  return {
    search,
    filtered,
    handleSearch,
    searchByTag,
    searchByValue,
    setSearch,
    handleSubmit,
  };
}
