import axios from "axios";

const apiInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ANALYZE_API_BASE_URL,
});

apiInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    console.log("Adding Authorization header with token:", token);
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default apiInstance;
