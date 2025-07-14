import React, { useEffect, useState } from "react";
import axios from "axios";

const UserInfo = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8080/api/user/myinfo", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(response.data.result);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyInfo();
  }, []);

  if (loading) {
    return <div className="text-center mt-4">Đang tải thông tin...</div>;
  }

  if (!user) {
    return <div className="text-center mt-4 text-red-500">Không tìm thấy thông tin người dùng.</div>;
  }

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Thông tin người dùng</h2>
      <div>Họ: <strong>{user.firstName}</strong></div>
      <div>Tên: <strong>{user.lastName}</strong></div>
      <div>Email: <strong>{user.email}</strong></div>
      <div>Số điện thoại: <strong>{user.phone}</strong></div>
      <div>Địa chỉ: <strong>{user.address}</strong></div>
      <div>Tên đăng nhập: <strong>{user.username}</strong></div>
      <div>Vai trò: <strong>{user.role}</strong></div>
      <div>Ngày tạo: <strong>{user.created_at}</strong></div>
      <div>Ngày cập nhật: <strong>{user.updated_at}</strong></div>
    </div>
  );
};

export default UserInfo;
