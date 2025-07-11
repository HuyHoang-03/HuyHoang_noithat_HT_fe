import "./feature.css";
import imgFeature1 from "../../../assets/imgs/ban-go.webp";
import imgFeature2 from "../../../assets/imgs/ghe-sofa.webp";
import imgFeature3 from "../../../assets/imgs/guong.webp";

const Feature = () => {
  return (
    <div className="container-fluid service py-5 mt-5">
      <div className="container py-5">
        <div className="row g-4 justify-content-center">
          <div className="col-md-6 col-lg-4">
            <a href="#">
              <div
                className="service-item  rounded"
                style={{ background: "rgba(167, 132, 102, 0.75)" }}
              > 
                <img
                  src={imgFeature1}
                  className="img-fluid rounded-top w-100"
                  alt=""
                />
                <div className="px-4 rounded-bottom">
                  <div
                    className="service-content text-center p-4 rounded"
                    style={{ background: "#fde6d6ed" }}
                  >
                    <h5  style={{color: "#45595b"}}>Bàn phòng khách</h5>
                    <h3 className="mb-0" style={{ color: "#45595b" , fontSize: "27px" }}>
                      Giảm giá 20%
                    </h3>
                  </div>
                </div>
              </div>
            </a>
          </div>

          <div className="col-md-6 col-lg-4">
            <a href="#">
              <div className="service-item bg-dark rounded">
                <img
                  src={imgFeature2}
                  className="img-fluid rounded-top w-100"
                  alt=""
                />
                <div className="px-4 rounded-bottom" style={{ background: "#45595b !important" }}>
                  <div className="service-content bg-light text-center p-4 rounded">
                    <h5 style={{ color: "#45595b"  }}>
                      Sofa cao cấp
                    </h5>
                    <h3 className="mb-0" style={{ fontSize: "27px", color: "#45595b" }}>
                      Bảo hành 12 tháng
                    </h3>
                  </div>
                </div>
              </div>
            </a>
          </div>

          <div className="col-md-6 col-lg-4">
            <a href="#">
              <div className="service-item rounded">
                <img
                  src={imgFeature3}
                  className="img-fluid rounded-top w-100"
                  alt=""
                />
                <div className="px-4 rounded-bottom"  style={{ background: "rgba(167, 132, 102, 0.75)" }}>
                  <div className="service-content text-center p-4 rounded"  style={{ background: "#fde6d6ed" }}>
                    <h5  style={{ color: "#45595b"}}>Gương trang trí</h5>
                    <h3 className="mb-0" style={{ color: "#45595b", fontSize: "27px" }}>Ưu đãi 700.000đ</h3>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feature;
