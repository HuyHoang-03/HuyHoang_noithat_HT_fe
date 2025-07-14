import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Card, Badge, Spinner, Alert } from "react-bootstrap";
import { instance } from "../../../config/Axios";
import { convertDate, convertVND } from "../../../config/customeFunction";
import OrderDetailModal from "./OrderDetailModal";
import "./myorder.css";
const MyOrder = () => {
  const user = useSelector((state) => state.auth);
  const userID = user.id;
  const [showOrderDetail, setShowOrderDetail] = useState(false);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleOpenModal = (orderDetail) => {
    setSelectedOrder(orderDetail);
    setShowOrderDetail(true);
  };

  const handleCloseModal = () => {
    setShowOrderDetail(false);
  };

  // Function để chọn màu badge cho trạng thái
  const getStatusBadge = (status) => {
    const statusColors = {
      PENDING: "warning",
      CONFIRMED: "info",
      PROCESSING: "primary",
      SHIPPED: "secondary",
      DELIVERED: "success",
      CANCELLED: "danger",
      REFUNDED: "dark",
    };

    return (
      <Badge bg={statusColors[status] || "secondary"} className="px-3 py-2">
        {status}
      </Badge>
    );
  };

  // Function để chọn màu cho phương thức thanh toán
  const getPaymentMethodBadge = (method) => {
    const methodColors = {
      CASH: "success",
      CREDIT_CARD: "primary",
      BANK_TRANSFER: "info",
      PAYPAL: "warning",
      VNPAY: "danger",
    };

    return (
      <Badge bg={methodColors[method] || "secondary"} className="px-2 py-1">
        {method}
      </Badge>
    );
  };

  useEffect(() => {
    const fetchDataApi = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await instance.get(`orders/user/${userID}`);

        if (response?.code === 200 && response?.result.length > 0) {
          setOrders(response.result);
        } else if (response?.code === 200 && response?.result.length == 0) {
          setOrders([]);
        }
      } catch (error) {
        console.log(error);
        setError("Không thể tải danh sách đơn hàng. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    if (userID) {
      fetchDataApi();
    }
  }, [userID]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Đang tải danh sách đơn hàng...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="text-center">
        {error}
      </Alert>
    );
  }

  return (
    <>
      <div className="my-orders-container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0" style={{ color: "#2c3e50", fontWeight: "600" }}>
            Đơn hàng của tôi
          </h2>
          <Badge bg="secondary" className="px-3 py-2">
            Tổng: {orders.length} đơn hàng
          </Badge>
        </div>

        {orders.length === 0 ? (
          <Card className="text-center py-5">
            <Card.Body>
              <div
                style={{
                  fontSize: "4rem",
                  color: "#bdc3c7",
                  marginBottom: "1rem",
                }}
              >
                📦
              </div>
              <h4 style={{ color: "#7f8c8d" }}>Chưa có đơn hàng nào</h4>
              <p style={{ color: "#95a5a6" }}>
                Bạn chưa có đơn hàng nào. Hãy bắt đầu mua sắm ngay!
              </p>
            </Card.Body>
          </Card>
        ) : (
          <div className="orders-list">
            {orders.map((item) => (
              <Card key={item.orderId} className="mb-3 shadow-sm order-card">
                <Card.Body>
                  <div className="row align-items-center">
                    {/* Mã đơn hàng */}
                    <div className="col-md-2 col-sm-6 mb-2">
                      <div className="order-info">
                        <small className="text-muted d-block">
                          Mã đơn hàng
                        </small>
                        <strong
                          style={{ color: "#2980b9", fontSize: "0.9rem" }}
                        >
                          #{item.orderId}
                        </strong>
                      </div>
                    </div>

                    {/* Ngày đặt */}
                    <div className="col-md-2 col-sm-6 mb-2">
                      <div className="order-info">
                        <small className="text-muted d-block">Ngày đặt</small>
                        <span style={{ fontSize: "0.9rem" }}>
                          {convertDate(item.orderDate)}
                        </span>
                      </div>
                    </div>

                    {/* Tổng tiền */}
                    <div className="col-md-2 col-sm-6 mb-2">
                      <div className="order-info">
                        <small className="text-muted d-block">Tổng tiền</small>
                        <strong style={{ color: "#e74c3c", fontSize: "1rem" }}>
                          {convertVND(item.finalAmount)}
                        </strong>
                      </div>
                    </div>

                    {/* Trạng thái */}
                    <div className="col-md-2 col-sm-6 mb-2">
                      <div className="order-info">
                        <small className="text-muted d-block">Trạng thái</small>
                        {getStatusBadge(item.status)}
                      </div>
                    </div>

                    {/* Phương thức thanh toán */}
                    <div className="col-md-2 col-sm-6 mb-2">
                      <div className="order-info">
                        <small className="text-muted d-block">Thanh toán</small>
                        {item.payments?.[0]?.paymentMethod ? (
                          getPaymentMethodBadge(item.payments[0].paymentMethod)
                        ) : (
                          <Badge bg="secondary">N/A</Badge>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="col-md-2 col-sm-12 mb-2">
                      <div className="d-flex gap-2 justify-content-end">
                        <button
                          className="btn btn-outline-primary btn-sm"
                          style={{ fontSize: "0.8rem" }}
                          onClick={() => handleOpenModal(item)}
                        >
                          Chi tiết
                        </button>
                        {item.status === "DELIVERED" && (
                          <button
                            className="btn btn-outline-success btn-sm"
                            style={{ fontSize: "0.8rem" }}
                          >
                            Đánh giá
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
        )}
      </div>
      {showOrderDetail && selectedOrder && (
        <OrderDetailModal
          show={showOrderDetail}
          onHide={handleCloseModal}
          orderData={selectedOrder}
        />
      )}
    </>
  );
};

export default MyOrder;
