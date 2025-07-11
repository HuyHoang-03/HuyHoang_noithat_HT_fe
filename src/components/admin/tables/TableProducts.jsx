import defaultImage from "../../../assets/imgs/defaultImage.png";
import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import DetailProduct from "../modals/DetailProduct";

const Items = ({ currentItems, handleShowProductDetail }) => {
  return (
    <Table striped>
      <thead>
        <tr id="my_custom-th-table">
          <th>Hình ảnh</th>
          <th>Tên hàng</th>
          <th>Hãng</th>
          <th>Chất liệu</th>
          <th>Trạng thái</th>
        </tr>
      </thead>
      <tbody>
        {currentItems.map((product) => {
          return  <tr
            key={product.id || product.productId}
            className="text-align-center"
            onClick={() => handleShowProductDetail(product)}
          >
            <td>
              <img
                style={{
                  width: "50px",
                  height: "50px",
                  objectFit: "cover",
                }}
                src={
                  product.images && product.images.length > 0
                    ? product.images[0].url
                    : defaultImage
                }
                alt={
                  product.images && product.images.length > 0
                    ? product.productName
                    : "Chưa có ảnh sản phẩm"
                }
                loading="lazy"
                onError={(e) => {
                  e.target.src = defaultImage;
                }}
              />
            </td>
            <td>{product.productName}</td>
            <td>{product.brand}</td>
            <td>{product.material}</td>
            <td>{product.isActive ? "Kinh doanh" : "Chưa kinh doanh"}</td>
          </tr>
        })}
      </tbody>
    </Table>
  );
};

const PaginatedItems = ({
  totalPage,
  productsList,
  onPageChange,
  currentPage,
  loading,
  handleShowProductDetail,
}) => {
  const handlePageClick = (event) => {
    const selectedPage = event.selected;
    console.log(`User requested page number ${selectedPage}`);
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
        handleShowProductDetail={handleShowProductDetail}
        currentItems={productsList}
      />
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPage}
        previousLabel="< previous"
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
    </>
  );
};

const TableProducts = ({
  categoryId,
  fetchProductsData,
  currentPage,
  totalPage,
  products,
  loading,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleShowProductDetail = (product) => {
    setSelectedProduct(product.productId);
    setShowModal(true);
  };

 
  const handlePageChange = (selectedPage) => {
    if (selectedPage !== currentPage) {
      fetchProductsData(selectedPage);
    }
  };

  useEffect(() => {
    fetchProductsData(0);
  }, [fetchProductsData]);

  return (
    <>
      <div>
        <PaginatedItems
          totalPage={totalPage}
          productsList={products}
          onPageChange={handlePageChange}
          currentPage={currentPage}
          loading={loading}
          handleShowProductDetail={handleShowProductDetail}
        />
      </div>
      {showModal && (
        <DetailProduct
          showModal={showModal}
          setShowModal={setShowModal}
          setSelectedProduct={setSelectedProduct}
          productId={selectedProduct}
          fetchProductsData={fetchProductsData}
        />
      )}
    </>
  );
};

export default TableProducts;
