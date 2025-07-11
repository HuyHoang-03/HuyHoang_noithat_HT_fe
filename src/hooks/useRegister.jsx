import { useState } from "react";
import { instanceLogin } from "../config/Axios";
const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const registerAccount = async (customerData) => {
    setIsLoading(true);
    setError(null);
    try {
        const response = await instanceLogin.post('/users/register', customerData);
        if(response?.data?.code === 201){
            setIsLoading(false);
            return true;
        } else {
            throw new Error(response?.data?.message || "Failed to create customer");
        }
    } catch (error) {
        setError(error);
        throw error;
    } finally {
        setIsLoading(false);
    }
  }

  return {
    registerAccount,
    isLoading,
    error
  };
};

export default useRegister;
