import axios from "axios";

const isDevelopment = import.meta.env.MODE === "development";

const baseURL = isDevelopment ? "/api" : `${import.meta.env.VITE_API_URL}`;

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

api.interceptors.request.use(
  (config) => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const { token, id } = JSON.parse(userData);
      config.headers.Authorization = `Bearer ${token}`;
      config.headers["X-User-ID"] = id;
    }

    if (isDevelopment) {
      console.log("Request:", {
        url: config.url,
        method: config.method,
        headers: config.headers,
        data: config.data,
      });
    }
    return config;
  },
  (error) => {
    if (isDevelopment) {
      console.error("Request error:", error);
    }
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    if (isDevelopment) {
      console.log("Response success:", {
        url: response.config.url,
        status: response.status,
        data: response.data,
      });
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401 && error.config.method !== "delete") {
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    if (isDevelopment) {
      console.error("Response error:", {
        url: error.config?.url,
        method: error.config?.method,
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
    }
    return Promise.reject(error);
  }
);

export default api;
