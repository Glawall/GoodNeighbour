import { useCallback } from "react";
import api from "../utils/api-client";
import { useAuth } from "../context/AuthProvider";

export function useHelpRequest(requestId) {
  const { user } = useAuth();

  const getHelpRequest = useCallback(async () => {
    try {
      const response = await api.get(`/help-requests/${requestId}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch help request"
      );
    }
  }, [requestId]);

  const createHelpRequest = useCallback(
    async (requestData) => {
      try {
        const response = await api.post("/help-requests", {
          ...requestData,
          author_id: user.id,
        });
        return response.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || "Failed to create help request"
        );
      }
    },
    [user.id]
  );

  const updateHelpRequest = useCallback(
    async (updateData) => {
      try {
        const response = await api.patch(
          `/help-requests/${requestId}`,
          updateData
        );
        return response.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || "Failed to update help request"
        );
      }
    },
    [requestId]
  );

  const deleteHelpRequest = useCallback(async () => {
    try {
      if (!requestId) {
        throw new Error("No help request ID provided");
      }
      await api.delete(`/help-requests/${requestId}`);
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to delete help request"
      );
    }
  }, [requestId]);

  return {
    getHelpRequest,
    updateHelpRequest,
    deleteHelpRequest,
    createHelpRequest,
  };
}
