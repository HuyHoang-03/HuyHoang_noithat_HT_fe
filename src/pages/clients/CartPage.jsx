import { NavLink } from "react-router-dom";
import Cart from "../../components/clients/cart/Cart";
const CartPage = () => {
  return (
    <>
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white" style={{ fontWeight: 700 }}>
          Giỏ hàng
        </h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item">
            <NavLink to="/" style={{ color: "#81c408" }}>
              Trang chủ
            </NavLink>
          </li>
          <li className="breadcrumb-item active text-white">Giỏ hàng</li>
        </ol>
      </div>
      <Cart/>
    </>
  );
};

export default CartPage;
