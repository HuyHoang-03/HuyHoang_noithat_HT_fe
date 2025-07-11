export const convertVND = (amount) => {
    // Kiểm tra nếu amount là undefined hoặc null, trả về chuỗi mặc định
    if (amount === undefined || amount === null) {
        return "0 đ";
    }
    // Chuyển đổi thành số nếu amount là chuỗi, và định dạng
    const numberAmount = Number(amount);
    return numberAmount.toLocaleString("vi-VN") + " đ";
};

export const convertDate = (date) => {
    return new Date(date).toISOString().split("T")[0]
}

export const handleAuthCheck = () => {
    const token = localStorage.getItem("token")
        ? JSON.parse(localStorage.getItem("token"))
        : null;

    if (token) {
        return true;
    } else {
        return false;
    }
};