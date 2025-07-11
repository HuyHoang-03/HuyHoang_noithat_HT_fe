import { useState, useEffect, useCallback } from "react";
import { instanceAdmin } from "../config/Axios";
import SearchBarAdmin from "../components/admin/searchs/SearchBarAdmin";
import TableOrder from "../components/admin/tables/TableOrder";
import OrderSideBar from "../components/admin/sidebars/OrderSideBar";
const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const fetchOrderData = useCallback(async (pageNumber = 0) => {
    try {
      setLoading(true);
      const res = await instanceAdmin.get(`/orders`);

      if (res.code === 200 && res.result) {
        const resultData = res.result;
        const totalPages = resultData.page?.totalPages || 0;
        setTotalPage(totalPages);
        setOrders(resultData.content || []);
        setCurrentPage(pageNumber);
      } else {
        setTotalPage(0);
        setOrders([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrderData(0);
  }, [fetchOrderData]);
  return (
    <>
      <SearchBarAdmin title="Đơn hàng" />
      <div className="row mt-4">
        <OrderSideBar />
        <TableOrder
          orders={orders}
          loading={loading}
          totalPage={totalPage}
          currentPage={currentPage}
          fetchOrderData={fetchOrderData}
        />
      </div>
    </>
  );
};

export default OrderPage;
