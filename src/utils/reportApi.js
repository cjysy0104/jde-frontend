import axios from "axios";
import { authStorage } from "./api";

const API_BASE_URL = window.ENV?.API_BASE_URL || "http://localhost:8080";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  const token = authStorage?.getToken?.();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const reportApi = {
  getCategories: () => apiClient.get("/api/reports/categories"),

  createReviewReport: ({ reviewNo, reportCategoryNo, reportContent }) =>
    apiClient.post("/api/reports/review", {
      reviewNo,
      reportCategoryNo,
      reportContent,
    }),

  createCommentReport: ({ commentNo, reportCategoryNo, reportContent }) =>
    apiClient.post("/api/reports/comment", {
      commentNo,
      reportCategoryNo,
      reportContent,
    }),
};