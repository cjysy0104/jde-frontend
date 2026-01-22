import axios from 'axios';

const API_BASE_URL = window.ENV?.API_BASE_URL;

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
      const errorMessage = error.response.data?.message || error.response.data?.error || error.message;
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
  // 댓글 신고 목록 조회
  getCommentReports: async (page = 1) => {
    try {
      return await apiClient.get(`/api/admin/reports/comment?page=${page}`);
    } catch (error) {
      console.error('getCommentReports error:', error);
      throw error;
    }
  },

  // 리뷰 신고 목록 조회
  getReviewReports: async (page = 1) => {
    try {
      return await apiClient.get(`/api/admin/reports/review?page=${page}`);
    } catch (error) {
      console.error('getReviewReports error:', error);
      throw error;
    }
  },

  // 댓글 신고 키워드 검색
  searchCommentReports: async (keyword, page = 1) => {
    try {
      return await apiClient.get(`/api/admin/reports/comment/keyword?keyword=${encodeURIComponent(keyword)}&page=${page}`);
    } catch (error) {
      console.error('searchCommentReports error:', error);
      throw error;
    }
  },

  // 리뷰 신고 키워드 검색
  searchReviewReports: async (keyword, page = 1) => {
    try {
      return await apiClient.get(`/api/admin/reports/review/keyword?keyword=${encodeURIComponent(keyword)}&page=${page}`);
    } catch (error) {
      console.error('searchReviewReports error:', error);
      throw error;
    }
  },

  // 댓글 신고 상세 조회
  getCommentReportDetail: async (reportNo) => {
    try {
      return await apiClient.get(`/api/admin/reports/comment/${reportNo}`);
    } catch (error) {
      console.error('getCommentReportDetail error:', error);
      throw error;
    }
  },

  // 리뷰 신고 상세 조회
  getReviewReportDetail: async (reportNo) => {
    try {
      return await apiClient.get(`/api/admin/reports/review/${reportNo}`);
    } catch (error) {
      console.error('getReviewReportDetail error:', error);
      throw error;
    }
  },

  // 댓글 신고 처리
  processCommentReport: async (reportNo, reportProcess) => {
    try {
      return await apiClient.put(`/api/admin/reports/comment/${reportNo}`, { reportProcess });
    } catch (error) {
      console.error('processCommentReport error:', error);
      throw error;
    }
  },

  // 리뷰 신고 처리
  processReviewReport: async (reportNo, reportProcess) => {
    try {
      return await apiClient.put(`/api/admin/reports/review/${reportNo}`, { reportProcess });
    } catch (error) {
      console.error('processReviewReport error:', error);
      throw error;
    }
  },

  // 회원 목록 조회
  getMembers: async (page = 1) => {
    try {
      return await apiClient.get(`/api/admin/members?page=${page}`);
    } catch (error) {
      console.error('getMembers error:', error);
      throw error;
    }
  },

  // 회원 키워드 검색
  searchMembers: async (keyword, page = 1) => {
    try {
      return await apiClient.get(`/api/admin/members/keyword?keyword=${encodeURIComponent(keyword)}&page=${page}`);
    } catch (error) {
      console.error('searchMembers error:', error);
      throw error;
    }
  },

  // 회원 상세 조회
  getMemberDetail: async (memberNo) => {
    try {
      return await apiClient.get(`/api/admin/members/${memberNo}`);
    } catch (error) {
      console.error('getMemberDetail error:', error);
      throw error;
    }
  },

  // 회원 권한 변경
  updateMemberRole: async (memberNo, role) => {
    try {
      return await apiClient.put(`/api/admin/members/${memberNo}/role`, { role });
    } catch (error) {
      console.error('updateMemberRole error:', error);
      throw error;
    }
  },

  // 회원 삭제
  deleteMember: async (memberNo) => {
    try {
      return await apiClient.delete(`/api/admin/members/${memberNo}`);
    } catch (error) {
      console.error('deleteMember error:', error);
      throw error;
    }
  },

  // 댓글 목록 조회
  getComments: async (page = 1) => {
    try {
      return await apiClient.get(`/api/admin/comments?page=${page}`);
    } catch (error) {
      console.error('getComments error:', error);
      throw error;
    }
  },

  // 댓글 키워드 검색
  searchComments: async (keyword, page = 1) => {
    try {
      return await apiClient.get(`/api/admin/comments/keyword?keyword=${encodeURIComponent(keyword)}&page=${page}`);
    } catch (error) {
      console.error('searchComments error:', error);
      throw error;
    }
  },

  // 댓글 상세 조회
  getCommentDetail: async (commentNo) => {
    try {
      return await apiClient.get(`/api/admin/comments/${commentNo}`);
    } catch (error) {
      console.error('getCommentDetail error:', error);
      throw error;
    }
  },

  // 댓글 삭제
  deleteComment: async (commentNo) => {
    try {
      return await apiClient.delete(`/api/admin/comments/${commentNo}`);
    } catch (error) {
      console.error('deleteComment error:', error);
      throw error;
    }
  },

  // 리뷰 목록 조회
  getReviews: async (page = 1) => {
    try {
      return await apiClient.get(`/api/admin/reviews?page=${page}`);
    } catch (error) {
      console.error('getReviews error:', error);
      throw error;
    }
  },

  // 리뷰 키워드 검색
  searchReviews: async (keyword, page = 1) => {
    try {
      return await apiClient.get(`/api/admin/reviews/keyword?keyword=${encodeURIComponent(keyword)}&page=${page}`);
    } catch (error) {
      console.error('searchReviews error:', error);
      throw error;
    }
  },

  // 리뷰 상세 조회
  getReviewDetail: async (reviewNo) => {
    try {
      return await apiClient.get(`/api/admin/reviews/${reviewNo}`);
    } catch (error) {
      console.error('getReviewDetail error:', error);
      throw error;
    }
  },

  // 리뷰 삭제
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