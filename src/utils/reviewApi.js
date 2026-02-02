import apiClient from "./apiClient.js";

export const reviewApi = {
  // 베스트 리뷰 조회
  getBestReviewList: async ({ cursor, cursorLikeCount, keywordNo}) => {
    try {
      return await apiClient.get(`/api/reviews/best`, {
        params: { 
          cursor, 
          cursorLikeCount,
          keywordNo, 
        },
      });
    } catch (error) {
      console.error("getBestReviewList error:", error);
      throw error;
    }
  },

  // 리뷰전체조회
  getReviewList: async ({
    query,
    minRating,
    maxRating,
    sort,
    cursor,
    cursorRating,
    cursorLikedCount,} = {}) => {
    return apiClient.get('/api/reviews', {
        params: {
          query,
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

  // 추가: 리뷰 좋아요(POST)
  likeReview: async (reviewNo) => {
    return apiClient.post(`/api/reviewLikes/${reviewNo}`);
  },

  // 추가: 리뷰 좋아요 취소(DELETE)
  unlikeReview: async (reviewNo) => {
    return apiClient.delete(`/api/reviewLikes/${reviewNo}`);
  },

  // 키워드 리스트 조회
  getKeywordList: async () => {
    try {
      return apiClient.get(`/api/reviews/keywords`);
    } catch (error) {
      console.error('getKeywordList error:', error);
        throw error;
    }
  },

  // 리뷰 등록
  createReview: async (formData) => {
    try {
      return await apiClient.post(`/api/reviews`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });
    } catch (error) {
      console.error("createReview error:", error);
      throw error;
    }
  },

  // 리뷰 삭제
  deleteReview: async (reviewNo) => {
    try {
      return await apiClient.delete(`/api/reviews/${reviewNo}`);
    } catch (error) {
      console.error("deleteReview error:", error);
      throw error;
    }
  },

  // 리뷰 수정
  updateReview: async (reviewNo, formData) => {
    try {
        return await apiClient.patch(`/api/reviews/${reviewNo}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });
    } catch (error) {
      console.error("updateReview error:", error);
      throw error;
    }
  }
};
