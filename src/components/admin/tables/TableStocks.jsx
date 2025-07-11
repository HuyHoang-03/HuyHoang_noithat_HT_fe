import Table from "react-bootstrap/Table";
import { convertVND } from "../../../config/customeFunction";
const TableStocks = ({data}) => {
  return (
    <Table striped bordered hover className="mt-4">
      <thead>
        <tr>
          <th style={{ width: "35%" }}>Sản phẩm</th>
          <th style={{ width: "20%" }}>Giá</th>
          <th style={{ width: "25%" }}>Đơn vị bán</th>
          <th style={{ width: "20%" }}>Tồn kho</th>
        </tr>
      </thead>
      <tbody>
        {data && data.length > 0 ? (
          data.map((item, idx) => (
            <tr key={item.id || idx}>
              <td>{item.productName}</td>
              <td>{convertVND(item.price)}</td>
              <td>{item.unit}</td>
              <td>{item.quantity}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={4} style={{ textAlign: "center" }}>
              No data available
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default TableStocks;
