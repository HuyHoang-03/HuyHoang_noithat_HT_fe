import "./footer.css"
const Footer = () => {
  return (
    <div className="container-fluid bg-dark text-white-50 footer pt-5 mt-5">
      <div className="container py-5">
        <div
          className="pb-4 mb-4"
          style={{ borderBottom: "1px solid rgba(226, 175, 24, 0.5)" }}
        >
          <div className="row g-4">
            <div className="col-lg-3">
              <a href="#">
                <h1 className="mb-0" style={{ color: "#fff" }}>Nội thất HT</h1>
                <p className="text-secondary mb-0">Nội thất cao cấp</p>
              </a>
            </div>
            <div className="col-lg-6">
              <div className="position-relative mx-auto">
                <input
                  className="form-control border-0 w-100 py-3 px-4 rounded-pill"
                  type="number"
                  placeholder="Nhập email"
                />
                <button
                  type="submit"
                  className="border-0 border-secondary py-3 px-4 position-absolute rounded-pill text-white"
                  style={{ top: 0, right: 0, background: "rgba(167, 132, 102, 0.75)" }}
                >
                  Đăng ký ngay
                </button>
              </div>
            </div>

          </div>
        </div>
        <div className="row g-5">
          <div className="col-lg-3 col-md-6">
            <div className="footer-item">
              <h4 className="text-light mb-3">Lý do bạn nên tới chúng tôi!</h4>
              <p className="mb-4">
                Nội thất mang đến sự tiện nghi và thẩm mỹ cho không gian sống, ngày càng được ưa chuộng từ những năm 1960 với nhiều thiết kế hiện đại.
              </p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="d-flex flex-column text-start footer-item">
              <h4 className="text-light mb-3">Thông tin cửa hàng</h4>
              <a className="btn-link" href="">
                Về chúng tôi
              </a>
              <a className="btn-link" href="">
                Liên lạc
              </a>
              <a className="btn-link" href="">
                Chính sách
              </a>
              <a className="btn-link" href="">
                FAQs & Help
              </a>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="d-flex flex-column text-start footer-item">
              <h4 className="text-light mb-3">Tài khoản</h4>
              <a className="btn-link" href="">
               Tài khoản của tôi
              </a>
              <a className="btn-link" href="">
                Sản phẩm
              </a>
              <a className="btn-link" href="">
                Giỏ hàng
              </a>
              <a className="btn-link" href="">
                Lịch sử mua hàng
              </a>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="footer-item">
              <h4 className="text-light mb-3">Liên lạc</h4>
              <p>Địa chỉ: Tầng 5 và 6, 111 đường Nguyễn Xiển, phường Hạ Đình, quận Thanh Xuân, Hà Nội</p>
              <p>Email: noithatht@gmail.com</p>
              <p>Phone: +84 793 261 551</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
