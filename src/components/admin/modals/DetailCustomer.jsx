import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import useFetchDetailCustomer from "../../../hooks/useFetchDetailCustomer";
import useUpdateApi from "../../../hooks/useUpdateApi";
import useDeleteApi from "../../../hooks/useDeleteApi";
import { toast } from "react-hot-toast";
const DetailCustomer = ({
  showModalDetail,
  setShowModalDetail,
  customerId,
  fetchUsersData
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorValidate, setErrorValidate] = useState({});

  const { customer, isLoading, error, fetchCustomer, resetCustomer } =
    useFetchDetailCustomer();

  // Điền dữ liệu vào form khi customer thay đổi
  useEffect(() => {
    if (customer) {
      setFirstName(customer.firstName || "");
      setLastName(customer.lastName || "");
      setPhone(customer.phone || "");
      setEmail(customer.email || "");
      setAddress(customer.address || "");
      setUsername(customer.username || "");
    }
  }, [customer]);

  // Fetch customer details when modal opens and customerId changes
  useEffect(() => {
    if (showModalDetail && customerId) {
      fetchCustomer(customerId);
    }
  }, [showModalDetail, customerId, fetchCustomer]);

  const handleClose = () => {
    setShowModalDetail(false);
    resetCustomer(); // Clear data when closing
  };

  // Reset when modal closes
  useEffect(() => {
    if (!showModalDetail) {
      resetCustomer();
    }
  }, [showModalDetail, resetCustomer]);

  const validate = (firstName, lastName, phone, email, address, username) => {
    const newErrors = {};
    if (!firstName || firstName.trim() === "") {
      newErrors.firstName = "Không được để trống tên";
    }
    if (!lastName || lastName.trim() === "") {
      newErrors.lastName = "Không được để trống họ";
    }
     if (!phone || phone.trim() === "") {
      newErrors.phone = "Không được để trống số điện thoại";
    }
    if (!email || email.trim() === "") {
      newErrors.email = "Không được để trống email";
    }
      if (!address || address.trim() === "") {
      newErrors.address = "Không được để trống địa chỉ";
    }
    if (!username || username.trim() === "") {
      newErrors.username = "Không được để trống tài khoản đăng nhập";
    }
    setErrorValidate(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const { handleUpdate, isUpdating, updateError } = useUpdateApi();

  const {handleDelete, isDeleting, deleteError} = useDeleteApi();

  const handleUpdateCustomer = async (e) => {
    e.preventDefault();
    const isValid = validate(
      firstName,
      lastName,
      phone,
      email,
      address,
      username
    );
    if (!isValid) {
      return;
    }

    try {
      const isSuccess = await handleUpdate(
        customerId,
        {
          firstName,
          lastName,
          email,
          phone,
          address,
          username,
        },
        "users"
      );
      if (isSuccess) {
        toast.success("Cập nhật khách hàng thành công");
        fetchUsersData();
        handleClose();
      } else {
        toast.error("Cập nhật khách hàng thất bại");
      }
    } catch (error) {
      console.log("Lỗi khi cập nhật khách hàng: " + error);
    }
  };

  const handleDeleteCustomer = async (e)=>{
    e.preventDefault();
    try {
      const isSuccess = await handleDelete(customerId, 'users')
      if (isSuccess) {
        toast.success("Xoá khách hàng thành công");
        fetchUsersData();
        handleClose();
      } else {
        toast.error("Xoá khách hàng thất bại");
      }
    }
    catch (error) {

  }
  } 

  return (
    <Modal show={showModalDetail} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Chi tiết khách hàng</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isLoading && (
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <p>Đang tải thông tin khách hàng...</p>
          </div>
        )}

        {error && (
          <Alert variant="danger">
            <Alert.Heading>Lỗi!</Alert.Heading>
            <p>{error}</p>
          </Alert>
        )}

        {errorValidate.general && (
          <Alert variant="danger">
            <Alert.Heading>Lỗi!</Alert.Heading>
            <p>{errorValidate.general}</p>
          </Alert>
        )}

        {!isLoading && !error && (
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
                    <div className="text-danger mt-1">
                      {errorValidate.phone}
                    </div>
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
                    <div className="text-danger mt-1">
                      {errorValidate.email}
                    </div>
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
                  <Form.Label>Mật khẩu (để cập nhật)</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    isInvalid={!!errorValidate.password}
                    placeholder="Để trống nếu không thay đổi"
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
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Đóng
        </Button>
          <Button variant="danger" onClick={handleDeleteCustomer} disabled={isLoading || isUpdating || isDeleting} >
          Xoá
        </Button>
        <Button variant="primary" type="submit" onClick={handleUpdateCustomer} disabled={isLoading || isUpdating || isDeleting}>
          Cập nhật khách hàng
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DetailCustomer;
