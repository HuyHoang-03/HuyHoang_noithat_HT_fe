import { useState, useCallback } from "react";
import { instance } from "../config/Axios";

const useFetchDetailCustomer = () => {
  const [customer, setCustomer] = useState(null); // Single customer, not array
  const [isLoading, setIsLoading] = useState(false); // Start with false
  const [error, setError] = useState(null);

  const fetchCustomer = useCallback(async (customerId) => {
    // Validate customerId
    if (!customerId) {
      setError("Customer ID is required");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const response = await instance.get(`/users/${customerId}`);
        console.log("Response from API:", response);
      // Check response structure - adjust based on your API
      if (response?.code === 200) {
        // Use the correct path to customer data
        const customerData = response?.result;
        setCustomer(customerData);
      } else {
        throw new Error(response?.data?.message || "Failed to fetch customer");
      }
    } catch (err) {
      console.error("Error fetching customer:", err);
      
      let errorMessage = "An unexpected error occurred";
      if (err.response) {
        errorMessage = err.response.data?.message || `Server error: ${err.response.status}`;
      } else if (err.request) {
        errorMessage = "Network error: Unable to connect to server";
      } else {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      setCustomer(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Reset function to clear data
  const resetCustomer = useCallback(() => {
    setCustomer(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return { 
    customer, // Single customer object
    isLoading, 
    error, 
    fetchCustomer,
    resetCustomer 
  };
};

export default useFetchDetailCustomer;