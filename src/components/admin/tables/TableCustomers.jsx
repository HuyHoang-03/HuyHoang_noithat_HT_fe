import { useState, useCallback, useMemo, memo } from "react";
import Spinner from "react-bootstrap/Spinner";
import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import DetailCustomer from "../modals/DetailCustomer";
// Memoize Items component để tránh re-render không cần thiết
const Items = memo(({ currentItems, handleShowCustomerDetail }) => {

  return (
    <Table striped>
      <thead>
        <tr id="my_custom-th-table">
          <th>Tên khách hàng</th>
          <th>Email</th>
          <th>Số điện thoại</th>
        </tr>
      </thead>
      <tbody>
        {currentItems.map((customer) => (
          <CustomerRow
            handleShowCustomerDetail={handleShowCustomerDetail}
            key={customer.id}
            customer={customer}
          />
        ))}
      </tbody>
    </Table>
  );
});

const CustomerRow = memo(({ customer, handleShowCustomerDetail }) => {
  const handleClickRow = useCallback(() => {
    handleShowCustomerDetail(customer);
  }, [handleShowCustomerDetail, customer]); 

  return (
    <tr className="text-align-center" onClick={handleClickRow} >
      <td>{`${customer.lastName} ${customer.firstName}`}</td>
      <td>{customer.email}</td>
      <td>{customer.phone}</td>
    </tr>
  );
});

// Memoize PaginatedItems component
const PaginatedItems = memo(
  ({
    totalPage,
    usersList,
    onPageChange,
    currentPage,
    loading,
    handleShowCustomerDetail,
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
          handleShowCustomerDetail={handleShowCustomerDetail}
          currentItems={usersList}
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

const TableCustomers = ({users, currentPage,totalPage ,loading, fetchUsersData }) => {
  const [showModalDetail, setShowModalDetail] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Hàm mở modal và set sản phẩm được chọn
  const handleShowCustomerDetail = useCallback((customer) => {
    setSelectedCustomer(customer.id);
    setShowModalDetail(true);
  }, []);

  
  // Memoize callback để tránh re-render PaginatedItems
  const handlePageChange = useCallback(
    (selectedPage) => {
      if (selectedPage !== currentPage) {
        fetchUsersData(selectedPage);
      }
    },
    [fetchUsersData, currentPage]
  );

 
  // Memoize props để tránh re-render không cần thiết
  const paginatedItemsProps = useMemo(
    () => ({
      itemsPerPage: 10,
      totalPage,
      usersList: users,
      onPageChange: handlePageChange,
      currentPage,
      loading,
    }),
    [totalPage, users, handlePageChange, currentPage, loading]
  );

  return (
    <>
      <div className="col">
        <PaginatedItems 
          {...paginatedItemsProps} 
          handleShowCustomerDetail={handleShowCustomerDetail}
        />
      </div>
      {showModalDetail && (
        <DetailCustomer
          showModalDetail={showModalDetail}
          setShowModalDetail={setShowModalDetail}
          setSelectedCustomer={setSelectedCustomer}
          customerId={selectedCustomer}
          fetchUsersData={fetchUsersData}
        />
      )}
    </>
  );
};

export default TableCustomers;