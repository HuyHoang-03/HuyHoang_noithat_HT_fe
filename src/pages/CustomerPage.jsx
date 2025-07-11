import { useState, useEffect, useCallback } from "react";
import SearchBarAdmin from "../components/admin/searchs/SearchBarAdmin";
import TableCustomers from "../components/admin/tables/TableCustomers";
import CreateCustomer from "../components/admin/modals/CreateCustomer";
import { instanceAdmin } from "../config/Axios";

const CustomerPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsersData = useCallback(async (pageNumber = 0) => {
    try {
      setLoading(true);
      const res = await instanceAdmin.get(
        `/users/pagination?pageNo=${pageNumber}&pageSize=5&sortBy=id&sortDir=asc`
      );

      if (res.code === 200 && res.result) {
        const resultData = res.result;
        setTotalPage(resultData.page.totalPages);
        setUsers(resultData.content);
        setCurrentPage(pageNumber);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const handleShowCreateModal = () => {
    setShowCreateModal(true);
  };
  const dropdownItems = [
    {
      label: "Thêm khách hàng",
      onClick: handleShowCreateModal,
    },
  ];
  useEffect(() => {
    fetchUsersData(0);
  }, [fetchUsersData]);

  return (
    <>
      <SearchBarAdmin dropdownItems={dropdownItems} title="Khách hàng" />
      <div className="row mt-4">
        <TableCustomers
          users={users}
          loading={loading}
          totalPage={totalPage}
          currentPage={currentPage}
          fetchUsersData={fetchUsersData}
        />
      </div>
      {showCreateModal && (
        <CreateCustomer
          fetchUsersData={fetchUsersData}
          showCreateModal={showCreateModal}
          setShowCreateModal={setShowCreateModal}
        />
      )}
    </>
  );
};

export default CustomerPage;
