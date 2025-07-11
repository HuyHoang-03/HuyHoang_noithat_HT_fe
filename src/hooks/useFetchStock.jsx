import { useState, useEffect } from "react";
import { instanceAdmin } from "../config/Axios";

export const useFetchStock = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchData = async () => {
    try {
      setIsLoading(true); // Bắt đầu tải, đặt isLoading là true
      setError(null); // Reset lỗi trước khi fetch mới

      const response = await instanceAdmin.get('stocks');

      if (response?.code === 200) {
        setData(response.result);
      } else {
        setError(
          "Failed to fetch discounts: " +
            (response?.message || "Unknown error")
        );
        setData([]); // Xóa dữ liệu cũ nếu có lỗi
      }
    } catch (err) {
      console.error("Error fetching discounts:", err);
      setError(err.message || "An unexpected error occurred.");
      setData([]); // Xóa dữ liệu cũ nếu có lỗi
    } finally {
      setIsLoading(false); // Dù thành công hay lỗi, đã tải xong
    }
  };
  useEffect(() => {
    fetchData();
  }, []); 

  return { data, isLoading, error, fetchData };
};

