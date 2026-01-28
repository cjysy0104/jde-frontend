import apiClient from "./apiClient.js";

// 레스토랑 관련 API
export const restaurantApi = {
  // 레스토랑 무한 스크롤 조회
  // 백엔드: GET /api/restaurants (RestaurantQueryDTO)
  // RestaurantQueryDTO: { scroll: ScrollRequest, cursor: Long }
  getRestaurantList: async ({ cursor, scrollSize = 20 } = {}) => {
    try {
      const params = {};
      
      // cursor가 있으면 추가
      if (cursor != null) {
        params.cursor = cursor;
      }
      
      // scroll 파라미터 (백엔드에서 ScrollRequest로 받음)
      // 일반적으로 sizePlusOne = size + 1 형태로 전송
      // 백엔드에서 scroll.sizePlusOne을 사용하므로, 여기서는 scroll.sizePlusOne 형태로 보낼 수도 있지만
      // Spring의 @ModelAttribute는 중첩 객체를 자동으로 바인딩하므로
      // scroll.sizePlusOne 형태로 보내면 됨
      params['scroll.sizePlusOne'] = scrollSize + 1;
      
      return await apiClient.get("/api/restaurants", {
        params,
      });
    } catch (error) {
      console.error("getRestaurantList error:", error);
      throw error;
    }
  },

  searchRestaurant: async ({ keyword, cursor, scrollSize = 20 } = {}) => {
    try {
      const params = {};
      if (cursor != null) {
        params.cursor = cursor;
      }
      params.keyword = keyword;
      params['scroll.sizePlusOne'] = scrollSize + 1;
      return await apiClient.get("/api/restaurants/search", {
        params,
      });
    } catch (error) {
      console.error("searchRestaurant error:", error);
      throw error;
    }
  },

  // 레스토랑별 리뷰 조회 — GET /api/restaurants/{restaurantNo}/reviews
  getRestaurantReviews: async (restaurantNo, { cursor, sort } = {}) => {
    try {
      const params = {};
      if (cursor != null) params.cursor = cursor;
      if (sort) params.sort = sort;
      return await apiClient.get(`/api/restaurants/${restaurantNo}/reviews`, {
        params,
      });
    } catch (error) {
      console.error("getRestaurantReviews error:", error);
      throw error;
    }
  },
};

