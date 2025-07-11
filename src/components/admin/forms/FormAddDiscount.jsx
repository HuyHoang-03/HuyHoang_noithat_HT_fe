import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { instanceAdmin } from "../../../config/Axios";
import {toast} from "react-hot-toast"
const FormAddDiscount = ({fetchDiscounts}) => {
  const [discountCode, setDiscountCode] = useState("");
  const [discountValue, setDiscountValue] = useState("");
  const [discountStartDate, setDiscountStartDate] = useState("");
  const [discountEndDate, setDiscountEndDate] = useState("");

  const [errors, setErrors] = useState({});

  const validate = (discountCode, discountValue, discountStartDate, discountEndDate) => {
    const newErrors = {};
    if (!discountCode || discountCode.trim() === "") {
      newErrors.discountCode = "Không được để trống tên";
    }
    if (!discountValue || discountValue.trim() === "") {
      newErrors.discountValue = "Không được để trống giá trị";
    }
     if (!discountStartDate || discountStartDate.trim() === "") {
      newErrors.discountStartDate = "Không được để trống ngày bắt đầu";
    }
     if (!discountEndDate || discountEndDate.trim() === "") {
      newErrors.discountEndDate = "Không được để trống ngày kết thúc";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleCreateDiscount = async (e) => {
    e.preventDefault();
    const isValid = validate(discountCode, discountValue, discountStartDate, discountEndDate);
    if (!isValid) {
      return;
    }
    try {
      const response = await instanceAdmin.post("/discounts", {
        code: discountCode,
        discountValue,
        startDate: discountStartDate,
        endDate: discountEndDate,
        active: false
      });
      if(response.code == 201) {
        toast.success(response.message)
        setDiscountCode("")
        setDiscountValue("")
        setDiscountStartDate(""),
        setDiscountEndDate(""),
        fetchDiscounts()
      } 
    } catch (error) {
        console.log("Lỗi khi tạo mã giảm giá : " + error)
    }
  };
  return (
    <Form className="col-3">
      <h3>Thêm mã giảm giá</h3>
      <Form.Group className="mb-3">
        <Form.Label>Mã giảm giá</Form.Label>
        <Form.Control
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
          type="text"
        />
        {errors.discountCode && (
          <p style={{ color: "red" }}>{errors.discountCode}</p>
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Giá trị giảm (%)</Form.Label>
        <Form.Control
          value={discountValue}
          onChange={(e) => setDiscountValue(e.target.value)}
          type="text"
        />
      </Form.Group>
      {errors.discountValue && (
        <p style={{ color: "red" }}>{errors.discountValue}</p>
      )}

       <Form.Group className="mb-3">
        <Form.Label>Ngày bắt đầu</Form.Label>
        <Form.Control
          value={discountStartDate}
          onChange={(e) => setDiscountStartDate(e.target.value)}
          type="text"
          placeholder="yyyy-mm-dd"
        />
      </Form.Group>

       <Form.Group className="mb-3">
        <Form.Label>Ngày kết thúc</Form.Label>
        <Form.Control
          value={discountEndDate}
          onChange={(e) => setDiscountEndDate(e.target.value)}
          type="text"
           placeholder="yyyy-mm-dd"
        />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleCreateDiscount}>
        Thêm mã giảm giá
      </Button>
    </Form>
  );
};

export default FormAddDiscount;
