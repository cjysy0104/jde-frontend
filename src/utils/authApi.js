import apiClient from "./apiClient.js";

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
