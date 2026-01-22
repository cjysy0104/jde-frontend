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

/* =======================
   Member APIs
======================= */
export const memberApi = {
  // 이름 변경
  changeName: async (currentPassword, memberName) => {
    return await apiClient.patch(`/api/members/name`, {
      currentPassword,
      memberName,
    });
  },

  // 닉네임 변경
  changeNickname: async (currentPassword, nickname) => {
    return await apiClient.patch(`/api/members/nickname`, {
      currentPassword,
      nickname,
    });
  },

  // 전화번호 변경
  changePhone: async (currentPassword, phone) => {
    return await apiClient.patch(`/api/members/phone`, {
      currentPassword,
      phone,
    });
  },

  // 프로필 이미지 업로드 (multipart)
uploadProfileImage: async (password, file) => {
  const form = new FormData();
  form.append("password", password);
  form.append("file", file);

  // 중요: apiClient 기본 Content-Type(JSON) 무시하고
  // 브라우저가 multipart boundary 자동으로 붙이게 둔다
  return await apiClient.patch(`/api/members/profile-image`, form, {
    headers: { "Content-Type": undefined },
  });
},

  // 기본 이미지로 변경
  changeProfileToDefault: async (password, fileNo) => {
    return await apiClient.patch(`/api/members/profile-image/default`, {
      password,
      fileNo,
    });
  },

  getMe: async () => {
    return await apiClient.get("/api/members/me");
  },
};

/* =======================
   Bookmark APIs
======================= */
export const bookmarkApi = {
  // 북마크 토글
  toggle: async (reviewNo) => {
    return await apiClient.post(`/api/bookmarks/${reviewNo}/toggle`);
  },

  // 내 북마크 목록
  getMyBookmarks: async (page = 0, size = 20) => {
    return await apiClient.get(`/api/bookmarks/me?page=${page}&size=${size}`);
  },

  // (옵션) 북마크 삭제
  delete: async (reviewNo) => {
    return await apiClient.delete(`/api/bookmarks/${reviewNo}`);
  },
};

/* =======================
   My Activity APIs
======================= */
export const myActivityApi = {
  // 내 리뷰 목록
  getMyReviews: async ({ page = 1, size = 10 } = {}) => {
    return await apiClient.get(`/api/reviews/me?page=${page}&size=${size}`);
  },

  // 내 댓글 목록
  getMyComments: async ({ page = 1, size = 10 } = {}) => {
    return await apiClient.get(`/api/comments/me?page=${page}&size=${size}`);
  },

  // 리뷰 삭제
  deleteReview: async (reviewNo) => {
    return await apiClient.delete(`/api/reviews/${reviewNo}`);
  },

  // 댓글 삭제
  deleteComment: async (commentNo) => {
    return await apiClient.delete(`/api/comments/${commentNo}`);
  },
};
