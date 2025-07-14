import { useEffect, useState } from "react";
import { instance } from "../../config/Axios";
import EditUserForm from "../../components/clients/modals/EditUserForm";
import { Modal } from "react-bootstrap";
import toast from "react-hot-toast";
const UserInfo = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleSave = async (updatedData) => {
    try {
      setLoading(true);
      const response = await instance.put(
        `/users/update/${user.id}`,
        updatedData
      );
      console.log("check >>> ", response);
      setUser({ ...user, ...updatedData });
      if (response?.code === 201) {
        toast.success("Cập nhập thông tin thành công");
        setShowEditModal(false);
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin:", error);
      setError("Cập nhật thông tin thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchMyInfo = async () => {
      try {
        const response = await instance.get("/users/myinfo");
        if (response?.code === 200) {
          setUser(response?.result);
          setError(null);
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
        setError("Không thể tải thông tin người dùng. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyInfo();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-50">
        <div className="text-center">
          <div
            className="spinner-border text-primary"
            style={{ width: "3rem", height: "3rem" }}
            role="status"
          >
            <span className="visually-hidden">Đang tải...</span>
          </div>
          <p className="mt-3 fs-5 text-muted">Đang tải thông tin cá nhân...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div
          className="alert alert-danger mx-auto text-center"
          style={{ maxWidth: "600px" }}
        >
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {error}
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mt-5">
        <div
          className="alert alert-warning mx-auto text-center"
          style={{ maxWidth: "600px" }}
        >
          <i className="bi bi-exclamation-circle-fill me-2"></i>
          Không tìm thấy thông tin người dùng.
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow-lg border-0 rounded-lg overflow-hidden">
              {/* Profile Header */}
              <div
                className="profile-header text-white text-center py-5 position-relative"
                style={{ background: "rgb(207 190 157)" }}
              >
                <div className="position-absolute top-0 end-0 mt-3 me-3"></div>
                <div className="avatar mx-auto mb-3">
                  <div
                    className="bg-white text-black rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: "100px",
                      height: "100px",
                      fontSize: "2.5rem",
                    }}
                  >
                    {user.firstName.charAt(0)}
                    {user.lastName.charAt(0)}
                  </div>
                </div>
                <h1 className="display-6 fw-bold mb-0">
                  {user.firstName} {user.lastName}
                </h1>
                <p className="mb-0">{user.email}</p>
                <div className="mt-2">
                  <span className="badge bg-light text-dark fs-6 px-3 py-2">
                    <i className="bi bi-person me-1"></i> Tài khoản cá nhân
                  </span>
                </div>
              </div>

              {/* Profile Body */}
              <div className="card-body p-4 p-md-5">
                <div className="row mb-4">
                  <div className="col-md-6 mb-4 mb-md-0">
                    <div className="card h-100 border-light shadow-sm">
                      <div className="card-header bg-light">
                        <h3 className="h5 mb-0">
                          <i className="bi bi-info-circle me-2 text-primary"></i>{" "}
                          Thông tin cá nhân
                        </h3>
                      </div>
                      <div className="card-body">
                        <ul className="list-group list-group-flush">
                          <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 py-2">
                            <span>
                              <i className="bi bi-person me-2 text-muted"></i>{" "}
                              Họ và tên
                            </span>
                            <span className="fw-medium">
                              {user.firstName} {user.lastName}
                            </span>
                          </li>
                          <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 py-2">
                            <span>
                              <i className="bi bi-telephone me-2 text-muted"></i>{" "}
                              Điện thoại
                            </span>
                            <span className="fw-medium">
                              {user.phone || "Chưa cập nhật"}
                            </span>
                          </li>
                          <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 py-2">
                            <span>
                              <i className="bi bi-geo-alt me-2 text-muted"></i>{" "}
                              Địa chỉ
                            </span>
                            <span className="fw-medium text-end">
                              {user.address || "Chưa cập nhật"}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="card h-100 border-light shadow-sm">
                      <div className="card-header bg-light">
                        <h3 className="h5 mb-0">
                          <i className="bi bi-shield-lock me-2 text-primary"></i>{" "}
                          Thông tin tài khoản
                        </h3>
                      </div>
                      <div className="card-body">
                        <ul className="list-group list-group-flush">
                          <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 py-2">
                            <span>
                              <i className="bi bi-person-badge me-2 text-muted"></i>{" "}
                              Tên đăng nhập
                            </span>
                            <span className="fw-medium">{user.username}</span>
                          </li>
                          <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 py-2">
                            <span>
                              <i className="bi bi-calendar-plus me-2 text-muted"></i>{" "}
                              Ngày tạo
                            </span>
                            <span className="fw-medium">
                              {new Date(user.created_at).toLocaleDateString()}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center mt-4">
                  <button
                    className="btn btn-primary me-2 px-4 py-2"
                    onClick={() => setShowEditModal(true)}
                  >
                    <i className="bi bi-pencil me-2"></i> Chỉnh sửa thông tin
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
          size="lg"
          centered
          backdrop="static"
        >
          <Modal.Header closeButton className="bg-primary text-white">
            <Modal.Title className="fs-5">
              <i className="bi bi-pencil-square me-2"></i>
              Chỉnh sửa thông tin cá nhân
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-4">
            {user && (
              <EditUserForm
                user={user}
                onSave={handleSave}
                onCancel={() => setShowEditModal(false)}
              />
            )}
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default UserInfo;
