import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Table,
  Alert,
  Card,
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { instanceAdmin } from "../config/Axios";

const ReportDashboard = () => {
  const [startDate, setStartDate] = useState(new Date("2025-05-01"));
  const [endDate, setEndDate] = useState(new Date("2025-05-31"));
  const [limit, setLimit] = useState(10);
  const [revenueReport, setRevenueReport] = useState(null);
  const [bestSellingProducts, setBestSellingProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const formatDate = (date) => {
    return date.toISOString().split("T")[0]; // Chuyển thành yyyy-MM-dd
  };

  const getRevenueReport = async (startDate, endDate) => {
    try {
      const response = await instanceAdmin.get(`/orders/reports/revenue`, {
        params: { startDate, endDate },
      });
      return response.result;
    } catch (error) {
      throw new Error(
        error.response?.message || "Lỗi khi lấy báo cáo doanh thu"
      );
    }
  };

  const getBestSellingProducts = async (startDate, endDate, limit) => {
    try {
      const response = await instanceAdmin.get(`orders/reports/best-selling-products`, {
        params: { startDate, endDate },
      });
      return response.result;
    } catch (error) {
      throw new Error(
        error.response?.message || "Lỗi khi lấy danh sách sản phẩm bán chạy"
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Gọi API báo cáo doanh thu
      const revenueData = await getRevenueReport(
        formatDate(startDate),
        formatDate(endDate)
      );
      console.log(revenueData);
      setRevenueReport(revenueData);

      // Gọi API sản phẩm bán chạy
      const productsData = await getBestSellingProducts(
        formatDate(startDate),
        formatDate(endDate),
        limit
      );
      setBestSellingProducts(productsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="my-5">
      <h2 className="mb-4">Báo Cáo Thống Kê</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={4} >
            <Form.Group className="d-flex flex-column">
              <Form.Label>Ngày bắt đầu</Form.Label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="yyyy-MM-dd"
                className="form-control"
                maxDate={endDate}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="d-flex flex-column">
              <Form.Label>Ngày kết thúc</Form.Label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat="yyyy-MM-dd"
                className="form-control"
                minDate={startDate}
                maxDate={new Date()}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="d-flex flex-column">
              <Form.Label>Giới hạn sản phẩm</Form.Label>
              <Form.Control
                type="number"
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
                min="1"
                max="50"
              />
            </Form.Group>
          </Col>
        </Row>
        <Button className="mt-4" variant="primary" type="submit" disabled={loading}>
          {loading ? "Đang tải..." : "Xem Báo Cáo"}
        </Button>
      </Form>

      {revenueReport && (
        <Card className="mt-4">
          <Card.Header>
            <h4>Báo Cáo Doanh Thu</h4>
          </Card.Header>
          <Card.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Tổng Doanh Thu</th>
                  <th>Số Đơn Hàng</th>
                  <th>Giá Trị Trung Bình</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{revenueReport.totalRevenue.toLocaleString()} VNĐ</td>
                  <td>{revenueReport.numberOfOrders}</td>
                  <td>
                    {revenueReport.averageOrderValue.toLocaleString()} VNĐ
                  </td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      )}

      {bestSellingProducts.length > 0 && (
        <Card className="mt-4">
          <Card.Header>
            <h4>Sản Phẩm Bán Chạy</h4>
          </Card.Header>
          <Card.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Mã Sản Phẩm</th>
                  <th>Tên Sản Phẩm</th>
                  <th>Số Lượng Bán</th>
                </tr>
              </thead>
              <tbody>
                {bestSellingProducts.map((product) => (
                  <tr key={product.productId}>
                    <td>{product.productId}</td>
                    <td>{product.productName}</td>
                    <td>{product.totalQuantitySold}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default ReportDashboard;
