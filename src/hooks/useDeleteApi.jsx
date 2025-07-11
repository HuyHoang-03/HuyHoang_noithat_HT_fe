import { useState } from "react";
import { instance } from "../config/Axios";
const useDeleteApi = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const handleDelete = async (id, baseUrl) => {
        setIsDeleting(true);
        setDeleteError(null);
        try{
            const response = await instance.delete(`/${baseUrl}/${id}`)
            if(response?.code === 200){
                return true;
            }
        } catch (error) {
            console.error("Error deleting:", error);
            setDeleteError(error.message || "An unexpected error occurred.");
        }
    }
  return {handleDelete, isDeleting, deleteError}
};

export default useDeleteApi;
