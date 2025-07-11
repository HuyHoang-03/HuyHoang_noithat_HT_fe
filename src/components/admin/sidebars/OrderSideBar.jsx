import { useState } from 'react';
import { CiFilter } from 'react-icons/ci';

const OrderSideBar = () => {
  const categoryStatus = [
    "Đang xử lý",
    "Đang vận chuyển",
    "Đã giao",
    "Thất bại",
  ];

  const [selectedStatus, setSelectedStatus] = useState('');

  const handleCheckboxChange = (status) => {
    setSelectedStatus(status === selectedStatus ? '' : status);
    console.log(status)
  };

  return (
    <div className="border border-1 rounded-3 p-4 col-3">
      <p style={{ fontSize: "20px" }}>
        <CiFilter /> Lọc theo trạng thái đơn:
      </p>
      <div className="mt-4">
        <ul className="list-group">
          {categoryStatus.map((item) => (
            <li key={item} className="list-group-item">
              <input
                type="checkbox"
                id={item}
                checked={selectedStatus === item}
                onChange={() => handleCheckboxChange(item)}
                style={{
                  display: "inline-block",
                  width: "15px",
                  height: "15px",
                  marginRight: "10px",
                  marginTop: "4px",
                }}
              />
              <label htmlFor={item}>{item}</label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderSideBar;