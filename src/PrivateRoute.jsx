import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const location = useLocation();
  const token = localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null;

  if (token) {
    return element;
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
}; 



export default PrivateRoute; 
