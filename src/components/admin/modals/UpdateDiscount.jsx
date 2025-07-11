import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from 'react-bootstrap/InputGroup';
import { toast } from "react-hot-toast";
import useUpdateDiscount from "../../../hooks/useUpdateDiscount";
const UpdateDiscount = ({ show, setShow, selectedDiscount, fetchDiscounts }) => {
  const [discountId, setDiscountId] = useState(null);
  const [discountCode, setDiscountCode] = useState("");
  const [discountValue, setDiscountValue] = useState(0);
  const [discountStartDate, setDiscountStartDate] = useState("");
  const [discountEndDate, setDiscountEndDate] = useState("");
  const [discountActive, setDiscountActive] = useState(false);
 
  const [errors, setErrors] = useState({});

  const handleClose = () => {
    setShow(false);
    setDiscountCode("");
    setDiscountValue("");
    setDiscountId(null);
    setErrors({});
  };

   const {updateDiscount, isUpdating, updateError} = useUpdateDiscount();

  const validate = (
    discountCode,
    discountValue,
    discountStartDate,
    discountEndDate
  ) => {
    const newErrors = {};
    if (!discountCode || discountCode.trim() === "") {
      newErrors.discountCode = "Không được để trống mã khuyến mãi";
    }
    if (!discountValue || discountValue <= 0) {
      newErrors.discountValue = "Giá trị giảm phải lớn hơn 0";
    }

    if (!discountStartDate || discountStartDate.trim() === "") {
      newErrors.discountStartDate = "Không được để trống ngày bắt đầu";
    }

    if (!discountEndDate || discountEndDate.trim() === "") {
      newErrors.discountEndDate = "Không được để trống ngày kết thúc";
    }

    if (new Date(discountStartDate) >= new Date(discountEndDate)) {
      newErrors.discountEndDate = "Ngày kết thúc phải sau ngày bắt đầu";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  useEffect(() => {
    if (selectedDiscount) {
      setDiscountId(selectedDiscount.discountId);
      setDiscountCode(selectedDiscount.code);
      setDiscountValue(selectedDiscount.discountValue);
      setDiscountStartDate(
        new Date(selectedDiscount.startDate).toISOString().split("T")[0]
      );
      setDiscountEndDate(
        new Date(selectedDiscount.endDate).toISOString().split("T")[0]
      );
      setDiscountActive(selectedDiscount.active);
    }
  }, [selectedDiscount]);

  useEffect(() => {
    if (updateError) {
      toast.error(`Cập nhật mã giảm giá thất bại: ${updateError}`);
    }
  }, [updateError]);

  const handleUpdateDiscount = async (e) => {
    e.preventDefault();
    const isValid = validate(discountCode, discountValue, discountStartDate, discountEndDate);
    if (!isValid) {
      return;
    }
    if(!selectedDiscount || !discountId) {
        return toast.error("Không tìm thấy mã giảm giá")
    }

   
     try {
       const isSuccess = await updateDiscount(discountId, {
        code: discountCode,
        discountValue :discountValue,
        startDate: discountStartDate,
        endDate: discountEndDate,
        active: discountActive,
      });
      if(isSuccess) {
        toast.success("Cập nhật mã giảm giá thành công")
        fetchDiscounts();
        handleClose()
      } 
      else {
        console.log(updateError?.message || updateError)
        toast.error("Cập nhật mã giảm giá thất bại")
      }
    } catch (error) {
      console.log("Lỗi khi cập nhật mã giảm giá : " + error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Cập nhập khuyến mãi</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>Mã khuyến mãi</Form.Label>
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
            type="number"
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
          {errors.discountStartDate && (
            <p style={{ color: "red" }}>{errors.discountStartDate}</p>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Ngày kết thúc</Form.Label>
          <Form.Control
            value={discountEndDate}
            onChange={(e) => setDiscountEndDate(e.target.value)}
            type="text"
            placeholder="yyyy-mm-dd"
          />
          {errors.discountEndDate && (
            <p style={{ color: "red" }}>{errors.discountEndDate}</p>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Trạng thái</Form.Label>
          <InputGroup.Checkbox  checked={discountActive} onChange={(e) => setDiscountActive(e.target.checked)}/>
          <Form.Text className="text-muted">
            {discountActive ? "Mã giảm giá đang hoạt động" : "Mã giảm giá chưa được kích hoạt"} 
            </Form.Text>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}  disabled={isUpdating}> 
          Đóng
        </Button>
        <Button variant="primary" onClick={handleUpdateDiscount} >  
           {isUpdating ? "Updating..." : "Lưu thay đổi"} 
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateDiscount;
