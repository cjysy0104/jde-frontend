const API_BASE_URL = window.ENV?.API_BASE_URL || 'http://localhost:8080';

// 공통 응답 처리 함수
const handleResponse = async (response) => {
  // 응답이 ok가 아니면 에러 발생
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
  }

  // Content-Type 확인
  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    const text = await response.text();
    throw new Error(`Expected JSON but got ${contentType}. Response: ${text}`);
  }

  // 응답 본문 가져오기
  const text = await response.text();
  
  // 빈 응답 체크
  if (!text || text.trim() === '') {
    throw new Error('Empty response from server');
  }

  try {
    return JSON.parse(text);
  } catch (error) {
    console.error('JSON parse error:', error);
    console.error('Response text:', text);
    throw new Error(`Failed to parse JSON: ${error.message}`);
  }
};

export const adminApi = {
  // 댓글 신고 목록 조회
  getCommentReports: async (page = 1) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/reports/comment?page=${page}`);
      const data = await handleResponse(response);
      return data;
    } catch (error) {
      console.error('getCommentReports error:', error);
      throw error;
    }
  },

  // 리뷰 신고 목록 조회
  getReviewReports: async (page = 1) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/reports/review?page=${page}`);
      return await handleResponse(response);
    } catch (error) {
      console.error('getReviewReports error:', error);
      throw error;
    }
  },

  // 댓글 신고 키워드 검색
  searchCommentReports: async (keyword, page = 1) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/reports/comment/keyword?keyword=${encodeURIComponent(keyword)}&page=${page}`);
      return await handleResponse(response);
    } catch (error) {
      console.error('searchCommentReports error:', error);
      throw error;
    }
  },

  // 리뷰 신고 키워드 검색
  searchReviewReports: async (keyword, page = 1) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/reports/review/keyword?keyword=${encodeURIComponent(keyword)}&page=${page}`);
      return await handleResponse(response);
    } catch (error) {
      console.error('searchReviewReports error:', error);
      throw error;
    }
  },

  // 댓글 신고 상세 조회
  getCommentReportDetail: async (reportNo) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/reports/comment/${reportNo}`);
      return await handleResponse(response);
    } catch (error) {
      console.error('getCommentReportDetail error:', error);
      throw error;
    }
  },

  // 리뷰 신고 상세 조회
  getReviewReportDetail: async (reportNo) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/reports/review/${reportNo}`);
      return await handleResponse(response);
    } catch (error) {
      console.error('getReviewReportDetail error:', error);
      throw error;
    }
  },

  // 댓글 신고 처리
  processCommentReport: async (reportNo, reportProcess) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/reports/comment/${reportNo}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reportProcess }),
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('processCommentReport error:', error);
      throw error;
    }
  },

  // 리뷰 신고 처리
  processReviewReport: async (reportNo, reportProcess) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/reports/review/${reportNo}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reportProcess }),
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('processReviewReport error:', error);
      throw error;
    }
  },

  // 회원 목록 조회
  getMembers: async (page = 1) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/members?page=${page}`);
      return await handleResponse(response);
    } catch (error) {
      console.error('getMembers error:', error);
      throw error;
    }
  },

  // 회원 키워드 검색
  searchMembers: async (keyword, page = 1) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/members/keyword?keyword=${encodeURIComponent(keyword)}&page=${page}`);
      return await handleResponse(response);
    } catch (error) {
      console.error('searchMembers error:', error);
      throw error;
    }
  },

  // 회원 상세 조회
  getMemberDetail: async (memberNo) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/members/${memberNo}`);
      return await handleResponse(response);
    } catch (error) {
      console.error('getMemberDetail error:', error);
      throw error;
    }
  },

  // 회원 권한 변경
  updateMemberRole: async (memberNo, role) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/members/${memberNo}/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role }),
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('updateMemberRole error:', error);
      throw error;
    }
  },

  // 회원 삭제
  deleteMember: async (memberNo) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/members/${memberNo}`, {
        method: 'DELETE',
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('deleteMember error:', error);
      throw error;
    }
  },

  // 댓글 목록 조회
  getComments: async (page = 1) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/comments?page=${page}`);
      return await handleResponse(response);
    } catch (error) {
      console.error('getComments error:', error);
      throw error;
    }
  },

  // 댓글 키워드 검색
  searchComments: async (keyword, page = 1) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/comments/keyword?keyword=${encodeURIComponent(keyword)}&page=${page}`);
      return await handleResponse(response);
    } catch (error) {
      console.error('searchComments error:', error);
      throw error;
    }
  },

  // 댓글 상세 조회
  getCommentDetail: async (commentNo) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/comments/${commentNo}`);
      return await handleResponse(response);
    } catch (error) {
      console.error('getCommentDetail error:', error);
      throw error;
    }
  },

  // 댓글 삭제
  deleteComment: async (commentNo) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/comments/${commentNo}`, {
        method: 'DELETE',
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('deleteComment error:', error);
      throw error;
    }
  },

  // 리뷰 목록 조회
  getReviews: async (page = 1) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/reviews?page=${page}`);
      return await handleResponse(response);
    } catch (error) {
      console.error('getReviews error:', error);
      throw error;
    }
  },

  // 리뷰 키워드 검색
  searchReviews: async (keyword, page = 1) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/reviews/keyword?keyword=${encodeURIComponent(keyword)}&page=${page}`);
      return await handleResponse(response);
    } catch (error) {
      console.error('searchReviews error:', error);
      throw error;
    }
  },

  // 리뷰 상세 조회
  getReviewDetail: async (reviewNo) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/reviews/${reviewNo}`);
      return await handleResponse(response);
    } catch (error) {
      console.error('getReviewDetail error:', error);
      throw error;
    }
  },

  // 리뷰 삭제
  deleteReview: async (reviewNo) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/reviews/${reviewNo}`, {
        method: 'DELETE',
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('deleteReview error:', error);
      throw error;
    }
  },
};
