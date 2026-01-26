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

  getDefaultProfiles: async () => {
    const res = await apiClient.get("/api/members/profile-image/default");
    return res.data ?? res;
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

const unwrap = (x) => x?.data ?? x;

export const bookmarkApi = {
  toggle: async (reviewNo) => {
    const res = await apiClient.post(`/api/bookmarks/${reviewNo}/toggle`);
    return unwrap(res);
  },

  getMyBookmarks: async (page = 0, size = 20) => {
    const res = await apiClient.get(`/api/bookmarks/me`, {
      params: { page, size },
    });
    return unwrap(res);
  },

  delete: async (reviewNo) => {
    const res = await apiClient.delete(`/api/bookmarks/${reviewNo}`);
    return unwrap(res);
  },
};

export const myActivityApi = {
  getMyReviews: async ({ cursor = 1, size = 10, sort, memberNo } = {}) => {
    const params = new URLSearchParams();
    params.set("cursor", String(cursor));
    params.set("scroll.size", String(size));
    if (sort) params.set("sort", sort);
    if (memberNo != null) params.set("memberNo", String(memberNo));

    const res = await apiClient.get(`/api/reviews/me?${params.toString()}`);
    return res.data;
  },

  getMyComments: async ({ cursor = 1, size = 10, memberNo } = {}) => {
    const params = new URLSearchParams();
    params.set("cursor", String(cursor));
    params.set("scroll.size", String(size));
    if (memberNo != null) params.set("memberNo", String(memberNo));

    const res = await apiClient.get(`/api/comments/me?${params.toString()}`);
    return res.data;
  },

  deleteReview: async (reviewNo) => {
    const res = await apiClient.delete(`/api/reviews/${reviewNo}`);
    return res.data;
  },

  deleteComment: async (commentNo) => {
    const res = await apiClient.delete(`/api/comments/${commentNo}`);
    return res.data;
  },

  getCaptainList: async () =>{
    return await apiClient.get(`/api/members`);
  }
};

