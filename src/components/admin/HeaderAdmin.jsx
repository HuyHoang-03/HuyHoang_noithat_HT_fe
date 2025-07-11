import { useNavigate } from "react-router-dom";
import logo from "../../assets/imgs/logoHT1.png";
import { FiPhone } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { Dropdown } from "react-bootstrap";
import Navbar from "./Navbar";
import {instanceAdmin} from "../../config/Axios";
import toast from "react-hot-toast";
const HeaderAdmin = () => {
  const navigate = useNavigate();
  const handleLogout = async ()=>{
    const token = localStorage.getItem('tokenAdmin') ;
    const response = await instanceAdmin.post("/auth/logout", {
      token
    })
    if(response.code == 0){
      toast.success("Đăng xuất thành công!");
      localStorage.removeItem('tokenAdmin');
      navigate("/admin/login");
    }
  }

  return (
    <div className="d-flex flex-column">
      <div className="d-flex justify-content-between align-items-center mx-5">
        <div className="p-3">
          <img style={{width: "50px", height: "50px", objectFit: "cover"}} src={logo} alt="Logo" />
        </div>
        <div className="d-flex justify-content-between align-items-center gap-5">
          <div className="d-flex align-items-center gap-2">
            <FiPhone />
            <span>+123 (456) (789)</span>
          </div>
          <Dropdown>
            <Dropdown.Toggle
              variant="light"
              id="dropdown-admin"
              className="d-flex align-items-center gap-2 border-0 bg-transparent"
            >
              Admin
              <FaUserCircle size={29} />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={handleLogout}>Đăng xuất</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default HeaderAdmin;
