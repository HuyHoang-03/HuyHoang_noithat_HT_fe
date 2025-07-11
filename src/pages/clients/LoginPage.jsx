import { useState } from "react";
import imgLogin from "../../assets/imgs/imgLogin.jpg";
import logo from "../../assets/imgs/logoHT1.png";
import {
    Container,
    Row,
    Col,
    Form,
    Button,
    Image,
    Alert,
} from "react-bootstrap";
import { FaCrow } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { login } from "../../redux/actions/actionLogin";
import { instanceLogin } from "../../config/Axios";

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const data = { username, password };
            const response = await instanceLogin.post("/auth/login", data);
          
            if (response?.data) {
                toast.success("Đăng nhập thành công");
                localStorage.setItem(
                    "token",
                    JSON.stringify(response.data.result.token)
                );
                dispatch(login(response.data.result));
                navigate("/");
            } else {
                toast.error("Đăng nhập thất bại");
                setError("Đăng nhập thất bại");
            }
        } catch (err) {
            console.error(err);
            toast.error("Đã xảy ra lỗi khi đăng nhập");
            setError("Đã xảy ra lỗi khi đăng nhập");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container
            fluid
            className="min-vh-100 d-flex justify-content-center align-items-center bg-light p-0"
        >
            <Row className="w-100 m-0 shadow-lg rounded-3">
                <Col
                    xs={12}
                    md={6}
                    className="p-4 p-md-5 d-flex flex-column justify-content-center align-items-center bg-white"
                >
                    <div className="d-flex flex-row align-items-center mb-4">
                        <img
                            src={logo}
                            alt="Logo"
                            className="img-fluid"
                            style={{ maxWidth: "120px" }}
                        />
                    </div>

                    <div className="w-100 px-3" style={{ maxWidth: "450px" }}>
                        <Form>
                            {error && (
                                <Alert variant="danger" className="rounded-3">
                                    {error}
                                </Alert>
                            )}
                            <Form.Group
                                className="mb-4"
                                controlId="formBasicEmail"
                            >
                                <Form.Label className="fw-medium">Tài khoản</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Nhập tài khoản"
                                    size="lg"
                                    className="rounded-3"
                                    required
                                />
                            </Form.Group>

                            <Form.Group
                                className="mb-4"
                                controlId="formBasicPassword"
                            >
                                <Form.Label className="fw-medium">Mật khẩu</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Nhập mật khẩu"
                                    size="lg"
                                    className="rounded-3"
                                    required
                                />
                            </Form.Group>

                            <Button
                                className="w-100 py-2 rounded-3"
                                variant="primary"
                                size="lg"
                                type="submit"
                                disabled={loading}
                                onClick={handleLogin}
                            >
                                {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                            </Button>
                            <p className="text-center mt-4 mb-3">
                                <a
                                    href="#!"
                                    className="text-muted text-decoration-none"
                                >
                                    Quên mật khẩu?
                                </a>
                            </p>
                            <p className="text-center mb-0">
                                Chưa có tài khoản?{" "}
                                <Link
                                    to="/register"
                                    className="text-primary fw-medium text-decoration-none"
                                >
                                    Đăng ký
                                </Link>
                            </p>
                        </Form>
                    </div>
                </Col>

                <Col
                    xs={12}
                    md={6}
                    className="d-none d-md-block p-0"
                    style={{ maxHeight: "100vh" }}
                >
                    <Image
                        src={imgLogin}
                        alt="Login image"
                        fluid
                        className="rounded-end-3"
                        style={{
                            objectFit: "cover",
                            objectPosition: "left",
                            height: "100%", 
                            width: "100%"
                        }}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default LoginPage;