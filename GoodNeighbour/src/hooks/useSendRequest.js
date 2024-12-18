import { useState, useCallback } from "react";

const URL = "https://goodneighbour.onrender.com/api";

export const useSendRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(
    async (
      endpoint,
      method = "GET",
      body = null,
      queryParams = "",
      additionalHeaders = {}
    ) => {
      setIsLoading(true);
      setError(null);

      const url = `${URL}/${endpoint}${queryParams}`;
      const headers = {
        "Content-Type": "application/json",
        ...additionalHeaders,
      };

      try {
        const response = await fetch(url, {
          method,
          headers,
          body: body ? JSON.stringify(body) : undefined,
        });

        if (!response.ok) {
          const errorMessage = `HTTP Error: ${response.status} ${response.statusText}`;
          const error = new Error(errorMessage);
          error.status = response.status;
          setError(error);
          throw error;
        }

        const contentType = response.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
          const responseData = await response.json();
          return responseData;
        } else {
          return {};
        }
      } catch (err) {
        setError(err);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return { isLoading, error, sendRequest };
};
