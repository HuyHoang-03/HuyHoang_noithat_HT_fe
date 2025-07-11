import {useEffect} from "react"
import FormAddDiscount from "../components/admin/forms/FormAddDiscount"
import TableDiscount from "../components/admin/tables/TableDiscount";
import useFetchDiscounts from "../hooks/useFetchDiscounts"
const DiscountPage = () => {
    const {fetchDiscounts, isLoading, error, discounts} = useFetchDiscounts()
    useEffect(() => {
        fetchDiscounts()
    }, [])

     if (isLoading) {
        return <div className="text-center mt-5">Đang tải mã giảm giá...</div>;
    }
    if (error) {
        return <div className="alert alert-danger mt-5">Lỗi: {error}</div>;
    }
  return (
    <div className="row">
        <FormAddDiscount fetchDiscounts={fetchDiscounts} />
        <TableDiscount fetchDiscounts={fetchDiscounts} discounts={discounts}/>
    </div>
  )
}

export default DiscountPage