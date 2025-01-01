import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { login } from "@/features/auth/authSlice";

import Login from "./Login";

const LoginContainer = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize the navigate hook
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);
  const [localError, setLocalError] = React.useState(null);
  
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/"); // Redirect to the dashboard if the user is authenticated
    }
  }, [isAuthenticated, navigate])

  const handleLogin = async (email, password) => {
    setLocalError(null);
    try {
      await dispatch(login({ email, password })).unwrap();
     
    } catch (err) {
        
      setLocalError(err);
    }
  };

  return <Login onLogin={handleLogin} error={error || localError} loading={loading}/>;
};

export default LoginContainer;
