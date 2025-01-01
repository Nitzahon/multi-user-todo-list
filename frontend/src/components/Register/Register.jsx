import React from "react";
import PropTypes from "prop-types";
import { userRoles } from "@/consts/constants";

const Register = ({ onRegister, error="", loading = false }) => {
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [role, setRole] = React.useState(userRoles.USER);

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(fullName, email, password, role);
  };

  if (loading) {
    return <div className="register-page">Loading...</div>;
  }

  return (
    <div className="register-page">
      <h1>Register</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name:</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value={userRoles.USER}>{userRoles.USER}</option>
            <option value={userRoles.ADMIN}>{userRoles.ADMIN}</option>
          </select>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

Register.propTypes = {
  onRegister: PropTypes.func.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool,
};

export default Register;
