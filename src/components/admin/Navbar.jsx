import { LuPackageOpen } from "react-icons/lu";
import { CiViewList } from "react-icons/ci";
import { AiOutlineTransaction } from "react-icons/ai";
import { TbReportSearch } from "react-icons/tb";
import { PiHandshakeLight } from "react-icons/pi";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";
import { BiCategory } from "react-icons/bi";
import { RiDiscountPercentLine } from "react-icons/ri";
const Navbar = () => {
  return (
    <Nav style={{ background: "#f53e32", fontSize: "18px" }}>
     
      <NavDropdown
        className="my-custom-dropdown-title"
        title={
          <span>
            <LuPackageOpen style={{ marginRight: "8px" }} />
            Hàng hoá
          </span>
        }
        id="nav-dropdown"
      >
        <NavDropdown.Item
          as={NavLink}
          to="/admin/products"
          className="d-flex align-items-center gap-2 text-decoration-none text-dark"
        >
          <CiViewList size={18} />
          <span className="d-inline-block">Sản phẩm</span>
        </NavDropdown.Item>
        <NavDropdown.Item
          className="d-flex align-items-center gap-2 text-decoration-none text-dark"
          to="/admin/warehouse"
          as={NavLink}
        >
          <LuPackageOpen size={18} /> <span>Kho hàng</span>
        </NavDropdown.Item>
        <NavDropdown.Item
          className="d-flex align-items-center gap-2 text-decoration-none text-dark"
          to="/admin/categories"
          as={NavLink}
        >
          <BiCategory size={18} /> <span>Danh mục</span>
        </NavDropdown.Item>
        <NavDropdown.Item
          className="d-flex align-items-center gap-2 text-decoration-none text-dark"
          to="/admin/discounts"
          as={NavLink}
        >
          <RiDiscountPercentLine size={18} /> <span>Giảm giá</span>
        </NavDropdown.Item>
      </NavDropdown>

      <Nav.Item>
        <Nav.Link
          as={NavLink}
          className="d-flex align-items-center gap-2  text-white text-decoration-none "
          to={"/admin/orders"}
        >
          <AiOutlineTransaction size={20} />
          <span className="d-inline-block">Đơn hàng</span>
        </Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link
          as={NavLink}
          className="d-flex align-items-center gap-2 text-white text-decoration-none "
          to={"/admin/report"}
        >
          <TbReportSearch size={20} />
          <span className="d-inline-block">Báo cáo</span>
        </Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link
          as={NavLink}
          className="d-flex align-items-center gap-2 text-white text-decoration-none "
          to={"/admin/customers"}
        >
          <PiHandshakeLight size={20} />
          <span className="d-inline-block">Khách hàng</span>
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default Navbar;
