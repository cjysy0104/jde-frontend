// 공통 설정과 스토리지 re-export
export { authStorage } from "./apiClient.js";

// 분리된 API들 re-export
export { adminApi } from "./adminApi.js";
export { authApi } from "./authApi.js";
export { reviewApi } from "./reviewApi.js";

// 나머지 API들
import apiClient from "./apiClient.js";

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

