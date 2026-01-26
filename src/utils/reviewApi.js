import apiClient from "./apiClient.js";

export const reviewApi = {
  // 베스트 리뷰 조회
  getBestReviewList: async ({ cursor, cursorLikeCount}) => {
    try {
      return await apiClient.get(`/api/reviews/best`, {
        params:{
          cursor,
          cursorLikeCount
        },
      });
    } catch (error) {
      console.error('getBestReviewList error:', error);
      throw error;
    }
  },

  getReviewList: async ({
    query,
    keyword,
    minRating,
    maxRating,
    sort,
    cursor,
    cursorRating,
    cursorLikedCount,} = {}) => {
    return apiClient.get('/api/reviews', {
        params: {
          query,
          keyword,
          minRating,
          maxRating,
          sort,
          cursor,
          cursorRating,
          cursorLikedCount,
        },
      });
    },

    // 추가: 리뷰 좋아요(POST)
  likeReview: async (reviewNo) => {
    return apiClient.post(`/api/reviewLikes/${reviewNo}`);
  },

  // 추가: 리뷰 좋아요 취소(DELETE)
  unlikeReview: async (reviewNo) => {
    return apiClient.delete(`/api/reviewLikes/${reviewNo}`);
  },
};
