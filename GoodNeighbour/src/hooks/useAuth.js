import { useCallback } from "react";
import api from "../utils/api-client";
import { useUser } from "./useUser";

export function useAuth() {
  const { getUser } = useUser();

  const validateCredentials = useCallback(
    async (credentials) => {
      try {
        const loginResponse = await api.post("/auth/login", credentials);
        const userId = loginResponse.data.user.id;
        const userDetails = await getUser(userId);
        return {
          ...loginResponse.data.user,
          ...userDetails,
          token: loginResponse.data.token,
        };
      } catch (error) {
        const message = error.response?.data?.message || "Login failed";
        throw new Error(message);
      }
    },
    [getUser]
  );

  return { validateCredentials };
}
