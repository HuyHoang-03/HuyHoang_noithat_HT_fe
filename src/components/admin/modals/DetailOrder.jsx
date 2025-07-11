import { useEffect, useState } from "react";
import { Modal, Button, Card, Row, Col, Badge, Table } from "react-bootstrap";
import { instance } from "../../../config/Axios";

const OrderDetailModal = ({ show, setShow, selectedOrder }) => {
  const [detailOrder, setDetailOrder] = useState({});

  const fetchDetailOrder = async () => {
    try {
      const response = await instance.get(`/orders/${selectedOrder}`);
      if (response.code === 200) {
        setDetailOrder(response.result || {});
      }
      console.log(response.result);
    } catch (error) {
      console.error("Lỗi khi lấy chi tiết đơn hàng:", error);
    }
  };

  const handleClose = () => setShow(false);

  // Format tiền tệ VND
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  // Format ngày tháng
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Màu sắc cho trạng thái
  const getStatusVariant = (status) => {
    switch (status) {
      case "Đang xử lý":
        return "warning";
      case "Đang vận chuyển":
        return "success";
      case "Đã giao":
        return "secondary";
      case "Thất bại":
        return "danger";
      default:
        return "primary";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "PROCESSING":
        return "Đang xử lý";
      case "SUCCESS":
        return "Thành công";
      case "PENDING":
        return "Chờ xử lý";
      case "FAILED":
        return "Thất bại";
      default:
        return status;
    }
  };

  useEffect(() => {
    if (selectedOrder) {
      fetchDetailOrder();
    }
  }, [selectedOrder]);

  return (
    <div className="p-4">
      <Modal show={show} onHide={handleClose} size="xl" centered>
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>
            <i className="fas fa-shopping-cart me-2"></i>
            Chi Tiết Đơn Hàng #{detailOrder.orderId || "N/A"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="p-0">
          <div className="p-4">
            {/* Thông tin cơ bản */}
            <Card className="mb-4 border-0 shadow-sm">
              <Card.Header className="bg-light">
                <h5 className="mb-0 text-primary">
                  <i className="fas fa-info-circle me-2"></i>
                  Thông Tin Đơn Hàng
                </h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <p>
                      <strong>Mã đơn hàng:</strong> #{detailOrder.orderId || "N/A"}
                    </p>
                    <p>
                      <strong>Tên khách hàng:</strong> {detailOrder.userName || "N/A"}
                    </p>
                    <p>
                      <strong>Ngày đặt hàng:</strong>{" "}
                      {detailOrder.orderDate ? formatDate(detailOrder.orderDate) : "N/A"}
                    </p>
                    <p>
                      <strong>Trạng thái:</strong>
                      <Badge
                        bg={getStatusVariant(detailOrder.status)}
                        className="ms-2"
                      >
                        {getStatusText(detailOrder.status || "N/A")}
                      </Badge>
                    </p>
                  </Col>
                  <Col md={6}>
                    <p>
                      <strong>Địa chỉ giao hàng:</strong>
                      <br />
                      {detailOrder.shippingAddress || "N/A"}
                    </p>
                    <p>
                      <strong>Phương thức giao hàng:</strong>{" "}
                      {detailOrder.shippingMethod || "N/A"}
                    </p>
                    <p>
                      <strong>Phí giao hàng:</strong>{" "}
                      {detailOrder.shippingFee ? formatCurrency(detailOrder.shippingFee) : "N/A"}
                    </p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Chi tiết sản phẩm */}
            <Card className="mb-4 border-0 shadow-sm">
              <Card.Header className="bg-light">
                <h5 className="mb-0 text-primary">
                  <i className="fas fa-box me-2"></i>
                  Chi Tiết Sản Phẩm
                </h5>
              </Card.Header>
              <Card.Body className="p-0">
                <Table striped hover className="mb-0">
                  <thead className="table-dark">
                    <tr>
                      <th>Tên sản phẩm</th>
                      <th className="text-center">Số lượng</th>
                      <th className="text-end">Giá gốc</th>
                      <th className="text-end">Thành tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(detailOrder.orderDetails) && detailOrder.orderDetails.length > 0 ? (
                      detailOrder.orderDetails.map((item) => (
                        <tr key={item.orderDetailId}>
                          <td>
                            <strong>{item.productName}</strong>
                            <br />
                            <small className="text-muted">
                              ID: {item.productId}
                            </small>
                          </td>
                          <td className="text-center">
                            <Badge bg="secondary">{item.quantity}</Badge>
                          </td>
                          <td className="text-end">
                            {formatCurrency(item.originalPrice)}
                          </td>
                          <td className="text-end">
                            <strong className="text-success">
                              {formatCurrency(item.finalPrice)}
                            </strong>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center">
                          Không có sản phẩm nào
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>

            {/* Thông tin thanh toán */}
            <Card className="mb-4 border-0 shadow-sm">
              <Card.Header className="bg-light">
                <h5 className="mb-0 text-primary">
                  <i className="fas fa-credit-card me-2"></i>
                  Thông Tin Thanh Toán
                </h5>
              </Card.Header>
              <Card.Body>
                {Array.isArray(detailOrder.payments) && detailOrder.payments.length > 0 ? (
                  detailOrder.payments.map((payment) => (
                    <div key={payment.paymentId}>
                      <Row>
                        <Col md={6}>
                          <p>
                            <strong>Phương thức:</strong> {payment.paymentMethod}
                          </p>
                          <p>
                            <strong>Mã giao dịch:</strong> {payment.transactionId}
                          </p>
                          <p>
                            <strong>Ngày thanh toán:</strong>{" "}
                            { payment.transactionStatus == "Chưa thanh toán" ? payment.transactionStatus  : formatDate(payment.paymentDate) }
                          </p>
                        </Col>
                        <Col md={6}>
                          <p>
                            <strong>Số tiền:</strong>{" "}
                            {formatCurrency(payment.amount)}
                          </p>
                          <p>
                            <strong>Trạng thái:</strong>
                            <Badge
                              bg={getStatusVariant(payment.transactionStatus)}
                              className="ms-2"
                            >
                              {getStatusText(payment.transactionStatus)}
                            </Badge>
                          </p>
                        </Col>
                      </Row>
                    </div>
                  ))
                ) : (
                  <p>Không có thông tin thanh toán</p>
                )}
              </Card.Body>
            </Card>

            {/* Tổng kết đơn hàng */}
            <Card className="border-0 shadow-sm">
              <Card.Header className="bg-success text-white">
                <h5 className="mb-0">
                  <i className="fas fa-calculator me-2"></i>
                  Tổng Kết Đơn Hàng
                </h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={8}>
                    <p className="mb-2">
                      <strong>Tạm tính:</strong>{" "}
                      {detailOrder.subtotalAmount
                        ? formatCurrency(detailOrder.subtotalAmount)
                        : "N/A"}
                    </p>
                    <p className="mb-2">
                      <strong>Phí giao hàng:</strong>{" "}
                      {detailOrder.shippingFee
                        ? formatCurrency(detailOrder.shippingFee)
                        : "N/A"}
                    </p>
                    <hr />
                    <h5 className="text-success mb-0">
                      <strong>
                        Tổng cộng:{" "}
                        {detailOrder.finalAmount
                          ? formatCurrency(detailOrder.finalAmount)
                          : "N/A"}
                      </strong>
                    </h5>
                  </Col>
                  <Col md={4} className="text-end">
                    <p className="text-muted small mb-1">
                      Tạo:{" "}
                      {detailOrder.createDate
                        ? formatDate(detailOrder.createDate)
                        : "N/A"}
                    </p>
                    <p className="text-muted small mb-0">
                      Cập nhật:{" "}
                      {detailOrder.updateDate
                        ? formatDate(detailOrder.updateDate)
                        : "N/A"}
                    </p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </div>
        </Modal.Body>

        <Modal.Footer className="bg-light">
          <Button variant="secondary" onClick={handleClose}>
            <i className="fas fa-times me-2"></i>
            Đóng
          </Button>
          <Button variant="primary">
            <i className="fas fa-print me-2"></i>
            In đơn hàng
          </Button>
          <Button variant="success">
            <i className="fas fa-download me-2"></i>
            Tải xuống
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default OrderDetailModal;