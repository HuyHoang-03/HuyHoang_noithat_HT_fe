import { useState } from 'react';
const useFormValidateProduct = (initialValues) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [submitAttempted, setSubmitAttempted] = useState(false);

    // Hàm validate dữ liệu
  const validate = () => {
    const newErrors = {};

    // Validate productName
    if (!values.productName) {
      newErrors.productName = 'Tên sản phẩm không được để trống';
    }

    // Validate price
    if (!values.price) {
      newErrors.price = 'Giá không được để trống';
    } else if (isNaN(values.price) || Number(values.price) <= 0) {
      newErrors.price = 'Giá phải là một số dương';
    }

    // Validate description 
    if (!values.description) {
      newErrors.description = 'Mô tả không được để trống';
    }

    // Validate unit 
    if (!values.unit) {
      newErrors.unit = 'Đơn vị không được để trống';
    }

    // Validate origin 
    if (!values.origin) {
      newErrors.origin = 'Nguồn gốc không được để trống';
    }

    return newErrors;
  };

  // Xử lý khi giá trị thay đổi
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (callback) => (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    setSubmitAttempted(true);

    if (Object.keys(newErrors).length === 0) {
      callback(values);
      console.log('Dữ liệu hợp lệ:', values);
      
    } else {
      console.log('Dữ liệu không hợp lệ:', newErrors);
    }
  }

  return {
    values,
    errors,
    submitAttempted,
    handleChange,
    handleSubmit,
    setValues,
  }
}

export default useFormValidateProduct