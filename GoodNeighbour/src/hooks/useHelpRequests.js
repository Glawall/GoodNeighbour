import { useCallback } from "react";
import api from "../utils/api-client";
import { useAuth } from "../context/AuthProvider";

export function useHelpRequests() {
  const { user } = useAuth();

  const getAllHelpRequests = useCallback(
    async ({ sort_by, order, help_type }) => {
      try {
        const queryString = `?sort_by=${sort_by || "req_date"}&order=${order}${
          help_type ? `&help_type=${help_type}` : ""
        }`;
        const response = await api.get(`/help-requests${queryString}`);
        return response.data.helpRequests || [];
      } catch (error) {
        throw error.response?.data?.message || "Failed to fetch help requests";
      }
    },
    []
  );

  const getHelpRequestById = useCallback(async (requestId) => {
    try {
      const response = await api.get(`/help-requests/${requestId}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch help request"
      );
    }
  }, []);

  const getByUserId = useCallback(async (userId) => {
    try {
      const response = await api.get(`/users/${userId}/help-requests`);
      return response;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch user's help requests"
      );
    }
  }, []);

  return {
    getAllHelpRequests,
    getHelpRequestById,
    getByUserId,
  };
}
