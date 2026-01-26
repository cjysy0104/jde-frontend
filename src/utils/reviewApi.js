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

  // 리뷰전체조회
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

  getDetailReview: async (reviewNo) => {
    try {
      return await apiClient.get(`/api/reviews/${reviewNo}`);
    } catch (error) {
        console.error('getDetailReview error:', error);
        throw error;
    }
  },

  // 미식대장 리뷰 조회 (추가)
  getCaptainReviewList: async (
    captainNo,
    {
      query,
      keyword,
      minRating,
      maxRating,
      sort,
      cursor,
      cursorRating,
      cursorLikedCount,
    } = {}
  ) => {
    if (captainNo === undefined || captainNo === null || captainNo === "") {
      throw new Error("captainNo가 필요합니다.");
    }

    try {
      return await apiClient.get(`/api/reviews/captain/${captainNo}`, {
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
    } catch (error) {
      console.error("getCaptainReviewList error:", error);
      throw error;
    }
  },



};

