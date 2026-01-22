import axios from "axios";

const API_BASE_URL = window.ENV?.API_BASE_URL || "http://localhost:8080";

// 토큰 관리 함수 테스트용 이긴 해용
export const authStorage = {
  getToken: () => localStorage.getItem("authToken"),
  setToken: (token) => localStorage.setItem("authToken", token),
  removeToken: () => localStorage.removeItem("authToken"),

  getRefreshToken: () => localStorage.getItem("refreshToken"),
  setRefreshToken: (token) => localStorage.setItem("refreshToken", token),
  removeRefreshToken: () => localStorage.removeItem("refreshToken"),

  getMemberInfo: () => {
    const memberInfo = localStorage.getItem("memberInfo");
    return memberInfo ? JSON.parse(memberInfo) : null;
  },
  setMemberInfo: (memberInfo) => {
    localStorage.setItem("memberInfo", JSON.stringify(memberInfo));
  },
  removeMemberInfo: () => localStorage.removeItem("memberInfo"),

  clear: () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("memberInfo");
  },
};

// axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터: 토큰 자동 추가
apiClient.interceptors.request.use(
  (config) => {
    const token = authStorage.getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터: 에러 처리
apiClient.interceptors.response.use(
  (response) => response.data, // data만 반환
  (error) => {
    if (error.response) {
      const errorMessage =
        error.response.data?.message ||
        error.response.data?.error ||
        error.message;
      throw new Error(errorMessage);
    }
    if (error.request) {
      throw new Error(
        "서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요."
      );
    }
    throw new Error(error.message || "요청 중 오류가 발생했습니다.");
  }
);

export const adminApi = {
  getCommentReports: async (page = 1) => {
    try {
      return await apiClient.get(`/api/admin/reports/comment?page=${page}`);
    } catch (error) {
      console.error("getCommentReports error:", error);
      throw error;
    }
  },
  getReviewReports: async (page = 1) => {
    try {
      return await apiClient.get(`/api/admin/reports/review?page=${page}`);
    } catch (error) {
      console.error("getReviewReports error:", error);
      throw error;
    }
  },
  searchCommentReports: async (keyword, page = 1) => {
    try {
      return await apiClient.get(
        `/api/admin/reports/comment/keyword?keyword=${encodeURIComponent(
          keyword
        )}&page=${page}`
      );
    } catch (error) {
      console.error("searchCommentReports error:", error);
      throw error;
    }
  },
  searchReviewReports: async (keyword, page = 1) => {
    try {
      return await apiClient.get(
        `/api/admin/reports/review/keyword?keyword=${encodeURIComponent(
          keyword
        )}&page=${page}`
      );
    } catch (error) {
      console.error("searchReviewReports error:", error);
      throw error;
    }
  },
  getCommentReportDetail: async (reportNo) => {
    try {
      return await apiClient.get(`/api/admin/reports/comment/${reportNo}`);
    } catch (error) {
      console.error("getCommentReportDetail error:", error);
      throw error;
    }
  },
  getReviewReportDetail: async (reportNo) => {
    try {
      return await apiClient.get(`/api/admin/reports/review/${reportNo}`);
    } catch (error) {
      console.error("getReviewReportDetail error:", error);
      throw error;
    }
  },
  processCommentReport: async (reportNo, reportProcess) => {
    try {
      return await apiClient.put(`/api/admin/reports/comment/${reportNo}`, {
        reportProcess,
      });
    } catch (error) {
      console.error("processCommentReport error:", error);
      throw error;
    }
  },
  processReviewReport: async (reportNo, reportProcess) => {
    try {
      return await apiClient.put(`/api/admin/reports/review/${reportNo}`, {
        reportProcess,
      });
    } catch (error) {
      console.error("processReviewReport error:", error);
      throw error;
    }
  },
  getMembers: async (page = 1) => {
    try {
      return await apiClient.get(`/api/admin/members?page=${page}`);
    } catch (error) {
      console.error("getMembers error:", error);
      throw error;
    }
  },
  searchMembers: async (keyword, page = 1) => {
    try {
      return await apiClient.get(
        `/api/admin/members/keyword?keyword=${encodeURIComponent(
          keyword
        )}&page=${page}`
      );
    } catch (error) {
      console.error("searchMembers error:", error);
      throw error;
    }
  },
  getMemberDetail: async (memberNo) => {
    try {
      return await apiClient.get(`/api/admin/members/${memberNo}`);
    } catch (error) {
      console.error("getMemberDetail error:", error);
      throw error;
    }
  },
  updateMemberRole: async (memberNo, role) => {
    try {
      return await apiClient.put(`/api/admin/members/${memberNo}/role`, {
        role,
      });
    } catch (error) {
      console.error("updateMemberRole error:", error);
      throw error;
    }
  },
  deleteMember: async (memberNo) => {
    try {
      return await apiClient.delete(`/api/admin/members/${memberNo}`);
    } catch (error) {
      console.error("deleteMember error:", error);
      throw error;
    }
  },
  getComments: async (page = 1) => {
    try {
      return await apiClient.get(`/api/admin/comments?page=${page}`);
    } catch (error) {
      console.error("getComments error:", error);
      throw error;
    }
  },
  searchComments: async (keyword, page = 1) => {
    try {
      return await apiClient.get(
        `/api/admin/comments/keyword?keyword=${encodeURIComponent(
          keyword
        )}&page=${page}`
      );
    } catch (error) {
      console.error("searchComments error:", error);
      throw error;
    }
  },
  getCommentDetail: async (commentNo) => {
    try {
      return await apiClient.get(`/api/admin/comments/${commentNo}`);
    } catch (error) {
      console.error("getCommentDetail error:", error);
      throw error;
    }
  },
  deleteComment: async (commentNo) => {
    try {
      return await apiClient.delete(`/api/admin/comments/${commentNo}`);
    } catch (error) {
      console.error("deleteComment error:", error);
      throw error;
    }
  },
  getReviews: async (page = 1) => {
    try {
      return await apiClient.get(`/api/admin/reviews?page=${page}`);
    } catch (error) {
      console.error("getReviews error:", error);
      throw error;
    }
  },
  searchReviews: async (keyword, page = 1) => {
    try {
      return await apiClient.get(
        `/api/admin/reviews/keyword?keyword=${encodeURIComponent(
          keyword
        )}&page=${page}`
      );
    } catch (error) {
      console.error("searchReviews error:", error);
      throw error;
    }
  },
  getReviewDetail: async (reviewNo) => {
    try {
      return await apiClient.get(`/api/admin/reviews/${reviewNo}`);
    } catch (error) {
      console.error("getReviewDetail error:", error);
      throw error;
    }
  },
  deleteReview: async (reviewNo) => {
    try {
      return await apiClient.delete(`/api/admin/reviews/${reviewNo}`);
    } catch (error) {
      console.error("deleteReview error:", error);
      throw error;
    }
  },
};

export const authApi = {
  login: async (email, password) => {
    return await apiClient.post("/api/auth/login", { email, password });
  },

  logout: async ({ email, refreshToken }) => {
    try {
      await apiClient.post("/api/auth/logout", { email, refreshToken });
    } catch (e) {
      console.warn("Logout API failed:", e);
    }
  },
};

/* =======================
   Member APIs (회원가입 + 내정보수정/프로필)
======================= */
export const memberApi = {
  // (회원가입) 이메일 중복확인
  checkEmail: async (email) => {
    return await apiClient.get(
      `/api/members/email?email=${encodeURIComponent(email)}`
    );
  },

  // (회원가입) 닉네임 중복확인
  checkNickname: async (nickname) => {
    return await apiClient.get(
      `/api/members/nickname?nickname=${encodeURIComponent(nickname)}`
    );
  },

  // (회원가입)
  signup: async ({ email, password, memberName, nickname, phone }) => {
    return await apiClient.post("/api/members", {
      email,
      password,
      memberName,
      nickname,
      phone,
    });
  },

  // 비밀번호 검증
  verifyPassword: async (password) => {
    return await apiClient.post("/api/members/password/verify", { password });
  },

  // 비밀번호 변경
  changePassword: async (currentPassword, newPassword) => {
    return await apiClient.patch("/api/members/password", {
      currentPassword,
      newPassword,
    });
  },

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

    // 기본 JSON Content-Type 덮어쓰지 않게 → 브라우저가 boundary 자동 설정
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

  // 내 정보 조회
  getMe: async () => {
    return await apiClient.get("/api/members/me");
  },
};

/* =======================
   Bookmark APIs
======================= */
export const bookmarkApi = {
  toggle: async (reviewNo) => {
    return await apiClient.post(`/api/bookmarks/${reviewNo}/toggle`);
  },

  getMyBookmarks: async (page = 0, size = 20) => {
    return await apiClient.get(`/api/bookmarks/me?page=${page}&size=${size}`);
  },

  delete: async (reviewNo) => {
    return await apiClient.delete(`/api/bookmarks/${reviewNo}`);
  },
};

/* =======================
   My Activity APIs
======================= */
export const myActivityApi = {
  getMyReviews: async ({ cursor = 1, size = 10, sort } = {}) => {
    const params = new URLSearchParams();

    if (cursor != null) params.set("cursor", String(cursor));
    params.set("scroll.size", String(size));

    if (sort) params.set("sort", sort);
    
    return await apiClient.get(`/api/reviews/me?${params.toString()}`);
  },

  getMyComments: async ({ cursor = 1, size = 10 } = {}) => {
    const params = new URLSearchParams();

    if (cursor != null) params.set("cursor", String(cursor));
    params.set("scroll.size", String(size));

    return await apiClient.get(`/api/comments/me?${params.toString()}`);
  },

  deleteReview: async (reviewNo) => {
    return await apiClient.delete(`/api/reviews/${reviewNo}`);
  },

  deleteComment: async (commentNo) => {
    return await apiClient.delete(`/api/comments/${commentNo}`);
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
