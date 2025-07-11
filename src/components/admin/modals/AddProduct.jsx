import { useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { instance } from "../../../config/Axios";
import { toast } from "react-hot-toast";
import useFetchCategories from "../../../hooks/useFetchCategories";
const AddProduct = ({ show, setShow, fetchProductsData }) => {
  const [nameProduct, setNameProduct] = useState("");
  const [descriptionProduct, setDescriptionProduct] = useState("");
  const [dimensionProduct, setDimensionProduct] = useState("");
  const [brandProduct, setBrandProduct] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [priceProduct, setPriceProduct] = useState("");
  const [imageProduct, setImageProduct] = useState([]);
  const [categoryID, setCategoryID] = useState("");
  const [materialProduct, setMaterialProduct] = useState("");
  const { categories } = useFetchCategories();
  const handleClose = () => setShow(false);

  const handleUpload = async (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      const arrayURL = [];

      if (e.target.files.length > 3) {
        return toast.error("Chỉ được tải lên tối đa 3 ảnh");
      }
      for (let i = 0; i < e.target.files.length; i++) {
        const file = e.target.files[i];
        try {
          arrayURL.push(file);
        } catch (error) {
          return toast.error("Có lỗi khi xử lý ảnh");
        }
      }
      setImageProduct(arrayURL);
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productName", nameProduct);
    formData.append("description", descriptionProduct);
    formData.append("dimensions", dimensionProduct);
    formData.append("material", materialProduct);
    formData.append("brand", brandProduct);
    formData.append("tags", "New");
    formData.append("isActive", String(isActive));
    formData.append("price", String(priceProduct));
    formData.append("categoryID", categoryID);

    if (imageProduct.length > 0) {
      for (let i = 0; i < imageProduct.length; i++) {
        formData.append("image", imageProduct[i]);
      }
    }

    const response = await instance.post(`/products`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.code === 201) {
      toast.success("Thêm sản phẩm thành công");
      fetchProductsData();
      handleClose();
    } else {
      toast.error(`Thêm sản phẩm thất bại ${response.message}`);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tạo sản phẩm mới</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form encType="multipart/form-data">
            <Form.Group className="mb-3">
              <Form.Label>Tên sản phẩm</Form.Label>
              <Form.Control
                type="text"
                value={nameProduct}
                onChange={(e) => setNameProduct(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Kích thước</Form.Label>
              <Form.Control
                type="text"
                value={dimensionProduct}
                onChange={(e) => setDimensionProduct(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Chất liệu</Form.Label>
              <Form.Control
                type="text"
                value={materialProduct}
                onChange={(e) => setMaterialProduct(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mô tả sản phẩm</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={descriptionProduct}
                onChange={(e) => setDescriptionProduct(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Giá bán</Form.Label>
              <Form.Control
                type="number"
                value={priceProduct}
                onChange={(e) => setPriceProduct(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Hãng</Form.Label>
              <Form.Control
                type="text"
                value={brandProduct}
                onChange={(e) => setBrandProduct(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Danh mục</Form.Label>
              <Form.Select
                aria-label="Default select example"
                className="mb-3"
                onClick={(e) => setCategoryID(e.target.value)}
              >
                <option>Chọn danh mục</option>
                {categories &&
                  categories.map((item) => {
                    return (
                      <option key={item.categoryId} value={item.categoryId}>
                        {item.categoryName}
                      </option>
                    );
                  })}
              </Form.Select>
            </Form.Group>

            <Form.Group className="d-flex align-items-center gap-4 mb-3">
              <Form.Label>Kích hoạt bán sản phẩm</Form.Label>
              <input
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                type="checkbox"
                style={{ width: "20px", height: "20px", marginBottom: "8px" }}
              />
            </Form.Group>
            <Form.Group
              controlId="formFileMultiple"
              className="mb-3"
              onChange={handleUpload}
            >
              <Form.Label>Chọn ảnh</Form.Label>
              <Form.Control type="file" multiple />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleCreateProduct}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddProduct;
