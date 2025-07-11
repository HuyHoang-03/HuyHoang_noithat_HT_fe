import { useEffect, useState, useCallback, useMemo, memo } from "react";
import { instanceAdmin } from "../../../config/Axios";
import Spinner from "react-bootstrap/Spinner";
import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import { convertVND, convertDate } from "../../../config/customeFunction";
// Memoize Items component để tránh re-render không cần thiết
const Items = memo(({ currentItems }) => {
  return (
    <Table striped>
      <thead>
        <tr id="my_custom-th-table">
          <th>Sản phẩm</th>
          <th>Số lượng nhập/xuất</th>
          <th>Giá</th>
          <th>Loại giao dịch</th>
          <th>Ngày giao dịch</th>
        </tr>
      </thead>
      <tbody>
        {currentItems.map((transaction) => (
          <TransactionRow
            key={transaction.transactionId}
            transaction={transaction}
          />
        ))}
      </tbody>
    </Table>
  );
});

// Tách riêng TransactionRow component và memoize
const TransactionRow = memo(({ transaction}) => {
  return (
    <tr className="text-align-center">
      <td>{transaction.productName}</td>
      <td>{transaction.quantity}</td>
      <td>{convertVND(transaction.price)}</td>
      <td>{transaction.transactionType == "IMPORT" ? "Nhập hàng" : "Xuất hàng" }</td>
      <td>{convertDate(transaction.transactionDate)}</td>
    </tr>
  );
});

// Memoize PaginatedItems component
const PaginatedItems = memo(
  ({
    totalPage,
    transactionList,
    onPageChange,
    currentPage,
    loading,
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
          currentItems={transactionList}
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

const TableStockTransaction = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [transaction, setTransaction] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactionData = useCallback(async (pageNumber = 0) => {
    try {
      setLoading(true);
      const res = await instanceAdmin.get(
        `/stocks/transaction?pageNo=${pageNumber}&pageSize=10&sortBy=transactionDate&sortDir=desc`
      );

      if (res.code === 200 && res.result) {
        const resultData = res.result;
        setTotalPage(resultData.page.totalPages);
        setTransaction(resultData.content);
        setCurrentPage(pageNumber);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Memoize callback để tránh re-render PaginatedItems
  const handlePageChange = useCallback(
    (selectedPage) => {
      if (selectedPage !== currentPage) {
        fetchTransactionData(selectedPage);
      }
    },
    [fetchTransactionData, currentPage]
  );

  useEffect(() => {
    fetchTransactionData(0);
  }, [fetchTransactionData]);

  // Memoize props để tránh re-render không cần thiết
  const paginatedItemsProps = useMemo(
    () => ({
      itemsPerPage: 10,
      totalPage,
      transactionList: transaction,
      onPageChange: handlePageChange,
      currentPage,
      loading,
    }),
    [totalPage, transaction, handlePageChange, currentPage, loading]
  );

  return (
    <>
      <div className="mt-4">
        <PaginatedItems 
          {...paginatedItemsProps} 
        />
      </div>
    </>
  );
};

export default TableStockTransaction;