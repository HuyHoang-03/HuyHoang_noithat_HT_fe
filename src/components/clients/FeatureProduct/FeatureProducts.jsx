import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { instanceLogin, instance } from "../../../config/Axios";
import { convertVND } from "../../../config/customeFunction";
import defaultImg from "../../../assets/imgs/defaultImage.png";
import { FaShoppingCart } from "react-icons/fa";
import { handleAuthCheck } from "../../../config/customeFunction";
import LoginModal from "../modals/LoginModal";
const FeatureProducts = () => {
  const isLogin = handleAuthCheck();
  const userID = useSelector((state) => state.auth.id);
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchApiData = async () => {
    const response = await instanceLogin.get(
      "/products/feature-product/pagination?pageNo=0&pageSize=8&sortBy=id&sortDir=asc"
    );
    console.log(response);
    const data = response?.data;
    if (data.code == 200) {
      setProducts(data.result.content);
    } else {
      setProducts([]);
    }
  };

  // Hàm mở modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Hàm đóng modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddToCart = async (productId) => {
    if (isLogin) {
      try {
        const response = await instance.post("/cart", {
          userId: userID,
          productId,
          quantity: 1,
        });
        if (response?.code === 201) {
          toast.success(response?.message);
        } else {
          toast.error(response?.message);
        }
      } catch (error) {
        toast.error(`Lỗi : ${error}`);
      }
    } else {
      openModal();
    }

  };

  useEffect(() => {
    fetchApiData();
  }, []);
  return (
    <>
      <div className="container">
        <h2>Sản phẩm của chúng tôi</h2>
        <div className="container text-center mt-5">
          <div className="row row-cols-2 row-cols-lg-4 g-2 g-lg-3">
            {products?.length > 0 ?
              products.map((product) => {
                console.log("check >>> ", product);
                return (
                  <div key={product.productId} className="col-4">
                    <div className="card">
                      <div style={{ height: "300px" }}>
                        <img
                          src={
                            product.images.length > 0
                              ? product.images[0].url
                              : defaultImg
                          }
                          className="card-img-top"
                          alt={product.productName}
                          onError={(e) => (e.target.src = defaultImg)}
                        />
                      </div>

                      <div className="card-body">
                        <h5 className="card-title" style={{ height: "90px" }}>
                          {product.productName}
                        </h5>
                        <p className="card-text text-start">
                          {`Hãng ${product.brand}`}
                        </p>

                        <div className="text-start d-flex flex-column justify-content-between flex-lg-wrap">
                          {product.discount ? (
                            <div style={{ height: '60px' }}>
                              <p
                                className={`text-dark fs-5 fw-bold mb-0 ${product.discount?.discountValue
                                    ? "text-decoration-line-through"
                                    : ""
                                  }`}
                              >
                                {`${convertVND(product.price)} / ` + product.dimensions}
                              </p>
                              <p className="text-dark fs-5 fw-bold mb-0">
                                {`${convertVND(
                                  product.price -
                                  product.price / product.discount.discountValue
                                )} / ${product.dimensions}`}
                              </p>
                            </div>
                          ) : (
                            <p className="text-dark fs-5 fw-bold mb-0" style={{ height: '60px' }}>
                              {`${convertVND(product.price)} / ` + product.dimensions}
                            </p>
                          )}

                          <button
                            className="btn btn-add-cart rounded-pill px-3 mt-2"
                            onClick={() => handleAddToCart(product.productId)}
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
                );
              }) : <div className="w-100 text-center">Hiện chưa có sản phẩm</div>

            }
          </div>
        </div>
      </div>

      <LoginModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default FeatureProducts;
