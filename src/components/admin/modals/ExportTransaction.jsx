import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { instance } from "../../../config/Axios";
import { toast } from "react-hot-toast";
const ImportTransaction = ({ show, setShow, fetchData }) => {
  const [products, setProducts] = useState([]);
  const [productCode, setProductCode] = useState("");
  const [importQuantity, setImportQuantity] = useState("");
  const [importPrice, setImportPrice] = useState("");
  const [errorValidate, setErrorValidate] = useState([]);

  const fetchProducts = async () => {
    const response = await instance.get("/products");
    if (response && response.code === 200) {
      setProducts(response.result);
    }
  };

  const handleClose = () => {
    setShow(false);
    setProducts([]);
    setProductCode("");
    setImportPrice("");
    setImportQuantity("");
    setErrorValidate([])
  };

  const validateImportData = ({ productId, quantity, price }) => {
    const newError = {};

    if (!productId || productId === "Chọn sản phẩm") {
      newError.errorProductId = "Vui lòng chọn sản phẩm";
    }

    if (!quantity) {
      newError.errorQuantity = "Vui lòng điền số lượng nhập";
    } else if (isNaN(quantity) || Number(quantity) <= 0) {
      newError.errorQuantity = "Số lượng nhập phải là số lớn hơn 0.";
    }

    if (!price) {
      newError.errorPrice = "Vui lòng điền giá xuất";
    } else if (isNaN(price) || Number(price) <= 0) {
      newError.errorPrice = "Giá xuất phải là số lớn hơn 0.";
    }

    // Cập nhật state lỗi để hiển thị ở form
    setErrorValidate(newError);

    // Nếu có lỗi thì trả về true, ngược lại trả false
    return Object.keys(newError).length > 0;
  };

  const handleImport = async () => {
    const data = {
      productId: productCode,
      quantity: importQuantity,
      price: importPrice,
      transactionType: "EXPORT",
    };

    const hasError = validateImportData(data);
    if (hasError) {
      return;
    }
    try {
      const response = await instance.post("/stocks", data);
      if (response?.code === 201 && response?.result) {
        toast.success("Xuất hàng thành công!");
        fetchData();
        handleClose();
      } else {
        toast.error("Lội xuất hàng");
      }
    } catch (error) {
      console.log(error);
      toast.error("Lỗi xuất nhập hàng - Vui lòng kiểm tra console.log");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [show]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Xuất hàng</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form method="POST">
          <Form.Select
            className="mb-3"
            onChange={(e) => setProductCode(e.target.value)}
          >
            <option>Chọn sản phẩm</option>
            {products &&
              products.map((product) => {
                return (
                  <option
                    key={product.productId + "_" + product.productName}
                    value={product.productId}
                  >
                    {product.productName}
                  </option>
                );
              })}
            {errorValidate.errorProductId && (
              <span className="text-red-500">
                {errorValidate.errorProductId}
              </span>
            )}
          </Form.Select>

          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Số lượng xuất"
              aria-describedby="basic-addon1"
              type="number"
              value={importQuantity}
              onChange={(e) => setImportQuantity(e.target.value)}
            />
            {errorValidate.errorQuantity && (
              <span className="text-red-500">
                {errorValidate.errorQuantity}
              </span>
            )}
          </InputGroup>

          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Giá xuất"
              aria-describedby="basic-addon1"
              type="number"
              value={importPrice}
              onChange={(e) => setImportPrice(e.target.value)}
            />
            {errorValidate.errorPrice && (
              <span className="text-red-500">{errorValidate.errorPrice}</span>
            )}
          </InputGroup>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleImport}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ImportTransaction;
