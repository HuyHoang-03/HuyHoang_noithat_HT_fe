import { useState, useCallback, useEffect } from "react";
import SearchBarAdmin from "../components/admin/searchs/SearchBarAdmin";
import ProductSideBar from "../components/admin/sidebars/ProductSideBar";
import TableProducts from "../components/admin/tables/TableProducts";
import AddProduct from "../components/admin/modals/AddProduct";
import { instanceAdmin } from "../config/Axios";
const ProductPage = () => {
  const [categoryId, setCategoryId] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleShowCreateModal = () => {
    setShowCreateModal(true);
  };

  const fetchProducts = useCallback(
    async (pageNumber = 0, catID = categoryId) => {
      try {
        setLoading(true);

        let url = "";
        if (catID) {
          url = `/products/category/${catID}/admin`;
        } else {
          url = `/products/pagination?pageNo=${pageNumber}&pageSize=10&sortBy=id&sortDir=asc`;
        }

        const response = await instanceAdmin.get(url);

        if (response?.code === 200) {
          const resultData = response.result;
          console.log(resultData)
          setProducts(resultData.content);
          setTotalPage(resultData.page.totalPages);
          setCurrentPage(pageNumber);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    },
    [categoryId]
  );

  const handlePageChange = useCallback(
    (selectedPage) => {
      fetchProducts(selectedPage);
    },
    [fetchProducts]
  );

  useEffect(() => {
    fetchProducts(0, categoryId);
  }, [categoryId]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await instanceAdmin.get("/categories");
        if (response.code === 200) {
          setCategories(response.result);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const dropdownItems = [
    {
      label: "Thêm sản phẩm",
      onClick: handleShowCreateModal,
    },
  ];

  return (
    <div>
      <SearchBarAdmin title="Hàng hoá" dropdownItems={dropdownItems} />
      <div className="row mt-4">
        <div className="col-3">
          <ProductSideBar
            categories={categories}
            setCategoryId={setCategoryId}
          />
        </div>
        <div className="col-9">
          <TableProducts
            fetchProductsData={handlePageChange}
            currentPage={currentPage}
            totalPage={totalPage}
            products={products}
            loading={loading}
            categoryId={categoryId}
          />
        </div>
      </div>
      {showCreateModal && (
        <AddProduct
          fetchProductsData={fetchProducts}
          show={setShowCreateModal}
          setShow={setShowCreateModal}
        />
      )}
    </div>
  );
};

export default ProductPage;
