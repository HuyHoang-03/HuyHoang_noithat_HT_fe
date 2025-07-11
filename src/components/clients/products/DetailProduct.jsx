import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import defaultImage from "../../../assets/imgs/defaultImage.png";
import { FaMinus, FaPlus, FaShoppingCart } from "react-icons/fa";
import { instanceLogin, instance } from "../../../config/Axios";
import { convertVND } from "../../../config/customeFunction";
import { Container, Row, Col, Card, Button, Form, Spinner, Tabs, Tab } from "react-bootstrap";
import { handleAuthCheck } from "../../../config/customeFunction";
import LoginModal from "../modals/LoginModal";
const DetailProduct = () => {
  const isLogin = handleAuthCheck();
  const userID = useSelector((state) => state.auth.id);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    fetchDataApi(id);
  }, [id]);

  const fetchDataApi = async (id) => {
    setIsLoading(true);
    try {
      const response = await instanceLogin.get(`products/${id}`);

      const data = response?.data;
      if (data.code === 200) {
        setProduct(data.result);
      } else {
        toast.error("Không tìm thấy sản phẩm");
      }
    } catch (error) {
      toast.error("Lỗi khi tải dữ liệu sản phẩm");
    } finally {
      setIsLoading(false);
    }
  };

  const handleIncreaseQuantity = () => setQuantity((prev) => prev + 1);
  const handleDecreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  // Hàm mở modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Hàm đóng modal
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleAddToCart = async () => {
    if (isLogin) {
      try {
        const response = await instance.post("/cart", {
          userId: userID,
          productId: product.productId,
          quantity,
        });
        if (response?.code === 201) {
          toast.success(response?.message);
        } else {
          toast.error(response?.message);
        }
      } catch (error) {
        toast.error(`Lỗi: ${error.message}`);
      }
    } else {
      openModal();
    }

  };

  if (isLoading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (!product) {
    return <Container className="text-center py-5">Không tìm thấy sản phẩm</Container>;
  }

  const productImage = product.images?.[0]?.url || defaultImage;
  const productDiscount = product.discount?.discountValue || 0;
  const discountedPrice = productDiscount > 0
    ? product.price - (product.price * productDiscount) / 100
    : product.price;

  return (
    <>
      <Container className="py-5">
        <Row>
          <Col lg={6}>
            <Card className="border-0 shadow-sm">
              <Card.Img
                variant="top"
                src={productImage}
                className="img-fluid rounded"
                style={{ transition: "transform 0.3s", cursor: "zoom-in" }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              />
            </Card>
          </Col>
          <Col lg={6}>
            <h2 className="fw-bold mb-3">{product.productName}</h2>
            <p className="text-muted mb-2">Danh mục: {product.category?.categoryName}</p>
            <p className="text-muted mb-4">Chất liệu: {product.material}</p>
            {productDiscount > 0 ? (
              <div className="mb-4">
                <p className="text-danger fw-bold mb-0">{convertVND(discountedPrice)}</p>
                <p className="text-muted text-decoration-line-through">{convertVND(product.price)}</p>
              </div>
            ) : (
              <p className="fw-bold mb-4">{convertVND(product.price)}</p>
            )}
            <p className="mb-4">{product.description}</p>
            <p className="mb-4">Kích thước: {product.dimensions}</p>
            <div className="d-flex align-items-center mb-4">
              <Button variant="outline-secondary" size="sm" onClick={handleDecreaseQuantity}>
                <FaMinus />
              </Button>
              <Form.Control
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="mx-2 text-center"
                style={{ width: "60px" }}
              />
              <Button variant="outline-secondary" size="sm" onClick={handleIncreaseQuantity}>
                <FaPlus />
              </Button>
            </div>
            <Button
              variant="primary"
              size="lg"
              className="d-flex align-items-center gap-2"
              onClick={handleAddToCart}
            >
              <FaShoppingCart /> Thêm vào giỏ hàng
            </Button>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <Tabs defaultActiveKey="description" id="product-tabs" className="mb-3">
              <Tab eventKey="description" title="Mô tả">
                <div className="p-3 bg-light rounded">
                  <p>{product.description}</p>
                  <div className="row">
                    <div className="col-md-6">
                      <p><strong>Kích thước:</strong> {product.dimensions}</p>
                      <p><strong>Hãng:</strong> {product.brand}</p>
                      <p><strong>Chất liệu:</strong> {product.material}</p>
                    </div>
                  </div>
                </div>
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>

      <LoginModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default DetailProduct;