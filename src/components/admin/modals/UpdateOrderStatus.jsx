import {useState} from 'react'
import { Modal, Button } from 'react-bootstrap';
const UpdateOrderStatus = ({ show, onHide, orderId, currentStatus, onSave }) => {
    console.log("status order >>> ", currentStatus);
    const [newStatus, setNewStatus] = useState(currentStatus);

    const handleSaveStatus = () => {
        onSave(orderId, newStatus);
        onHide();
    };
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Cập nhật trạng thái đơn hàng</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="mb-3">
                    <label>Trạng thái mới:</label>
                    <select
                        className="form-control"
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                    >
                        <option value="Đang xử lý">Chờ xử lý</option>
                        <option value="Đang vận chuyển">Đang vận chuyển</option>
                        <option value="Hoàn thành">Hoàn thành</option>
                        <option value="Đã hủy">Đã hủy</option>
                    </select>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Đóng
                </Button>
                <Button variant="primary" onClick={handleSaveStatus}>
                    Lưu
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default UpdateOrderStatus