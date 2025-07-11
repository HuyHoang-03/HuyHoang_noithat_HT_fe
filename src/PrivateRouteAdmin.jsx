import { Navigate, useLocation } from "react-router-dom";
import useCheckToken from "./hooks/useCheckToken";
const PrivateRouteAdmin = ({ element }) => {
  const location = useLocation();
  const token = localStorage.getItem("tokenAdmin")
    ? localStorage.getItem("tokenAdmin")
    : null;
  // const { isValid, error, isLoading } = useCheckToken(token);

  if (token) {
    return element;
  } else {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }
};

export default PrivateRouteAdmin;
