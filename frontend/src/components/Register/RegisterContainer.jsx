import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { register } from "@/features/auth/authSlice";

import Register from "./Register";

const RegisterContainer = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize the navigate hook
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);
  const [localError, setLocalError] = React.useState(null);
  
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/"); // Redirect to the dashboard if the user is authenticated
    }
  }, [isAuthenticated, navigate])

  const handleRegister = async (fullName, email, password, role) => {
    try {
      await dispatch(register({ fullName, email, password, role })).unwrap();
     
    } catch (err) {
        
      setLocalError(err);
    }  
  };  


  return <Register onRegister={handleRegister} loading={loading} error={error || localError} />;
};

export default RegisterContainer;
