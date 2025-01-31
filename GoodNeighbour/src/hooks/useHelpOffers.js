import { useCallback } from "react";
import api from "../utils/api-client";
import { useAuth } from "../context/AuthProvider";

export function useHelpOffers() {
  const { user } = useAuth();

  const getByUserId = useCallback(async (userId) => {
    try {
      const response = await api.get(`/users/${userId}/help-offers`);
      return response;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch user's help offers"
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

  const createHelpOffer = useCallback(
    async (helpRequestId) => {
      try {
        const response = await api.post(`/users/${user.id}/help-offers`, {
          help_request_id: helpRequestId,
          helper_id: user.id,
          status: "active",
        });
        return response.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || "Failed to create help offer"
        );
      }
    },
    [user.id]
  );

  return {
    getByUserId,
    updateHelpOffer,
    deleteHelpOffer,
    createHelpOffer,
  };
}
