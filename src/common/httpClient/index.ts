import { noti } from "@providers/NotificationProvider";
import axios, { AxiosError } from "axios";

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "https://api.themoviedb.org/3",
});
httpClient.interceptors.request.use(
  async (config) => {
    config.headers.Authorization = `Bearer ${
      import.meta.env.VITE_API_AUTH_HEADER
    }`;
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// Response interceptor for global error handling
httpClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (!error.response) {
      // Network error (no response from server)
      noti.error("Network error, please check your connection.");
    } else {
      // DO NOTHING
      // HTTP error (status code 4xx or 5xx)
      // const message =
      //   (error.response.data as any)?.message ||
      //   `Request failed with status ${error.response.status}`;
      // noti.error(message);
    }
    return Promise.reject(error);
  }
);

export default httpClient;
