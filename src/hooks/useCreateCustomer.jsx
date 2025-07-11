import { useState } from "react";
import { instanceAdmin } from "../config/Axios";
const useCreateCustomer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createCustomer = async (customerData) => {
    setIsLoading(true);
    setError(null);
    try {
        const response = await instanceAdmin.post('/users', customerData);
        if(response?.code === 201){
            setIsLoading(false);
            return true;
        } else {
            throw new Error(response?.message || "Failed to create customer");
        }
    } catch (error) {
        setError(error);
        throw error;
    } finally {
        setIsLoading(false);
    }
  }

  return {
    createCustomer,
    isLoading,
    error
  };
};

export default useCreateCustomer;
