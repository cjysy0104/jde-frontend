import apiClient from "./apiClient.js";

export const commentApi = {
    getCommentListById: async ({ reviewNo, currentPage }) => {
        try {
            return await apiClient.get(`/api/comments/${reviewNo}`,{
                params:{
                    currentPage,
                }
            });
        } catch (error) {
            console.error('getCommentListById error:', error);
            throw error;
        }
    },

    createComment: async ({ reviewNo, content }) => {
        try {
            await apiClient.post(`/api/comments/${reviewNo}`, {
                content
            });
        } catch (error) {
            console.error('createComment error:', error);
            throw error;
        }
    },

    updateComment: async({commentNo, content}) => {
        try {
            await apiClient.patch(`/api/comments/${commentNo}`,{
                content
            });
        } catch (error) {
            console.error('updateComment error:', error);
            throw error;
        }
    },

    deleteCommentById: async({commentNo}) => {
        try {
            await apiClient.delete(`/api/comments/${commentNo}`);
        } catch (error) {
            console.error('deleteCommentById error:', error);
            throw error;
        }
    },

    createCommentLike: async({commentNo}) => {
        try {
            await apiClient.post(`/api/commentLikes/${commentNo}`);
        } catch (error) {
            console.error('createCommentLike error:', error);
            throw error;
        }
    },

    deleteCommentLike: async({commentNo}) => {
        try {
            await apiClient.delete(`/api/commentLikes/${commentNo}`);
        } catch (error) {
            console.error('deleteCommentLike error:', error);
            throw error;
        }
    },
};