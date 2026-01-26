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
            await apiClient.post(`api/comments/${reviewNo}`, {
                content
            })
        } catch (error) {
            console.error('createComment error:', error);
            throw error;
        }
    }
};