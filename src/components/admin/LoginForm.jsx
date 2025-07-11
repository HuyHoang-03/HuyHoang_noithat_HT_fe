import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import loginLogo from "../../assets/imgs/logoHT1.png";
import { instanceLogin } from "../../config/Axios";
import "../../main.css";

function LoginForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = {
      username: username,
      password: password,
    };
    const res = await instanceLogin.post("/auth/login", data);
    console.log(res);
    if (res.data.result && res.data.result.authenticated) {
      alert("Đăng nhập thành công");
      localStorage.setItem("tokenAdmin", res.data.result.token);
      navigate("/admin");
    } else {
      alert("Đăng nhập không thành công");
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 bg-light">
      <div className="text-center mb-4">
        <img src={loginLogo} alt="Logo Login" className="login-logo" />
      </div>
      <div className="card shadow-lg p-4 login-form-container">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              className="form-control-lg"
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="fw-bold">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control-lg"
            />
          </Form.Group>
          <Button
            variant="danger"
            type="submit"
            onClick={handleLogin}
            className="w-100 btn-lg login-button"
          >
            Đăng nhập
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default LoginForm;