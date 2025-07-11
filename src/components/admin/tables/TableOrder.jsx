import { useState, useCallback, useMemo, memo } from "react";
import Spinner from "react-bootstrap/Spinner";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { convertDate, convertVND } from "../../../config/customeFunction";
import OrderDetailModal from "../modals/DetailOrder";
import UpdateOrderStatus from "../modals/UpdateOrderStatus";
import {toast} from "react-hot-toast"
import {instanceAdmin} from "../../../config/Axios";
// Memoize Items component để tránh re-render không cần thiết
const Items = memo(({ currentItems, handleShowOrderDetail, handleShowUpdateModal }) => {
  return (
    <Table striped>
      <thead>
        <tr id="my_custom-th-table">
          <th>Tên khách hàng</th>
          <th>Ngày đặt đơn</th>
          <th>Tổng số tiền</th>
          <th>Trạng thái</th>
          <th>Phương thức thanh toán</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        {currentItems.map((order) => (
          <OrderRow
            handleShowOrderDetail={handleShowOrderDetail}
            handleShowUpdateModal={handleShowUpdateModal}
            key={order.orderId}
            order={order}
          />
        ))}
      </tbody>
    </Table>
  );
});

const OrderRow = memo(({ order, handleShowOrderDetail, handleShowUpdateModal}) => {
  const handleClickRow = (orderId) => {
    handleShowOrderDetail(orderId);
  };

  return (
    <tr className="text-align-center" onClick={() => handleClickRow(order.orderId)}>
      <td>{order.userName}</td>
      <td>{convertDate(order.orderDate)}</td>
      <td>{convertVND(order.finalAmount)}</td>
      <td>{order.status}</td>
      <td>{order.paymentMethod}</td>
      <td>
        <Button variant="primary" size="sm" onClick={(e) => {
          e.stopPropagation(); // Ngăn chặn sự kiện click row
          handleShowUpdateModal(order.orderId, order.status);
        }}>
          Cập nhật trạng thái
        </Button>
      </td>
    </tr>
  );
});

// Memoize PaginatedItems component
const PaginatedItems = memo(
  ({
    totalPage,
    orderList,
    onPageChange,
    currentPage,
    loading,
    handleShowOrderDetail,
    handleShowUpdateModal
  }) => {
    const handlePageClick = useCallback(
      (event) => {
        const selectedPage = event.selected;
        console.log(`User requested page number ${selectedPage}`);
        onPageChange(selectedPage);
      },
      [onPageChange]
    );

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
          handleShowOrderDetail={handleShowOrderDetail}
          currentItems={orderList}
          handleShowUpdateModal={handleShowUpdateModal}
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
  }
);

const TableOrder = ({
  orders,
  currentPage,
  totalPage,
  loading,
  fetchOrderData,
}) => {
  const [showModalDetail, setShowModalDetail] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateOrderId, setUpdateOrderId] = useState(null);
  const [currentStatus, setCurrentStatus] = useState("");

  // Hàm mở modal và set sản phẩm được chọn
  const handleShowOrderDetail = (orderId) => {
    setSelectedOrder(orderId);
    setShowModalDetail(true);
  };

  // Hàm mở modal cập nhật trạng thái
  const handleShowUpdateModal = (orderId, status) => {
    setUpdateOrderId(orderId);
    setCurrentStatus(status);
    setShowUpdateModal(true);
  };

  // Hàm cập nhật trạng thái đơn hàng
  const handleUpdateStatus = useCallback(async (orderId, newStatus) => {
    try {
      const res = await instanceAdmin.put(`/orders/update/${orderId}`, { status: newStatus });
      if (res.code === 200) {
        toast.success(res.message);
        fetchOrderData(currentPage); // Làm mới danh sách sau khi cập nhật
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  }, [fetchOrderData, currentPage]);

  // Memoize callback để tránh re-render PaginatedItems
  const handlePageChange = useCallback(
    (selectedPage) => {
      if (selectedPage !== currentPage) {
        fetchOrderData(selectedPage);
      }
    },
    [fetchOrderData, currentPage]
  );

  // Memoize props để tránh re-render không cần thiết
  const paginatedItemsProps = useMemo(
    () => ({
      itemsPerPage: 10,
      totalPage,
      orderList: orders,
      onPageChange: handlePageChange,
      currentPage,
      loading,
    }),
    [totalPage, orders, handlePageChange, currentPage, loading]
  );



  return (
    <>
      <div className="col-8 mt-4">
        <PaginatedItems
          {...paginatedItemsProps}
          handleShowOrderDetail={handleShowOrderDetail}
          handleShowUpdateModal={handleShowUpdateModal}
        />
      </div>

      {showModalDetail && (
        <OrderDetailModal
          show={showModalDetail}
          setShow={setShowModalDetail}
          selectedOrder={selectedOrder}
        />
      )}

      {showUpdateModal && (
        <UpdateOrderStatus
          show={showUpdateModal}
          onHide={() => setShowUpdateModal(false)}
          orderId={updateOrderId}
          currentStatus={currentStatus}
          onSave={handleUpdateStatus}
        />
      )}
    </>
  );
};

export default TableOrder;