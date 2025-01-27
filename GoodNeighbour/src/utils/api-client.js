import axios from "axios";

const baseURL =
  import.meta.env.VITE_API_URL || "https://goodneighbour.onrender.com/api";

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

    console.log("🚀 Request:", {
      method: config.method?.toUpperCase(),
      url: config.url,
      data: config.data,
      headers: config.headers,
    });
    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log("✅ Response:", {
      status: response.status,
      data: response.data,
    });
    return response;
  },
  (error) => {
    if (error.response?.status === 401 && error.config.method !== "delete") {
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    console.error("❌ Response Error:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    return Promise.reject(error);
  }
);

export default api;
