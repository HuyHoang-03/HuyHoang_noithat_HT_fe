import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./navbar.css";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { Navbar, Nav, Container, Offcanvas, Button, Form, FormControl, Dropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { instance } from "../../../config/Axios";
import { handleAuthCheck } from "../../../config/customeFunction";
import logo from "../../../assets/imgs/logoHT1.png"
const NavBar = () => {
  const isLogin = handleAuthCheck();
  const navigate = useNavigate();
  const role = useSelector((state) => state.auth.role);

  const token = JSON.parse(localStorage.getItem("token"));

  const handleLogout = async () => {
    await instance.post("/auth/logout", { token });
    localStorage.removeItem("token");
    navigate("/login");
  };



  return (
    <Navbar expand="lg" className="bg-white py-3 shadow-sm">
      <Container>
        {/* Brand/logo */}
        <Navbar.Brand as={NavLink} to="/" className="d-flex align-items-center gap-3 me-lg-5">
          <img style={{ width: "50px", height: "50px", objectFit: "cover" }} src={logo} alt="Logo" />
          <h1 style={{ color: "#3d2c28", fontWeight: 700, fontSize: "clamp(1.5rem, 2vw, 2rem)", margin: 0 }}>Nội thất HT</h1>
        </Navbar.Brand>

        {/* Toggle button for mobile */}
        <Navbar.Toggle aria-controls="offcanvasNavbar" className="border-0">
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>

        {/* Main navigation */}
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
          className="w-75"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-center flex-grow-1 gap-lg-3 me-lg-4">
              <Nav.Link as={NavLink} to="/" className="nav--item text-black px-lg-3">
                Trang chủ
              </Nav.Link>
              <Nav.Link as={NavLink} to="/products" className="nav--item text-black px-lg-3">
                Sản phẩm
              </Nav.Link>
              <Nav.Link as={NavLink} to="/contact" className="nav--item text-black px-lg-3">
                Liên hệ
              </Nav.Link>
              <Nav.Link as={NavLink} to="/aboutus" className="nav--item text-black px-lg-3">
                Về chúng tôi
              </Nav.Link>
            </Nav>

            {/* Search bar - visible on desktop */}
            <Form className="d-none d-lg-flex me-3" style={{ maxWidth: "300px" }}>
              <FormControl
                type="search"
                placeholder="Tìm kiếm sản phẩm..."
                className="rounded-pill"
                aria-label="Search"
              />
              <Button variant="outline-secondary" className="ms-2 rounded-circle">
                <FaSearch />
              </Button>
            </Form>

            {isLogin ? <div className="d-flex align-items-center gap-3 ms-lg-auto">
              {/* Cart icon */}
              <Nav.Link as={NavLink} to="/cart" className="position-relative p-2">
                <FaShoppingCart style={{ color: "#3d2c28" }} className="nav--cart-icon" size={20} />
              </Nav.Link>

              {/* User dropdown */}
              <Dropdown align="end">
                <Dropdown.Toggle variant="transparent" id="dropdown-user" className="p-0 border-0">
                  <FaUser style={{ color: "#3d2c28" }} size={20} />
                </Dropdown.Toggle>

                <Dropdown.Menu className="mt-2 border-0 shadow">
                  <Dropdown.Item as={NavLink} to="/account" className="py-2">
                    Tài khoản
                  </Dropdown.Item>
                  {role === "ADMIN" && (
                    <Dropdown.Item as={NavLink} to="/admin/login" className="py-2">
                      Dashboard
                    </Dropdown.Item>
                  )}
                  <Dropdown.Item as={NavLink} to="/order" className="py-2">
                    Đơn hàng
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout} className="py-2 text-danger">
                    Đăng xuất
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div> : (
              <div className="d-flex align-items-center gap-3">
                <NavLink to="/login" className="p-2 text-decoration-none">
                  <span style={{ color: "#3d2c28", fontWeight: "500" }}>Đăng nhập</span>
                </NavLink>
                <NavLink to="/register" className="p-2 text-decoration-none">
                  <span style={{ color: "#3d2c28", fontWeight: "500" }}>Đăng ký</span>
                </NavLink>
              </div>
            )}


          </Offcanvas.Body>
        </Navbar.Offcanvas>

        {/* Mobile search - visible only on mobile */}
        <Form className="d-lg-none w-100 mt-3">
          <div className="input-group">
            <FormControl
              type="search"
              placeholder="Tìm kiếm sản phẩm..."
              className="rounded-pill"
              aria-label="Search"
            />
            <Button variant="outline-secondary" className="rounded-circle">
              <FaSearch />
            </Button>
          </div>
        </Form>
      </Container>
    </Navbar>
  );
};

export default NavBar;