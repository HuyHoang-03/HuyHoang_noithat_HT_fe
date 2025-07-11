import React from 'react'
import { instanceAdmin } from "../config/Axios";
const useUpdateDiscount = () => {
    const [isUpdating, setIsUpdating] = React.useState(false);
    const[updateError, setUpdateError] = React.useState(null);
    const updateDiscount = async (discountId, newData) => {
        setIsUpdating(true);
        setUpdateError(null);
        try{
            const response = await instanceAdmin.put(`/discounts/${discountId}`, newData)
            if(response?.code === 201){
                setIsUpdating(false);
                return true;
            }
        } catch (error) {
            console.error("Error updating category:", error.response.data);
            setUpdateError(error);
            setIsUpdating(false);
            return false;
        } 
    }
  return {updateDiscount, isUpdating, updateError}
}

export default useUpdateDiscount