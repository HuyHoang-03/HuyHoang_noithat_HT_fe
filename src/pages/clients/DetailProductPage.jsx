import { NavLink } from "react-router-dom";
import DetailProduct from "../../components/clients/products/DetailProduct";
const DetailProductPage = () => {
  return (
    <>
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white" style={{ fontWeight: 700 }}>
          Chi tiết sản phẩm
        </h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item">
            <NavLink to="/" style={{ color: "#81c408" }}>
              Trang chủ
            </NavLink>
          </li>
          <li className="breadcrumb-item active text-white">
            Chi tiết sản phẩm
          </li>
        </ol>
      </div>
      <div className="container mt-5">
        <div className="row g-4">
          <DetailProduct />
        </div>
      </div>
    </>
  );
};

export default DetailProductPage;
