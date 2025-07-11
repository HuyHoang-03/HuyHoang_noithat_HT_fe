import "./sidebar.css";
import banner from "../../../assets/imgs/banner-ft.png";
const Sidebar = ({ categoryList, setCategoryID }) => {
  return (
    <div className="col-lg-3">
      <div className="row g-4">
        <div className="col-lg-12">
          <div className="mb-3">
            <h4>Danh mục</h4>
            <ul className="list-unstyled fruite-categorie">
              <li>
                <div className="d-flex justify-content-between fruite-name">
                  <span
                    onClick={() => setCategoryID(null)}
                    className="me-2"
                    style={{ cursor: "pointer" }}
                  >
                    Tất cả danh mục
                  </span>
                </div>
              </li>
              {categoryList &&
                categoryList.length > 0 &&
                categoryList.map((category) => {
                  return (
                    <li key={category.categoryId}>
                      <div className="d-flex justify-content-between fruite-name">
                        <span
                          onClick={() => setCategoryID(category.categoryId)}
                          className="me-2"
                        >
                          {category.categoryName}
                        </span>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>

        <div className="position-relative">
          <img src={banner} className="img-fluid w-100 rounded" alt="" />
          <div
            className="position-absolute"
            style={{ top: "50%", right: "20px", transform: "translateY(-50%)" }}
          >
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
