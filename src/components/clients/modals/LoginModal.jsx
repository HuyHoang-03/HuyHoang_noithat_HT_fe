import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
const LoginModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    return (
        <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            margin: 0
        }}>
            <div style={{
                background: "white",
                padding: "20px",
                borderRadius: "8px",
                width: "400px",
                textAlign: "center",
            }}>
                <h2>Bạn chưa đăng nhập</h2>
                <p>Vui lòng đăng nhập để tiếp tục.</p>
                <Link
                    to="/login"
                    style={{
                        padding: "10px 20px",
                        margin: "10px",
                        background: "#007bff",
                        color: "white",
                        textDecoration: "none",
                        borderRadius: "4px",
                        display: "inline-block"
                    }}
                    onClick={onClose}
                >
                    Đăng nhập
                </Link>
                <Button
                    style={{
                        padding: "10px 20px",
                        margin: "10px",
                        background: "#6c757d",
                        color: "white",
                        textDecoration: "none",
                        borderRadius: "4px",
                        display: "inline-block"
                    }}
                    onClick={onClose}
                >
                    Đóng
                </Button>
            </div>
        </div>
    );
};


export default LoginModal