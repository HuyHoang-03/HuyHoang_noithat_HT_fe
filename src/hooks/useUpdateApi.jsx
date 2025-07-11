import React from 'react'
import { instanceAdmin } from "../config/Axios";
const useUpdateApi = () => {
    const [isUpdating, setIsUpdating] = React.useState(false);
    const[updateError, setUpdateError] = React.useState(null);
    const handleUpdate = async (id, newData, baseUrl) => {
        setIsUpdating(true);
        setUpdateError(null);
        try{
            const response = await instanceAdmin.put(`/${baseUrl}/${id}`, newData)
            if(response?.code === 201){
                return true;
            }
        } catch (error) {
            console.error("Error updating category:", error);
            setUpdateError(error.message || "An unexpected error occurred.");
        }
    }
  return {handleUpdate, isUpdating, updateError}
}

export default useUpdateApi