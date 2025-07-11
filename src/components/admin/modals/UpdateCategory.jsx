import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import useUpdateApi from "../../../hooks/useUpdateApi";
import {toast} from "react-hot-toast";
const UpdateCategory = ({ show, setshow, selectedCategory, fetchCategories }) => {
  const [categoryId, setCategoryId] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");

  useEffect(() => {
    if (selectedCategory) {
      setCategoryId(selectedCategory.categoryId);
      setCategoryName(selectedCategory.categoryName);
      setCategoryDescription(selectedCategory.description);
    }
  }, [selectedCategory]);

  const [errors, setErrors] = useState({});

  const handleClose = () => {
    setshow(false);
    setCategoryName("");
    setCategoryDescription("");
    setCategoryId(null);
    setErrors({});
  };

  const validate = (categoryName, categoryDescription) => {
    const newErrors = {};
    if (!categoryName || categoryName.trim() === "") {
      newErrors.categoryName = "Không được để trống tên";
    }
    if (!categoryDescription || categoryDescription.trim() === "") {
      newErrors.categoryDescription = "Không được để trống mô tả";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const { handleUpdate, isUpdating } =
    useUpdateApi();

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    const isValid = validate(categoryName, categoryDescription);
    if (!isValid) {
      return;
    }
    if(!selectedCategory || !categoryId) {
        return toast.error("Không tìm thấy danh mục")
    }
    try {
       const isSuccess = await handleUpdate(categoryId, {
        categoryName,
        description: categoryDescription,
      }, 'categories');
      if(isSuccess) {
        toast.success("Cập nhật danh mục thành công")
        fetchCategories();
        handleClose()
      } else {
        toast.error("Cập nhật danh mục thất bại")
      }
    } catch (error) {
      console.log("Lỗi khi cập nhật danh mục : " + error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Cập nhập danh mục</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>Tên</Form.Label>
          <Form.Control
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            type="text"
          />
          {errors.categoryName && (
            <p style={{ color: "red" }}>{errors.categoryName}</p>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Mô tả</Form.Label>
          <Form.Control
            value={categoryDescription}
            onChange={(e) => setCategoryDescription(e.target.value)}
            as="textarea"
            aria-label="With textarea"
            rows={3}
            style={{ resize: "none" }}
          />
        </Form.Group>
        {errors.categoryDescription && (
          <p style={{ color: "red" }}>{errors.categoryDescription}</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} disabled={isUpdating}>
          Close
        </Button>
        <Button variant="primary" onClick={handleUpdateCategory} disabled={isUpdating}>
          {isUpdating ? "Updating..." : "Save Changes"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateCategory;
