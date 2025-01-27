import { useCallback } from "react";
import api from "../utils/api-client";

export function useHelpTypes() {
  const getAllHelpTypes = useCallback(async () => {
    try {
      const response = await api.get("/help-types");
      return response.data.helpTypes || [];
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch help types"
      );
    }
  }, []);

  return { getAllHelpTypes };
}
