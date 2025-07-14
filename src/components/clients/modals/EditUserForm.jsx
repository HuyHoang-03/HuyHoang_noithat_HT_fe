import React, { useState } from "react";
import { Form } from "react-bootstrap";

const EditUserForm = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    email: user.email || "",
    phone: user.phone || "",
    address: user.address || "",
    username: user.username || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-6">
          <Form.Group className="mb-3" controlId="formFirstName">
            <Form.Label className="fw-medium">Tên</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="py-2"
            />
            <Form.Text className="text-muted small">Tên của bạn</Form.Text>
          </Form.Group>
        </div>
        
        <div className="col-md-6">
          <Form.Group className="mb-3" controlId="formLastName">
            <Form.Label className="fw-medium">Họ</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="py-2"
            />
            <Form.Text className="text-muted small">Họ của bạn</Form.Text>
          </Form.Group>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label className="fw-medium">Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="py-2"
              disabled
            />
            <Form.Text className="text-muted small">Email của bạn (không thể thay đổi)</Form.Text>
          </Form.Group>
        </div>
        
        <div className="col-md-6">
          <Form.Group className="mb-3" controlId="formPhone">
            <Form.Label className="fw-medium">Số điện thoại</Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="py-2"
            />
            <Form.Text className="text-muted small">Số điện thoại liên hệ</Form.Text>
          </Form.Group>
        </div>
      </div>

      <Form.Group className="mb-3" controlId="formAddress">
        <Form.Label className="fw-medium">Địa chỉ</Form.Label>
        <Form.Control
          as="textarea"
          rows={2}
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="py-2"
        />
        <Form.Text className="text-muted small">Địa chỉ nhà/liên hệ</Form.Text>
      </Form.Group>

      <Form.Group className="mb-4" controlId="formUsername">
        <Form.Label className="fw-medium">Tên đăng nhập</Form.Label>
        <Form.Control
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          className="py-2"
          disabled
        />
        <Form.Text className="text-muted small">Tên đăng nhập (không thể thay đổi)</Form.Text>
      </Form.Group>

      <div className="d-flex justify-content-end gap-3 pt-3 border-top">
        <button 
          type="button"
          className="btn btn-outline-secondary px-4 py-2"
          onClick={onCancel}
        >
          Hủy bỏ
        </button>
        <button 
          type="submit"
          className="btn btn-primary px-4 py-2"
        >
          Lưu thay đổi
        </button>
      </div>
    </Form>
  );
};

export default EditUserForm;