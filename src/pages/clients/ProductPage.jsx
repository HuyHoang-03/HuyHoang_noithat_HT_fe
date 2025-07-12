import { NavLink } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { instanceLogin } from "../../config/Axios";
import Sidebar from "../../components/clients/sidebar/Sidebar";
import ListProducts from "../../components/clients/products/ListProducts";
import { Button, Form, FormControl } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

const ProductPageClient = () => {
  const userID = useSelector((state) => state.auth.id);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [categoryID, setCategoryID] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch categories
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await instanceLogin.get("/categories");
        const data = response?.data;
        if (data.code === 200) {
          setCategoryList(data.result);
        }
      } catch (e) {
        console.error("Error fetching categories:", e);
      }
    };

    fetchCategoryData();
  }, []);

  // Fetch products
  const fetchProducts = useCallback(
    async (pageNumber = 0, catID = categoryID, search = searchTerm) => {
      try {
        setLoading(true);
        let url = "";
        if (search) {
          url = `/products/search?productName=${encodeURIComponent(
            search
          )}&pageNo=${pageNumber}&pageSize=9&sortBy=id&sortDir=asc`;
        } else if (catID) {
          url = `/products/category/${catID}?pageNo=${pageNumber}&pageSize=9&sortBy=id&sortDir=asc`;
        } else {
          url = `/products/feature-product/pagination?pageNo=${pageNumber}&pageSize=9&sortBy=id&sortDir=asc`;
        }

        const response = await instanceLogin.get(url);
        const data = response?.data;
        if (data?.code === 200) {
          const resultData = data.result;
          if (resultData?.content && resultData?.page) {
            // API trả về dữ liệu phân trang
            setProducts(resultData.content);
            setTotalPage(resultData.page.totalPages || 0);
          } else {
            // API search trả về danh sách trực tiếp
            setProducts(Array.isArray(resultData) ? resultData : []);
            setTotalPage(resultData.length > 0 ? 1 : 0); // Không phân trang
          }
          setCurrentPage(pageNumber);
        } else {
          setProducts([]);
          setTotalPage(0);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
        setTotalPage(0);
      } finally {
        setLoading(false);
      }
    },
    [categoryID, searchTerm]
  );

  // Gọi lại fetchProducts khi categoryID hoặc searchTerm thay đổi
  useEffect(() => {
    fetchProducts(0, categoryID, searchTerm);
  }, [categoryID, searchTerm, fetchProducts]);

  // Xử lý thay đổi trang
  const handlePageChange = useCallback(
    (selectedPage) => {
      fetchProducts(selectedPage, categoryID, searchTerm);
    },
    [fetchProducts, categoryID, searchTerm]
  );

  // Xử lý sự kiện tìm kiếm
  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(0);
    fetchProducts(0, categoryID, searchTerm);
  };

  // Xử lý thay đổi từ khóa tìm kiếm
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (!value) {
      setCurrentPage(0);
      fetchProducts(0, categoryID, "");
    }
  };

  return (
    <>
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white" style={{ fontWeight: 700 }}>
          Shop
        </h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item">
            <NavLink to="/" style={{ color: "#fff" }}>
              Trang chủ
            </NavLink>
          </li>
          <li className="breadcrumb-item active text-white">Shop</li>
        </ol>
      </div>
      <div className="container mt-5">
        <div className="row p-4 mb-3 justify-content-end">
          <Form
            className="d-none d-lg-flex me-3"
            style={{ maxWidth: "300px" }}
            onSubmit={handleSearch}
          >
            <FormControl
              type="search"
              placeholder="Tìm kiếm sản phẩm..."
              className="rounded-pill"
              aria-label="Search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <Button
              variant="outline-secondary"
              className="ms-2 rounded-circle"
              type="submit"
            >
              <FaSearch />
            </Button>
          </Form>
        </div>
        <div className="row g-4">
          <Sidebar categoryList={categoryList} setCategoryID={setCategoryID} />
          <ListProducts
            products={products}
            userID={userID}
            currentPage={currentPage}
            totalPage={totalPage}
            fetchProductsData={handlePageChange}
            loading={loading}
          />
        </div>
      </div>
    </>
  );
};

export default ProductPageClient;