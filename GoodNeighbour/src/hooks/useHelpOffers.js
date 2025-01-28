import { useCallback } from "react";
import api from "../utils/api-client";

export function useHelpOffers() {
  const getByUserId = useCallback(async (userId) => {
    try {
      const response = await api.get(`/users/${userId}/help-offers`);
      return response.data || { requests: [], offers: [] };
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch help offers"
      );
    }
  }, []);

  const updateHelpOffer = useCallback(
    async (helpRequestId, helperId, updateData) => {
      try {
        const response = await api.patch(
          `/help-requests/${helpRequestId}/help-offers/${helperId}`,
          updateData
        );
        return response.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || "Failed to update help offer"
        );
      }
    },
    []
  );

  const deleteHelpOffer = useCallback(async (helpRequestId, helperId) => {
    try {
      await api.delete(
        `/help-requests/${helpRequestId}/help-offers/${helperId}`
      );
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to delete help offer"
      );
    }
  }, []);

  return {
    getByUserId,
    updateHelpOffer,
    deleteHelpOffer,
  };
}
