/**
 * User Behavior Tracking Service
 * Tracks user interactions for AI recommendations
 */

const STORAGE_KEY = "user_behavior";

class UserBehaviorService {
  constructor() {
    this.behavior = this.loadBehavior();
  }

  loadBehavior() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved
        ? JSON.parse(saved)
        : {
            viewedProducts: [],
            searchQueries: [],
            favoriteCategories: {},
            interactionHistory: [],
            preferences: {
              level: null,
              categories: [],
              priceRange: null,
            },
          };
    } catch (error) {
      console.error("Error loading user behavior:", error);
      return {
        viewedProducts: [],
        searchQueries: [],
        favoriteCategories: {},
        interactionHistory: [],
        preferences: {
          level: null,
          categories: [],
          priceRange: null,
        },
      };
    }
  }

  saveBehavior() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.behavior));
    } catch (error) {
      console.error("Error saving user behavior:", error);
    }
  }

  // Track product view
  trackProductView(productId, product) {
    const timestamp = Date.now();

    // Add to viewed products (keep only last 50)
    this.behavior.viewedProducts = this.behavior.viewedProducts
      .filter((v) => v.productId !== productId)
      .concat({ productId, product, timestamp })
      .slice(-50);

    // Update favorite categories
    const category = product.category;
    this.behavior.favoriteCategories[category] =
      (this.behavior.favoriteCategories[category] || 0) + 1;

    // Add to interaction history
    this.behavior.interactionHistory.push({
      type: "view",
      productId,
      category: product.category,
      level: product.level,
      timestamp,
    });

    this.saveBehavior();
  }

  // Track search query
  trackSearch(query, results) {
    const timestamp = Date.now();

    this.behavior.searchQueries = this.behavior.searchQueries
      .concat({ query, resultsCount: results.length, timestamp })
      .slice(-30); // Keep last 30 searches

    this.behavior.interactionHistory.push({
      type: "search",
      query,
      resultsCount: results.length,
      timestamp,
    });

    this.saveBehavior();
  }

  // Track wishlist addition
  trackWishlistAdd(productId, product) {
    const timestamp = Date.now();

    // Update preferences based on liked products
    const category = product.category;
    const level = product.level;

    if (!this.behavior.preferences.categories.includes(category)) {
      this.behavior.preferences.categories.push(category);
    }

    if (!this.behavior.preferences.level && level) {
      this.behavior.preferences.level = level;
    }

    this.behavior.interactionHistory.push({
      type: "wishlist_add",
      productId,
      category,
      level,
      timestamp,
    });

    this.saveBehavior();
  }

  // Track filter usage
  trackFilterUsage(filters) {
    const timestamp = Date.now();

    // Update preferences based on frequently used filters
    if (filters.category) {
      if (!this.behavior.preferences.categories.includes(filters.category)) {
        this.behavior.preferences.categories.push(filters.category);
      }
    }

    if (filters.level) {
      this.behavior.preferences.level = filters.level;
    }

    if (filters.priceRange) {
      this.behavior.preferences.priceRange = filters.priceRange;
    }

    this.behavior.interactionHistory.push({
      type: "filter",
      filters,
      timestamp,
    });

    this.saveBehavior();
  }

  // Get user preferences for AI recommendations
  getUserPreferences() {
    const recentInteractions = this.behavior.interactionHistory
      .filter((i) => Date.now() - i.timestamp < 7 * 24 * 60 * 60 * 1000) // Last 7 days
      .slice(-20); // Last 20 interactions

    // Analyze recent behavior patterns
    const categoryFrequency = {};
    const levelPreference = {};

    recentInteractions.forEach((interaction) => {
      if (interaction.category) {
        categoryFrequency[interaction.category] =
          (categoryFrequency[interaction.category] || 0) + 1;
      }
      if (interaction.level) {
        levelPreference[interaction.level] =
          (levelPreference[interaction.level] || 0) + 1;
      }
    });

    // Get most frequent categories and levels
    const preferredCategories = Object.entries(categoryFrequency)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([category]) => category);

    const preferredLevel = Object.entries(levelPreference).sort(
      ([, a], [, b]) => b - a
    )[0]?.[0];

    return {
      categories: preferredCategories,
      level: preferredLevel,
      recentViews: this.behavior.viewedProducts.slice(-10),
      searchHistory: this.behavior.searchQueries.slice(-10),
      priceRange: this.behavior.preferences.priceRange,
    };
  }

  // Get products to exclude from recommendations (already viewed/liked)
  getExcludedProducts() {
    const recentViews = this.behavior.viewedProducts
      .slice(-20)
      .map((v) => v.productId);

    return recentViews;
  }

  // Clear behavior data
  clearBehavior() {
    this.behavior = {
      viewedProducts: [],
      searchQueries: [],
      favoriteCategories: {},
      interactionHistory: [],
      preferences: {
        level: null,
        categories: [],
        priceRange: null,
      },
    };
    this.saveBehavior();
  }

  // Get behavior analytics for debugging
  getAnalytics() {
    const totalInteractions = this.behavior.interactionHistory.length;
    const last7Days = this.behavior.interactionHistory.filter(
      (i) => Date.now() - i.timestamp < 7 * 24 * 60 * 60 * 1000
    );

    return {
      totalInteractions,
      last7DaysInteractions: last7Days.length,
      viewedProductsCount: this.behavior.viewedProducts.length,
      searchQueriesCount: this.behavior.searchQueries.length,
      favoriteCategories: this.behavior.favoriteCategories,
      preferences: this.behavior.preferences,
    };
  }
}

export const userBehaviorService = new UserBehaviorService();
export default userBehaviorService;
