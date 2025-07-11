import { NavLink } from "react-router-dom";
import MyOrder from "../../components/clients/order/MyOrder";
const OrderUserPage = () => {
  return (
    <>
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white" style={{ fontWeight: 700 }}>
          Đơn hàng
        </h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item">
            <NavLink to="/" style={{ color: "#81c408" }}>
              Trang chủ
            </NavLink>
          </li>
          <li className="breadcrumb-item active text-white">Đơn hàng</li>
        </ol>
      </div>
      <div className="container mt-5">
        <MyOrder />
      </div>
    </>
  );
};

export default OrderUserPage;
