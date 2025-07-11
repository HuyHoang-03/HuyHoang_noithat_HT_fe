import axios from "axios";

// Hàm lấy token từ localStorage và bỏ dấu ngoặc kép nếu có
const getToken = (key = "token") => {
  return localStorage.getItem(key)?.replace(/^"|"$/g, "");
};

// Tạo instance chung
const createAxiosInstance = (tokenKey) => {
  const instance = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${getToken(tokenKey)}`,
    },
  });

  // Request interceptor
  instance.interceptors.request.use(
    (config) => {
      const token = getToken(tokenKey);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor
  instance.interceptors.response.use(
    (response) => {
      console.log("response in >>> ", response.data);
      return response.data;
    },
    (error) => {
      console.log("error in >>> ", error);
      return Promise.reject(error);
    }
  );

  return instance;
};

// Các instance cụ thể
const instance = createAxiosInstance("token");
const instanceAdmin = createAxiosInstance("tokenAdmin");

// Instance không cần token (dùng cho login)
const instanceLogin = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export { instanceLogin, instance, instanceAdmin };
