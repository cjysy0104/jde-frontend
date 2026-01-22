import apiClient from "./apiClient.js";

export const reviewApi = {
  getBestReviewList: async ({ cursor, cursorLikeCount }) => {
    try {
      return await apiClient.get(`/api/reviews/best`, {
        params: { cursor, cursorLikeCount },
      });
    } catch (error) {
      console.error("getBestReviewList error:", error);
      throw error;
    }
  },
};
