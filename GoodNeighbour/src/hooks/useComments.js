import { useCallback } from "react";
import api from "../utils/api-client";

export function useComments(requestId) {
  const getComments = useCallback(async () => {
    try {
      const response = await api.get(`/help-requests/${requestId}/comments`);
      if (response.data && Array.isArray(response.data.comments)) {
        return response.data.comments;
      }
      return [];
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch comments"
      );
    }
  }, [requestId]);

  const addComment = useCallback(
    async (commentData) => {
      try {
        let endpoint = `/help-requests/${requestId}/comments`;
        if (commentData.parent_id) {
          endpoint = `/help-requests/${requestId}/comments/${commentData.parent_id}`;
        }

        const response = await api.post(endpoint, {
          description: commentData.description,
          author_id: commentData.author_id,
        });
        return response.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || "Failed to add comment"
        );
      }
    },
    [requestId]
  );

  const deleteComment = useCallback(
    async (commentId) => {
      try {
        await api.delete(`/help-requests/${requestId}/comments/${commentId}`);
      } catch (error) {
        throw new Error(
          error.response?.data?.message || "Failed to delete comment"
        );
      }
    },
    [requestId]
  );

  const updateComment = useCallback(
    async (commentId, updatedData) => {
      try {
        const response = await api.patch(
          `/help-requests/${requestId}/comments/${commentId}`,
          { description: updatedData.description }
        );
        return response.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || "Failed to update comment"
        );
      }
    },
    [requestId]
  );

  return { getComments, deleteComment, addComment, updateComment };
}
