import { useState, useEffect, useCallback } from "react";
import { FaImages } from "react-icons/fa6";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { instanceAdmin } from "../../../config/Axios";
import "./ProductModal.css";
import { toast } from "react-hot-toast";
import useFetchCategories from "../../../hooks/useFetchCategories";
import useFetchDiscounts from "../../../hooks/useFetchDiscounts";
const UpdateProduct = ({ show, setShow, product, fetchProductsData }) => {
  const [nameProduct, setNameProduct] = useState("");
  const [descriptionProduct, setDescriptionProduct] = useState("");
  const [dimensionProduct, setDimensionProduct] = useState("");
  const [brandProduct, setBrandProduct] = useState("");
  const [material, setMaterialProduct] = useState("");
  const [tags, setTags] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [priceProduct, setPriceProduct] = useState(0);
  const [imageProduct, setImageProduct] = useState([]);
  const [previewImage, setPreviewImage] = useState([]);

  const [categoryID, setCategoryID] = useState("");
  const [discountID, setDiscountID] = useState("");

  const { categories } = useFetchCategories();
  const { discounts } = useFetchDiscounts();
  console.log(discounts);
  const handleClose = () => {
    setShow(false);
    setNameProduct("");
    setDescriptionProduct("");
    setDimensionProduct("");
    setBrandProduct("");
    setMaterialProduct("");
    setTags;
    setIsActive("");
    setPriceProduct(0);
    setImageProduct([]);
    setPreviewImage([]);
  };

  const handleFillData = useCallback(() => {
    if (product) {
      setNameProduct(product.productName);
      setDescriptionProduct(product.description);
      setDimensionProduct(product.dimensions);
      setBrandProduct(product.brand);
      setMaterialProduct(product.material);
      setTags(product.tags);
      setIsActive(product.isActive);
      setPriceProduct(product.price ? product.price : "Chưa có giá");
    }
  }, [product]);

  const handleUpload = async (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      const arrayURLPreview = [];
      const arrayURL = [];

      if (e.target.files.length > 3) {
        return toast.error("Chỉ được tải lên tối đa 3 ảnh");
      }
      for (let i = 0; i < e.target.files.length; i++) {
        const file = e.target.files[i];
        arrayURLPreview.push(URL.createObjectURL(file));
        try {
          arrayURL.push(file);
        } catch (error) {
          console.error("Lỗi khi chuyển file sang Base64:", error);
          return toast.error("Có lỗi khi xử lý ảnh");
        }
      }
      setPreviewImage(arrayURLPreview);
      setImageProduct(arrayURL);
    }
  };

  const handleUpdateProduct = async () => {
    const formData = new FormData();
    formData.append("productName", nameProduct);
    formData.append("description", descriptionProduct);
    formData.append("dimensions", dimensionProduct);
    formData.append("brand", brandProduct);
     formData.append("material", material);
    formData.append("tags", tags);
    formData.append("isActive", String(isActive));
    formData.append("price", String(priceProduct));
    formData.append("categoryID", categoryID);
    formData.append("discountID", discountID);

    if (imageProduct.length > 0) {
      for (let i = 0; i < imageProduct.length; i++) {
        formData.append("image", imageProduct[i]);
      }
    }

    try {
      const response = await instanceAdmin.put(
        `/products/${product.productId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.code === 201) {
        toast.success("Cập nhật sản phẩm thành công");
        fetchProductsData();
        handleClose();
      } else {
        toast.error("Cập nhật sản phẩm thất bại");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Có lỗi xảy ra khi cập nhật sản phẩm");
    }
  };

  useEffect(() => {
    handleFillData();
  }, [product, show, handleFillData]);
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{nameProduct}</Modal.Title>
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
                value={material}
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

            <Form.Group>
              <Form.Label>Mã giảm giá</Form.Label>
              <Form.Select
                aria-label="Default select example"
                className="mb-3"
                onChange={(e) => setDiscountID(e.target.value)}
              >
                <option value="">-- Không áp dụng mã giảm giá --</option>
                {discounts &&
                  discounts.map((item) => {
                    if (item.active)
                      return (
                        <option key={item.discountId} value={item.discountId}>
                          {`${item.code} - ${item.discountValue}%`}
                        </option>
                      );
                  })}
              </Form.Select>
            </Form.Group>

            <Form.Group className="d-flex align-items-center gap-4 mb-3">
              {isActive ? (
                <span className="text-danger" style={{ marginBottom: "8px" }}>
                  Sản phẩm đang kinh doanh
                </span>
              ) : (
                <span style={{ marginBottom: "8px" }} className="text-danger">
                  Sản phẩm chưa kinh doanh
                </span>
              )}
            </Form.Group>
          </Form>
          <div>
            <Form.Group className="mb-3">
              <Form.Label
                htmlFor="labelUpload"
                className="d-flex align-items-center gap-3 btn btn-success"
              >
                <FaImages />
                Tải ảnh
              </Form.Label>
              <Form.Control
                type="file"
                id="labelUpload"
                hidden
                multiple
                onChange={(e) => handleUpload(e)}
              />
            </Form.Group>

            <Form.Group className="mb-3 img-preview">
              {previewImage.length > 0 ? (
                previewImage.map((url, index) => {
                  return <img src={url} key={index + "img"} />;
                })
              ) : (
                <span>Img Preview</span>
              )}
            </Form.Group>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleUpdateProduct}>
            Cập nhập
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateProduct;
