import axios from 'axios';

const API_BASE_URL = window.ENV?.API_BASE_URL || "http://localhost:8080";

// 토큰 관리 함수 테스트용 이긴 해용 
export const authStorage = {
  getToken: () => {
    return localStorage.getItem('authToken');
  },
  setToken: (token) => {
    localStorage.setItem('authToken', token);
  },
  removeToken: () => {
    localStorage.removeItem('authToken');
  },
  getRefreshToken: () => {
    return localStorage.getItem('refreshToken');
  },
  setRefreshToken: (token) => {
    localStorage.setItem('refreshToken', token);
  },
  removeRefreshToken: () => {
    localStorage.removeItem('refreshToken');
  },
  getMemberInfo: () => {
    const memberInfo = localStorage.getItem('memberInfo');
    return memberInfo ? JSON.parse(memberInfo) : null;
  },
  setMemberInfo: (memberInfo) => {
    localStorage.setItem('memberInfo', JSON.stringify(memberInfo));
  },
  removeMemberInfo: () => {
    localStorage.removeItem('memberInfo');
  },
  clear: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('memberInfo');
  },
};

// axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터: 토큰 자동 추가
apiClient.interceptors.request.use(
  (config) => {
    const token = authStorage.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터: 에러 처리
apiClient.interceptors.response.use(
  (response) => {
    return response.data; // axios는 자동으로 JSON 파싱하므로 data만 반환
  },
  (error) => {
    if (error.response) {
      // 서버가 응답했지만 에러 상태 코드
      const errorMessage =
        error.response.data?.message ||
        error.response.data?.error ||
        error.message;
      throw new Error(errorMessage);
    } else if (error.request) {
      // 요청은 보냈지만 응답을 받지 못함
      throw new Error('서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.');
    } else {
      // 요청 설정 중 에러 발생
      throw new Error(error.message || '요청 중 오류가 발생했습니다.');
    }
  }
);

export const adminApi = {
  // ... (생략 없이 기존 코드 그대로 유지)
  getCommentReports: async (page = 1) => {
    try {
      return await apiClient.get(`/api/admin/reports/comment?page=${page}`);
    } catch (error) {
      console.error('getCommentReports error:', error);
      throw error;
    }
  },
  getReviewReports: async (page = 1) => {
    try {
      return await apiClient.get(`/api/admin/reports/review?page=${page}`);
    } catch (error) {
      console.error('getReviewReports error:', error);
      throw error;
    }
  },
  searchCommentReports: async (keyword, page = 1) => {
    try {
      return await apiClient.get(`/api/admin/reports/comment/keyword?keyword=${encodeURIComponent(keyword)}&page=${page}`);
    } catch (error) {
      console.error('searchCommentReports error:', error);
      throw error;
    }
  },
  searchReviewReports: async (keyword, page = 1) => {
    try {
      return await apiClient.get(`/api/admin/reports/review/keyword?keyword=${encodeURIComponent(keyword)}&page=${page}`);
    } catch (error) {
      console.error('searchReviewReports error:', error);
      throw error;
    }
  },
  getCommentReportDetail: async (reportNo) => {
    try {
      return await apiClient.get(`/api/admin/reports/comment/${reportNo}`);
    } catch (error) {
      console.error('getCommentReportDetail error:', error);
      throw error;
    }
  },
  getReviewReportDetail: async (reportNo) => {
    try {
      return await apiClient.get(`/api/admin/reports/review/${reportNo}`);
    } catch (error) {
      console.error('getReviewReportDetail error:', error);
      throw error;
    }
  },
  processCommentReport: async (reportNo, reportProcess) => {
    try {
      return await apiClient.put(`/api/admin/reports/comment/${reportNo}`, { reportProcess });
    } catch (error) {
      console.error('processCommentReport error:', error);
      throw error;
    }
  },
  processReviewReport: async (reportNo, reportProcess) => {
    try {
      return await apiClient.put(`/api/admin/reports/review/${reportNo}`, { reportProcess });
    } catch (error) {
      console.error('processReviewReport error:', error);
      throw error;
    }
  },
  getMembers: async (page = 1) => {
    try {
      return await apiClient.get(`/api/admin/members?page=${page}`);
    } catch (error) {
      console.error('getMembers error:', error);
      throw error;
    }
  },
  searchMembers: async (keyword, page = 1) => {
    try {
      return await apiClient.get(`/api/admin/members/keyword?keyword=${encodeURIComponent(keyword)}&page=${page}`);
    } catch (error) {
      console.error('searchMembers error:', error);
      throw error;
    }
  },
  getMemberDetail: async (memberNo) => {
    try {
      return await apiClient.get(`/api/admin/members/${memberNo}`);
    } catch (error) {
      console.error('getMemberDetail error:', error);
      throw error;
    }
  },
  updateMemberRole: async (memberNo, role) => {
    try {
      return await apiClient.put(`/api/admin/members/${memberNo}/role`, { role });
    } catch (error) {
      console.error('updateMemberRole error:', error);
      throw error;
    }
  },
  deleteMember: async (memberNo) => {
    try {
      return await apiClient.delete(`/api/admin/members/${memberNo}`);
    } catch (error) {
      console.error('deleteMember error:', error);
      throw error;
    }
  },
  getComments: async (page = 1) => {
    try {
      return await apiClient.get(`/api/admin/comments?page=${page}`);
    } catch (error) {
      console.error('getComments error:', error);
      throw error;
    }
  },
  searchComments: async (keyword, page = 1) => {
    try {
      return await apiClient.get(`/api/admin/comments/keyword?keyword=${encodeURIComponent(keyword)}&page=${page}`);
    } catch (error) {
      console.error('searchComments error:', error);
      throw error;
    }
  },
  getCommentDetail: async (commentNo) => {
    try {
      return await apiClient.get(`/api/admin/comments/${commentNo}`);
    } catch (error) {
      console.error('getCommentDetail error:', error);
      throw error;
    }
  },
  deleteComment: async (commentNo) => {
    try {
      return await apiClient.delete(`/api/admin/comments/${commentNo}`);
    } catch (error) {
      console.error('deleteComment error:', error);
      throw error;
    }
  },
  getReviews: async (page = 1) => {
    try {
      return await apiClient.get(`/api/admin/reviews?page=${page}`);
    } catch (error) {
      console.error('getReviews error:', error);
      throw error;
    }
  },
  searchReviews: async (keyword, page = 1) => {
    try {
      return await apiClient.get(`/api/admin/reviews/keyword?keyword=${encodeURIComponent(keyword)}&page=${page}`);
    } catch (error) {
      console.error('searchReviews error:', error);
      throw error;
    }
  },
  getReviewDetail: async (reviewNo) => {
    try {
      return await apiClient.get(`/api/admin/reviews/${reviewNo}`);
    } catch (error) {
      console.error('getReviewDetail error:', error);
      throw error;
    }
  },
  deleteReview: async (reviewNo) => {
    try {
      return await apiClient.delete(`/api/admin/reviews/${reviewNo}`);
    } catch (error) {
      console.error('deleteReview error:', error);
      throw error;
    }
  },
};

export const authApi = {
  login: async (email, password) => {
    return await apiClient.post("/api/auth/login", {
      email,
      password,
    });
  },

  logout: async ({ email, refreshToken }) => {
    try {
      await apiClient.post("/api/auth/logout", {
        email,
        refreshToken,
      });
    } catch (e) {
      console.warn("Logout API failed:", e);
    }
  },
};

/* =========================================================
 * 회원가입 관련 API 추가 (중복확인/회원가입)
 * - 성공 시 apiClient 인터셉터가 response.data를 반환함
 * - 실패 시 인터셉터가 throw new Error(serverMessage) 해줌
 * ========================================================= */
export const memberApi = {
  // GET /api/members/email?email=...
  checkEmail: async (email) => {
    return await apiClient.get(`/api/members/email?email=${encodeURIComponent(email)}`);
  },

  // GET /api/members/nickname?nickname=...
  checkNickname: async (nickname) => {
    return await apiClient.get(`/api/members/nickname?nickname=${encodeURIComponent(nickname)}`);
  },

  // POST /api/members
  signup: async ({ email, password, memberName, nickname, phone }) => {
    return await apiClient.post("/api/members", {
      email,
      password,
      memberName,
      nickname,
      phone,
    });
  },
};

// review API
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
  }
}
