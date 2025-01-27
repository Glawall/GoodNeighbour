import { useCallback } from "react";
import api from "../utils/api-client";

export function useUser() {
  const getUser = useCallback(async (userId) => {
    try {
      const response = await api.get(`/users/${userId}`, {
        headers: {
          "X-User-ID": userId,
        },
      });
      return response.data.user;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch user");
    }
  }, []);

  const updateUser = useCallback(async (userId, userData) => {
    try {
      const response = await api.patch(`/users/${userId}`, userData, {
        headers: {
          "Content-Type": "application/json",
          "X-User-ID": userId,
        },
      });
      return response.data.updatedUser;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to update user");
    }
  }, []);

  return {
    getUser,
    updateUser,
  };
}
