import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CiCircleRemove } from "react-icons/ci";
import { FaMinus, FaPlus, FaShoppingCart } from "react-icons/fa";
import { instance } from "../../../config/Axios";
import defaultImg from "../../../assets/imgs/defaultImage.png";
import { convertVND } from "../../../config/customeFunction";
import toast from "react-hot-toast";

const Cart = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth);
  const userID = user.id;
  const userName = user.name || user.username || "Khách hàng";
  
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderLoading, setOrderLoading] = useState(false);
  
  const [checkoutForm, setCheckoutForm] = useState({
    shippingAddress: "",
    shippingMethod: "Giao hàng tiêu chuẩn",
    paymentMethod: "Nhận hàng thanh toán",
    note: ""
  });

  const shippingMethods = [
    { value: "Giao hàng tiêu chuẩn", label: "Giao hàng tiêu chuẩn (3-5 ngày)", fee: 30000 },
    { value: "Giao hàng nhanh", label: "Giao hàng nhanh (1-2 ngày)", fee: 50000 },
    { value: "Giao hàng hỏa tốc", label: "Giao hàng hỏa tốc (trong ngày)", fee: 80000 }
  ];

  const paymentMethods = [
    { value: "Nhận hàng thanh toán", label: "Thanh toán khi nhận hàng (COD)" },
    { value: "Chuyển khoản", label: "Chuyển khoản ngân hàng" },
    { value: "Ví điện tử", label: "Ví điện tử (Momo, ZaloPay)" }
  ];

  const fetchDataApi = async () => {
    try {
      const response = await instance.get(`cart/user/${userID}`);
      if (response.code === 200) {
        setCart(response.result);
      }
    } catch (error) {
      console.error("Lỗi khi tải giỏ hàng:", error);
      toast.error("Không thể tải giỏ hàng");
    }
  };

  const updateQuantityAPI = async (cartId, productId, newQuantity) => {
    try {
      setLoading(true);
      const response = await instance.put(`cart/update/quantity`, {
        cartId: cartId,
        productId: productId,
        quantity: newQuantity
      });

      if (response.code === 200 || response.status === 200) {
        setCart(prevCart =>
          prevCart.map(item =>
            item.id === cartId || item.cartId === cartId
              ? { ...item, quantity: newQuantity }
              : item
          )
        );
        toast.success("Cập nhật số lượng thành công");
        return true;
      } else {
        throw new Error(response.message || "Cập nhật thất bại");
      }
    } catch (error) {
      console.error("Lỗi cập nhật số lượng:", error);
      toast.error(error.response?.data?.message || "Không thể cập nhật số lượng");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleIncreaseQuantity = async (item) => {
    const cartId = item.cartId || item.id;
    const productId = item.product?.id || item.productId;
    const currentQuantity = item.quantity;
    const newQuantity = currentQuantity + 1;

    if (item.product?.stock && newQuantity > item.product.stock) {
      toast.error(`Chỉ còn ${item.product.stock} sản phẩm trong kho`);
      return;
    }

    await updateQuantityAPI(cartId, productId, newQuantity);
  };

  const handleDecreaseQuantity = async (item) => {
    const cartId = item.cartId || item.id;
    const productId = item.product?.id || item.productId;
    const currentQuantity = item.quantity;
    
    if (currentQuantity <= 1) {
      toast.error("Số lượng tối thiểu là 1");
      return;
    }

    const newQuantity = currentQuantity - 1;
    await updateQuantityAPI(cartId, productId, newQuantity);
  };

  const handleRemoveItem = async (cartId) => {
    try {
      const response = await instance.delete(`/cart/delete/${cartId}`);
      if (response?.code == 200) {
        toast.success(response.message);
        fetchDataApi();
      }
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
      toast.error("Không thể xóa sản phẩm");
    }
  };

  const getDiscountedPrice = (price, discount) => {
    if (!discount || !discount.discountValue) return price;
    const discountAmount = (price * discount.discountValue) / 100;
    return price - discountAmount;
  };

  const calculateCartTotal = () => {
    return cart.reduce((total, item) => {
      const discountedPrice = getDiscountedPrice(
        item.product.price,
        item.product.discount
      );
      const finalPrice = discountedPrice || item.product.price;
      return total + (finalPrice * item.quantity);
    }, 0);
  };

  const getShippingFee = () => {
    const method = shippingMethods.find(m => m.value === checkoutForm.shippingMethod);
    return method ? method.fee : 30000;
  };

  const handleFormChange = (field, value) => {
    setCheckoutForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const createOrderData = () => {
    const subtotal = calculateCartTotal();
    const shippingFee = getShippingFee();
    const finalAmount = subtotal + shippingFee;

    return {
      userId: userID,
      userName: userName,
      orderDate: new Date().toISOString(),
      subtotalAmount: subtotal,
      shippingAddress: checkoutForm.shippingAddress,
      shippingMethod: checkoutForm.shippingMethod,
      shippingFee: shippingFee,
      finalAmount: finalAmount,
      status: "Đang xử lý",
      createDate: new Date().toISOString(),
      updateDate: new Date().toISOString(),
      orderDetails: cart.map(item => ({
        productId: item.product.productId || item.productId,
        productName: item.product.productName,
        quantity: item.quantity,
        originalPrice: item.product.price,
        finalPrice: getDiscountedPrice(item.product.price, item.product.discount) || item.product.price,
        createDate: new Date().toISOString(),
        updateDate: new Date().toISOString()
      })),
      payments: [{
        paymentMethod: checkoutForm.paymentMethod,
        paymentDate: new Date().toISOString(),
        transactionId: `TX${Date.now()}`,
        amount: finalAmount,
        transactionStatus: checkoutForm.paymentMethod === "Nhận hàng thanh toán" ? "Chưa thanh toán" : "Đang xử lý",
        createDate: new Date().toISOString(),
        updateDate: new Date().toISOString()
      }]
    };
  };

  const handlePlaceOrder = async () => {
    if (!checkoutForm.shippingAddress.trim()) {
      toast.error("Vui lòng nhập địa chỉ giao hàng");
      return;
    }

    if (cart.length === 0) {
      toast.error("Giỏ hàng trống");
      return;
    }

    try {
      setOrderLoading(true);
      const orderData = createOrderData();
      
      console.log("Order data:", orderData);
      
      const response = await instance.post("/orders", orderData);
      console.log(response)
      if (response.code === 201 || response.status === 200 || response.status === 201) {
        toast.success("Đặt hàng thành công!");
        setShowCheckout(false);
        setCart([]);
        setCheckoutForm({
          shippingAddress: "",
          shippingMethod: "Giao hàng tiêu chuẩn",
          paymentMethod: "Nhận hàng thanh toán",
          note: ""
        });
        navigate("/order");
      } else {
        throw new Error(response.message || "Đặt hàng thất bại");
      }
    } catch (error) {
      console.error("Lỗi đặt hàng:", error);
      toast.error(error.response?.data?.message || "Không thể đặt hàng. Vui lòng thử lại!");
    } finally {
      setOrderLoading(false);
    }
  };

  useEffect(() => {
    if (userID) {
      fetchDataApi();
    }
  }, [userID]);

  return (
    <div className="container-fluid py-5">
      <div className="container py-5">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Sản phẩm</th>
                <th scope="col">Giá</th>
                <th scope="col">Số lượng</th>
                <th scope="col">Tổng giá trị</th>
                <th scope="col">Handle</th>
              </tr>
            </thead>
            <tbody>
              {cart.length > 0 ? (
                cart.map((item) => {
                  const discountedPrice = getDiscountedPrice(
                    item.product.price,
                    item.product.discount
                  );
                  const finalPrice = discountedPrice || item.product.price;
                  const total = finalPrice * item.quantity;
                  
                  return (
                    <tr key={`${item.product.productName}-${item.cartId || item.id}`}>
                      <th scope="row">
                        <div className="d-flex align-items-center">
                          <img
                            src={item.product.images[0]?.url || defaultImg}
                            className="img-fluid me-5 rounded-circle"
                            style={{ width: "80px", height: "80px" }}
                            alt={item.product.productName}
                          />
                        </div>
                      </th>
                      <td>
                        <p className="mb-0 mt-4">{item.product.productName}</p>
                      </td>
                      <td>
                        <p className="mb-0 mt-4">
                          {convertVND(finalPrice)}
                        </p>
                      </td>
                      <td>
                        <div
                          className="input-group quantity mt-4"
                          style={{ width: "150px" }}
                        >
                          <div className="input-group-btn">
                            <button
                              className="btn btn-sm btn-minus rounded-circle bg-light border"
                              onClick={() => handleDecreaseQuantity(item)}
                              disabled={loading || item.quantity <= 1}
                            >
                              <FaMinus />
                            </button>
                          </div>
                          <input
                            type="number"
                            className="form-control form-control-sm text-center border-0"
                            value={item.quantity}
                            readOnly
                            min="1"
                            max="999"
                            disabled={loading}
                          />
                          <div className="input-group-btn">
                            <button
                              className="btn btn-sm btn-plus rounded-circle bg-light border"
                              onClick={() => handleIncreaseQuantity(item)}
                              disabled={loading}
                            >
                              <FaPlus />
                            </button>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p className="mb-0 mt-4">
                          {convertVND(total)}
                        </p>
                      </td>
                      <td>
                        <button 
                          onClick={() => handleRemoveItem(item.cartId)} 
                          className="d-flex align-items-center justify-content-center text-danger rounded-circle bg-light border mt-3"
                          disabled={loading}
                        >
                          <CiCircleRemove size={40} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-5">
                    <FaShoppingCart size={50} className="text-muted mb-3" />
                    <p className="text-muted">
                      {loading ? "Đang tải..." : "Giỏ hàng trống"}
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Cart Summary */}
        <div className="row g-4 justify-content-end">
          <div className="col-8"></div>
          <div className="col-sm-8 col-md-7 col-lg-6 col-xl-4">
            <div className="bg-light rounded">
              <div className="p-4">
                <h1 className="display-6 mb-4">
                  Tổng <span className="fw-normal">giỏ hàng</span>
                </h1>
                <div className="d-flex justify-content-between mb-4">
                  <h5 className="mb-0 me-4">Tổng cộng:</h5>
                  <p className="mb-0">{convertVND(calculateCartTotal())}</p>
                </div>
                <div className="d-flex justify-content-between">
                  <h5 className="mb-0 me-4">Phí ship tạm tính</h5>
                  <div className="">
                    <p className="mb-0">{convertVND(30000)}</p>
                  </div>
                </div>
              </div>
              <div className="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
                <h5 className="mb-0 ps-4 me-4">Ước tính tổng giá trị</h5>
                <p className="mb-0 pe-4">{convertVND(calculateCartTotal() + 30000)}</p>
              </div>
              <button
                className="btn border-secondary rounded-pill px-4 py-3 text-primary text-uppercase mb-4 ms-4"
                type="button"
                disabled={loading || cart.length === 0}
                onClick={() => setShowCheckout(true)}
              >
                {loading ? "Processing..." : "Tiến hành thanh toán"}
              </button>
            </div>
          </div>
        </div>

        {/* Checkout Form */}
        {showCheckout && (
          <div className="mt-5">
            <h2 className="mb-4">Thanh toán đơn hàng</h2>
            
            {/* Order Summary */}
            <div className="card mb-4">
              <div className="card-header">
                <h6 className="mb-0">Thông tin đơn hàng</h6>
              </div>
              <div className="card-body">
                {cart.map((item) => {
                  const finalPrice = getDiscountedPrice(item.product.price, item.product.discount) || item.product.price;
                  return (
                    <div key={item.id} className="d-flex justify-content-between align-items-center mb-2">
                      <div className="d-flex align-items-center">
                        <img
                          src={item.product.images[0]?.url || defaultImg}
                          style={{ width: "40px", height: "40px" }}
                          className="rounded me-3"
                          alt={item.product.productName}
                        />
                        <div>
                          <p className="mb-0 fw-medium">{item.product.productName}</p>
                          <small className="text-muted">Số lượng: {item.quantity}</small>
                        </div>
                      </div>
                      <span className="fw-bold">{convertVND(finalPrice * item.quantity)}</span>
                    </div>
                  );
                })}
                <hr />
                <div className="d-flex justify-content-between">
                  <span>Tạm tính:</span>
                  <span>{convertVND(calculateCartTotal())}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Phí vận chuyển:</span>
                  <span>{convertVND(getShippingFee())}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between fw-bold fs-5">
                  <span>Tổng cộng:</span>
                  <span className="text-primary">{convertVND(calculateCartTotal() + getShippingFee())}</span>
                </div>
              </div>
            </div>

            {/* Shipping Information */}
            <div className="card mb-4">
              <div className="card-header">
                <h6 className="mb-0">Thông tin giao hàng</h6>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label">Địa chỉ giao hàng *</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={checkoutForm.shippingAddress}
                    onChange={(e) => handleFormChange('shippingAddress', e.target.value)}
                    placeholder="Nhập địa chỉ chi tiết (số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố)"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Phương thức vận chuyển</label>
                  <select
                    className="form-select"
                    value={checkoutForm.shippingMethod}
                    onChange={(e) => handleFormChange('shippingMethod', e.target.value)}
                  >
                    {shippingMethods.map(method => (
                      <option key={method.value} value={method.value}>
                        {method.label} - {convertVND(method.fee)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="card mb-4">
              <div className="card-header">
                <h6 className="mb-0">Phương thức thanh toán</h6>
              </div>
              <div className="card-body">
                {paymentMethods.map(method => (
                  <div key={method.value} className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="paymentMethod"
                      id={method.value}
                      value={method.value}
                      checked={checkoutForm.paymentMethod === method.value}
                      onChange={(e) => handleFormChange('paymentMethod', e.target.value)}
                    />
                    <label className="form-check-label" htmlFor={method.value}>
                      {method.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Note */}
            <div className="card mb-4">
              <div className="card-header">
                <h6 className="mb-0">Ghi chú đơn hàng</h6>
              </div>
              <div className="card-body">
                <textarea
                  className="form-control"
                  rows="3"
                  value={checkoutForm.note}
                  onChange={(e) => handleFormChange('note', e.target.value)}
                  placeholder="Ghi chú thêm cho đơn hàng (tùy chọn)"
                />
              </div>
            </div>

            <div className="d-flex justify-content-end">
              <button 
                type="button" 
                className="btn btn-secondary me-2" 
                onClick={() => setShowCheckout(false)}
                disabled={orderLoading}
              >
                Hủy
              </button>
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={handlePlaceOrder}
                disabled={orderLoading || !checkoutForm.shippingAddress.trim()}
              >
                {orderLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Đang xử lý...
                  </>
                ) : (
                  `Đặt hàng - ${convertVND(calculateCartTotal() + getShippingFee())}`
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;