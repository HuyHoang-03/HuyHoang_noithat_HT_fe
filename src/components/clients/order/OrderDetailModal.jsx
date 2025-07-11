import { useState } from "react";
import {
  Modal,
  Card,
  Badge,
  Row,
  Col,
  ListGroup,
  Table,
} from "react-bootstrap";
import { convertDate, convertVND } from "../../../config/customeFunction";

const OrderDetailModal = ({ show, onHide, orderData }) => {
  if (!orderData) return null;

  // Function để chọn màu badge cho trạng thái đơn hàng
  const getStatusBadge = (status) => {
    const statusConfig = {
      PROCESSING: { bg: "warning", text: "Đang xử lý", icon: "⏳" },
      CONFIRMED: { bg: "info", text: "Đã xác nhận", icon: "✅" },
      SHIPPED: { bg: "primary", text: "Đang giao", icon: "🚚" },
      DELIVERED: { bg: "success", text: "Đã giao", icon: "📦" },
      CANCELLED: { bg: "danger", text: "Đã hủy", icon: "❌" },
      "Đang xử lý": { bg: "warning", text: "Đang xử lý", icon: "⏳" },
    };

    const config = statusConfig[status] || {
      bg: "secondary",
      text: status,
      icon: "📋",
    };

    return (
      <Badge bg={config.bg} className="px-3 py-2 fs-6">
        {config.icon} {config.text}
      </Badge>
    );
  };

  // Function để chọn màu badge cho trạng thái thanh toán
  const getPaymentStatusBadge = (status) => {
    const statusConfig = {
      SUCCESS: { bg: "success", text: "Đã thanh toán", icon: "💳" },
      PENDING: { bg: "warning", text: "Chờ thanh toán", icon: "⏰" },
      FAILED: { bg: "danger", text: "Thanh toán thất bại", icon: "❌" },
      "Chưa thanh toán": { bg: "warning", text: "Chưa thanh toán", icon: "⏰" },
    };

    const config = statusConfig[status] || {
      bg: "secondary",
      text: status,
      icon: "💰",
    };

    return (
      <Badge bg={config.bg} className="px-2 py-1">
        {config.icon} {config.text}
      </Badge>
    );
  };

  const getPaymentMethodBadge = (method) => {
    const methodConfig = {
      "Credit Card": { bg: "primary", text: "Thẻ tín dụng", icon: "💳" },
      "Nhận hàng thanh toán": { bg: "info", text: "COD", icon: "💵" },
      "Bank Transfer": { bg: "success", text: "Chuyển khoản", icon: "🏦" },
      VNPAY: { bg: "danger", text: "VNPay", icon: "📱" },
    };

    const config = methodConfig[method] || {
      bg: "secondary",
      text: method,
      icon: "💰",
    };

    return (
      <Badge bg={config.bg} className="px-2 py-1">
        {config.icon} {config.text}
      </Badge>
    );
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="xl"
      centered
      className="order-detail-modal"
    >
      <Modal.Header closeButton className="border-bottom-0 pb-2">
        <Modal.Title className="d-flex align-items-center">
          <i className="bi bi-receipt me-2 text-primary"></i>
          <span>Chi tiết đơn hàng #{orderData.orderId}</span>
          <div className="ms-3">{getStatusBadge(orderData.status)}</div>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="pt-0">
        <div className="order-detail-content">
          {/* Header thông tin cơ bản */}
          <Row className="mb-4">
            <Col md={6}>
              <Card className="info-card h-100">
                <Card.Header className="bg-light border-0">
                  <h6 className="mb-0 text-primary">
                    <i className="bi bi-calendar-event me-2"></i>
                    Thông tin đơn hàng
                  </h6>
                </Card.Header>
                <Card.Body>
                  <div className="info-item mb-2">
                    <small className="text-muted d-block">Ngày đặt hàng</small>
                    <strong>{convertDate(orderData.orderDate)}</strong>
                  </div>
                  <div className="info-item mb-2">
                    <small className="text-muted d-block">Người đặt</small>
                    <strong>{orderData.userName}</strong>
                  </div>
                  <div className="info-item">
                    <small className="text-muted d-block">Mã giao dịch</small>
                    <code className="text-primary">
                      {orderData.payments[0]?.transactionId || "N/A"}
                    </code>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="info-card h-100">
                <Card.Header className="bg-light border-0">
                  <h6 className="mb-0 text-success">
                    <i className="bi bi-truck me-2"></i>
                    Thông tin giao hàng
                  </h6>
                </Card.Header>
                <Card.Body>
                  <div className="info-item mb-2">
                    <small className="text-muted d-block">
                      Địa chỉ giao hàng
                    </small>
                    <strong>{orderData.shippingAddress}</strong>
                  </div>
                  <div className="info-item mb-2">
                    <small className="text-muted d-block">
                      Phương thức giao hàng
                    </small>
                    <Badge bg="outline-secondary" className="px-2 py-1">
                      🚚 {orderData.shippingMethod}
                    </Badge>
                  </div>
                  <div className="info-item">
                    <small className="text-muted d-block">Phí giao hàng</small>
                    <strong className="text-success">
                      {convertVND(orderData.shippingFee)}
                    </strong>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Thông tin thanh toán */}
          <Card className="mb-4">
            <Card.Header className="bg-light border-0">
              <h6 className="mb-0 text-warning">
                <i className="bi bi-credit-card me-2"></i>
                Thông tin thanh toán
              </h6>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={4}>
                  <div className="info-item">
                    <small className="text-muted d-block">
                      Phương thức thanh toán
                    </small>
                    {getPaymentMethodBadge(
                      orderData.payments[0]?.paymentMethod
                    )}
                  </div>
                </Col>
                <Col md={4}>
                  <div className="info-item">
                    <small className="text-muted d-block">
                      Trạng thái thanh toán
                    </small>
                    {getPaymentStatusBadge(
                      orderData.payments[0]?.transactionStatus
                    )}
                  </div>
                </Col>
                <Col md={4}>
                  <div className="info-item">
                    <small className="text-muted d-block">
                      Ngày thanh toán
                    </small>
                    <strong>
                      { orderData.payments[0]?.transactionStatus !== "Chưa thanh toán"
                        ? convertDate(orderData.payments[0].paymentDate)
                        : "Chưa thanh toán"}
                    </strong>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Chi tiết sản phẩm */}
          <Card className="mb-4">
            <Card.Header className="bg-light border-0 d-flex justify-content-between align-items-center">
              <h6 className="mb-0 text-info">
                <i className="bi bi-box me-2"></i>
                Chi tiết sản phẩm ({orderData.orderDetails.length} sản phẩm)
              </h6>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="table-responsive">
                <Table className="mb-0" hover>
                  <thead className="table-light">
                    <tr>
                      <th className="border-0">Sản phẩm</th>
                      <th className="border-0 text-center">Số lượng</th>
                      <th className="border-0 text-end">Giá gốc</th>
                      <th className="border-0 text-end">Giá khuyến mãi</th>
                      <th className="border-0 text-end">Thành tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderData.orderDetails.map((item) => (
                      <tr key={item.orderDetailId}>
                        <td className="align-middle">
                          <div className="product-info">
                            <strong className="product-name">
                              {item.productName}
                            </strong>
                            <small className="text-muted d-block">
                              ID: {item.productId}
                            </small>
                          </div>
                        </td>
                        <td className="text-center align-middle">
                          <Badge
                            bg="light"
                            text="dark"
                            className="px-3 py-2 fs-6"
                          >
                            {item.quantity}
                          </Badge>
                        </td>
                        <td className="text-end align-middle">
                          <span className="original-price">
                            {convertVND(item.originalPrice)}
                          </span>
                        </td>
                        <td className="text-end align-middle">
                          <strong className="final-price">
                            {convertVND(item.finalPrice)}
                          </strong>
                          {item.finalPrice < item.originalPrice && (
                            <small className="text-success d-block">
                              -$
                              {convertVND(item.originalPrice - item.finalPrice)}
                            </small>
                          )}
                        </td>
                        <td className="text-end align-middle">
                          <strong className="total-price">
                            {convertVND(item.finalPrice * item.quantity)}
                          </strong>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>

          {/* Tổng kết đơn hàng */}
          <Card className="order-summary">
            <Card.Header className="bg-primary text-white border-0">
              <h6 className="mb-0">
                <i className="bi bi-calculator me-2"></i>
                Tổng kết đơn hàng
              </h6>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <ListGroup variant="flush">
                    <ListGroup.Item className="d-flex justify-content-between border-0 px-0">
                      <span>Tạm tính:</span>
                      <span>{convertVND(orderData.subtotalAmount)}</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between border-0 px-0">
                      <span>Phí giao hàng:</span>
                      <span>{convertVND(orderData.shippingFee)}</span>
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
                <Col md={6}>
                  <div className="total-section p-3 bg-light rounded">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">Tổng cộng:</h5>
                      <h4 className="mb-0 text-danger">
                        {convertVND(orderData.finalAmount)}
                      </h4>
                    </div>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </div>
      </Modal.Body>

      <Modal.Footer className="border-top-0 pt-0">
        <div className="d-flex justify-content-between w-100">
          <div>
            <button
              type="button"
              className="btn btn-secondary me-2"
              onClick={onHide}
            >
              Đóng
            </button>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default OrderDetailModal;
