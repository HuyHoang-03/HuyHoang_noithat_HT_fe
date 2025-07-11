import React, { useState } from "react";
import { NavLink } from "react-router-dom";
function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        // Clear error when user types
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: null
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) newErrors.name = "Vui lòng nhập họ tên";
        if (!formData.email.trim()) {
            newErrors.email = "Vui lòng nhập email";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Email không hợp lệ";
        }
        if (formData.phone && !/^[0-9]{10,11}$/.test(formData.phone)) {
            newErrors.phone = "Số điện thoại không hợp lệ";
        }
        if (!formData.message.trim()) newErrors.message = "Vui lòng nhập nội dung";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            setIsSubmitting(true);

            // Simulate API call
            setTimeout(() => {
                console.log("Form submitted:", formData);
                setIsSubmitting(false);
                setSubmitSuccess(true);
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    message: ""
                });

                // Hide success message after 5 seconds
                setTimeout(() => setSubmitSuccess(false), 5000);
            }, 1500);
        }
    };

    return (
        <>
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white" style={{ fontWeight: 700 }}>
                    Liên hệ
                </h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item">
                        <NavLink to="/" style={{ color: "#fff" }}>
                            Trang chủ
                        </NavLink>
                    </li>
                    <li className="breadcrumb-item active text-white">Liên hệ</li>
                </ol>
            </div>
            <div className="container my-4 my-md-5">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-10 col-lg-8 col-xl-7">
                        <div className="card shadow-sm border-0">
                            <div className="card-header text-white py-3" style={{ background: "rgb(61, 44, 40)" }}>
                                <h1 className="h4 mb-0 text-center">Liên hệ với chúng tôi</h1>
                            </div>

                            <div className="card-body p-3 p-md-4">
                                {submitSuccess && (
                                    <div className="alert alert-success alert-dismissible fade show" role="alert">
                                        <i className="bi bi-check-circle-fill me-2"></i>
                                        Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất.
                                        <button
                                            type="button"
                                            className="btn-close"
                                            onClick={() => setSubmitSuccess(false)}
                                        ></button>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} noValidate>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label fw-semibold">
                                            Họ và tên <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.name ? "is-invalid" : ""}`}
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Nhập họ tên của bạn"
                                            required
                                        />
                                        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label fw-semibold">
                                            Email <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Nhập địa chỉ email"
                                            required
                                        />
                                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="phone" className="form-label fw-semibold">
                                            Số điện thoại
                                        </label>
                                        <input
                                            type="tel"
                                            className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="Nhập số điện thoại (nếu có)"
                                        />
                                        {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="message" className="form-label fw-semibold">
                                            Nội dung <span className="text-danger">*</span>
                                        </label>
                                        <textarea
                                            className={`form-control ${errors.message ? "is-invalid" : ""}`}
                                            id="message"
                                            name="message"
                                            rows="5"
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder="Viết nội dung bạn cần gửi..."
                                            required
                                        ></textarea>
                                        {errors.message && <div className="invalid-feedback">{errors.message}</div>}
                                    </div>

                                    <div className="d-grid gap-2">
                                        <button
                                            type="submit"
                                            className="btn btn-primary py-2"
                                            style={{ background: "rgb(61, 44, 40)", border: "none" }}
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                    Đang gửi...
                                                </>
                                            ) : (
                                                <>
                                                    <i className="bi bi-send-fill me-2"></i>
                                                    Gửi liên hệ
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>

                            <div className="card-footer bg-light py-3">
                                <div className="row align-items-center">
                                    <div className="col-12 col-md-6 mb-2 mb-md-0">
                                        <p className="small mb-0">
                                            <i className="bi bi-telephone-fill text-primary me-2"></i>
                                            <span className="text-muted">Hotline: </span>
                                            <a href="tel:0123456789" className="text-decoration-none">0123 456 789</a>
                                        </p>
                                    </div>
                                    <div className="col-12 col-md-6 text-md-end">
                                        <p className="small mb-0">
                                            <i className="bi bi-envelope-fill text-primary me-2"></i>
                                            <span className="text-muted">Email: </span>
                                            <a href="mailto:contact@example.com" className="text-decoration-none">noithatht@example.com</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default ContactPage;