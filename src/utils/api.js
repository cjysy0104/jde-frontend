import axios from "axios";

const API_BASE_URL = window.ENV?.API_BASE_URL || "http://localhost:8080";

// 스토리지
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

// refresh 전용 (중요: apiClient 사용 금지 → 무한루프 방지)
const refreshClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// 동시 401 발생 시 refresh 중복 호출 방지
let refreshPromise = null;

// refresh 응답: accessToken만 내려오는 스펙 반영
const applyAccessToken = (refreshResponseData) => {
  const newAccessToken = refreshResponseData?.data?.accessToken;

  if (!newAccessToken) {
    throw new Error("토큰 갱신 응답에 accessToken이 없습니다.");
  }

  authStorage.setToken(newAccessToken);
  return newAccessToken;
};

const notifyForceLogout = (reason = "REFRESH_FAILED") => {
  window.dispatchEvent(
    new CustomEvent("auth:forceLogout", { detail: { reason } })
  );
};

const requestRefresh = async () => {
  const refreshToken = authStorage.getRefreshToken();
  if (!refreshToken)
    throw new Error("refreshToken이 없습니다. 다시 로그인 해주세요.");

  const res = await refreshClient.post("/api/auth/refresh", { refreshToken });

  if (!res?.data?.success) {
    const msg = res?.data?.message || "토큰 갱신에 실패했습니다.";
    throw new Error(msg);
  }

  return applyAccessToken(res.data);
};

// 요청 인터셉터: 토큰 자동 추가
apiClient.interceptors.request.use(
  (config) => {
    const token = authStorage.getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터: 401이면 refresh 후 재시도
apiClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    if (!error?.response) {
      if (error?.request) {
        return Promise.reject(
          new Error("서버에 연결할 수 없습니다. 서버가 실행 중인지 확인해주세요.")
        );
      }
      return Promise.reject(
        new Error(error?.message || "요청 중 오류가 발생했습니다.")
      );
    }

    const { status, data } = error.response;
    const originalRequest = error.config;

    const isAuthExpired = status === 401;
    const isRefreshRequest = originalRequest?.url?.includes("/api/auth/refresh");

    if (
      isAuthExpired &&
      !isRefreshRequest &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        if (!refreshPromise) {
          refreshPromise = requestRefresh().finally(() => {
            refreshPromise = null;
          });
        }

        const newAccessToken = await refreshPromise;

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      } catch (refreshErr) {
        authStorage.clear();
        notifyForceLogout("REFRESH_TOKEN_EXPIRED");
        return Promise.reject(refreshErr);
      }
    }

    const errorMessage = data?.message || data?.error || error.message;
    return Promise.reject(new Error(errorMessage));
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

/* Member APIs */
export const memberApi = {
  checkEmail: async (email) => {
    return await apiClient.get(
      `/api/members/email?email=${encodeURIComponent(email)}`
    );
  },

  checkNickname: async (nickname) => {
    return await apiClient.get(
      `/api/members/nickname?nickname=${encodeURIComponent(nickname)}`
    );
  },

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

  changeNickname: async (currentPassword, nickname) => {
    return await apiClient.patch(`/api/members/nickname`, {
      currentPassword,
      nickname,
    });
  },

  changePhone: async (currentPassword, phone) => {
    return await apiClient.patch(`/api/members/phone`, {
      currentPassword,
      phone,
    });
  },

  uploadProfileImage: async (password, file) => {
    const form = new FormData();
    form.append("password", password);
    form.append("file", file);

    return await apiClient.patch(`/api/members/profile-image`, form, {
      headers: { "Content-Type": undefined },
    });
  },

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

export const myActivityApi = {
  getMyReviews: async ({ page = 1, size = 10 } = {}) => {
    return await apiClient.get(`/api/reviews/me?page=${page}&size=${size}`);
  },

  getMyComments: async ({ page = 1, size = 10 } = {}) => {
    return await apiClient.get(`/api/comments/me?page=${page}&size=${size}`);
  },

  deleteReview: async (reviewNo) => {
    return await apiClient.delete(`/api/reviews/${reviewNo}`);
  },

  deleteComment: async (commentNo) => {
    return await apiClient.delete(`/api/comments/${commentNo}`);
  },
};

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
