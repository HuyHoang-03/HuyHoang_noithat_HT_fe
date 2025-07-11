import "./hero.css";
import heroImg from "../../../assets/imgs/hero_img.webp";
import { FaShippingFast } from "react-icons/fa";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { LuSofa } from "react-icons/lu";
const Hero = () => {
  return (
    <>
      <div className="hero">
        <div
          className="container mx-auto row align-items-center"
          style={{ height: "100%" }}
        >
          <div className="col-8">
            <h1 className="hero--name">Nội thất cao cấp
              cho phong cách sống hiện đại</h1>
            <button className="hero--btn">Khám phá</button>
          </div>

          <div className="col-4 border border-warning-subtle rounded-top-4 p-3">
            <img
              src={heroImg}
              alt=""
              style={{ width: '100%', objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
      <div className="container-fluid featurs py-5 mt-5">
        <div className="container py-5">
          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <div className="featurs-item text-center rounded p-4" style={{background: "rgb(228 231 234)"}}>
                <div className="featurs-icon btn-square rounded-circle bg-secondary mb-5 mx-auto">
                  <FaShippingFast color="#fff" size={40} />
                </div>
                <div className="text-center" style={{height: '48px'}}>
                  <h5>Miễn phí đổi trả thảm trong 7 ngày</h5>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="featurs-item text-center rounded p-4" style={{background: "rgb(228 231 234)"}}>
                <div className="featurs-icon btn-square rounded-circle bg-secondary mb-5 mx-auto">
                  <LuSofa  color="#fff" size={40} />
                </div>
                <div className="text-center" style={{height: '48px'}}>
                  <h5>Tùy ý điều chỉnh vỏ bọc sofa</h5>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="featurs-item text-center rounded p-4" style={{background: "rgb(228 231 234)"}}>
                <div className="featurs-icon btn-square rounded-circle bg-secondary mb-5 mx-auto">
                  <FaArrowRightArrowLeft color="#fff" size={40} />
                </div>
                <div className="text-center" style={{height: '48px'}}>
                  <h5>Chính sách bảo hành 12 tháng</h5>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="featurs-item text-center rounded p-4" style={{background: "rgb(228 231 234)"}}>
                <div className="featurs-icon btn-square rounded-circle bg-secondary mb-5 mx-auto">
                  <FaPhoneAlt color="#fff" size={40} />
                </div>
                <div className="text-center" style={{height: '48px'}}>
                  <h5>Hỗ trợ 24/7</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
