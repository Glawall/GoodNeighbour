import { useCallback } from "react";
import api from "../utils/api-client";

// API hook for single help request
export function useHelpRequest(requestId) {
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

  const updateHelpRequest = useCallback(
    async (updateData) => {
      try {
        const response = await api.put(
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

  return {
    getHelpRequest,
    updateHelpRequest,
  };
}
