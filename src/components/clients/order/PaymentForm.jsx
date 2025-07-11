import  { useState } from 'react';
import {instance} from '../../../config/Axios';

function PaymentForm() {
  const [orderId, setOrderId] = useState('');
  const [amount, setAmount] = useState('');
  const [orderInfo, setOrderInfo] = useState('');

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      // Gọi API backend để khởi tạo thanh toán
      const response = await instance.get('/orders/momo-payment', {
        params: {
          orderId,
          amount,
          orderInfo,
        },
      });

      console.log(response);
      // Nhận payUrl từ backend và redirect người dùng
      if (response.data) {
        window.location.href = response.data; // Redirect đến MoMo
      }
    } catch (error) {
      console.error('Payment initiation failed:', error);
      alert('Có lỗi xảy ra khi khởi tạo thanh toán.');
    }
  };

  return (
    <div>
      <h2>Thanh toán qua MoMo</h2>
      <form onSubmit={handlePayment}>
        <div>
          <label>Mã đơn hàng:</label>
          <input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Số tiền (VND):</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mô tả:</label>
          <input
            type="text"
            value={orderInfo}
            onChange={(e) => setOrderInfo(e.target.value)}
            required
          />
        </div>
        <button type="submit">Thanh toán</button>
      </form>
    </div>
  );
}

export default PaymentForm;