import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Container, Row, Col, Card } from 'react-bootstrap';
import { Toaster, toast } from 'react-hot-toast';
import useRegister from '../../hooks/useRegister';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        address: '',
        username: '',
        password: ''
    });
    const [errorValidate, setErrorValidate] = useState({});

    const { registerAccount, isLoading, error } = useRegister();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errorValidate[name]) {
            setErrorValidate(prev => ({ ...prev, [name]: null }));
        }
    };

    const validate = () => {
        const { firstName, lastName, phone, email, address, username, password } = formData;
        const newErrors = {};

        if (!firstName.trim()) newErrors.firstName = 'Tên khách hàng không được để trống';
        if (!lastName.trim()) newErrors.lastName = 'Họ khách hàng không được để trống';

        if (!phone.trim()) {
            newErrors.phone = 'Số điện thoại không được để trống';
        } else if (!/^[0-9]{10,11}$/.test(phone.trim())) {
            newErrors.phone = 'Số điện thoại không hợp lệ (10-11 chữ số)';
        }

        if (!email.trim()) {
            newErrors.email = 'Email không được để trống';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            newErrors.email = 'Email không hợp lệ';
        }

        if (!address.trim()) newErrors.address = 'Địa chỉ không được để trống';

        if (!username.trim()) {
            newErrors.username = 'Tài khoản đăng nhập không được để trống';
        } else if (username.trim().length < 3) {
            newErrors.username = 'Tài khoản đăng nhập phải có ít nhất 3 ký tự';
        }

        if (!password.trim()) {
            newErrors.password = 'Mật khẩu không được để trống';
        } else if (password.trim().length < 6) {
            newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
        }

        setErrorValidate(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorValidate({});

        if (!validate()) return;

        const customerData = {
            ...formData,
            firstName: formData.firstName.trim(),
            lastName: formData.lastName.trim(),
            phone: formData.phone.trim(),
            email: formData.email.trim(),
            address: formData.address.trim(),
            username: formData.username.trim(),
            password: formData.password.trim(),
        };

        try {
            const success = await registerAccount(customerData);
            if (success) {
                toast.success('Đăng ký tài khoản thành công!');
                setFormData({
                    firstName: '',
                    lastName: '',
                    phone: '',
                    email: '',
                    address: '',
                    username: '',
                    password: ''
                });
            }
            navigate("/login");
        } catch (err) {
            // console.log(err?.response?.data?.message)
            // console.log("check >>> ",err);
            toast.error(err?.response?.data?.message)
        }
    };


    return (
        <Container className="py-5">
            <Toaster position="top-center" reverseOrder={false} />
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <Card className="shadow-sm">
                        <Card.Body className="p-4">
                            <h2 className="text-center mb-4 text-primary">Đăng Ký Tài Khoản</h2>
                            <Form>
                                <Row className="g-3">
                                    <Col md={6}>
                                        <Form.Group controlId="firstName">
                                            <Form.Label>Tên</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                isInvalid={!!errorValidate.firstName}
                                                className="rounded-3"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errorValidate.firstName}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="lastName">
                                            <Form.Label>Họ</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                isInvalid={!!errorValidate.lastName}
                                                className="rounded-3"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errorValidate.lastName}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className="g-3 mt-2">
                                    <Col md={6}>
                                        <Form.Group controlId="phone">
                                            <Form.Label>Số điện thoại</Form.Label>
                                            <Form.Control
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                isInvalid={!!errorValidate.phone}
                                                className="rounded-3"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errorValidate.phone}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="email">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                isInvalid={!!errorValidate.email}
                                                className="rounded-3"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errorValidate.email}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Form.Group controlId="address" className="mt-2">
                                    <Form.Label>Địa chỉ</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        isInvalid={!!errorValidate.address}
                                        className="rounded-3"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errorValidate.address}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Row className="g-3 mt-2">
                                    <Col md={6}>
                                        <Form.Group controlId="username">
                                            <Form.Label>Tài khoản đăng nhập</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="username"
                                                value={formData.username}
                                                onChange={handleChange}
                                                isInvalid={!!errorValidate.username}
                                                className="rounded-3"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errorValidate.username}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="password">
                                            <Form.Label>Mật khẩu</Form.Label>
                                            <Form.Control
                                                type="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                isInvalid={!!errorValidate.password}
                                                className="rounded-3"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errorValidate.password}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <div className="d-grid mt-4">
                                    <Button
                                        variant="primary"
                                        onClick={handleSubmit}
                                        disabled={isLoading}
                                        className="rounded-3 py-2"
                                        size="lg"
                                    >
                                        {isLoading ? 'Đang đăng ký...' : 'Đăng Ký'}
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default RegisterPage;