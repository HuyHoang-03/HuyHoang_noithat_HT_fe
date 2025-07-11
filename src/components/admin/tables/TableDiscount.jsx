import { useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { toast } from "react-hot-toast";
import { instanceAdmin } from "../../../config/Axios";
import UpdateDiscount from "../modals/UpdateDiscount";
const TableDiscount = ({ discounts, fetchDiscounts }) => {
  const [showUpdateDiscount, setShowUpdateDiscount] = useState(false);
  const [selectedDiscount, setSelectedDiscount] = useState({});

  const handleUpdateDiscount = (discount) => {
    setShowUpdateDiscount(true);
    setSelectedDiscount(discount);
  };

  const handleDeleteDiscount = async (discountId) => {
    try {
      const response = await instanceAdmin.delete(`/discounts/delete/${discountId}`);
      if (response.code === 200) {
        toast.success(response.message);
        fetchDiscounts();
      } else {
        toast.error("Xoá danh mục thất bại");
      }
    } catch (error) {
      console.log("Lỗi khi xoá danh mục : " + error);
    }
  };

  const handleActiveDiscount = async (discountId, currentActiveStatus) => {
    // Đảo ngược trạng thái hiện tại để gửi lên server
    const newActiveStatus = !currentActiveStatus;

    try {
      const response = await instanceAdmin.put(`/discounts/active/${discountId}`, {
        active: newActiveStatus,
      });
      if (response.code === 200) {
        toast.success(
          newActiveStatus
            ? "Kích hoạt mã giảm giá thành công"
            : "Tắt mã giảm giá thành công"
        );
        fetchDiscounts(); // Cập nhật danh sách sau khi thay đổi
      }
    } catch (error) {
      console.error("Lỗi khi thay đổi trạng thái mã giảm giá:", error);
      toast.error("Có lỗi xảy ra khi thay đổi trạng thái");
    }
  };
  return (
    <>
      <div className="col-9">
        <div className="d-flex gap-3 align-items-center mb-3">
          <div
            style={{ width: "20px", height: "20px", background: "#fb5858" }}
          ></div>
          <span>Mã giảm giá đã hết hạn</span>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th style={{ width: "20%" }}>Mã giảm giá</th>
              <th style={{ width: "15%" }}>Giá trị (%)</th>
              <th style={{ width: "20%" }}>Ngày bắt đầu</th>
              <th style={{ width: "20%" }}>Ngày kết thúc</th>
              <th style={{ width: "25%" }}>Chỉnh sửa</th>
            </tr>
          </thead>
          <tbody>
            {discounts ? (
              discounts.map((discount) => {
                return (
                  <tr key={discount.discountId}>
                    <td>{discount.code}</td>
                    <td>{discount.discountValue}</td>
                    <td>
                      {new Date(discount.startDate).toISOString().split("T")[0]}
                    </td>
                    <td
                      style={{
                        background:
                          new Date(discount.endDate) < new Date()
                            ? "#fb5858"
                            : "",
                      }}
                    >
                      {new Date(discount.endDate).toISOString().split("T")[0]}
                    </td>
                    <td className="d-flex align-items-center gap-4">
                      <Button
                        variant="info"
                        onClick={() => handleUpdateDiscount(discount)}
                      >
                        Sửa
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() =>
                          handleDeleteDiscount(discount.discountId)
                        }
                      >
                        Xoá
                      </Button>
                      {discount.active === true ? (
                        <Button
                          variant="success"
                          onClick={() =>
                            handleActiveDiscount(
                              discount.discountId,
                              discount.active
                            )
                          }
                        >
                          Deactivate
                        </Button>
                      ) : (
                        <Button
                          variant="success"
                          onClick={() =>
                            handleActiveDiscount(
                              discount.discountId,
                              discount.active
                            )
                          }
                        >
                          Activate
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td>Chưa có danh mục</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      {showUpdateDiscount && (
        <UpdateDiscount
          show={showUpdateDiscount}
          setShow={setShowUpdateDiscount}
          selectedDiscount={selectedDiscount}
          fetchDiscounts={fetchDiscounts}
        />
      )}
    </>
  );
};

export default TableDiscount;
