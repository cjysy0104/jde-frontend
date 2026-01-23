import apiClient from "./apiClient.js";

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
  getMonthlyReviewCount: async () => {
    try {
      return await apiClient.get(`/api/admin/reviews/monthly`);
    } catch (error) {
      console.error("getMonthlyReviewCount error:", error);
      throw error;
    }
  },
  getNewMemberCountLastMonth: async () => {
    try {
      return await apiClient.get(`/api/admin/members/new`);
    } catch (error) {
      console.error("getNewMemberCountLastMonth error:", error);
      throw error;
    }
  },
  getTotalMemberCount: async () => {
    try {
      return await apiClient.get(`/api/admin/members/total`);
    } catch (error) {
      console.error("getTotalMemberCount error:", error);
      throw error;
    }
  },
};
