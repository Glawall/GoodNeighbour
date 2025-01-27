import { useCallback } from "react";
import api from "../utils/api-client";

export function useHelpRequests() {
  const getAllHelpRequests = useCallback(
    async ({ sort_by, order, help_type }) => {
      try {
        const queryString = `?sort_by=${sort_by}&order=${order}${
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

  const createHelpRequest = useCallback(async (requestData) => {
    const user = JSON.parse(localStorage.getItem("user"));
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
  }, []);

  return { getAllHelpRequests, getHelpRequestById, createHelpRequest };
}
