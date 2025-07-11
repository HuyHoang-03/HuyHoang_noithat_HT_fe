import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { instanceAdmin } from "../../../config/Axios";
import {toast} from "react-hot-toast"
const FormAddCategory = ({fetchCategories}) => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  
  const [errors, setErrors] = useState({});

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

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    const isValid = validate(categoryName, categoryDescription);
    if (!isValid) {
      return;
    }
    try {
      const response = await instanceAdmin.post("/categories", {
        categoryName,
        description: categoryDescription,
      });
      console.log(response.status)
      if(response.code == 201) {
        toast.success(response.message)
        setCategoryName("")
        setCategoryDescription("")
        fetchCategories()
      } 
    } catch (error) {
        console.log("Lỗi khi tạo danh mục : " + error)
    }
  };
  return (
    <Form className="col-3">
      <h3>Thêm danh mục</h3>
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
      <Button variant="primary" type="submit" onClick={handleCreateCategory}>
        Thêm danh mục
      </Button>
    </Form>
  );
};

export default FormAddCategory;
