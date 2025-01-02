import PropTypes from "prop-types";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthenticationRoute = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

AuthenticationRoute.propTypes = {
  children: PropTypes.node,
};

export default AuthenticationRoute;
