import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { FaShoppingCart } from "react-icons/fa";
import defaultImg from "../../../assets/imgs/defaultImage.png";
import Spinner from "react-bootstrap/Spinner";
import { toast } from "react-hot-toast";
import { instance } from "../../../config/Axios";
import { convertVND, handleAuthCheck } from "../../../config/customeFunction";
import LoginModal from "../modals/LoginModal";
import "./listProduct.css";

const Items = ({ currentItems, userID, openModal, closeModal }) => {
  const handleAddToCart = async (productId, quantity) => {
    const isAuth = handleAuthCheck();
    if (isAuth) {
      try {
        const response = await instance.post("/cart", {
          userId: userID,
          productId,
          quantity,
        });
        if (response?.code === 201) {
          toast.success(response?.message);
        } else {
          toast.error(response?.message);
        }
      } catch (error) {
        toast.error(`Lỗi: ${error.message}`);
      }
    } else {
      openModal();
    }
  };

  return (
    <div className="col-lg-9">
      <div className="row g-4 justify-content-center">
        {currentItems?.length > 0 ? (
          currentItems.map((product) => (
            <div
              key={product.productId}
              className="col-md-6 col-lg-6 col-xl-4"
            >
              <div className="rounded position-relative fruite-item">
                <div className="fruite-img" style={{ height: "300px" }}>
                  <img
                    src={product?.images[0]?.url || defaultImg}
                    className="w-100 h-100 rounded-top object-fit-cover"
                    alt={product.productName}
                    onError={(e) => (e.target.src = defaultImg)}
                  />
                </div>
                <div
                  className="text-white bg-primary px-3 py-1 rounded position-absolute"
                  style={{ top: "10px", left: "10px" }}
                >
                  {product.tags || "N/A"}
                </div>
                <div
                  className="p-4 border border-top-0 rounded-bottom"
                  style={{ borderColor: "#ffb524", height: "50%" }}
                >
                  <NavLink to={`detail/${product.productId}`}>
                    <h4
                      style={{
                        height: "90px",
                        color: "#000",
                        fontSize: "20px",
                      }}
                    >
                      {product.productName}
                    </h4>
                  </NavLink>
                  <p>{`Sản xuất từ ${product.brand || "N/A"}`}</p>
                  <div className="d-flex flex-column justify-content-between flex-lg-wrap">
                    {product.discount ? (
                      <div style={{ height: "60px" }}>
                        <p
                          className={`text-dark fs-5 fw-bold mb-0 ${
                            product.discount?.discountValue
                              ? "text-decoration-line-through"
                              : ""
                          }`}
                        >
                          {`${convertVND(product.price)} / ${product.dimensions}`}
                        </p>
                        <p className="text-dark fs-5 fw-bold mb-0">
                          {`${convertVND(
                            product.price -
                              product.price / product.discount.discountValue
                          )} / ${product.dimensions}`}
                        </p>
                      </div>
                    ) : (
                      <p
                        className="text-dark fs-5 fw-bold mb-0"
                        style={{ height: "60px" }}
                      >
                        {`${convertVND(product.price)} / ${product.dimensions}`}
                      </p>
                    )}
                    <button
                      className="btn btn-add-cart rounded-pill px-3 mt-2"
                      onClick={() => handleAddToCart(product.productId, 1)}
                    >
                      <FaShoppingCart
                        className="me-2"
                        style={{ color: "#3d2c28" }}
                      />
                      Thêm vào giỏ hàng
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4">
            <span>Hiện chưa có sản phẩm</span>
          </div>
        )}
      </div>
    </div>
  );
};

const PaginatedItems = ({
  totalPage,
  productsList,
  onPageChange,
  currentPage,
  loading,
  userID,
  openModal,
  closeModal,
}) => {
  const handlePageClick = (event) => {
    const selectedPage = event.selected;
    onPageChange(selectedPage);
  };

  if (loading) {
    return (
      <div className="text-center py-4">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <>
      <Items
        currentItems={productsList}
        userID={userID}
        openModal={openModal}
        closeModal={closeModal}
      />
      {totalPage > 0 && (
        <ReactPaginate
          breakLabel="..."
          nextLabel="Trang sau >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={totalPage}
          previousLabel="< Trang trước"
          renderOnZeroPageCount={null}
          forcePage={currentPage}
          containerClassName="pagination justify-content-center mt-3"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakClassName="page-item"
          breakLinkClassName="page-link"
          activeClassName="active"
          disabledClassName="disabled"
        />
      )}
    </>
  );
};

const ListProducts = ({
  products,
  userID,
  totalPage,
  currentPage,
  loading,
  fetchProductsData,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handlePageChange = (selectedPage) => {
    if (selectedPage !== currentPage) {
      fetchProductsData(selectedPage);
    }
  };

  return (
    <>
      <PaginatedItems
        totalPage={totalPage}
        productsList={products}
        onPageChange={handlePageChange}
        currentPage={currentPage}
        loading={loading}
        userID={userID}
        openModal={openModal}
        closeModal={closeModal}
      />
      <LoginModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default ListProducts;