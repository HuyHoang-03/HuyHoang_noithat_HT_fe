import { NavLink } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { instanceLogin } from "../../config/Axios";
import Sidebar from "../../components/clients/sidebar/Sidebar";
import ListProducts from "../../components/clients/products/ListProducts";

const ProductPageClient = () => {
  const userID = useSelector((state) => state.auth.id);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [categoryID, setCategoryID] = useState("");
  const [categoryList, setCategoryList] = useState([]);

  // Fetch categories chỉ 1 lần
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await instanceLogin.get("/categories");
        const data = response?.data;
        if (data.code === 200) {
          setCategoryList(data.result);
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchCategoryData();
  }, []); 

  const fetchProducts = useCallback(async (pageNumber = 0, catID = categoryID) => {
    try {
      setLoading(true);
      
      let url = "";
      if (catID) {
        url = `/products/category/${catID}?pageNo=${pageNumber}&pageSize=9&sortBy=id&sortDir=asc`;
      } else {
        url = `/products/feature-product/pagination?pageNo=${pageNumber}&pageSize=9&sortBy=id&sortDir=asc`;
      }

      const response = await instanceLogin.get(url);
      const data = response?.data;
      if (data?.code === 200) {
        const resultData = data.result;
        setProducts(resultData.content);
        setTotalPage(resultData?.page?.totalPages ? resultData.page.totalPages : 0 );
        setCurrentPage(pageNumber);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, [categoryID]);

  useEffect(() => {
    fetchProducts(0, categoryID);
  }, [categoryID]);

  const handlePageChange = useCallback((selectedPage) => {
    fetchProducts(selectedPage);
  }, [fetchProducts]);

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