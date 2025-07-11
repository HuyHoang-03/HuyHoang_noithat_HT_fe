import { useState } from "react";
import SearchBarAdmin from "../components/admin/searchs/SearchBarAdmin";
import TableStocks from "../components/admin/tables/TableStocks";
import { useFetchStock } from "../hooks/useFetchStock";
import TableStockTransaction from "../components/admin/tables/TableStockTransaction";
import ImportTransaction from "../components/admin/modals/ImportTransaction";
import ExportTransaction from "../components/admin/modals/ExportTransaction";
const WarehousePage = () => {
  const [showImportModal, setShowImportModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [isStock, setIsStock] = useState(true);
  const { data, isLoading, error, fetchData } = useFetchStock();
  if (isLoading) {
    return <div className="text-center mt-5">Đang tải danh mục...</div>;
  }
  if (error) {
    return <div className="alert alert-danger mt-5">Lỗi: {error}</div>;
  }

  const handleShowTransaction = () => {
    setIsStock(false);
  };

  const handleShowStock = () => {
    setIsStock(true);
  };

  const handleShowImportModal = () => {
    setShowImportModal(true);
  };

  
  const handleShowExportModal = () => {
    setShowExportModal(true);
  };

  const dropdownItems = [
    {
      label: "Nhập hàng",
      onClick: handleShowImportModal,
    },
    {
      label: "Xuất hàng",
      onClick: handleShowExportModal,
    },
    {
      label: "Lịch sử giao dịch",
      onClick: handleShowTransaction,
    },
    {
      label: "Kho hàng",
      onClick: handleShowStock,
    },
  ];
  return (
    <div>
      <SearchBarAdmin title="Kho hàng" dropdownItems={dropdownItems} />
      {isStock ? <TableStocks data={data} /> : <TableStockTransaction />}
      {showImportModal && (
        <ImportTransaction
          show={showImportModal}
          setShow={setShowImportModal}
          fetchData={fetchData}
        />
      )}
      {showExportModal && (
        <ExportTransaction
          show={showExportModal}
          setShow={setShowExportModal}
          fetchData={fetchData}
        />
      )}
    </div>
  );
};

export default WarehousePage;
