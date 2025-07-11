import { useState, useEffect } from "react";
import { instanceAdmin } from "../config/Axios";

const useFetchCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchCategories = async () => {
    try {
      setIsLoading(true); // Bắt đầu tải, đặt isLoading là true
      setError(null); // Reset lỗi trước khi fetch mới

      const response = await instanceAdmin.get("/categories");

      if (response?.code === 200) {
        setCategories(response.result);
      } else {
        setError(
          "Failed to fetch categories: " +
            (response?.message || "Unknown error")
        );
        setCategories([]); // Xóa dữ liệu cũ nếu có lỗi
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError(err.message || "An unexpected error occurred.");
      setCategories([]); // Xóa dữ liệu cũ nếu có lỗi
    } finally {
      setIsLoading(false); // Dù thành công hay lỗi, đã tải xong
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []); // [] đảm bảo chỉ gọi một lần khi component mount

  // Trả về dữ liệu, trạng thái tải và lỗi để component sử dụng
  return { categories, isLoading, error, fetchCategories };
};

export default useFetchCategories;
