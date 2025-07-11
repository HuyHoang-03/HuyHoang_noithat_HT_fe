import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import banner from "../../assets/imgs/banner-aboutus.jpg"
import designer1 from "../../assets/imgs/designer-1.avif"
import designer2 from "../../assets/imgs/designer-2.jpg"
import designer3 from "../../assets/imgs/designer-3.jpg"
import img from "../../assets/imgs/trietlykinhdoanh.png"
const AboutPage = () => {
  // Dữ liệu lịch sử phát triển
  const milestones = [
    {
      year: "2010",
      title: "Thành lập công ty",
      description: "Khởi đầu với xưởng sản xuất đồ gỗ nhỏ tại Hà Nội",
      icon: "bi bi-building"
    },
    {
      year: "2013",
      title: "Mở showroom đầu tiên",
      description: "Showroom 200m2 tại quận Cầu Giấy, Hà Nội",
      icon: "bi bi-shop"
    },
    {
      year: "2016",
      title: "Mở rộng sản xuất",
      description: "Xây dựng nhà xưởng 5.000m2 tại Bắc Ninh",
      icon: "bi bi-house-gear"
    },
    {
      year: "2019",
      title: "Chuỗi showroom toàn quốc",
      description: "10 showroom tại 5 thành phố lớn",
      icon: "bi bi-geo-alt"
    },
    {
      year: "2022",
      title: "Vươn ra thị trường quốc tế",
      description: "Xuất khẩu sản phẩm sang 3 nước Đông Nam Á",
      icon: "bi bi-globe"
    }
  ];

  // Dữ liệu đội ngũ
  const teamMembers = [
    {
      name: "Macro Jhson",
      position: "Giám đốc điều hành",
      bio: "15 năm kinh nghiệm trong ngành nội thất",
      img: designer1
    },
    {
      name: "Nguyễn Văn A",
      position: "Giám đốc thiết kế",
      bio: "Tốt nghiệp ĐH Mỹ thuật Công nghiệp",
      img: designer2
    },
    {
      name: "Trần Huyền T",
      position: "Trưởng phòng sản xuất",
      bio: "Chuyên gia về gỗ tự nhiên",
      img: designer3
    }
  ];

  // Số liệu thống kê
  const stats = [
    { value: "12+", label: "Năm kinh nghiệm" },
    { value: "500+", label: "Dự án hoàn thành" },
    { value: "50+", label: "Đối tác tin cậy" },
    { value: "10.000+", label: "Khách hàng hài lòng" }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero bg-light py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <h1 className="display-4 fw-bold mb-4">Về chúng tôi</h1>
              <p className="lead">
                Công ty Nội thất HT - Mang đến không gian sống đẳng cấp với chất lượng hoàn hảo
              </p>
              <Badge bg="primary" className="fs-6 mb-3">
                Tiên phong - Sáng tạo - Bền vững
              </Badge>
            </Col>
            <Col lg={6}>
              <img
                src={banner}
                alt="Về chúng tôi"
                className="img-fluid rounded shadow"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Giới thiệu ngắn */}
      <section className="py-5">
        <Container>
          <Row className="justify-content-center">
            <Col lg={10} className="text-center">
              <h2 className="fw-bold mb-4">Tầm nhìn & Sứ mệnh</h2>
              <div className="border-bottom border-primary border-3 mx-auto mb-4" style={{ width: "100px" }}></div>
              <p className="fs-5">
                Với triết lý "Không gian sống hoàn hảo bắt đầu từ những chi tiết tỉ mỉ", 
                chúng tôi cam kết mang đến những sản phẩm nội thất cao cấp, kết hợp 
                tinh hoa truyền thống và công nghệ hiện đại.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Thống kê */}
      <section className="py-5 bg-primary text-white">
        <Container>
          <Row>
            {stats.map((stat, index) => (
              <Col md={3} sm={6} key={index} className="text-center mb-4 mb-md-0">
                <h3 className="display-4 fw-bold">{stat.value}</h3>
                <p className="fs-5">{stat.label}</p>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Lịch sử phát triển */}
      <section className="py-5">
        <Container>
          <h2 className="text-center fw-bold mb-5">Hành trình phát triển</h2>
          <div className="timeline">
            {milestones.map((milestone, index) => (
              <div 
                className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`} 
                key={index}
              >
                <div className="timeline-content card shadow-sm">
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-2">
                      <i className={`${milestone.icon} fs-3 text-primary me-3`}></i>
                      <h4 className="mb-0">{milestone.title}</h4>
                    </div>
                    <Badge bg="light" text="dark" className="mb-2">
                      {milestone.year}
                    </Badge>
                    <p className="mb-0">{milestone.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Đội ngũ */}
      <section className="py-5 bg-light">
        <Container>
          <h2 className="text-center fw-bold mb-5">Đội ngũ chuyên gia</h2>
          <Row>
            {teamMembers.map((member, index) => (
              <Col lg={4} md={6} key={index} className="mb-4">
                <Card className="h-100 border-0 shadow-sm">
                  <Card.Img variant="top" src={member.img} style={{height: "416px", objectFit: "cover"}} />
                  <Card.Body className="text-center">
                    <Card.Title className="fw-bold">{member.name}</Card.Title>
                    <Card.Subtitle className="mb-3 text-primary">
                      {member.position}
                    </Card.Subtitle>
                    <Card.Text>{member.bio}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Triết lý kinh doanh */}
      <section className="py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-4 mb-lg-0">
              <img
                src={img}
                alt="Triết lý kinh doanh"
                className="img-fluid rounded"
              />
            </Col>
            <Col lg={6}>
              <h2 className="fw-bold mb-4">Triết lý kinh doanh</h2>
              <ul className="list-unstyled">
                <li className="mb-3">
                  <i className="bi bi-check-circle-fill text-primary me-2"></i>
                  <strong>Chất lượng hàng đầu:</strong> Cam kết sử dụng vật liệu tốt nhất
                </li>
                <li className="mb-3">
                  <i className="bi bi-check-circle-fill text-primary me-2"></i>
                  <strong>Thiết kế sáng tạo:</strong> Đội ngũ thiết kế giàu kinh nghiệm
                </li>
                <li className="mb-3">
                  <i className="bi bi-check-circle-fill text-primary me-2"></i>
                  <strong>Bảo hành dài hạn:</strong> Chính sách bảo hành lên đến 5 năm
                </li>
                <li className="mb-3">
                  <i className="bi bi-check-circle-fill text-primary me-2"></i>
                  <strong>Dịch vụ trọn gói:</strong> Từ thiết kế đến thi công
                </li>
                <li>
                  <i className="bi bi-check-circle-fill text-primary me-2"></i>
                  <strong>Giá cả cạnh tranh:</strong> Giá tốt nhất thị trường
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>

      <style jsx>{`
        .timeline {
          position: relative;
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 0;
        }
        
        .timeline::after {
          content: '';
          position: absolute;
          width: 6px;
          background-color: #0d6efd;
          top: 0;
          bottom: 0;
          left: 50%;
          margin-left: -3px;
          border-radius: 10px;
        }
        
        .timeline-item {
          padding: 10px 40px;
          position: relative;
          width: 50%;
          box-sizing: border-box;
        }
        
        .timeline-item::after {
          content: '';
          position: absolute;
          width: 25px;
          height: 25px;
          right: -12px;
          background-color: white;
          border: 4px solid #0d6efd;
          top: 15px;
          border-radius: 50%;
          z-index: 1;
        }
        
        .left {
          left: 0;
        }
        
        .right {
          left: 50%;
        }
        
        .left::before {
          content: " ";
          height: 0;
          position: absolute;
          top: 22px;
          width: 0;
          z-index: 1;
          right: 30px;
          border: medium solid #f8f9fa;
          border-width: 10px 0 10px 10px;
          border-color: transparent transparent transparent #f8f9fa;
        }
        
        .right::before {
          content: " ";
          height: 0;
          position: absolute;
          top: 22px;
          width: 0;
          z-index: 1;
          left: 30px;
          border: medium solid #f8f9fa;
          border-width: 10px 10px 10px 0;
          border-color: transparent #f8f9fa transparent transparent;
        }
        
        .right::after {
          left: -12px;
        }
        
        @media screen and (max-width: 768px) {
          .timeline::after {
            left: 31px;
          }
          
          .timeline-item {
            width: 100%;
            padding-left: 70px;
            padding-right: 25px;
          }
          
          .timeline-item::before {
            left: 60px;
            border: medium solid #f8f9fa;
            border-width: 10px 10px 10px 0;
            border-color: transparent #f8f9fa transparent transparent;
          }
          
          .left::after, .right::after {
            left: 18px;
          }
          
          .right {
            left: 0%;
          }
        }
      `}</style>
    </div>
  );
};

export default AboutPage;