import { useState, useCallback, useEffect } from "react";
import "./ProductModal.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Card, Col, Row, Table } from "react-bootstrap";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { instanceAdmin } from "../../../config/Axios";
import { convertVND } from "../../../config/customeFunction";
import UpdateProduct from "./UpdateProduct";
import { toast } from "react-hot-toast";
import defaultImage from "../../../assets/imgs/defaultImage.png";
const DetailProduct = ({
  showModal,
  setShowModal,
  productId,
  setSelectedProduct,
  fetchProductsData,
}) => {
  const [product, setProduct] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setSelectedProduct(null); // Xóa sản phẩm đã chọn khi đóng modal
  }, []);

  const handleShowUpdateModal = () => {
    setShowUpdateModal(true);
    setSelectedProduct(null); 
  };

  const fetchProductDetail = useCallback(async () => {
    try {
      const response = await instanceAdmin.get(`/products/${productId}`);
      if (response.code == 200 && response.result) {
        setProduct(response.result);
        console.log(response.result)
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  }, [productId]);

  const handleDeleteProduct = useCallback(
    async (productId) => {
      try {
        const response = await instanceAdmin.delete(`/products/${productId}`);
        if (response.code == 200) {
          toast.success("Xóa sản phẩm thành công");
          setShowModal(false);
          setSelectedProduct(null);
          fetchProductsData();
        }
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    },
    [productId]
  );

  const handleActiveProduct = async (productId, currentActiveStatus) => {
    // Đảo ngược trạng thái hiện tại để gửi lên server
    const newActiveStatus = !currentActiveStatus;

    try {
      const response = await instanceAdmin.put(`/products/active/${productId}`, {
        isActive: newActiveStatus,
      });
      if (response.code === 200) {
        toast.success(
          newActiveStatus
            ? "Kích hoạt sản phẩm thành công"
            : "Huỷ kích hoạt sản phẩm thành công"
        );
        fetchProductsData();
        handleCloseModal();
      }
    } catch (error) {
      console.error("Lỗi khi thay đổi trạng thái mã giảm giá:", error);
      toast.error("Có lỗi xảy ra khi thay đổi trạng thái");
    }
  };

  useEffect(() => {
    if (showModal && productId) {
      fetchProductDetail();
    }
  }, [showModal, productId, fetchProductDetail]);

  return (
    <>
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{product.productName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="product-details">
            <Row>
              <Col md={5}>
                <Card>
                  <Card.Img
                    variant="top"
                    src={
                      product.images && product.images.length > 0
                        ? product.images[0].url
                        : defaultImage
                    }
                    alt={product.productName}
                    onError={(e) => (e.target.src = defaultImage)}
                  />
                </Card>
              </Col>
              <Col md={7}>
                <Card>
                  <Card.Body>
                    <Table striped bordered hover>
                      <tbody>
                        <tr className="custom-tr">
                          <td>
                            <strong>Tags</strong>
                          </td>
                          <td>{product.tags}</td>
                        </tr>

                        <tr className="custom-tr">
                          <td>
                            <strong>Loại hàng</strong>
                          </td>
                          <td>
                            {product?.category?.categoryName || "Chưa cập nhập"}
                          </td>
                        </tr>

                        <tr className="custom-tr">
                          <td>
                            <strong>Mô tả</strong>
                          </td>
                          <td>{product.description}</td>
                        </tr>

                        <tr className="custom-tr">
                          <td>
                            <strong>Giá bán</strong>
                          </td>
                          <td>
                            {product.price
                              ? convertVND(product.price)
                              : "Chưa cập nhập giá"}
                          </td>
                        </tr>

                        {product.discount?.active && (
                          <tr className="custom-tr">
                            <td>
                              <strong>Giá sau khi giảm</strong>
                            </td>
                            <td>
                              {convertVND(
                                product.price *
                                  (1 - product.discount.discountValue / 100)
                              )}
                            </td>
                          </tr>
                        )}

                        <tr className="custom-tr">
                          <td>
                            <strong>Kích thước</strong>
                          </td>
                          <td>{product.dimensions}</td>
                        </tr>

                        <tr className="custom-tr">
                          <td>
                            <strong>Hãng</strong>
                          </td>
                          <td>{product.brand}</td>
                        </tr>

                        <tr className="custom-tr">
                          <td>
                            <strong>Chất liệu</strong>
                          </td>
                          <td>{product.material}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between align-items-center">
          <div>
            {product?.isActive ? (
              <p className="text-danger">*Sản phẩm đang được bày bán</p>
            ) : (
              <p className="text-danger">Sản phẩm chưa kinh doanh</p>
            )}

            {product?.discount?.active && (
              <p className="text-danger">{`*Sản phẩm đang được giảm giá ${product.discount.discountValue}%`}</p>
            )}
          </div>

          <div className="d-flex justify-content-between align-items-center gap-4">
            <Button
              variant="secondary"
              className="d-flex gap-2 align-items-center"
              onClick={handleShowUpdateModal}
            >
              <CiEdit />
              Chỉnh sửa
            </Button>
            <Button
              variant="secondary"
              className="d-flex gap-2 align-items-center bg-danger"
              onClick={() => handleDeleteProduct(productId)}
            >
              <MdDelete />
              Xóa
            </Button>
            {product?.isActive == true ? (
              <Button variant="success" onClick={() => handleActiveProduct(product.productId, product.isActive)}>
                Huỷ kích hoạt bán sản phẩm
              </Button>
            ) : (
              <Button variant="success" onClick={() => handleActiveProduct(product.productId, product.isActive)}>
                Kích hoạt bán sản phẩm
              </Button>
            )}

            <Button variant="primary" onClick={handleCloseModal}>
              Đóng
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
      {showUpdateModal && (
        <UpdateProduct
          fetchProductsData={fetchProductsData}
          product={product}
          show={showUpdateModal}
          setShow={setShowUpdateModal}
        />
      )}
    </>
  );
};

export default DetailProduct;
