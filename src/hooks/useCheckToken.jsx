import { useState, useEffect } from "react";
import { instanceLogin } from "../config/Axios";

const useCheckToken = (token) => {
  console.log(token);
  const [isValid, setIsValid] = useState(null); // Thay đổi từ false thành null
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Thêm loading state

  useEffect(() => {
    const checkToken = async () => {
      if (!token) {
        setIsValid(false);
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        const response = await instanceLogin.post("/auth/introspect", { token });
        console.log("response : ", response);
        
        if (response?.data?.code == 200) {
          console.log("check token response : ", response);
          setIsValid(response.data.result.valid);
          setError(null);
        } else {
          setIsValid(false);
          setError("Invalid response from server");
        }
      } catch (error) {
        setIsValid(false);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkToken();
  }, [token]);

  return { isValid, error, isLoading };
};

export default useCheckToken;