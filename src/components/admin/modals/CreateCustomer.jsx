import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { toast } from "react-hot-toast";
import useCreateCustomer from "../../../hooks/useCreateCustomer";
const CreateCustomer = ({
  showCreateModal,
  setShowCreateModal,
  fetchUsersData,
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errorValidate, setErrorValidate] = useState({});

  const { createCustomer, isLoading, error } = useCreateCustomer();

  const handleClose = () => {
    setShowCreateModal(false);
    // Reset form when closing
    setFirstName("");
    setLastName("");
    setPhone("");
    setEmail("");
    setAddress("");
    setUsername("");
    setPassword("");
    setErrorValidate({});
  };

  const validate = (
    firstName,
    lastName,
    phone,
    email,
    address,
    username,
    password
  ) => {
    const newErrors = {};

    // Check if values exist and are strings before calling trim()
    if (!firstName || firstName.toString().trim() === "") {
      newErrors.firstName = "Tên khách hàng không được để trống";
    }
    if (!lastName || lastName.toString().trim() === "") {
      newErrors.lastName = "Họ khách hàng không được để trống";
    }
    if (!phone || phone.toString().trim() === "") {
      newErrors.phone = "Số điện thoại không được để trống";
    } else if (!/^[0-9]{10,11}$/.test(phone.toString().trim())) {
      newErrors.phone = "Số điện thoại không hợp lệ (10-11 chữ số)";
    }
    if (!email || email.toString().trim() === "") {
      newErrors.email = "Email không được để trống";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toString().trim())) {
      newErrors.email = "Email không hợp lệ";
    }
    if (!address || address.toString().trim() === "") {
      newErrors.address = "Địa chỉ không được để trống";
    }
    if (!username || username.toString().trim() === "") {
      newErrors.username = "Tài khoản đăng nhập không được để trống";
    } else if (username.toString().trim().length < 3) {
      newErrors.username = "Tài khoản đăng nhập phải có ít nhất 3 ký tự";
    }
    if (!password || password.toString().trim() === "") {
      newErrors.password = "Mật khẩu không được để trống";
    } else if (password.toString().trim().length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    setErrorValidate(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateCustomer = async (e) => {
    e.preventDefault();
    setErrorValidate({});

    if (
      !validate(firstName, lastName, phone, email, address, username, password)
    ) {
      return;
    }

    const customerData = {
      firstName: (firstName || "").toString().trim(),
      lastName: (lastName || "").toString().trim(),
      phone: (phone || "").toString().trim(),
      email: (email || "").toString().trim(),
      address: (address || "").toString().trim(),
      username: (username || "").toString().trim(),
      password: (password || "").toString().trim(),
    };

    try {
      const isSuccess = await createCustomer(customerData);
      if (isSuccess) {
        toast.success("Thêm khách hàng thành công!");
        fetchUsersData(0);
        handleClose(); // Close modal and reset form after success
      }
    } catch (error) {
      console.error("Error creating customer:", error);
      toast.error(
        "Có lỗi xảy ra khi thêm khách hàng: " +
          (error.message || "Unknown error")
      );
    }
  };

  useEffect(() => {
    if (showCreateModal) {
      setErrorValidate({});
    }
  }, [showCreateModal]);

  // Handle API errors
  useEffect(() => {
    if (error) {
      console.error("API Error:", error);
      alert("Có lỗi xảy ra: " + error.message);
    }
  }, [error]);

  // Clear form errors when user starts typing
  useEffect(() => {
    if (firstName && errorValidate.firstName) {
      setErrorValidate((prev) => ({ ...prev, firstName: null }));
    }
  }, [firstName, errorValidate.firstName]);

  useEffect(() => {
    if (lastName && errorValidate.lastName) {
      setErrorValidate((prev) => ({ ...prev, lastName: null }));
    }
  }, [lastName, errorValidate.lastName]);

  useEffect(() => {
    if (phone && errorValidate.phone) {
      setErrorValidate((prev) => ({ ...prev, phone: null }));
    }
  }, [phone, errorValidate.phone]);

  useEffect(() => {
    if (email && errorValidate.email) {
      setErrorValidate((prev) => ({ ...prev, email: null }));
    }
  }, [email, errorValidate.email]);

  useEffect(() => {
    if (address && errorValidate.address) {
      setErrorValidate((prev) => ({ ...prev, address: null }));
    }
  }, [address, errorValidate.address]);

  useEffect(() => {
    if (username && errorValidate.username) {
      setErrorValidate((prev) => ({ ...prev, username: null }));
    }
  }, [username, errorValidate.username]);

  useEffect(() => {
    if (password && errorValidate.password) {
      setErrorValidate((prev) => ({ ...prev, password: null }));
    }
  }, [password, errorValidate.password]);

  return (
    <Modal show={showCreateModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Thêm mới khách hàng</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <div className="row row-cols-2">
            <div className="col">
              <Form.Group className="mb-3">
                <Form.Label>Tên khách hàng</Form.Label>
                <Form.Control
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  isInvalid={!!errorValidate.firstName}
                />
                {errorValidate.firstName && (
                  <div className="text-danger mt-1">
                    {errorValidate.firstName}
                  </div>
                )}
              </Form.Group>
            </div>
            <div className="col">
              <Form.Group className="mb-3">
                <Form.Label>Họ khách hàng</Form.Label>
                <Form.Control
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  isInvalid={!!errorValidate.lastName}
                />
                {errorValidate.lastName && (
                  <div className="text-danger mt-1">
                    {errorValidate.lastName}
                  </div>
                )}
              </Form.Group>
            </div>
          </div>

          <div className="row row-cols-2">
            <div className="col">
              <Form.Group className="mb-3">
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  isInvalid={!!errorValidate.phone}
                />
                {errorValidate.phone && (
                  <div className="text-danger mt-1">{errorValidate.phone}</div>
                )}
              </Form.Group>
            </div>
            <div className="col">
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  isInvalid={!!errorValidate.email}
                />
                {errorValidate.email && (
                  <div className="text-danger mt-1">{errorValidate.email}</div>
                )}
              </Form.Group>
            </div>
          </div>

          <Form.Group className="mb-3">
            <Form.Label>Địa chỉ</Form.Label>
            <Form.Control
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              isInvalid={!!errorValidate.address}
            />
            {errorValidate.address && (
              <div className="text-danger mt-1">{errorValidate.address}</div>
            )}
          </Form.Group>

          <div className="row row-cols-2">
            <div className="col">
              <Form.Group className="mb-3">
                <Form.Label>Tài khoản đăng nhập</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  isInvalid={!!errorValidate.username}
                />
                {errorValidate.username && (
                  <div className="text-danger mt-1">
                    {errorValidate.username}
                  </div>
                )}
              </Form.Group>
            </div>
            <div className="col">
              <Form.Group className="mb-3">
                <Form.Label>Mật khẩu</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  isInvalid={!!errorValidate.password}
                />
                {errorValidate.password && (
                  <div className="text-danger mt-1">
                    {errorValidate.password}
                  </div>
                )}
              </Form.Group>
            </div>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} disabled={isLoading}>
          Đóng
        </Button>
        <Button
          type="submit"
          variant="primary"
          onClick={handleCreateCustomer}
          disabled={isLoading}
        >
          {isLoading ? "Đang thêm..." : "Thêm mới"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateCustomer;
