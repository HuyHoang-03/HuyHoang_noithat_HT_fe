import { useState, useEffect } from "react";
import { instanceAdmin } from "../config/Axios";

const useFetchDiscounts = () => {
  const [discounts, setDiscounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchDiscounts = async () => {
    try {
      setIsLoading(true); // Bắt đầu tải, đặt isLoading là true
      setError(null); // Reset lỗi trước khi fetch mới

      const response = await instanceAdmin.get("/discounts");

      if (response?.code === 200) {
        setDiscounts(response.result);
      } else {
        setError(
          "Failed to fetch discounts: " +
            (response?.message || "Unknown error")
        );
        setDiscounts([]); // Xóa dữ liệu cũ nếu có lỗi
      }
    } catch (err) {
      console.error("Error fetching discounts:", err);
      setError(err.message || "An unexpected error occurred.");
      setDiscounts([]); // Xóa dữ liệu cũ nếu có lỗi
    } finally {
      setIsLoading(false); // Dù thành công hay lỗi, đã tải xong
    }
  };
  useEffect(() => {
    fetchDiscounts();
  }, []); // [] đảm bảo chỉ gọi một lần khi component mount

  // Trả về dữ liệu, trạng thái tải và lỗi để component sử dụng
  return { discounts, isLoading, error, fetchDiscounts };
};

export default useFetchDiscounts;
